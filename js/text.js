import * as THREE from '../node_modules/three/build/three.module.js';

export function setText(path, scene) {

    return new Promise(resolved => {
        var loader = new THREE.FontLoader();

        loader.load(path, function (font) {

            const fontSettings = {
                font: font,
                size: 10,
                height: 10,
                curveSegments: 20,
            };

            const hnryLetters = [
                { letter: "H", name: "text-s", pos: { x: 0 } },
                { letter: "E", name: "text-o", pos: { x: 11 } },
                { letter: "N", name: "text-m", pos: { x: 21 } },
                { letter: "R", name: "text-a", pos: { x: 32 } },
                { letter: "Y", name: "text-r", pos: { x: 41 } },
            ]

            hnryLetters.forEach(letter => {
                const txtGeometry = new THREE.TextGeometry(letter.letter, fontSettings);
                const txtMaterial = new THREE.MeshLambertMaterial({ color: 0xaa1c2d });
                const txtMesh = new THREE.Mesh(txtGeometry, txtMaterial);
                txtMesh.position.x = letter.pos.x;
                txtMesh.position.y = 10;
                txtMesh.position.z = -50;
                txtMesh.name = letter.name;
                scene.add(txtMesh);
            })

            resolved()
        });
    })
}

