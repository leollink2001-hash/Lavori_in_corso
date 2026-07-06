function drawcube(ctx, x, y) {
    ctx.strokeRect(x, y, 16, 16);
    ctx.strokeRect(x + 8, y - 8, 16, 16);

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + 8, y - 8);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(x + 16, y);
    ctx.lineTo(x + 16 + 8, y - 8);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(x + 16, y + 16);
    ctx.lineTo(x + 16 + 8, y + 16 - 8);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(x, y + 16);
    ctx.lineTo(x + 8, y + 16 - 8);
    ctx.stroke();
}

function DrawNaviX(ctx) {
    ctx.strokeStyle = "rgb(255, 0, 0)";
    drawcube(ctx, 16 * 2, 16 * 2);
    ctx.strokeStyle = "rgb(255, 255, 0)";
    drawcube(ctx, 16 * 3, 16 * 2);

    ctx.strokeStyle = "rgb(255, 0, 0)";
    drawcube(ctx, 16 * 1, 16 * 4);
    ctx.strokeStyle = "rgb(255, 85, 0)";
    drawcube(ctx, 16 * 2, 16 * 4);
    ctx.strokeStyle = "rgb(255, 170, 0)";
    drawcube(ctx, 16 * 3, 16 * 4);
    ctx.strokeStyle = "rgb(255, 255, 0)";
    drawcube(ctx, 16 * 4, 16 * 4);
}

function DrawNaviY(ctx) {
    ctx.strokeStyle = "rgb(255, 255, 0)";
    drawcube(ctx, 5+16 * 1, 16 * 4);
    ctx.strokeStyle = "rgb(255, 127, 0)";
    drawcube(ctx, 5+16 * 1, 16 * 3);
    ctx.strokeStyle = "rgb(255, 0, 0)";
    drawcube(ctx, 5+16 * 1, 16 * 2);

    ctx.strokeStyle = "rgb(255, 255, 0)";
    drawcube(ctx, 5+16 * 4, 16 * 4);
    ctx.strokeStyle = "rgb(255, 127, 0)";
    drawcube(ctx, 5+16 * 4, 16 * 3);
    ctx.strokeStyle = "rgb(255, 0, 0)";
    drawcube(ctx, 5+16 * 4, 16 * 2);
}

function DrawNaviZ(ctx) {
    ctx.strokeStyle = "rgb(255, 255, 0)";
    drawcube(ctx, 16 * 2, 16 * 2);
    ctx.strokeStyle = "rgb(255, 127, 0)";
    drawcube(ctx, 16 * 1.5, 16 * 2.5);
    ctx.strokeStyle = "rgb(255, 0, 0)";
    drawcube(ctx, 16 * 1, 16 * 3);

    ctx.strokeStyle = "rgb(255, 255, 0)";
    drawcube(ctx, 16 * 4.5, 16 * 2.5);
    ctx.strokeStyle = "rgb(255, 0, 0)";
    drawcube(ctx, 16 * 4, 16 * 3);

}