---
name: agent-setup
description: Audits and sets up a project for token-efficient Claude Code work — measures where tokens are actually going, then installs the RTK output-compression proxy, claude-mem persistent memory, six read-only delegation subagents (Explore, reader, test-runner, git-log, docs, reviewer), CLAUDE.md and .claudeignore hygiene, and prompt-caching configuration. Use this whenever the user asks to "init claude", "set up this project for Claude Code", "reduce token usage", "cut my Claude bill", "cut context bloat", "set up my agents", "install rtk", "install claude-mem", or is starting work in a fresh repo and wants the standard token-saving setup. Also use it when the user says their context fills too fast, their costs jumped, caching seems broken, or any part of an existing setup seems missing — it repairs as well as installs.
---

# agent-setup

Set up a project for token-efficient Claude Code work.

The instinct is to install things immediately. Resist it for two minutes. Token
spend has several independent sources, and installing all three tools on a
project whose real problem is a 5,000-token CLAUDE.md just adds machinery
without fixing anything. Step 0 exists to avoid that.

## The map

Five levers, roughly in order of how much they typically move the bill:

| Lever | Attacks | Where |
| --- | --- | --- |
| Model routing | Price per token | Step 4, `references/session-habits.md` |
| Prompt caching | Repeated prefix cost | Step 4, `references/caching.md` |
| Subagents | Large reads hitting the main context | Step 3 |
| RTK | Bash output volume | Step 1 |
| CLAUDE.md / .claudeignore | Per-turn floor | Step 4 |
| claude-mem | Re-explaining the project each session | Step 2 |

They are independent. Someone can have all six configured and still burn
tokens if they run one wandering session all day. Session habits are in
`references/session-habits.md` — cover them at the end.

Every step is idempotent. Re-running on a half-configured project repairs it.

## Step 0 — Audit first

Confirm the working directory is the project root the user means. The subagents
and `.claudeignore` are project-scoped; getting this wrong puts them somewhere
useless.

Then gather the numbers, cheaply:

```bash
wc -w CLAUDE.md ~/.claude/CLAUDE.md 2>/dev/null   # ~1.3 tokens per word
ls .claudeignore .claude/agents/ 2>/dev/null
rtk --version 2>/dev/null
echo "$ENABLE_PROMPT_CACHING_1H"
```

Ask the user to run `/cost` and `/doctor` and report back, since those aren't
available from bash. `/doctor` shows whether prompt caching is active.

Also ask two questions the numbers can't answer: **which model are they
defaulting to**, and **do they authenticate with a Claude subscription or an
API key?** Both change the recommendations materially, and neither is
discoverable from the filesystem.

Then say what you found and what you propose, before installing anything. If
the audit shows the problem is concentrated somewhere specific — a huge
CLAUDE.md, an Opus default on routine work, a cache that never gets hit — lead
with that, and treat the rest as optional. A user who came for "install RTK"
and leaves having fixed a 6,000-token CLAUDE.md got the better outcome.

If they've asked for only part of the stack, do only that part.

## Step 1 — RTK

An output-compression proxy: it intercepts Bash commands and filters their
output before Claude reads it.

Check before installing:

```bash
rtk --version
```

If missing, pick by platform. Homebrew first on macOS and Linux:

```bash
brew install rtk
```

Otherwise:

```bash
curl -fsSL https://raw.githubusercontent.com/rtk-ai/rtk/refs/heads/master/install.sh | sh
```

That installs to `~/.local/bin`, which may not be on PATH — the usual cause
when `rtk --version` fails immediately after a successful install:

```bash
echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.zshrc   # or ~/.bashrc
```

On Windows, take `rtk-x86_64-pc-windows-msvc.zip` from releases and put
`rtk.exe` on PATH. Cargo works too, but the `--git` flag is mandatory:
`cargo install --git https://github.com/rtk-ai/rtk`. An unrelated crate holds
the name `rtk` on crates.io, and installing that is the most common RTK setup
failure.

Install the hook:

```bash
rtk init -g          # hook + RTK.md
rtk init -g --hook-only    # hook only
rtk init -g --auto-patch   # non-interactive, for CI
rtk init --show            # verify
```

