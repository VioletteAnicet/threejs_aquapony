import * as THREE from 'three';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
//Import { MTLLoader } from 'three/addons/loaders/MTLLoader.js';
//import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { FBXLoader } from 'three/addons/loaders/FBXLoader'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// Initialiser la scène
const scene = new THREE.Scene();

//Initialiser le debug
const gui = new GUI();

// Initialiser la caméra
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 15);

var light = new THREE.AmbientLight(0xffffff, 2);
scene.add(light);

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

// Create the controls
const controls = new OrbitControls(camera, canvas);

// Handle the window resize event
window.addEventListener('resize', () => {
    // Update the camera
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    // Update the renderer
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
});

// Load the glb AQUARIUM
const loaderaquarium = new GLTFLoader()
let mixer // create a global variable to store the animation mixer

loaderaquarium.load('./room_aquarium_now_animated.glb',
    function (gltf) {

        const aquarium = gltf.scene
        const animations = gltf.animations

       /* const positionFolder = gui.addFolder('Position');
        positionFolder.add(aquarium.position, 'x', -500, 200, 53.7).name('XX');
        positionFolder.add(aquarium.position, 'y', -500, 200, -15.1).name('YY');
        positionFolder.add(aquarium.position, 'z', -500, 200, 0.1).name('ZZ');
        */
        aquarium.position.set(53.7, -15.1, -49.5);
        aquarium.scale.set(1.5, 1.5, 1.5);

        mixer = new THREE.AnimationMixer(aquarium)
        mixer.clipAction(animations[0]).play() // play the first animation

        scene.add(aquarium)


    const lightaqua = new THREE.SpotLight(0xff6600, 10, 0, 0.8, 0, 0);
    //var lightaqua = new THREE.DirectionalLight(0xff7f00, 2.5);
    lightaqua.target=aquarium;
    lightaqua.position.set(40, 245, 0);
    scene.add(lightaqua);

    /*const lightHelper = new THREE.SpotLightHelper(lightaqua, 10);
    scene.add(lightHelper);*/
}   )



// Load the glb CULTURE AROMATIQUE
const loaderaromats = new GLTFLoader()

loaderaromats.load('./aroma.glb',
    function (gltf) {

        const aromats = gltf.scene
        /*const positionFolder = gui.addFolder('Position');
        positionFolder.add(aromats.position, 'x', -500, 200, 0.1).name('XX');
        positionFolder.add(aromats.position, 'y', -500, 200, 0.1).name('YY');
        positionFolder.add(aromats.position, 'z', -500, 200, 0.1).name('ZZ');
        */
        aromats.position.set(45.1,250, -49.5);
        aromats.scale.set(120,120,120);

        scene.add(aromats)
        //var helper = new THREE.BoxHelper( aromats, 0xffff00 );
        //scene.add( helper );
})

// Load the glb CULTURE AROMATIQUE BIS
const loaderaromats2 = new GLTFLoader()
loaderaromats2.load('./aroma2.glb',
    function (gltf) {

        const aromats2 = gltf.scene
        aromats2.position.set(45.1,250,96.7);
        aromats2.scale.set(120,120,120);

        scene.add(aromats2)
        //var helper = new THREE.BoxHelper( aromats, 0xffff00 );
        //scene.add( helper );
})

//Soutien 
const tableGeometry = new THREE.BoxGeometry(420, 15, 350);
const tableMaterial = new THREE.MeshPhongMaterial({ color: 0x000000, shininess: 100, specular: 0x111111 });
const table = new THREE.Mesh(tableGeometry, tableMaterial);
table.position.set(39.9, 207, -42.5); // Position ajustée pour soutenir les bacs
scene.add(table);

// Pilliers
const pillarGeometry = new THREE.CylinderGeometry(5, 5, 480, 32);
const pillarMaterial = new THREE.MeshPhongMaterial({ color: 0x000000, shininess: 100, specular: 0x111111 });
const pillar1 = new THREE.Mesh(pillarGeometry, pillarMaterial);
const pillar2 = new THREE.Mesh(pillarGeometry, pillarMaterial);
const pillar3 = new THREE.Mesh(pillarGeometry, pillarMaterial);
const pillar4 = new THREE.Mesh(pillarGeometry, pillarMaterial);
pillar1.position.set(234,110,118); // Position ajustée au coin supérieur droit
pillar2.position.set(234,110,-208); // Coin supérieur gauche
pillar3.position.set(-158,110,118); // Coin inférieur droit
pillar4.position.set(-158,110,-208); // Coin inférieur gauche
scene.add(pillar1);
scene.add(pillar2);
scene.add(pillar3);
scene.add(pillar4);


//Toit
const roofGeometry = new THREE.BoxGeometry(420, 2, 350);
const roofMaterial = new THREE.MeshPhongMaterial({ color: 0x000000, shininess: 100, specular: 0x111111 });
const roof = new THREE.Mesh(roofGeometry, roofMaterial);  
roof.position.set(39.9, 350, -42.5); // Position ajustée au-dessus des bacs
scene.add(roof);

//bandes de LEDs violettes
const ledStripGeometry = new THREE.BoxGeometry(350, 1, 2);
const ledStripMaterial = new THREE.MeshStandardMaterial({ color: 0x38125D, emissive: 0x38125D, emissiveIntensity: 40 });
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





const textureLoader = new THREE.TextureLoader();

// Adding a background
let textureEquirec = textureLoader.load('lapa.jpg');
textureEquirec.mapping = THREE.EquirectangularReflectionMapping;
textureEquirec.colorSpace = THREE.SRGBColorSpace;

scene.background = textureEquirec;

// Initialize the clock
const clock = new THREE.Clock()
let lastElapsedTime = 0 // create a global variable to store the elapsed time

// Animate Loop
function animate() {
    // Render the Scene
    renderer.render(scene, camera)

    // Update the controls
    controls.update()

    // get the elapsed time and calculate the delta
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - lastElapsedTime
    lastElapsedTime = elapsedTime

    // Mixer update
    if (mixer != undefined) {
        mixer.update(deltaTime) // update the mixer
    }

    requestAnimationFrame(animate)
}
animate()
