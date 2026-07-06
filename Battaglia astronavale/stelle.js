//STELLE
const starGeometry1 = new THREE.BufferGeometry();
const starGeometry2 = new THREE.BufferGeometry();
const starCount = 1500;

const positions1 = [];
for (let i = 0; i < starCount; i++) {
    positions1.push(
        (Math.random() - 0.5) * 3000,  // X
        (Math.random() - 0.5) * 3000,  // Y
        (Math.random() - 0.5) * 3000   // Z
    );
}

const positions2 = [];
for (let i = 0; i < starCount; i++) {
    positions2.push(
        (Math.random() - 0.5) * 3000,  // X
        (Math.random() - 0.5) * 3000,  // Y
        (Math.random() - 0.5) * 3000   // Z
    );
}

starGeometry1.setAttribute('position', new THREE.Float32BufferAttribute(positions1, 3));
starGeometry2.setAttribute('position', new THREE.Float32BufferAttribute(positions2, 3));

const starMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 3 });
const stars1 = new THREE.Points(starGeometry1, starMaterial);
const stars2 = new THREE.Points(starGeometry2, starMaterial);