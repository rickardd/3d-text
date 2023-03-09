const containerEl = document.getElementById("container");
const mouseControlEl = document.getElementById("mouse-control");
const songSelectorEl = document.getElementById("song-selector-message");
const nextButtonEl = document.getElementById("next-button");
const introScreenEl = document.getElementById("intro");

export function showMouseControlMessage() {
    mouseControlEl.style.display = "block";
}

export function showMouseSongSelectorMessage() {
    songSelectorEl.style.display = "block";
}

function closeIntroScreen() {
    introScreenEl.style.display = "none";
}

nextButtonEl.addEventListener("click", e => {
    closeIntroScreen();
    start3d(); 
})

function start3d() {
    window.start3D = true;
    containerEl.style.display = "none";
}