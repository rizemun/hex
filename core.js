let last = performance.now(),
    step = 1 / 60,
    dt = 0,
    now;

let frame = function(){
    now = performance.now();
    dt = dt + Math.min(1, (now - last) / 1000); // исправление проблемы неактивных вкладок
    while(dt > step) {
        dt = dt - step;
        update(step);
    }
    last = now;

    render(dt);
    requestAnimationFrame(frame);
};

let update = function(){
    for(let i=0; i<hexes.length; i++){
        if(hexes[i].isInside(cursor.x,cursor.y)){
            hexes[i].color = "skyblue";
        }
        else{
            hexes[i].color = false;
        }
    }
};

let render = function(){
    for(let i=0; i<hexes.length; i++){
        hexes[i].draw();
    }
};