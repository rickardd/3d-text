import * as THREE from '../node_modules/three/build/three.module.js';

const addHelper = (scene, light) => {
    const lightHelper = new THREE.PointLightHelper(light);
    // scene.add(lightHelper);
}

export function setBarLight1(scene, light) {
    light.position.set(-100, 20, 25);
    light.intensity = 0;
    light.distance = 500;
    light.name = "bar-light-1"
    // light.castShadow = true;
    // light.shadow.bias = 0.0001;
    // // light.shadow.radius = 50;
    // light.shadow.mapSize.width = 64; //Higher values give better quality shadows at the cost of computation time. Values must be powers of 2. Increase softness by decreasing mapSize.
    // light.shadow.mapSize.height = 64;

    scene.add(light);
    addHelper(scene, light);
}

export function setBarLight2(scene, light) {
    light.position.set(100, 20, 25);
    light.intensity = 0;
    light.distance = 500;
    light.name = "bar-light-2"
    scene.add(light);

    addHelper(scene, light);
}

export function setIntroLight1(scene, light) {
    light.position.set(-70, 20, 25);
    light.intensity = 0;
    light.distance = 1000;
    light.name = "intro-light-1";
    scene.add(light);
    addHelper(scene, light);
}

export function setIntroLight2(scene, light) {
    light.position.set(26, 70, -35);
    light.intensity = 0;
    light.distance = 10;
    light.name = "intro-light-2";
    scene.add(light);
    addHelper(scene, light);
}

export function setIntroLight3(scene, light) {
    light.position.set(110, -50, -35);
    light.intensity = 0;
    light.distance = 10;
    light.name = "intro-light-3";
    scene.add(light);
    addHelper(scene, light);
}

export function setIntroLight4(scene, light) {
    light.position.set(200, 80, -70);
    light.intensity = 0;
    light.distance = 200;
    light.name = "intro-light-4";
    scene.add(light);
    addHelper(scene, light);
}

export function setIntroLight5(scene, light) {
    light.position.set(-200, -80, 70);
    light.intensity = 0;
    light.distance = 200;
    light.name = "intro-light-5";
    scene.add(light);
    addHelper(scene, light);
}

export function setIntroLight6(scene, light) {
    light.position.set(-200, 0, 20);
    light.intensity = 0;
    light.distance = 100;
    light.name = "intro-light-6";
    scene.add(light);
    addHelper(scene, light);
}


// Handle light

export function handleBarLight1(light) {
    light.intensity = 1.5;
}

export function handleBarLight2(light) {
    light.intensity = 1.5;
}

function handleIntroLight(scene, light, intensityMidpoint = 2.5) {
    if (!light.visible) {
        return;
    }

    if (light.intensity > intensityMidpoint && !light.isFadingOut) {
        light.isFadingOut = true; // custom property
    }

    if (light.intensity < intensityMidpoint && !light.isFadingOut) {
        light.intensity += .0060;
    } else {
        light.intensity -= .0150;

        if (light.intensity <= 0) {
            light.visible = false;
            console.log('light off', light.name)
        }
    }
}

export function handleIntroLight1(scene, light) {
    light.position.x += .25;
    light.position.y = 10;
    light.position.z = -35;

    handleIntroLight(scene, light);
}

export function handleIntroLight2(scene, light) {
    light.position.y -= 0.15;

    handleIntroLight(scene, light);
}

export function handleIntroLight3(scene, light) {
    light.position.x -= 0.15;
    light.position.y += 0.15;

    handleIntroLight(scene, light)
}

export function handleIntroLight4(scene, light) {
    light.position.x -= 0.40;
    light.position.y -= 0.15;
    light.position.z += 0.15;

    handleIntroLight(scene, light)
}

export function handleIntroLight5(scene, light) {
    light.position.x += 0.40;
    light.position.y += 0.15;
    light.position.z -= 0.15;

    handleIntroLight(scene, light);
}

export function handleIntroLight6(scene, light) {
    light.position.x += 0.40;

    handleIntroLight(scene, light);
}