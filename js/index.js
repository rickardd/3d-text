import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
// import fontBold from 'three/examples/fonts/helvetiker_bold.typeface.json';
import { Timer } from "./Timer.js";
import { Song } from "./audio.js";
import { bindChangeEvent } from "./input.js";
import { setText } from './text.js';
import { setBars } from './bars.js';
import { showMouseControlMessage, showMouseSongSelectorMessage } from './dom.js';
import {
    setBarLight1,
    setBarLight2,
    setIntroLight1,
    setIntroLight2,
    setIntroLight3,
    setIntroLight4,
    setIntroLight5,
    setIntroLight6,
    handleBarLight1,
    handleBarLight2,
    handleIntroLight1,
    handleIntroLight2,
    handleIntroLight3,
    handleIntroLight4,
    handleIntroLight5,
    handleIntroLight6,
} from './light.js';

let audio = new Song();
let audioAnalyser;


function setSong(song) {
    if (audio.hasElement()) {
        audio.pause();
    }
    audio.setSong(song);
    audio.play();
    audioAnalyser = audio.getAnalyser();
}
bindChangeEvent(document.getElementById("song-selector"), e => {
    setSong(e.target.value);
});

const fov = 100;// Camera frustum vertical Field-Of-View.The higher the further away. The angle of the top and bottom plain of the view pyramid in deg. Although most other angles in Three are radians
const aspect = window.innerWidth / window.innerHeight;// Camera frustum aspect ratio.
const near = 0.1;// Camera frustum near plane.
const far = 200;// Camera frustum far plane. has to be greater than the near value.

const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
camera.position.set(26, 12, -8);

const scene = new THREE.Scene();
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setClearColor("#000");
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;

setBars(scene);

const textPromise = setText('helvetiker_bold.typeface.json', scene);

const barLight1 = new THREE.SpotLight('yellow', 2, 1000);
const barLight2 = new THREE.SpotLight('yellow', 2, 1000);
const introLight1 = new THREE.PointLight(0xFFFFFF, 2, 1000);
const introLight2 = new THREE.PointLight(0xFFFFFF, 2, 1000);
const introLight3 = new THREE.PointLight(0xFFFFFF, 2, 1000);
const introLight4 = new THREE.PointLight(0xFFFFFF, 2, 1000);
const introLight5 = new THREE.PointLight(0xFFFFFF, 2, 1000);
const introLight6 = new THREE.PointLight(0xFFFFFF, 2, 1000);

setBarLight1(scene, barLight1);
setBarLight2(scene, barLight2);
setIntroLight1(scene, introLight1);
setIntroLight2(scene, introLight2);
setIntroLight3(scene, introLight3);
setIntroLight4(scene, introLight4);
setIntroLight5(scene, introLight5);
setIntroLight6(scene, introLight6);

const renderBars = (scene, audioAnalyser) => {
    const frequencyData = audioAnalyser.getFrequencyData();

    scene.children.forEach((child, i) => {
        if (child.name.toLowerCase() === 'bar') {
            child.scale.y = frequencyData[i] / 50;
            // child.scale.z = frequencyData[i] / 200 + .3;
        }
    });
}

const renderLetters = (scene, audioAnalyser) => {
    const averageFrequency = audioAnalyser.getAverageFrequency();

    scene.children.forEach((child, i) => {
        if (child.name.toLowerCase() === 'text-s') {
            child.scale.z = averageFrequency / 300 + 1;
        }
        if (child.name.toLowerCase() === 'text-o') {
            child.scale.z = averageFrequency / 250 + 1;
        }
        if (child.name.toLowerCase() === 'text-m') {
            child.scale.z = averageFrequency / 200 + 1;
        }
        if (child.name.toLowerCase() === 'text-a') {
            child.scale.z = averageFrequency / 250 + 1;
        }
        if (child.name.toLowerCase() === 'text-r') {
            child.scale.z = averageFrequency / 300 + 1;
        }
    });
}

const getLetterM = scene => scene.children.find(child => child.name.toLowerCase() === 'text-m');

document.body.appendChild(renderer.domElement);

let deltaAccumulator = 0;
const renderSpeed = 0.001;
const cameraManualStart = 1.5;
const cameraFlyStart = 4;

let allowMouse = false;
let controls;

const noOfSteps = (cameraFlyStart - cameraManualStart) / renderSpeed;
let stepCount = 0;

