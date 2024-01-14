import * as THREE from 'three';
//import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
//import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { TexturePass } from 'three/addons/postprocessing/TexturePass.js';
import { ClearPass } from 'three/addons/postprocessing/ClearPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
// Initialisation la scène
const scene = new THREE.Scene();

//Initialisation du debug
//const gui = new GUI();

// Setup caméra
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);
camera.position.set(0, 0, 15);

var ambientlight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientlight);

// Import the canvas element
const canvas = document.getElementById('canvas');

// Create a WebGLRenderer and set its width and height
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    // Antialiasing is used to smooth the edges of what is rendered
    antialias: true,
    // Activate the support of transparency
    alpha: true
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

let main_group = new THREE.Group();
// Create the composer
const composer = new EffectComposer(renderer);
const clearPass = new ClearPass("white", 1.0);
const renderPass = new RenderPass(scene, camera);


// Create the controls
// const controls = new OrbitControls(camera, canvas);

// Handle the window resize event
window.addEventListener('resize', () => {
    // Update the camera
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    // Update the renderer
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
});


//Adding backgrounds
composer.addPass( clearPass );
let texturePass1 = new TexturePass();
composer.addPass( texturePass1 );
let texturePass2 = new TexturePass();
composer.addPass( texturePass2 );

const textureLoader = new THREE.TextureLoader();
textureLoader.load( './backgroundjour.jpg', function ( map ) {
    map.colorSpace = THREE.SRGBColorSpace;
    texturePass1.map = map;
} );

textureLoader.load( './backgroundnuit.jpg', function ( map ) {
    map.colorSpace = THREE.SRGBColorSpace;
    texturePass2.map = map;
} );

renderPass.clear = false;
composer.addPass(renderPass);

const outputPass = new OutputPass();
composer.addPass( outputPass );

//bandes de LEDs violettes
const ledStripGeometry = new THREE.BoxGeometry(350, 1, 2);
const ledStripMaterial = new THREE.MeshStandardMaterial({ color: 0x38125D});
const ledStrip1 = new THREE.Mesh(ledStripGeometry, ledStripMaterial);
const ledStrip2 = new THREE.Mesh(ledStripGeometry, ledStripMaterial);
const ledStrip3 = new THREE.Mesh(ledStripGeometry, ledStripMaterial);
const ledStrip4 = new THREE.Mesh(ledStripGeometry, ledStripMaterial);
const ledStrip5 = new THREE.Mesh(ledStripGeometry, ledStripMaterial);
const ledStrip6 = new THREE.Mesh(ledStripGeometry, ledStripMaterial);
const ledStrip7 = new THREE.Mesh(ledStripGeometry, ledStripMaterial);
const ledStrip8 = new THREE.Mesh(ledStripGeometry, ledStripMaterial);
const ledStrip9 = new THREE.Mesh(ledStripGeometry, ledStripMaterial);
ledStrip1.position.set(45.1, 347, 70.6);
ledStrip2.position.set(45.1, 347, 15.4);
ledStrip3.position.set(45.1, 347, -40.4);
ledStrip4.position.set(45.1, 347, -95.4);
ledStrip5.position.set(45.1, 347, -150.4);
ledStrip6.position.set(45.1, 347, 47.4);
ledStrip7.position.set(45.1, 347, -12.4);
ledStrip8.position.set(45.1, 347, -67.4); 
ledStrip9.position.set(45.1, 347, -122.4);
scene.add(ledStrip1);
scene.add(ledStrip2);
scene.add(ledStrip3);
scene.add(ledStrip4);
scene.add(ledStrip5);
scene.add(ledStrip6);
scene.add(ledStrip7);
scene.add(ledStrip8);
scene.add(ledStrip9);
const ledStrips = [ledStrip1, ledStrip2, ledStrip3, ledStrip4, ledStrip5, ledStrip6, ledStrip7, ledStrip8, ledStrip9];




const texte1 = document.getElementById("texte1");
const texte2 = document.getElementById("texte2");
const texte3 = document.getElementById("texte3");   

