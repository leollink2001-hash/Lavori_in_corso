document.addEventListener('DOMContentLoaded', () => {
    document.body.addEventListener('click', () => {
        document.documentElement.requestFullscreen().catch(err => {
            console.log("Fullscreen non permesso:", err);
        });
    }, { once: true });
});




let temp = {};
//Risoluzione immagine
document.addEventListener("DOMContentLoaded", () => {
    const divTot = document.getElementById("myShips")
    const rect = divTot.getBoundingClientRect();
    temp = { width: rect.width * 0.98, height: rect.height }
});

// inizializzo le due finestre, con le griglie
window.onload = () => {
    const view1 = initScene("myShips");
    const view2 = initScene("enemyShips");
    dimSceneColors(view2.scene);


    var FASE = "disposizione";
    var COLLISION = false;


    let active_view = view1;
    var index = -1;

    view1.scene.add(stars1);
    view2.scene.add(stars2);

    addNaviToScene(navi, view1.scene);

    window.addEventListener("keydown", (e) => {
        // if (e.repeat) return;
        let movable;
        if (FASE == "disposizione") { movable = navi[index] }
        else if (active_view === view1) { movable = selector1 }
        else { movable = selector2 }
        bombs = (active_view === view1) ? bombs1 : bombs2;
        console.log("Bombs", bombs);
        //console.log(movable.position);
        switch (e.code) {
            case "Tab":
                dimSceneColors(active_view.scene);
                active_view = (active_view === view1) ? view2 : view1;
                restoreSceneColors(active_view.scene);
                index = -1;
                e.preventDefault(); // evita di spostare il focus della pagina
                break;

            case "KeyW": move(movable, "z", -1);
                if (FASE === "battaglia" && movable.Z > 0) { movable.Z -= 1 }; break;
            case "KeyS": move(movable, "z", +1);
                if (FASE === "battaglia" && movable.Z < 4) { movable.Z += 1 }; break;
            case "KeyA": move(movable, "x", -1);
                if (FASE === "battaglia" && movable.X > 0) { movable.X -= 1 }; break;
            case "KeyD": move(movable, "x", +1);
                if (FASE === "battaglia" && movable.X < 4) { movable.X += 1 }; break;
            case "KeyQ": move(movable, "y", -1);
                if (FASE === "battaglia" && movable.Y > 0) { movable.Y -= 1 }; break;
            case "KeyE": move(movable, "y", +1);
                if (FASE === "battaglia" && movable.Y < 4) { movable.Y += 1 }; break;

            case "KeyI": if (FASE == "battaglia") { bomb_hit(active_view.scene, movable, bombs) }; break;
            case "KeyO": if (FASE == "battaglia") { bomb_out(active_view.scene, movable, bombs) }; break;
            case "KeyU": if (FASE == "battaglia") { bomb_back(active_view.scene, movable, bombs) }; break;

            case "ArrowUp": if (active_view.ang_cam.tetha + 0.07 < Math.PI / 2) { active_view.ang_cam.tetha += 0.07 }; e.preventDefault(); break;
            case "ArrowDown": if (active_view.ang_cam.tetha - 0.07 > -Math.PI / 2) { active_view.ang_cam.tetha -= 0.07 }; e.preventDefault(); break;
            case "ArrowLeft": active_view.ang_cam.phi -= 0.07; e.preventDefault(); break;
            case "ArrowRight": active_view.ang_cam.phi += 0.07; e.preventDefault(); break;

            case "Digit0": index = -1; break;
            case "Digit1": index = 0; break;
            case "Digit2": index = 1; break;
            case "Digit3": index = 2; break;
            case "Digit4": index = 3; break;
            case "Digit5": index = 4; break;
            case "Digit6": index = 5; break;

            case "Enter": if (COLLISION == false) {
                FASE = "battaglia";
                index = -1;
                addSelectorToScene(selector1, view1.scene);
                addSelectorToScene(selector2, view2.scene);
                break;
            };
        }
    }
    );

    function animate() {
        const divTot = document.getElementById("myShips")
        const rect = divTot.getBoundingClientRect();
        temp = { width: rect.width * 0.995, height: rect.height }

        // aggiorna aspect ratio della camera
        view1.camera.aspect = temp.width / temp.height;
        view1.camera.updateProjectionMatrix();

        // aggiorna dimensioni del renderer
        view1.renderer.setSize(temp.width, temp.height);

        // aggiorna aspect ratio della camera
        view2.camera.aspect = temp.width / temp.height;
        view2.camera.updateProjectionMatrix();

        // aggiorna dimensioni del renderer
        view2.renderer.setSize(temp.width, temp.height);



        // prima resetto tutte le mesh a colore base
        navi.forEach(m => {
            if (active_view === view1) { m.material.color.set("grey"); } else { m.material.color.set("grey").multiplyScalar(0.2); }
        });
        // poi colore arancione sulla selezionata
        if (index >= 0) { navi[index].material.color.set(0xff8800); }
        COLLISION = checkCollisions(navi, active_view, view1);
        update_camera(view1.camera, view1.ang_cam);
        update_camera(view2.camera, view2.ang_cam);

        view1.renderer.render(view1.scene, view1.camera);
        view2.renderer.render(view2.scene, view2.camera);

        update2D(ctx1, [...bombs1.values()].concat(navi).concat(FASE === "battaglia" ? selector1 : []));
        update2D(ctx2, ([...bombs2.values()]).concat(FASE === "battaglia" ? selector2 : []));

        requestAnimationFrame(animate);
    }
    
    DrawNaviX(ctxX);
    DrawNaviY(ctxY);
    DrawNaviZ(ctxZ);
    animate();

}