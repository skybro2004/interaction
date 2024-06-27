const canvas = document.getElementById("canvas")
const ctx = canvas.getContext('2d')
const input = document.getElementById("input")
const {width, height} = canvas.getBoundingClientRect()
canvas.width = width*2;
canvas.height = height*2;
exp = function(x){return x*(x+1)*(x-1)}
input.setAttribute("value", "x*(x+1)*(x-1)")
clear()



var scale = 500



function clear(){
    ctx.clearRect(0, 0, width*2, height*2)
    ctx.strokeStyle = "gray"
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(width, 0)
    ctx.lineTo(width, height*2)
    ctx.stroke()
    ctx.moveTo(0, height)
    ctx.lineTo(width*2, height)
    ctx.stroke()
    ctx.strokeStyle = "black"
    ctx.lineWidth = 3
}
function draw(func){
    clear()
    ctx.beginPath()
    ctx.moveTo(-width, func(-width))
    for(i=-width; i<width; i++){
        ctx.lineTo(i + width, height - scale*func(i/scale))
    }
    ctx.stroke()
}
draw(exp)



input.addEventListener("input", (e) => {
    exp = function(x){
        return eval(input.value)
    }
    try{
        draw(exp)
    }
    catch(err){
        clear()
    }
})
document.getElementById("scale").addEventListener("input", (e) => {
    scale = document.getElementById("scale").value
    draw(exp)
})