//créer une sphère 
function createClickableSphere(position, onClick) {
    console.log("createClickableSphere", position, onClick)
    const SphereGeometry = new THREE.SphereGeometry( 50, 60, 40 );
    const SphereMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x000000,
    metalness: 0.8,
    roughness: 0.2,
    clearcoat: 0.5,
    clearcoatRoughness: 0.9,
    reflectivity: 0.8,  // Effet Fresnel
    });
    const sphere = new THREE.Mesh(SphereGeometry, SphereMaterial);
    sphere.position.copy(position); // Position ajustée pour soutenir les bacs
    sphere.onClick = onClick;
    scene.add(sphere);
    return sphere;
}

const sphere1 = createClickableSphere(new THREE.Vector3(-850, 350, 100.5), function () {
    texte1.style.visibility = "visible";
    texte2.style.visibility = "hidden";
    texte3.style.visibility = "hidden";
    texturePass1.opacity = 1.0;
    texturePass2.opacity = 0.0;
    light.intensity = 0.0;
    for (let i = 0; i < ledStrips.length; i++) {
        ledStrips[i].material.color.setHex(0xFF6600); // Couleur pour l'après-midi
        ledStrips[i].material.emissiveIntensity = 5; // Émission moyenne l'après-midi
    }

    console.log("sphere1");
});

const sphere2 = createClickableSphere(new THREE.Vector3(-850, 225, 100.5), function () {
    texte2.style.visibility = "visible";
    texte1.style.visibility = "hidden";
    texte3.style.visibility = "hidden";
    texturePass1.opacity = 1;
    texturePass2.opacity = 0.7;
    light.intensity = 2.0;
    for (let i = 0; i < ledStrips.length; i++) {
        ledStrips[i].material.color.setHex(0xFF6600); // Couleur pour l'après-midi
        ledStrips[i].material.emissiveIntensity = 5; // Émission moyenne l'après-midi
    }

    console.log("sphere2");
});

const sphere3 = createClickableSphere(new THREE.Vector3(-850, 100, 100.5), function () {
    texte3.style.visibility = "visible";
    texte1.style.visibility = "hidden";
    texte2.style.visibility = "hidden";
    texturePass1.opacity = 0.0;
    texturePass2.opacity = 1.0;
    light.intensity = 10.0;
    for (let i = 0; i < ledStrips.length; i++) {
        ledStrips[i].material.color.setHex(0x800080); // Couleur pour la nuit
        ledStrips[i].material.emissiveIntensity = 15; // Émission forte la nuit
    }

    console.log("sphere3"); 
});

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
// Gestionnaire d'événements de clic
document.addEventListener('click', function (event) {

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    console.log("clicked", sphere1, sphere2, sphere3);
    if (sphere1 && sphere2 && sphere3){
    console.log("sphere1 & sphere2 & sphere3", sphere1, sphere2, sphere3);
    const intersects = raycaster.intersectObjects([sphere1, sphere2, sphere3], true);

    if (intersects.length > 0) {
        console.log("intersects", intersects);
        intersects[0].object.onClick();
    }
    }
});



// Load the glb AQUARIUM
const loaderaquarium = new GLTFLoader()
let mixer // create a global variable to store the animation mixer

loaderaquarium.load('./room_aquarium_now_animated.glb',
    function (gltf) {

        const aquarium = gltf.scene
        const animations = gltf.animations
        aquarium.position.set(53.7, -15.1, -49.5);
        aquarium.scale.set(1.5, 1.5, 1.5);

        mixer = new THREE.AnimationMixer(aquarium);
        mixer.clipAction(animations[0]).play(); // play the first animation

        scene.add(aquarium);



    const lightaqua = new THREE.SpotLight(0xff6600, 10, 0, 0.8, 0, 0);
    lightaqua.target=aquarium;
    lightaqua.position.set(40, 245, 0);
    scene.add(lightaqua);
}   )



// Load the glb CULTURE AROMATIQUE
const loaderaromats = new GLTFLoader()

