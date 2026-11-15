# Orpheus

A small game written in Java (Swing). Source is in `src/`.

## Run it
    cd src
    javac *.java
    java Player

## Share it (itch.io)
Swing can't run in the browser, so upload a downloadable JAR instead:

    mkdir -p out && javac -d out src/*.java
    jar cfe orpheus.jar Player -C out .

Upload `orpheus.jar` on itch as a regular downloadable file (players need Java installed
and can run it with `java -jar orpheus.jar`).
