import * as THREE from '../node_modules/three/build/three.module.js';

export function setBars(scene) {
    const geometry = new THREE.BoxGeometry(.7, 2, 3);
    const material = new THREE.MeshLambertMaterial({ color: 0xaa1c2d });

    const cubesLen = 68;

    for (var i = 1; i < cubesLen + 1; i++) {
        var mesh = new THREE.Mesh(geometry, material);
        mesh.position.x = i - (cubesLen / 2) + (i * 0.5);
        mesh.position.y = .5;
        mesh.position.z = 1;
        mesh.name = "bar";
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        scene.add(mesh);
    }
}