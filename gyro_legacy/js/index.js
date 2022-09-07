const box = document.getElementById("testBox");

function handleOrientation(event) {
    const alpha = event.alpha - 90,
        beta = event.beta,
        gamma = event.gamma;

    if (!beta) {
        addMouseEvent()
    }

    document.getElementById("alpha").innerText = Math.ceil(alpha*100)/100,
    document.getElementById("beta").innerText = Math.ceil(beta*100)/100,
    document.getElementById("gamma").innerText = Math.ceil(gamma*100)/100,

    box.style.transform = `rotateX(${beta}deg) rotateY(${gamma}deg) rotateZ(${alpha}deg)`
}

function handleMouseMove(event) {
    const x = event.clientX,
        y = event.clientY,
        z = event.clientY,
        w = window.outerWidth / 2,
        h = window.outerHeight / 2;

    document.getElementById("x").innerText = x,
    document.getElementById("y").innerText = y,

    box.style.transform = `rotateX(${y - h}deg) rotateY(${x + w}deg)`
}

function addMouseEvent() {
    window.addEventListener("mousemove", handleMouseMove);
}

window.addEventListener("deviceorientation", handleOrientation);