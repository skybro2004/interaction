const canvas = document.getElementById("canvas")

const ctx = canvas.getContext("2d");

const width = Math.ceil(window.innerWidth*0.8)
const height = Math.ceil(window.innerHeight*0.8)
ctx.canvas.width = width
ctx.canvas.height = height

let acl = new Accelerometer({frequency: 60});
acl.addEventListener('reading', () => {
    // console.log("Acceleration along the X-axis " + acl.x);
    // console.log("Acceleration along the Y-axis " + acl.y);
    // console.log("Acceleration along the Z-axis " + acl.z);

    document.getElementById("aclX").innerText = "X: " + Math.ceil(acl.x*100)/100
    document.getElementById("aclY").innerText = "Y: " + Math.ceil(acl.y*100)/100
    document.getElementById("aclZ").innerText = "Z: " + Math.ceil(acl.z*100)/100

    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, width, height);

    ctx.beginPath();
    ctx.strokeStyle = "red"
    ctx.lineWidth = 3;
    ctx.moveTo(width/2, height/2);
    ctx.lineTo(width/2, height/2 + acl.z*10);
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.strokeStyle = "blue"
    ctx.lineWidth = 3;
    ctx.moveTo(width/2, height/2);
    ctx.lineTo(width/2 - 0.866*acl.x*10, height/2 + 0.5*acl.x*10);
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.strokeStyle = "green"
    ctx.lineWidth = 3;
    ctx.moveTo(width/2, height/2);
    ctx.lineTo(width/2 + 0.866*acl.y*10, height/2 + 0.5*acl.y*10);
    ctx.stroke();
    ctx.closePath();
});

acl.start();

// let speed = new LinearAccelerationSensor({frequency: 60})
// var start = new Date()
// var end = new Date()
// var spdX=0, spdY=0, spdZ=0


// setInterval(() => {
//     spdX += speed.x*0.1
//     spdY += speed.y*0.1
//     spdZ += speed.z*0.1

//     document.getElementById("aclX").innerText = "X: " + Math.ceil(spdX*100)/100
//     document.getElementById("aclY").innerText = "Y: " + Math.ceil(spdY*100)/100
//     document.getElementById("aclZ").innerText = "Z: " + Math.ceil(spdZ*100)/100

//     console.log(spdX, "|", spdY, "|", spdZ);
// }, 100);


// speed.addEventListener("reading", e => {
//     end = new Date()
//     var elepsed = start - end

//     spdX += speed.x*elepsed
//     spdY += speed.y*elepsed
//     spdZ += speed.z*elepsed

//     console.log(spdX, "|", spdY, "|", spdZ);

//     document.getElementById("aclX").innerText = "X: " + Math.ceil(spdX*100)/100
//     document.getElementById("aclY").innerText = "Y: " + Math.ceil(spdY*100)/100
//     document.getElementById("aclZ").innerText = "Z: " + Math.ceil(spdZ*100)/100

//     start = end
// })
// speed.start()