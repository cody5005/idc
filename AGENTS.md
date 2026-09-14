# AGENTS.md

Read this before working in this repo. Two AI agents work on Cody's projects (Claude Code and Codex).

- This repo has no CLAUDE.md. Its instruction file is the admin current-state doc: https://admin.limitlesspropprofits.com/projects/idc-quiz/docs/current-state (API: `GET /api/v1/projects/idc-quiz/docs/current-state`).
- The two-agent working agreement: https://admin.limitlesspropprofits.com/projects/limitless-admin/docs/two-agent-working-agreement
- `git status` first; commit only the files you changed (never `git add -A`); end each commit with a `Co-Authored-By:` trailer naming your agent.
- Deploy: static site on GitHub Pages (a push to `main` publishes it) and a claude.ai artifact. Nothing else runs.
