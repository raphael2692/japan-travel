# Prompt caching reference

Read this when the user's problem is cost or context pressure across long
sessions, when `cache_creation_input_tokens` stays high turn after turn, or
when they ask why caching "isn't working."

## What's cached

Claude Code caches the system prompt, tool definitions, and CLAUDE.md on every
turn. Cached input tokens bill at roughly 10% of the standard input rate — a
~90% discount that is already running by default. Caching is not a feature you
switch on. The only thing you can actually turn on is the longer TTL.

This reframes the whole problem: you are not trying to enable a discount, you
are trying to stop throwing away cache hits you already had.

## The TTL, and why it depends on how you authenticate

- **Claude subscription (Pro/Max):** Claude Code requests the one-hour TTL
  automatically. Nothing to do. Exception: if the user has exceeded their plan
  limit and is drawing on usage credits, Claude Code drops to the five-minute
  TTL because one-hour cache *writes* cost more. Set
  `ENABLE_PROMPT_CACHING_1H=1` to keep the long TTL in that state.
- **API key, Bedrock, Vertex, Foundry, Claude Platform on AWS:** defaults to
  the cheaper five-minute TTL. Set `ENABLE_PROMPT_CACHING_1H=1` to opt in.

```bash
echo 'export ENABLE_PROMPT_CACHING_1H=1' >> ~/.zshrc   # or ~/.bashrc
```

`FORCE_PROMPT_CACHING_5M=1` forces the short TTL regardless — useful for
debugging cache behavior or overriding a value set in managed settings.

Whether the one-hour TTL is actually cheaper depends on the work pattern. It
costs more to write and less to keep. If the user sends messages more often
than every five minutes, the short cache keeps refreshing for free and the long
TTL is wasted money. The long TTL wins when there are real gaps — thinking,
meetings, reading — between turns. Ask about their rhythm before recommending
it; don't set it reflexively.

Reports circulated in early 2026 that the default TTL silently changed from 60
minutes to 5, raising bills without any workflow change. This is blog-sourced
rather than documented. Treat it as a reason to check the user's own numbers,
not as an established fact to repeat.

## What invalidates the prefix

Any of these break the cached prefix and force a re-write:

- Switching models mid-session
- Changing effort/thinking settings
- MCP servers loading into the prefix
- `/compact` and `/clear`
- Fast mode
- A Claude Code upgrade

The tell is `cache_creation_input_tokens` staying high across consecutive
turns, where a healthy session shows one write followed by mostly reads.

## Cache scope is per-directory, per-machine

The system prompt embeds the working directory, platform, shell, OS version,
and auto memory paths. Consequences:

- Two sessions in different directories never share a cache.
- **Git worktrees of the same repository miss each other's cache**, since each
  worktree has its own working directory. This surprises people who use
  worktrees specifically to parallelize agent work.
- Parallel sessions in the *same* directory do share, and read each other's
  cache.

## Minimum cacheable prefix

Below a model-dependent minimum, the prefix silently doesn't cache at all:
4096 tokens on Opus 4.8 and Haiku 4.5, 2048 on Sonnet 4.6 and Fable 5, 1024 on
Sonnet 4.5 and earlier. A very small CLAUDE.md plus few tools can land under
the line — one of the rare cases where trimming context further stops helping.

## The claude-mem interaction

claude-mem registers MCP tools and injects prior-session context at session
start. Both land in the prefix, and MCP servers loading into the prefix is a
known invalidator. The injected memory also varies between sessions by design —
that is the entire point of it — so it may sit in front of otherwise stable
content and cost cache hits every turn.

This is not a reason to skip claude-mem. Continuity may well be worth it. But
it is a real trade rather than a free win, and it is not mentioned in the
project's own documentation. If the user cares about cost, have them measure
`/cost` across a few comparable sessions with it enabled and disabled rather
than assuming either way.
