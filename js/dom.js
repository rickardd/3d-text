const containerEl = document.getElementById("container");
const mouseControlEl = document.getElementById("mouse-control");
const songSelectorEl = document.getElementById("song-selector-message");
const nextButtonEl = document.getElementById("next-button");
const introScreenEl = document.getElementById("intro");
const teaserScreenEl = document.getElementById("teaser");
const ballEl = document.getElementById("ball");
const holeEl = document.getElementById("hole");

let draggable = false;

export function showMouseControlMessage() {
    mouseControlEl.style.display = "block";
}

export function showMouseSongSelectorMessage() {
    songSelectorEl.style.display = "block";
}

function closeIntroScreen() {
    introScreenEl.style.display = "none";
}

function showTeaserScreen() {
    teaserScreenEl.style.display = "block";
}

function dragBall({ pageX, pageY }) {
    ballEl.style.left = (pageX - 11) + "px";
    ballEl.style.top = (pageY - 11) + "px";
}

let holeStage = 0;
function moveHolePos1() {
    holeEl.style.right = "100px";
    holeEl.style.top = (document.body.offsetHeight - 100) + "px";

    setTimeout(() => {
        holeStage = 1;
    }, 300)
}

function moveHolePos2() {
    holeEl.style.right = (document.body.offsetWidth - 200) + "px";
    holeEl.style.top = "250px";
    setTimeout(() => {
        holeStage = 2;
    }, 300)
}

function moveHolePos3() {
    holeEl.style.right = "250px";
    holeEl.style.top = (document.body.offsetHeight - 150) + "px";
    setTimeout(() => {
        holeStage = 3;
    }, 300)
}

function getDistanceToBall({ pageX, pageY }) {
    const holeX = holeEl.offsetLeft;
    const holeY = holeEl.offsetTop;

    const a = holeY - pageY;
    const b = holeX - pageX;

    const c = Math.pow(a, 2) + Math.pow(b, 2);
    return c;
}

function checkHit({ pageX, pageY }) {
    const holeX = holeEl.offsetLeft;
    const holeY = holeEl.offsetTop;
    const holeW = holeEl.offsetWidth;
    const holeH = holeEl.offsetHeight;

    if (pageX >= holeX && pageX <= holeX + holeW) {
        if (pageY >= holeY && pageY <= holeY + holeH) {
            holeEl.style.backgroundColor = "#13a26d69"
            return true;
        }
        else {
            holeEl.style.backgroundColor = "#000"
        }
    }
    else {
        holeEl.style.backgroundColor = "#000"
    }

}

nextButtonEl.addEventListener("click", e => {
    closeIntroScreen();
    showTeaserScreen();
})

ballEl.addEventListener("mousedown", e => {
    draggable = true;
})

ballEl.addEventListener("mouseup", e => {
    draggable = false;
    if (checkHit(e)) {
        start3d();
    }
})

document.addEventListener("mousemove", e => {
    if (draggable) {
        dragBall(e);

        if (holeStage === 0 && getDistanceToBall(e) < 20000) {
            moveHolePos1()
        }
        if (holeStage === 1 && getDistanceToBall(e) < 20000) {
            moveHolePos2()
        }
        if (holeStage === 2 && getDistanceToBall(e) < 20000) {
            moveHolePos3()
        }
    }
})

function start3d() {
    window.start3D = true;
    containerEl.style.display = "none";
}