# AGENTS.md

## Project overview
- This repository is a minimal Python game built with `pygame`.
- The active game code is in `game/main.py`.
- Keep edits focused and consistent with the current simple structure.

## Expectations for agents
- Prefer small, surgical changes over broad rewrites.
- Maintain browser compatibility for `pygbag` builds.
- Preserve the async game loop pattern used by the project.
- Avoid adding unnecessary dependencies or new project structure.

## Validation
- Run `python -m py_compile game/main.py` after code changes.
- If gameplay behavior is affected, run `python game/main.py` when feasible.

## Notes
- The project is intentionally lightweight and single-file.
- Documentation and build instructions are in the root `README.md`.
