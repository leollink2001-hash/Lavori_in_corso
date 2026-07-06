function grid2D(x, y, L, col, ctx) {
    ctx.strokeStyle = col;
    ctx.lineWidth = 2;
    for (let i = 0; i < 6; i++) {
        ctx.beginPath(); // Start a new path
        ctx.moveTo(x, y + i * L / 5); // Move the pen to (30, 50)
        ctx.lineTo(x + L, y + i * L / 5); // Draw a line to (150, 100)
        ctx.stroke();

        ctx.beginPath(); // Start a new path
        ctx.moveTo(x + i * L / 5, y); // Move the pen to (30, 50)
        ctx.lineTo(x + i * L / 5, y + L); // Draw a line to (150, 100)
        ctx.stroke();
    }
    ctx.font = "15px serif";
    ctx.fillStyle = "white";
    ["1", "2", "3", "4", "5"].forEach((number, n) => {
        ctx.fillText(number, x - 10, y + n * L / 5 * 1.1 + 10);
    });
    ["A", "B", "C", "D", "E"].forEach((number, n) => {
        ctx.fillText(number, x + n * L / 5 + 3, y - 2);
    });

};


function update2D(ctx, navi) {
    ctx.clearRect(0, 0, 180, 630);
    const L = 80;
    //RIEMPIMENTI
    navi.forEach(nave => {
        const col_square = nave.material.color;
        ctx.fillStyle = col_square.getStyle();
        //Navi Y
        if (nave.geometry.parameters.height > nave.geometry.parameters.depth + 0.05) { //un po'artificiale
            //cubo sotto
            ctx.fillRect(40 + (nave.position.x * 2.5 - 0.5) * L / 5,
                20 + (nave.position.z * 2.5 - 0.5) * L / 5 + (nave.position.y * 2.5 - 1.5) * -130 +520,
                L / 5, L / 5
            );
            //cubo centrale
            ctx.fillRect(40  + (nave.position.x * 2.5 - 0.5) * L / 5,
                20 + (nave.position.z * 2.5 - 0.5) * L / 5 + (nave.position.y * 2.5 - 0.5) * -130 +520,
                L / 5, L / 5
            );
            //cubo sopra
            ctx.fillRect(40  + (nave.position.x * 2.5 - 0.5) * L / 5,
                20 + (nave.position.z * 2.5 - 0.5) * L / 5 + (nave.position.y * 2.5 + 0.5) * -130+520,
                L / 5, L / 5
            );
        }
        //Navi X
        else if (nave.geometry.parameters.width > nave.geometry.parameters.depth + 0.05) { //un po'artificiale
            ctx.fillRect(40 + (nave.position.x * 5 / 2 - nave.geometry.parameters.width * 5 / 4) * L / 5,
                20 + (nave.position.z * 2.5 - 0.5) * L / 5 + (nave.position.y * 2.5 - 0.5) * -130 +520,
                L / 5 * nave.geometry.parameters.width * 2.5,
                L / 5
            );
        }
        //Navi Z
        else if (nave.geometry.parameters.depth > nave.geometry.parameters.width + 0.05) { //un po'artificiale
            ctx.fillRect(40 + (nave.position.x * 5 / 2 - 0.5) * L / 5,
                20 + (nave.position.z * 5 / 2 - nave.geometry.parameters.depth * 5 / 4) * L / 5 + (nave.position.y * 2.5 - 0.5) * -130 +520,
                L / 5,
                L / 5 * nave.geometry.parameters.depth * 2.5
            );
        }
    });
    //BORDI
    navi.forEach(nave => {
        ctx.lineWidth = 2;
        const col_line = nave.edges.material.color;
        const col_square = nave.material.color;
        ctx.strokeStyle = col_line.getStyle()
        //Navi Y
        if (nave.geometry.parameters.height > nave.geometry.parameters.depth + 0.05) { //un po'artificiale
            //cubo sotto
            ctx.strokeRect(2 + 40 + (nave.position.x * 2.5 - 0.5) * L / 5,
                2 + 20 + (nave.position.z * 2.5 - 0.5) * L / 5 + (nave.position.y * 2.5 - 1.5) * -130 +520,
                -4 + L / 5,
                -4 + L / 5
            );
            //cubo centrale
            ctx.strokeRect(2 + 40 + (nave.position.x * 2.5 - 0.5) * L / 5,
                2 + 20 + (nave.position.z * 2.5 - 0.5) * L / 5 + (nave.position.y * 2.5 - 0.5) * -130 +520,
                -4 + L / 5,
                -4 + L / 5
            );
            //cubo sopra
            ctx.strokeRect(2 + 40 + (nave.position.x * 2.5 - 0.5) * L / 5,
                2 + 20 + (nave.position.z * 2.5 - 0.5) * L / 5  + (nave.position.y * 2.5 + 0.5) * -130 +520,
                -4 + L / 5,
                -4 + L / 5
            );
        }
        //Navi X
        else if (nave.geometry.parameters.width > nave.geometry.parameters.depth + 0.05) { //un po'artificiale
            ctx.strokeRect(2 + 40 + (nave.position.x * 5 / 2 - nave.geometry.parameters.width * 5 / 4) * L / 5,
                2 + 20 + (nave.position.z * 2.5 - 0.5) * L / 5 + (nave.position.y * 2.5 - 0.5) * -130 +520,
                -4 + L / 5 * nave.geometry.parameters.width * 2.5,
                -4 + L / 5
            );
        }
        //Navi Z
        else if (nave.geometry.parameters.depth > nave.geometry.parameters.width + 0.05) { //un po'artificiale
            ctx.strokeRect(2 + 40 + (nave.position.x * 5 / 2 - 0.5) * L / 5,
                2 + 20 + (nave.position.z * 5 / 2 - nave.geometry.parameters.depth * 5 / 4) * L / 5 + (nave.position.y * 2.5 - 0.5) * -130 +520,
                -4 + L / 5,
                -4 + L / 5 * nave.geometry.parameters.depth * 2.5
            );
        }
        //Cubetti
        else {
            //ctx.lineWidth = 4;
            ctx.fillStyle = col_square.getStyle();
            ctx.globalAlpha = 0.3;
            ctx.fillRect(+ 40 + (nave.position.x * 2.5 - 0.5) * L / 5,
                + 20 + (nave.position.z * 2.5 - 0.5) * L / 5 + (nave.position.y * 2.5 - 0.5) * -130 +520,
                -0 + L / 5,
                -0 + L / 5
            );
            ctx.globalAlpha = 1;
        }
    });
    //GRIGLIE
    for (let i = 0; i < 5; i++) {
        grid2D(40, 20 + i * -130 + 520, L, `rgb(0, ${63 * i}, ${252 - 63 * i})`, ctx);
    }
    //LETTERE GRECHE 
    ctx.font = "32px serif";
    ["α", "β", "γ", "δ", "ε"].forEach((number, n) => {
        ctx.fillStyle = `rgb(0, ${63 * n}, ${252 - 63 * n})`
        ctx.fillText(number, 122, 100 + n *-130 +520);
    });
}
