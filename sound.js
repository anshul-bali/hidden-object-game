const theme = document.querySelector("#theme");
theme.volume = 0.22;
const world = document.body.classList.contains("haunted") ? "haunted" : "love";
const celebration = new Audio();
celebration.volume = world === "haunted" ? 1 : 0.45;
let muted = false;

function updateTheme() {
  const selected = document.querySelector('input[name="scr"]:checked');
  const level = selected?.id.match(/^scr-([1-7])$/)?.[1];
  const playing = level && document.querySelector('input[id^="l' + level + '-"]:not(:checked)');
  if (muted || document.hidden || selected?.id !== celebration.dataset.room) celebration.pause();
  if (!playing || muted || document.hidden ||
      getComputedStyle(document.querySelector(".screen-" + level + " .over-time")).visibility === "visible") {
    theme.pause();
    return;
  }
  if (theme.paused) theme.play().catch(() => {});
}

document.addEventListener("change", updateTheme);
document.addEventListener("visibilitychange", updateTheme);
document.addEventListener("animationend", event => {
  if (event.animationName === "timesUp") updateTheme();
});
document.addEventListener("click", event => {
  if (!event.target.closest(".sound-toggle")) return;
  muted = !muted;
  document.querySelectorAll(".sound-toggle").forEach(button => {
    button.textContent = muted ? "Sound off" : "Sound on";
    button.setAttribute("aria-pressed", String(!muted));
  });
  updateTheme();
});
/* The checkboxes drive gameplay. Sound simply follows each successful find. */
let audio;
document.addEventListener("change", async ({ target }) => {
  const find = /^l([1-7])-(?:i\d+|d\d+|key)$/.exec(target.id);
  if (muted || !find || !target.checked) return;
  const level = find[1];
  const finished = !document.querySelector('input[id^="l' + level + '-"]:not(:checked)');
  if (finished) {
    celebration.dataset.room = "scr-" + level;
    const loveCue = level === "7" ? "final" : level === "1" ? "clear" : "clear-" + level;
    celebration.src = world === "haunted" ? "audio/haunted-victory.wav" : "audio/love-" + loveCue + ".wav";
    celebration.play().catch(() => {});
    return;
  }
  if (!window.AudioContext) return;
  const notes = [659, 880];
  audio ??= new AudioContext();
  if (audio.state === "suspended") await audio.resume().catch(() => {});
  if (audio.state !== "running") return;
  notes.forEach((frequency, index) => {
    const start = audio.currentTime + index * 0.075;
    const end = start + 0.22;
    const tone = audio.createOscillator();
    const volume = audio.createGain();
    tone.frequency.value = frequency;
    tone.type = document.body.classList.contains("haunted") ? "triangle" : "sine";
    volume.gain.setValueAtTime(0.001, start);
    volume.gain.exponentialRampToValueAtTime(0.09, start + 0.012);
    volume.gain.exponentialRampToValueAtTime(0.001, end);
    tone.connect(volume).connect(audio.destination);
    tone.start(start);
    tone.stop(end);
  });
});

