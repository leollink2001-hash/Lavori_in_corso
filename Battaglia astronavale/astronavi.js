// Materiale cubi
const material_cube = new THREE.MeshBasicMaterial({
    color: "grey",
    //transparent: true,
    //opacity: 1
})

function geo_cube(x, y, z) {
    return new THREE.BoxGeometry(x * 2 / 5, y * 2 / 5, z * 2 / 5)
}

function mesh_nave(x, y, z, px, py, pz) {
    //creo la mesh della nave
    const meshNave = new THREE.Mesh(geo_cube(x - 0.1, y - 0.1, z - 0.1), material_cube.clone())
    meshNave.position.set(px, py, pz);
    meshNave.box = new THREE.Box3().setFromObject(meshNave);
    //aggiungo le linee degli spigoli
    var cube_lines = new THREE.LineSegments(
            new THREE.EdgesGeometry(meshNave.geometry),
            new THREE.LineBasicMaterial({ color: "white" })
        );
        meshNave.add(cube_lines);
        meshNave.edges = cube_lines;
    return meshNave
}

const navi = [
    mesh_nave(2, 1, 1, 2 / 5, 9 / 5, 3 / 5),
    mesh_nave(4, 1, 1, 6 / 5, 1 / 5, 5 / 5),

    mesh_nave(1, 1, 2, 9 / 5, 7 / 5, 2 / 5),
    mesh_nave(1, 1, 3, 1 / 5, 5 / 5, 7 / 5),

    mesh_nave(1, 3, 1, 3 / 5, 3 / 5, 1 / 5),
    mesh_nave(1, 3, 1, 5 / 5, 3 / 5, 9 / 5),
]

function addNaviToScene(navi, scenario) {
    for (const nave of navi) {
        scenario.add(nave);
    }
}

function checkCollisions(navi, active_view, view1) {
            // prima resetto tutti gli edges a bianco
            navi.forEach(nave => {
                if (active_view === view1) { nave.edges.material.color.set("white"); } else { nave.edges.material.color.set("white").multiplyScalar(0.2); }

                nave.box.setFromObject(nave); // aggiorno box alla posizione attuale
            });

            // controllo tutte le coppie
            for (let i = 0; i < navi.length; i++) {
                for (let j = i + 1; j < navi.length; j++) {
                    if (navi[i].box.intersectsBox(navi[j].box)) {
                        // collisione → coloro di rosso entrambi
                        if (active_view === view1) { navi[i].edges.material.color.set(0xff0000); } else { navi[i].edges.material.color.set(0xff0000).multiplyScalar(0.2); }
                        if (active_view === view1) { navi[j].edges.material.color.set(0xff0000); } else { navi[j].edges.material.color.set(0xff0000).multiplyScalar(0.2); }
                        return true
                    }
                }
            }
            return false
        }

function move(nave, dir, steps) {
    const map = {
        x: "width",
        y: "height",
        z: "depth"
    };

    if (nave.position[dir] + 2 / 5 * steps + nave.geometry.parameters[map[dir]] / 2 < 2 && nave.position[dir] + 2 / 5 * steps - nave.geometry.parameters[map[dir]] / 2 > 0) {
        nave.position[dir] += 2 / 5 * steps;
        nave.box.setFromObject(nave);
    }
    // console.log(nave.position[dir] + 2 / 5 * steps + nave.geometry.parameters[map[dir]] / 2);
}

//SELEZIONATORI
const selector1 = mesh_nave(1.09, 1.09, 1.09, 1/5, 1/5, 1/5);
selector1.material.color.set("rgb(250, 250, 120)");
selector1.material.transparent= true;
selector1.material.opacity= 0.2;
selector1.material.depthWrite = false; ////!!!!!!!!!!!!!!!!!!

selector1.edges.material.color.set("rgb(255, 200, 0)");
selector1.X= 0;
selector1.Y= 0;
selector1.Z= 0;

const selector2 = mesh_nave(1, 1, 1, 1/5, 1/5, 1/5);
selector2.material.color.set("rgb(250, 250, 120)");
selector2.material.transparent= true;
selector2.material.opacity= 0.2;
selector2.edges.material.color.set("rgb(255, 200, 0)");
selector2.X= 0;
selector2.Y= 0;
selector2.Z= 0;

function addSelectorToScene(sel, scenario) {
    scenario.add(sel);
}

//BOMBE
let bombs1= new Map();
let bombs2= new Map();
let bombs= bombs1;

function coordKey(x, y, z) {
  return `${x},${y},${z}`;
}

function bomb_hit(scenario, sel){
    if ( bombs.has( coordKey(sel.X, sel.Y, sel.Z) ) ){
        console.log("C'ERA GIA' E LA ELIMINO");
        const bombMesh = bombs.get(coordKey(sel.X, sel.Y, sel.Z));
        scenario.remove(bombMesh);  // rimuove la mesh dalla scena
        bombs.delete(coordKey(sel.X, sel.Y, sel.Z));
        return; }
    let bomb= mesh_nave(1.05, 1.05, 1.05, sel.position.x, sel.position.y, sel.position.z);
    bomb.material.color.set("rgba(255, 0, 0, 1)");
    bomb.edges.material.color.set("rgba(165, 0, 0, 1)");
    bomb.material.transparent= true;
    bomb.material.opacity= 0.2;
    // bomb.material.depthWrite = false;
    scenario.add(bomb);
    bombs.set( coordKey(sel.X, sel.Y, sel.Z), bomb);
    console.log(bombs);
}

function bomb_out(scenario, sel, bombs){
    if ( bombs.has( coordKey(sel.X, sel.Y, sel.Z) ) ){
        console.log("C'ERA GIA' E LA ELIMINO");
        const bombMesh = bombs.get(coordKey(sel.X, sel.Y, sel.Z));
        scenario.remove(bombMesh);  // rimuove la mesh dalla scena
        bombs.delete(coordKey(sel.X, sel.Y, sel.Z));
        return; }
    let bomb= mesh_nave(1.05, 1.05, 1.05, sel.position.x, sel.position.y, sel.position.z);
    bomb.material.color.set("rgba(0, 251, 255, 1)");
    bomb.edges.material.color.set("rgba(96, 178, 255, 1)");
    bomb.material.transparent= true;
    bomb.material.opacity= 0.2;
    scenario.add(bomb);
    bombs.set( coordKey(sel.X, sel.Y, sel.Z), bomb);
    console.log(bombs);
}





