# Hidden Object

A two-world hidden-object and spot-the-difference game that runs entirely in the browser — no framework, no build step, no dependencies.

**Play it:** https://hidden-object-game-tau.vercel.app

## The game

Pick one of two worlds, each with 7 sequential rooms. Finishing a room unlocks the next; a timer runs per room and running out forces a full restart of that world.

| | Haunted | Love |
| --- | --- | --- |
| Setting | Moonlit mansion of cobwebs, crypts and curses | Rose-gold manor of letters, weddings and warm light |
| Audio | Ambient theme, sting on each solved room | Ambient theme, guitar-and-piano duet per win |

Rooms 1–4 hide the named relics in a single scene. Rooms 5–7 show Images A and B side by side: a relic found in either image counts for both, and the leftover task is spotting the differences. Green ticks mark objects, red ticks mark differences.

| Room | Objects | Differences |
| --- | --- | --- |
| 1 | 6 | — |
| 2–4 | 7 | — |
| 5–6 | 8 | 1 |
| 7 | 8 + a key | 2 |

**Hint** pulses the next unfound relic. **Map** pauses the clock while you browse rooms. On a phone, scroll the scene sideways to inspect the whole room.

## How it works

The 63 checkboxes per world are the game engine. State, hit-testing, per-room layouts, progression and the timer are all expressed in CSS with `:checked`, `:has()` and sibling selectors, so finds persist with no save file and no game logic in JavaScript.

`sound.js` is the only script, and it just layers audio on top of each successful find: per-room background music, a two-note WebAudio chime, and a victory track when a room completes. It also reacts to mute, tab visibility and time-out.

## Running it

Open `index.html` in a browser, or serve the folder:

```
npx serve .
```

## Contents

```
index.html      world select + how-to
haunted.html    7 rooms, dark world
love.html       7 rooms, rose world
style.css       layout, hotspots, game rules
sound.js        audio only
img/            scene PNGs and relic icons (~43 MB)
audio/          WAV music and cues (~14 MB)
```