loaderaromats.load('./aroma.glb',
    function (gltf) {

        const aromats = gltf.scene
        aromats.position.set(45.1,250, -49.5);
        aromats.scale.set(120,120,120);

        scene.add(aromats)
})

// Load the glb CULTURE AROMATIQUE BIS
const loaderaromats2 = new GLTFLoader()
loaderaromats2.load('./aroma2.glb',
    function (gltf) {

        const aromats2 = gltf.scene
        aromats2.position.set(45.1,250,96.7);
        aromats2.scale.set(120,120,120);

        scene.add(aromats2)
})

//Soutien 
const tableGeometry = new THREE.BoxGeometry(420, 15, 350);
const tableMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x000000,
    metalness: 0.8,
    roughness: 0.2,
    clearcoat: 0.5,
    clearcoatRoughness: 0.9,
    reflectivity: 0.8,  // Effet Fresnel
});
const table = new THREE.Mesh(tableGeometry, tableMaterial);
table.position.set(39.9, 207, -42.5); 
scene.add(table);


// Pilliers
const pillarGeometry = new THREE.CylinderGeometry(5, 5, 480, 32);
const pillarMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x000000,
    metalness: 0.8,
    roughness: 0.2,
    clearcoat: 0.5,
    clearcoatRoughness: 0.9,
    reflectivity: 0.8,  // Effet Fresnel
});
const pillar1 = new THREE.Mesh(pillarGeometry, pillarMaterial);
const pillar2 = new THREE.Mesh(pillarGeometry, pillarMaterial);
const pillar3 = new THREE.Mesh(pillarGeometry, pillarMaterial);
const pillar4 = new THREE.Mesh(pillarGeometry, pillarMaterial);
pillar1.position.set(234,110,118); 
pillar2.position.set(234,110,-208); 
pillar3.position.set(-158,110,118); 
pillar4.position.set(-158,110,-208); 
scene.add(pillar1);
scene.add(pillar2);
scene.add(pillar3);
scene.add(pillar4);

//Tuyaux eau
const waterCylinderGeometry = new THREE.CylinderGeometry(4, 4, 150, 32);
const waterCylinderMaterial = new THREE.MeshStandardMaterial({
    color: 0x84DBF0, // Couleur bleue
    transparent: true,
    opacity: 0.7, 
    roughness: 0.5, 
    metalness: 0.4,
});

const waterCylinder = new THREE.Mesh(waterCylinderGeometry, waterCylinderMaterial);
const waterCylinder2 = new THREE.Mesh(waterCylinderGeometry, waterCylinderMaterial);
waterCylinder.position.set(69.9, 140, -42.5);
waterCylinder2.position.set(-87.9, 140, 35.7);
scene.add(waterCylinder);
scene.add(waterCylinder2);

//Toit
const roofGeometry = new THREE.BoxGeometry(420, 2, 350);
const roofMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x000000,
    metalness: 0.8,
    roughness: 0.2,
    clearcoat: 0.5,
    clearcoatRoughness: 0.9,
    reflectivity: 0.8,  // Effet Fresnel
});
const roof = new THREE.Mesh(roofGeometry, roofMaterial);  
roof.position.set(39.9, 350, -42.5); 
scene.add(roof);



// Initialize the clock
const clock = new THREE.Clock()
let lastElapsedTime = 0 // create a global variable to store the elapsed time


camera.position.set(347.5500795670194, 102.41657548624097, 338.34632528163274);
camera.rotation.set( 0.019531370296128874, 0.843721483109783, -0.01459313448011812);

camera.target = new THREE.Object3D();


function animate() {
    requestAnimationFrame(animate)

    // Render the composer
    composer.render()
    console.log(camera)
    console.log("Camera position", camera.position.x, camera.position.y, camera.position.z);
    console.log("Camera rotation", camera.rotation.x, camera.rotation.y, camera.rotation.z);
 
    // get the elapsed time and calculate the delta
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - lastElapsedTime
    lastElapsedTime = elapsedTime

    // Mixer update
    if (mixer != undefined) {
        mixer.update(deltaTime)
    }

}
animate()
