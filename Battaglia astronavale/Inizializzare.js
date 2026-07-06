
function pointCameraAt(camera, target, direction, distance) {
    // normalizza la direzione
    const dir = direction.clone().normalize();
    // calcola posizione della camera
    const camPos = target.clone().add(dir.multiplyScalar(distance));
    camera.position.copy(camPos);
    // punta al target
    camera.lookAt(target);
}

function update_camera(camera, ang_cam) {
    camera.position.set(ang_cam.rho * Math.sin(ang_cam.phi) * Math.cos(ang_cam.tetha),
        ang_cam.rho * Math.sin(ang_cam.tetha),
        ang_cam.rho * Math.cos(ang_cam.phi) * Math.cos(ang_cam.tetha));
    pointCameraAt(camera, new THREE.Vector3(1, 0.5, 1), camera.position.clone(), ang_cam.rho);
}

function initScene(containerId) {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x101010);

    //Camera
    const camera = new THREE.PerspectiveCamera(75, temp.width / temp.height, 0.1, 1000);
    var ang_cam = { tetha: 0.5, phi: 0.6, rho: 3 };
    update_camera(camera, ang_cam);

    //Render
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(temp.width, temp.height); // dimensione canvas
    document.getElementById(containerId).appendChild(renderer.domElement);

    //Assi
    const axesHelper = new THREE.AxesHelper(2)
    scene.add(axesHelper)

    //Griglie
    addGridsToScene(scene);

    return { scene, camera, renderer, ang_cam };
}


function dimSceneColors(scene) {
    scene.traverse(obj => {
        if (obj.material && obj.material.color) {
            // se non l'avevi già salvato, salva il colore originale
            if (!obj.userData.originalColor) {
                obj.userData.originalColor = obj.material.color.clone();
            }
            // abbassa luminosità (es. moltiplica per 0.2)
            obj.material.color.multiplyScalar(0.2);
        }
    });
}

function restoreSceneColors(scene) {
    scene.traverse(obj => {
        if (obj.material && obj.material.color && obj.userData.originalColor) {
            obj.material.color.copy(obj.userData.originalColor);
        }
    });
}

const overlay1 = document.getElementById("overlay1");
const ctx1 = overlay1.getContext("2d");

const overlay2 = document.getElementById("overlay2");
const ctx2 = overlay2.getContext("2d");

const NaviX = document.getElementById("NaviX");
const ctxX = NaviX.getContext("2d");

const NaviY = document.getElementById("NaviY");
const ctxY = NaviY.getContext("2d");

const NaviZ = document.getElementById("NaviZ");
const ctxZ = NaviZ.getContext("2d");

