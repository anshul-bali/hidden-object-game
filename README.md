# Hidden Object

A two-world hidden-object and spot-the-difference game that runs entirely in the browser — no framework, no build step, no dependencies.

**Play it:** https://hidden-object-game-tau.vercel.app

## The game

Choose a world, then work through 7 rooms in order. Each room is timed, and finishing it unlocks the next. Empty the clock and the world restarts from room 1 with every find cleared.

| | Haunted | Love |
| --- | --- | --- |
| Setting | Moonlit mansion of cobwebs, crypts and curses | Rose-gold manor of letters, weddings and warm light |
| Rooms | Foyer, Drawing Room, Library, Attic, Crypt, Ballroom, Master Chamber | Garden Gate, Rose Parlor, Storybook Study, Attic of Letters, Wedding Chapel, Ballroom of Hearts, Wedding Hall |
| Win cue | Sound effect per solved room | Guitar-and-piano duet per solved room |

## What you collect

Rooms 1–4 are single scenes: tap the relics named on the checklist. Rooms 5–7 place Images A and B side by side, where each named relic appears in both pictures — finding it in either one ticks it off in both — and the remaining task is spotting the differences.

| Room | Timed | Objects | Differences |
| --- | --- | --- | --- |
| 1 | 150s | 6 | — |
| 2 | 135s | 7 | — |
| 3 | 120s | 7 | — |
| 4 | 105s | 7 | — |
| 5 | 120s | 5 | 4 |
| 6 | 110s | 5 | 4 |
| 7 | 100s | 6 (incl. the Cellar key) | 5 |

Room 7 is the finale: its checklist lists six relics — the Cellar key among them — plus five differences, and the victory overlay appears only when all eleven are ticked. Objects and differences tick in different colours, and every find strikes its name through on the checklist.

The two worlds share one set of relic sprites but rename them to fit their mood: *Cursed ring / Wedding ring*, *Tarnished crown / Pearl tiara*, *Red gemstone / Ruby heart*, *Old letter / Love letter*, *Rusty key / Heart-bow key*.

**Hint** pulses the next unfound target in strict checklist order — toggle it off and on to look again. **Map** pauses the clock while you browse rooms. **Sound** mutes or unmutes the world. On a small screen, scroll the scene sideways to inspect the whole room.

## How it works

The 63 checkboxes per world are the game engine: 56 finds plus 7 hint toggles. State, hit-testing, per-room layouts, checklist strike-throughs, room unlocking, the countdown and the victory overlay are all expressed in CSS with `:checked`, `:has()` and sibling combinators, so finds persist with no save file and no game logic in JavaScript.

`sound.js` is the only script. It layers audio on top of each successful find — per-room background music, a two-note WebAudio chime, and a victory track when a room completes — and reacts to mute, tab visibility and time-out.

> Maintainer note: in rooms 5–7 the ids do not split by type. `l5-i6`, `l5-i7` and `l5-i8` are Differences 1–3, not objects; only the trailing `lN-dM` ids are the last differences. Count finds by their `aria-label`, not by the id suffix.

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
style.css       layout, hotspots, game rules, timers
sound.js        audio only
img/            38 PNGs — 7 scene backdrops per world + 12 relic sprites (~43 MB)
audio/          10 WAVs — themes, per-room cues and victory tracks (~14 MB)
```
