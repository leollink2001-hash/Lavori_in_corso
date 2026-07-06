
//Crea vettori Float32 della griglia
function createGridVertices(widthSegments, depthSegments, cellSize, y) {
  const vertices = [];

  // linee lungo Z
  for (let i = 0; i <= depthSegments; i++) {
    let z = i * cellSize;
    vertices.push(0, y, z, widthSegments * cellSize, y, z);
  }

  // linee lungo X
  for (let i = 0; i <= widthSegments; i++) {
    let x = i * cellSize;
    vertices.push(x, y, 0, x, y, depthSegments * cellSize);
  }

  return new Float32Array(vertices);
}

// Materiale per le linee
const line_material0 = new THREE.LineBasicMaterial({ color: "rgb(0, 0, 252)" });
const line_material1 = new THREE.LineBasicMaterial({ color: "rgb(0, 63, 189)" });
const line_material2 = new THREE.LineBasicMaterial({ color: "rgb(0, 126, 126)" });
const line_material3 = new THREE.LineBasicMaterial({ color: "rgb(0, 189, 63)" });
const line_material4 = new THREE.LineBasicMaterial({ color: "rgb(0, 252, 0)" });

// Definizione dei segmenti di linea
const line_geometry0 = new THREE.BufferGeometry();
line_geometry0.setAttribute('position', new THREE.BufferAttribute(
  createGridVertices(5, 5, 2 / 5, 0),
  3
));

const line_geometry1 = new THREE.BufferGeometry();
line_geometry1.setAttribute('position', new THREE.BufferAttribute(
  createGridVertices(5, 5, 2 / 5, 2 / 5),
  3
));

const line_geometry2 = new THREE.BufferGeometry();
line_geometry2.setAttribute('position', new THREE.BufferAttribute(
  createGridVertices(5, 5, 2 / 5, 4 / 5),
  3
));

const line_geometry3 = new THREE.BufferGeometry();
line_geometry3.setAttribute('position', new THREE.BufferAttribute(
  createGridVertices(5, 5, 2 / 5, 6 / 5),
  3
));

const line_geometry4 = new THREE.BufferGeometry();
line_geometry4.setAttribute('position', new THREE.BufferAttribute(
  createGridVertices(5, 5, 2 / 5, 8 / 5),
  3
));

// Creazione dell'oggetto LineSegments
const line_segment0 = new THREE.LineSegments(line_geometry0, line_material0.clone());
const line_segment1 = new THREE.LineSegments(line_geometry1, line_material1);
const line_segment2 = new THREE.LineSegments(line_geometry2, line_material2);
const line_segment3 = new THREE.LineSegments(line_geometry3, line_material3);
const line_segment4 = new THREE.LineSegments(line_geometry4, line_material4);

function addGridsToScene(scenario) {
  const l0 = line_segment0.clone(); l0.name = "grid0"; l0.material = l0.material.clone();
  const l1 = line_segment1.clone(); l1.name = "grid1"; l1.material = l1.material.clone();
  const l2 = line_segment2.clone(); l2.name = "grid2"; l2.material = l2.material.clone();
  const l3 = line_segment3.clone(); l3.name = "grid3"; l3.material = l3.material.clone();
  const l4 = line_segment4.clone(); l4.name = "grid4"; l4.material = l4.material.clone();

  scenario.add(l0);
  scenario.add(l1);
  scenario.add(l2);
  scenario.add(l3);
  scenario.add(l4);
}




