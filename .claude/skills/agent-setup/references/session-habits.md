# Session habits and context hygiene

Read this when the setup is installed and the user still has high token usage,
or when they ask what else they can do. These are behavioral rather than
configuration changes, so present them as options rather than installing
anything.

## Why the bill scales with context, not with asking

Claude Code resends the conversation history and everything it is holding on
every turn. The cost is not driven by how much you ask; it is driven by how
much you drag along each time you ask. Nearly every technique below is a
variation on carrying less.

## CLAUDE.md

CLAUDE.md loads before the code, before the task, before anything — every turn,
every session. A 5,000-token CLAUDE.md is a 5,000-token floor you never get
below.

The tension: it also *saves* tokens by eliminating repeated setup explanation,
commonly cited at 500–2,000 tokens per session. So it earns its place, but only
if it stays lean. A common target is under 500 tokens.

What belongs in it: build and test commands, architectural constraints that
aren't obvious from the code, conventions that would otherwise be re-explained.
What doesn't: anything Claude can read from the code itself, long prose
rationale, aspirational rules nobody follows.

Check the current size before advising:

```bash
wc -w CLAUDE.md ~/.claude/CLAUDE.md 2>/dev/null
```

Words times roughly 1.3 gives a rough token estimate.

## .claudeignore

Keeps build output, vendored dependencies, lockfiles, fixtures, and generated
code out of searches and reads. Cheap to add, works forever after. Start from
`.gitignore` and add anything large that *is* tracked — generated clients,
snapshot test data, vendored source.

## /compact, /clear, /recap

- `/compact` replaces raw history with a summary. Trigger it early — around 60%
  context utilization rather than 90%. The earlier it runs, the better the
  summary, because there is headroom to keep what matters. It accepts a hint:
  `/compact Focus on the auth refactor and the failing tests`.
- `/clear` wipes everything with no carryover. Right when switching to genuinely
  unrelated work; wrong as a habitual reflex, since it discards context you will
  pay to rebuild.
- `/recap` summarizes where a session left off without replaying it.

Note that `/compact` and `/clear` both invalidate the cached prefix. That is
usually still worth it, but it means they are not free.

## Scope of requests

"Refactor the entire auth module" pulls the whole module into context.
"Refactor the login function in auth.ts" pulls one function. Same work,
different context cost, and typically a more focused result.

One task per session, where practical. Sessions that wander accumulate context
from work that is already finished.

## Model routing

Consistently reported as the single biggest available cut. Approximate mid-2026
rates per million input/output tokens: Haiku 4.5 around $1/$5, Sonnet around
$3/$15, Opus around $5/$25. Moving routine work from Opus to Haiku is close to
a 5× saving on that task, and on routine work the difference in output is often
not visible.

The asymmetry matters: routing down saves money on routine code but can degrade
architectural and design work where the frontier model's reasoning was the
point. The pragmatic pattern is a cheaper default with deliberate escalation,
not a blanket switch.

This is also exactly what the subagents in this skill do — they pin delegated
reading to Haiku while the main session stays on whatever the user chose.

## MCP tool definitions

Historically a large invisible tax: a five-server setup running 58 tools costs
roughly 55K tokens before the conversation starts, with some individual servers
(Jira, GitHub) in the 17–18K range on their own, charged on every turn.

Claude Code now ships MCP Tool Search, which activates automatically when MCP
tools exceed about 10% of context and loads definitions on demand instead of
preloading all of them. So hand-curating the MCP list is largely obsolete work
now. Mention this if the user is about to start disabling servers to save
context — it was good advice a year ago and mostly isn't now.

## Measuring

- `/cost` — session spend.
- `/doctor` — diagnostics, including whether prompt caching is active.
- Status line shows 5-hour and 7-day rate limit windows.
- `rtk gain`, `rtk gain --daily`, `rtk discover` — RTK's own accounting, in
  bash-output bytes rather than dollars.

Measure before and after any change. Reported savings in the wild range from
40% to 90% depending on what was wrong to begin with, which is another way of
saying the number tells you more about the starting point than the technique.
