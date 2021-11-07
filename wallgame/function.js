
Module.onRuntimeInitialized = function(){
    _initialized();
}

function _initialized(){
    selectCursorX = -1
    selectCursorY = -1
    
    const cv = document.getElementById("field")
    const width = field_width()
    const height = field_height()
    const w = 480 / Math.max(width, height)
    cv.addEventListener('click', {
        w: w,
        handleEvent: onClick
    }, false);

    initSelectFieldName()
}

function draw (){
    const cv = document.getElementById("field")
    const gc = cv.getContext("2d");

    const width = field_width()
    const height = field_height()
    const w = 480 / Math.max(width, height)
    const wallW = 4

    gc.beginPath()

    for(var y = 0; y < height; y++){
        for(var x = 0; x < width ; x++){
            gc.fillStyle = "lightcyan";
            gc.fillRect(x * w, y * w, w, w);

            for(var gid = 0; gid < goal_num(); gid++)
            {
                if(goal_data(gid, 0) == x && goal_data(gid, 1) == y)
                {
                    fillCircle(gc, (x+0.5) * w, (y+0.5) * w, w / 3, "purple");
                }
            }

            draw_person(gc, x, y, w)
        }
    }
    draw_wall_all(gc, w, wallW, width, height)
    draw_cursor(gc, selectCursorX, selectCursorY, w)
    gc.stroke()
}

fillCircle = function(gc, x, y, radius, color){
    var circle = new Path2D();
    circle.moveTo(x, y);
    circle.arc(x, y, radius, 0, 2 * Math.PI)
    gc.fillStyle = color
    gc.fill(circle)
}

draw_person = function(gc, x, y, w)
{
    for(var pid = 0; pid < person_num(); pid++)
    {
        if(person_data(pid, 0) == x && person_data(pid, 1) == y)
        {
            color = "red"
            switch (pid % 4) {
                case 0:
                    color = "red"
                    break;
                case 1:
                    color = "blue"
                    break;
                case 2:
                    color = "green"
                    break;
                case 3:
                    color = "orange"
                    break;
            }
            fillCircle(gc, (x+0.5) * w, (y+0.5) * w, w / 5, color);
        }
    }
}

draw_wall_all = function(gc, w, wallW, width, height)
{
    for(var y = 0; y < height; y++){
        for(var x = 0; x < width ; x++){
            for(var dir = 0; dir < 4; dir++)
            {
                if(is_wall(x, y, dir) == false)
                {
                    draw_wall(gc, x, y, dir, w, wallW)
                }
            }
        }
    }
    for(var y = 0; y < height; y++){
        for(var x = 0; x < width ; x++){
            for(var dir = 0; dir < 4; dir++)
            {
                if(is_wall(x, y, dir) == true)
                {
                    draw_wall(gc, x, y, dir, w, wallW)
                }
            }
        }
    }
}

draw_wall = function(gc, x, y, dir, w, wallW){
    gc.fillStyle = is_wall(x, y, dir) ? "black" : "gray";
    switch (dir) {
        case 0:
            gc.fillRect(x * w - wallW, y * w - wallW, w + wallW * 2, wallW * 2);
            break;
        case 1:
            gc.fillRect(x * w + w - wallW, y * w - wallW, wallW * 2, w + wallW * 2);
            break;
        case 2:
            gc.fillRect(x * w - wallW , y * w + w - wallW, w + wallW * 2, wallW * 2);
            break;
        case 3:
            gc.fillRect(x * w - wallW, y * w - wallW, wallW * 2, w + wallW * 2);
            break;
    }
}

draw_cursor = function(gc, x, y, w){
    const margin = 2;
    gc.strokeStyle = "blue";
    gc.lineWidth = 4;
    gc.strokeRect(x * w + margin, y * w + margin, w - margin * 2, w - margin * 2);
}

field_width = function(){
    return _fieldWidth()
}

field_height = function(){
    return _fieldHeight()
}

is_wall = function(x, y, dir){
    return _isWall(x, y, dir)
}

person_num = function(){
    return _getPersonNum()
}

person_data = function(pid, z){
    return _getPerson(pid, z)
}

goal_num = function(){
    return _getGoalNum()
}

goal_data = function(gid, z){
    return _getGoal(gid, z)
}

onClick = function(e) {
    var rect = e.target.getBoundingClientRect()
    selectCursorX = Math.floor((e.clientX - rect.left) / this.w)
    selectCursorY = Math.floor((e.clientY - rect.top) / this.w)
    document.getElementById('route_x').value = selectCursorX;
    document.getElementById('route_y').value = selectCursorY;
    document.getElementById('person_x').value = selectCursorX;
    document.getElementById('person_y').value = selectCursorY;
    for(var pid = 0; pid < person_num(); pid++)
    {
        if(person_data(pid, 0) == selectCursorX && person_data(pid, 1) == selectCursorY)
        {
            document.getElementById('route_person_id').value = pid;
        }
    }
    draw()
}

initSelectFieldName = function(){
    _initFileNames()
}

read_field = function(){
    let fieldName = document.getElementById('field_name').value
    goalData = _readFile(fieldName)
    draw()
    console.log('Finish: read_field')
}

make_random_field = function(){
    _makeRandomField()
    draw()
    console.log('Finish: make_random_field')
}

make_random_person = function(){
    _makeRandomPerson()
    draw()
    console.log('Finish: make_random_person')
}

add_person = function(){
    const x = document.getElementById('person_x').value
    const y = document.getElementById('person_y').value
    _addPerson(x, y)
    draw()
    console.log('Finish: add_person')
}

remove_person = function(){
    _removePerson()
    draw()
    console.log('Finish remove_person')
}

solve = function(){
    const depth = document.getElementById('depth_limit').value
    _clearSolution()
    _solve(depth)
    draw()
    console.log('Finish: solve')
}

route = function(){
    const pid = document.getElementById('route_person_id').value
    const x = document.getElementById('route_x').value
    const y = document.getElementById('route_y').value
    _route(pid, x, y)
    console.log('Finish: route')
}