**Tell the user this, because it's the main source of disappointment:** the
hook fires only on Bash tool calls. Claude Code's built-in `Read`, `Grep`, and
`Glob` bypass it entirely.

That splits the step 3 subagents in two. `Explore`, `reader`, and `docs` use
only the tools RTK can't touch, so RTK reports roughly zero savings on their
work — they save through context isolation, a different mechanism, not a broken
one. `test-runner`, `git-log`, and `reviewer` do use Bash, so RTK's filters
apply *before* the subagent reads the output, and the subagent then compresses
again into its summary. Those stack; the other three don't.

For RTK filtering during exploration, use shell commands (`cat`, `rg`, `find`)
or explicit `rtk read` / `rtk grep` / `rtk find` rather than the built-ins.

On the numbers: RTK measures reduction in bash output bytes, estimated as bytes
÷ 4 (it ships no tokenizer, so percentages are meaningful and absolute token
counts are approximate). Bash output is one input among prompt, system prompt,
and history; input is only part of a bill that also counts output. A reported
90% output reduction is not a 90% smaller bill. Say so plainly — the gap
between that headline and the invoice is where trust in this whole setup gets
lost.

Telemetry is opt-in and off by default. `export RTK_TELEMETRY_DISABLED=1`
blocks it regardless of consent state.

## Step 2 — claude-mem

Captures session activity, compresses it with a model, and injects relevant
context into later sessions.

```bash
npx claude-mem install
```

Or from inside Claude Code:

```
/plugin marketplace add thedotmack/claude-mem
/plugin install claude-mem
```

Needs Node 20+; Bun and uv auto-install if absent. `npm install -g claude-mem`
is **not** equivalent — it installs the library without registering hooks or
the worker service. Settings land in `~/.claude-mem/settings.json`.

**Raise the privacy shape before installing, not after.** It captures
tool-usage observations and runs them through a model, storing results in local
SQLite. `<private>` tags exclude content. There's an optional cloud sync to
cmem.ai, which is a materially different data posture — never enable it on the
user's behalf. If the project involves client code, credentials in logs, or
anything under NDA, that conversation happens first.

**And raise the caching trade.** claude-mem registers MCP tools and injects
varying context at session start, both of which land in the cacheable prefix —
and MCP servers loading into the prefix is a known cache invalidator. Continuity
may well be worth it, but it is a trade rather than a free win, and the
project's own docs don't mention it. If the user cares about cost, suggest
measuring `/cost` across comparable sessions with it on and off.
`references/caching.md` has the detail.

## Step 3 — Subagents

Delegation agents get their own context window; only their summary returns to
the main thread. The principle: **any task that reads a lot to produce a little
is worth delegating.** A single small file is cheaper read directly, since
delegation costs a round trip. The win scales with how much raw material the
answer sits on top of.

Create `.claude/agents/` in the project root and copy the files verbatim from
this skill's `assets/`. Don't retype from memory and don't improve the wording —
the terseness is load-bearing, since every word of a definition is context the
subagent pays on each invocation.

| File | Tools | Absorbs |
| --- | --- | --- |
| `Explore.md` | Read, Grep, Glob | Codebase search and orientation |
| `reader.md` | Read, Grep, Glob | File reading and extraction |
| `test-runner.md` | Bash, Read, Grep | Test output — often the largest single source |
| `git-log.md` | Bash, Read | Log, blame, diff summaries |
| `docs.md` | Read, Grep, Glob, WebFetch | API and reference lookups |
| `reviewer.md` | Read, Grep, Glob, Bash | Pre-commit diff review |

All six are pinned to Haiku and tool-restricted. The restriction is the
load-bearing part: it makes "never edits" a property of the configuration
rather than a hope about instruction-following. The Bash-having agents can run
commands but have no Write or Edit to fall back on, and their bodies forbid
mutation explicitly.

Two judgment calls to surface with the user:

- `docs` has `WebFetch` and is the only agent that reaches the network. In
  air-gapped or restricted environments, drop that tool and point it at a
  vendored docs directory instead.
- `reviewer` saves tokens differently from the others — by catching problems
  before they become a fix-the-bug conversation. Round trips are expensive;
  avoided round trips are the cheapest possible saving.

