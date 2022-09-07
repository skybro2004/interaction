const scene = new THREE.Scene();
scene.background = new THREE.Color("#FFFFFF")
const sizes = {
    width: 800,
    height: 600
}
sizes.width = window.innerWidth
sizes.height = window.innerHeight*0.8

const camera = new THREE.PerspectiveCamera(75, sizes.width/sizes.height);
camera.position.z = 200
camera.position.x = 0
scene.add(camera)

const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(sizes.width, sizes.height);
document.body.appendChild( renderer.domElement );

//==============================

const geometry = new THREE.BoxGeometry(74.9, 158.4, 7.4);
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const phone = new THREE.Mesh( geometry, material );
scene.add( phone );
const borderGeometry = new THREE.EdgesGeometry(phone.geometry)
const borderMaterial = new THREE.LineBasicMaterial({color: 0x000000, linewidth: 2})
const wireframe = new THREE.LineSegments(borderGeometry, borderMaterial)
wireframe.renderOrder = 1
phone.add(wireframe)

//==============================

var InvertBeta = false

function toggleInvertBeta(){
    if(InvertBeta) InvertBeta = false
    else InvertBeta = true
}

function handleOrientation(event){
    var alpha = event.alpha,
        beta = event.beta,
        gamma = event.gamma

    if(InvertBeta){
        alpha = (-1)*event.alpha
        beta = (-1)*(event.beta - 90)
    }

    document.getElementById("alpha").innerText = "alpha: " + Math.ceil(alpha*100)/100
    document.getElementById("beta").innerText = "beta: " + Math.ceil(beta*100)/100
    document.getElementById("gamma").innerText = "gamma: " + Math.ceil(gamma*100)/100

    phone.rotation.x = beta/180*3.14
    phone.rotation.y = gamma/180*3.14
    phone.rotation.z = alpha/180*3.14
    
    renderer.render(scene, camera)
}

window.addEventListener("deviceorientation", handleOrientation);