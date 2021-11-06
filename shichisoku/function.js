
Module.onRuntimeInitialized = function(){
    _initialized();
}

function _initialized(){
    draw()
}

function draw (){
    const cv = document.getElementById("field")
    const ctx = cv.getContext("2d");

    // const width = field_width()
    // const height = field_height()

    const width = ctx.canvas.clientWidth
    const height = ctx.canvas.clientHeight
    ctx.clearRect(0, 0, width, height);

    ctx.textAlign = "center";

    ctx.font = "48px serif"
    ctx.fillText(String(target_number()), width / 2, height / 2)

    ctx.font = "24px serif"
    ctx.fillText('Card: ' + String(card_num()), width - 100, 50 )

    ctx.font = "36px serif"
    const radius = Math.min(width, height) / 3;
    const size = field_numbers_size()
    const ksize = Math.max(6, size)
    for(var i = 0; i < size; ++i){
        ctx.fillText(String(field_number(i)), 
            width  / 2 + radius * Math.sin(Math.PI * 2 * i / ksize),
            height / 2 - radius * Math.cos(Math.PI * 2 * i / ksize))
    }

    // ctx.beginPath()
    // 
    // ctx.stroke()
}

target_number = function(){
    return _getTargetNumber()
}

field_numbers_size = function(){
    return _getFieldNumbersSize()
}

field_number = function(i){
    return _getFieldNumber(i)
}

card_num = function(){
    return _getCardNum()
}

solve = function(){
    _solve()
    console.log('Finish: solve')
}

next_number_card = function(){
    _nextNumberCard()
    draw()
    console.log('Finish: nextNumberCard')
}

next_number_fixed = function(){
    const fixedNumber = document.getElementById('next_number').value
    _nextNumberFixed(fixedNumber)
    draw()
    console.log('Finish: nextNumberFixed')
}

next_target_random = function(){
    const start = document.getElementById('next_target_min').value
    const end   = document.getElementById('next_target_max').value
    _nextTargetRandom(start, end)
    draw()
    console.log('Finish: nextTargetRandom')
}

next_target_fixed = function(){
    const fixedNumber = document.getElementById('next_target').value
    _nextTargetFixed(fixedNumber)
    draw()
    console.log('Finish: nextTargetFixed')
}