`Explore` and `reader` are the sensible minimum. The other four earn their
place only in projects that actually have a test suite, real git history, heavy
documentation lookup, or a review step. Install what fits; an unused agent
definition is just a file someone has to know exists.

If a file already exists, show the difference and ask before overwriting —
someone may have customized theirs.

## Step 4 — Configuration hygiene

**CLAUDE.md.** Loads every turn, before anything else. A 5,000-token CLAUDE.md
is a floor you never get below. It also *saves* 500–2,000 tokens of repeated
setup per session, so it earns its place — but only lean. Target under ~500
tokens. If step 0 showed it well over, offer to trim it: keep build/test
commands, non-obvious architectural constraints, and conventions that would
otherwise be re-explained; cut anything readable from the code itself.

**.claudeignore.** Keeps build output, vendored dependencies, lockfiles,
fixtures, and generated code out of reads and searches. Start from `.gitignore`
and add large tracked artifacts — generated clients, snapshot data, vendored
source.

**Prompt caching.** Caching is already on; cached tokens bill at roughly 10% of
standard input. The only switch is the TTL, and the right answer depends on the
answers from step 0:

- Claude subscription → the one-hour TTL is automatic, nothing to do, unless
  they've exceeded plan limits and are on usage credits.
- API key, Bedrock, Vertex, Foundry → defaults to five minutes; `export
  ENABLE_PROMPT_CACHING_1H=1` opts in.

Don't set it reflexively. The long TTL costs more to write and less to keep, so
it wins only when there are real gaps between turns. Someone messaging steadily
every couple of minutes gets free refreshes on the short cache and would be
paying for nothing. `references/caching.md` covers invalidation, the
per-directory scope (worktrees don't share a cache — a genuine surprise for
people parallelizing agent work), and minimum cacheable prefix sizes.

**Model routing.** If step 0 revealed an Opus default on routine work, this is
probably the largest single cut available — roughly 5× moving a task from Opus
to Haiku. But the trade is asymmetric: routing down is invisible on routine
code and costly on architectural reasoning. Recommend a cheaper default with
deliberate escalation, not a blanket switch.

**MCP servers.** If the user is about to start disabling servers to save
context, stop them: MCP Tool Search now loads definitions on demand once tools
exceed ~10% of context. Hand-curation was good advice a year ago and mostly
isn't now.

## Step 5 — Verify and hand off

```bash
rtk --version && rtk init --show
ls .claude/agents/
```

Report concisely: what was already present, what was installed, what failed and
why.

Then tell the user to **restart Claude Code**. RTK's hook, claude-mem's plugin,
and the agent definitions are all read at startup — none take effect in the
running session. This is the single most common reason someone reports the
setup didn't work.

Afterwards: `git status` should come back rewritten by RTK, and `rtk gain`
shows accumulated savings.

Close by pointing at `references/session-habits.md` and offering to walk
through it. Configuration sets the floor; habits determine whether the user
stays near it. `/compact` early rather than at 90%, one task per session,
narrow file scope over "the whole project."

**Establish a baseline.** Suggest they run `/cost` at the end of the next few
sessions. Without a before-and-after they have no way to know whether any of
this helped, and reported savings in the wild span 40–90% — a range wide enough
that it describes starting points more than techniques.

## Troubleshooting

- `rtk` not found or `rtk gain` errors → wrong package from crates.io. Reinstall
  with `cargo install --git`, or Homebrew.
- Hook installed, nothing rewritten → Claude Code not restarted, or the command
  is in `exclude_commands` in `~/.config/rtk/config.toml` (macOS:
  `~/Library/Application Support/rtk/config.toml`).
- RTK reporting ~0% on exploration → expected. Read/Grep/Glob bypass the hook.
- Subagents missing → confirm `./.claude/agents/` sits under the directory
  Claude Code was launched from, and that the YAML frontmatter parses.
- claude-mem injecting nothing → needs a completed prior session; a fresh
  install has an empty database.
- `cache_creation_input_tokens` high every turn → something is invalidating the
  prefix. See `references/caching.md`.
- Costs unchanged after full setup → the spend is somewhere this stack doesn't
  reach. Go back to step 0 and check model, CLAUDE.md size, and session length.