const sinX = deltaAccumulator => Math.sin(deltaAccumulator) * 50;
const cosY = deltaAccumulator => Math.cos(deltaAccumulator) * 40 + 30;
const cosZ = deltaAccumulator => Math.cos(deltaAccumulator) * 35 + 30;

const stepX = (sinX(cameraFlyStart) - 26) / noOfSteps;
const stepY = (cosY(cameraFlyStart) - 12) / noOfSteps;
const stepZ = (cosZ(cameraFlyStart) - -8) / noOfSteps;

const moveCamera1 = 2.10;
const moveCamera2 = 2.90;
const moveCamera3 = 3.50;
const moveCamera4 = 4.00;
const moveCamera5 = 4.50;

const render = function (deltaTime) {

    if (window.show) {
        console.log(camera.position)
        window.show = false;
    }

    deltaAccumulator += renderSpeed;
    // console.log(deltaAccumulator);

    const letterM = getLetterM(scene);
    camera.lookAt(letterM.position);

    if (deltaAccumulator > 0) {
        handleIntroLight3(scene, introLight3);
    }
    if (deltaAccumulator > 0.4) {
        handleIntroLight2(scene, introLight2);
    }
    if (deltaAccumulator > 0.9) {
        handleIntroLight1(scene, introLight1); // issue
    }
    if (deltaAccumulator > 1.2) {
        handleIntroLight4(scene, introLight4);
    }
    if (deltaAccumulator > moveCamera1 && deltaAccumulator < moveCamera1 + 0.002) {
        camera.position.set(30, -10, -10);
    }
    if (deltaAccumulator > 2.1) {
        handleIntroLight5(scene, introLight5);
    }
    if (deltaAccumulator > moveCamera2 && deltaAccumulator < moveCamera2 + 0.002) {
        camera.position.set(-26, 7, 10);
    }
    if (deltaAccumulator > 2.80) {
        handleIntroLight6(scene, introLight6);
    }
    if (deltaAccumulator > moveCamera3 && deltaAccumulator < moveCamera3 + 0.002) {
        camera.position.set(49, 3.3, 4.5);
    }
    if (deltaAccumulator > moveCamera3 + 0.004) {
        camera.position.x += .003;
        handleBarLight1(barLight1);
        handleBarLight2(barLight2);
        renderer.setClearColor("#f0f0f0");
    }

    /** This could be simplified and removed  */
    if (deltaAccumulator < moveCamera3 + 0.002 && deltaAccumulator < moveCamera4) {
        if (deltaAccumulator > cameraManualStart) {
            if (stepCount < noOfSteps + 1) {
                camera.position.x += stepX;
                camera.position.z += stepZ;
                camera.position.y += stepY;
                stepCount += 1;
            }
            else if (deltaAccumulator > cameraFlyStart) {
                camera.position.x = sinX(deltaAccumulator);
                camera.position.y = cosY(deltaAccumulator);
                camera.position.z = cosZ(deltaAccumulator);
            }
        }
    }

    if (deltaAccumulator > moveCamera4 && deltaAccumulator < moveCamera4 + 0.002) {
        camera.position.set(46, 16, 27);
    }
    if (deltaAccumulator > moveCamera4 + 0.004) {
        camera.position.x += .02;
        camera.position.y += .02;
        camera.position.z += .02;
    }

    if (deltaAccumulator > moveCamera5 && deltaAccumulator < moveCamera5 + 0.002) {
        camera.position.set(-25, 38, 53);
    }
    if (deltaAccumulator > moveCamera5 + 0.004 && deltaAccumulator < moveCamera5 + 1) {
        camera.position.x += .02;
        camera.position.y += .02;
    }

    if (deltaAccumulator > moveCamera5 + 0.3) {
        allowMouse = true;
    }

    if (audioAnalyser) {
        renderBars(scene, audioAnalyser);
        if (deltaAccumulator > 2.2) {
            renderLetters(scene, audioAnalyser);
        }
    }

    camera.updateProjectionMatrix();

    renderer.render(scene, camera);

    if (allowMouse && !controls) {
        controls = new OrbitControls(camera, renderer.domElement);
        showMouseControlMessage();
        showMouseSongSelectorMessage();
    }

}

window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
})

let isFirstSongSet = false;

textPromise.then(() => {

    const timer = new Timer(1 / 60);
    timer.update = function update(deltaTime) {

        if (window.start3D) {
            if (!isFirstSongSet) {
                setSong("angel.mp3");
            }
            render(deltaTime);
            isFirstSongSet = true
        }
    }

    timer.start();
})

window.camera = camera