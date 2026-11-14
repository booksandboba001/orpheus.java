# Orpheus

A small game written in Python with [pygame](https://www.pygame.org).
All the code is in `game/main.py`.

## Run it
    pip install pygame-ce
    python game/main.py

## Put it on itch.io (playable in the browser)
    pip install pygbag
    pygbag --build game

Then zip the contents of `game/build/web/` and upload that zip on itch as an
"HTML" project, ticking "This file will be played in the browser".
(`pygbag game` instead builds and serves it at http://localhost:8000 to test first.)
