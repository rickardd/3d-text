import * as THREE from '../node_modules/three/build/three.module.js';

export class Song {
    setSong(song) {
        this.fftSize = 128;
        this.listener = new THREE.AudioListener();
        this.audio = new THREE.Audio(this.listener);
        this.mediaElement = new Audio(`../assets/audio/${song}`);
        this.mediaElement.loop = true;
        this.audio.setMediaElementSource(this.mediaElement);
    }

    hasElement() {
        return !!this.mediaElement
    }

    getAnalyser() {
        return new THREE.AudioAnalyser(this.audio, this.fftSize);
    }

    play() {
        this.mediaElement.play();
    }

    pause() {
        this.mediaElement.pause();
    }
}