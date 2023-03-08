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

            const somarLetters = [
                { letter: "S", name: "text-s", pos: { x: 1 } },
                { letter: "O", name: "text-o", pos: { x: 10 } },
                { letter: "M", name: "text-m", pos: { x: 21 } },
                { letter: "A", name: "text-a", pos: { x: 32 } },
                { letter: "R", name: "text-r", pos: { x: 43 } },
            ]

            somarLetters.forEach(letter => {
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

