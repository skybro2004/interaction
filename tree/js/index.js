const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

function resize() {
    var {width, height} = canvas.getBoundingClientRect()
    canvas.width = width*2
    canvas.height = height*2

    ctx.strokeStyle = "black"
    ctx.strokeStyle = "rgba(0, 0, 0, 0.5)"
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(canvas.width, canvas.height)
    ctx.lineTo(0, canvas.height)

    for(x=0; x<canvas.width; x+=6){
        ctx.lineTo(x, canvas.height - 35 + Math.floor(Math.random() * 11))
        ctx.lineTo(x + 3, canvas.height - 25 + Math.floor(Math.random() * 11))
    }

    ctx.stroke()
    ctx.fillStyle ="black"
    ctx.fill()
}

resize()
window.addEventListener('resize', resize)



class Tree{
    constructor(posX){
        this.posX = posX
        this.posY = canvas.height
        this.branches = []
        this.maxDepth = 12

        this.cntDepth = 0
        this.animation = null

        this.init()
    }

    init(){
        for(var i=0; i<this.maxDepth; i++){
            this.branches.push([])
        }

        this.createBranch(this.posX, this.posY, 0, 0)
        this.draw()
    }

    createBranch(startX, startY, deg, depth){
        if(depth==this.maxDepth) return

        const len = 2*(depth === 0 ? random(10, 13) : random(0, 11))

        const endX = startX + len*sin(deg)*(this.maxDepth - depth)
        const endY = startY - len*cos(deg)*(this.maxDepth - depth)

        this.branches[depth].push(
            new Branch(startX, startY, endX, endY, (this.maxDepth - depth))
        )

        this.createBranch(endX, endY, deg - random(15, 23), depth + 1)
        this.createBranch(endX, endY, deg + random(15, 23), depth + 1)
    }

    draw(){
        // console.log(this.branches)
        if (this.cntDepth==this.maxDepth) {
            return
        }

        for (let i = this.cntDepth; i < this.branches.length; i++) {
            let pass = true
    
            for (let j = 0; j < this.branches[i].length; j++) {
                pass = this.branches[i][j].draw()
            }

            if (!pass) break
            this.cntDepth++
        }

        this.animation = requestAnimationFrame(this.draw.bind(this))

        // for(var i=0; i<this.branches.length; i++){
        //     this.branches[i].draw()
        // }
        // requestAnimationFrame(this.draw.bind(this))
    }
}

class Branch{
    constructor(startX, startY, endX, endY, lineWidth){
        this.startX = startX
        this.startY = startY
        this.endX = endX
        this.endY = endY

        this.lineWidth = lineWidth
        this.color = "#000000"

        this.frame = 10
        this.frameCnt = 0

        this.gapX = (this.endX - this.startX) / this.frame
        this.gapY = (this.endY - this.startY) / this.frame

        this.currentX = this.startX
        this.currentY = this.startY
    }

    draw(){
        if(this.frameCnt==this.frame) return true

        this.currentX += this.gapX
        this.currentY += this.gapY

        ctx.beginPath()

        if (this.lineWidth < 3) {
            ctx.lineWidth = 0.5
        } else if (this.lineWidth < 7) {
            ctx.lineWidth = this.lineWidth * 0.7
        } else if (this.lineWidth < 10) {
            ctx.lineWidth = this.lineWidth * 0.9
        } else {
            ctx.lineWidth = this.lineWidth
        }
        ctx.strokeStyle = this.color

        ctx.moveTo(this.startX, this.startY)
        ctx.lineTo(this.currentX, this.currentY)

        ctx.stroke()
        ctx.closePath()

        this.frameCnt++

        return false
    }
}


window.addEventListener("click", (event) => {
    document.querySelector(".alert").classList.add("disabled")
    new Tree(event.offsetX*2)
})



function random(min, max){
    return min + Math.floor(Math.random() * (max - min + 1))
}

function degToRad(angle) {
    return (angle / 180.0) * Math.PI
}

function sin(deg){
    return Math.sin(this.degToRad(deg))
}

function cos(deg){
    return Math.cos(this.degToRad(deg))
}