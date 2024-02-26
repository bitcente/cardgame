import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as dat from "dat.gui";
import Lights from './lights';
import { Passes, Postprocessing } from './postprocessing';
import Renderer from './renderer';


// GUI CONTROLLER
const gui = new dat.GUI();

// SCENE
const scene = new THREE.Scene();
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

// CAMERA
const camera = new THREE.PerspectiveCamera(35, sizes.width / sizes.height, 0.1, 100);
camera.position.y = 1.2;
camera.position.z = 2;

// RENDERER
const renderer = new Renderer({sizes: sizes, enableShadowMap: true, toneMapping: THREE.ReinhardToneMapping, shadowMapType: THREE.PCFSoftShadowMap, antialias: true})

// ENVIRONMENT MAP
const pmremGenerator = new THREE.PMREMGenerator( renderer.getRenderer() );
const hdriLoader = new RGBELoader();
hdriLoader.load( './static/studio.hdr', function ( texture ) {
  const envMap = pmremGenerator.fromEquirectangular( texture ).texture;
  texture.dispose(); 
  scene.environment = envMap;
  scene.background = envMap;
});

// EFFECT COMPOSER - POSTPROCESSING
const postprocessing = new Postprocessing(renderer.getRenderer(), scene, camera, sizes, [Passes.UnrealBloomPass])

// GLFTLOADER
const GLFTLoader = new GLTFLoader();

// LIGHTS
const lights = new Lights(scene, {
    ambientLight: true,
    ambientLightConfiguration: {
        intensity: .8
    },
    directionalLight: true,
    directionalLightConfiguration: {
        castShadow: true,
        shadowCamera: {
            top: 1,
            right: 1,
            bottom: -1,
            left: -1,
            far: 4,
        },
        shadowMapSize: 2048,
        position: new THREE.Vector3(1, 3, 1),
        target: new THREE.Vector3(0, 1, 0),
        intensity: 4,
    }
})

// ORBIT CONTROLS
//const controls = new OrbitControls(camera, renderer.getDomElement());

// FRAME LOOP
const clock = new THREE.Clock()
let prevTime = 0
function animate() {
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - prevTime
    prevTime = elapsedTime

    // CONTROLS
    //controls.update()

    // RENDER WITHOUT POSTPROCESSING
    //renderer.render(scene, camera);
    
    // RENDER WITH POST PROCESSING
    postprocessing.render()

    requestAnimationFrame(animate);
}
animate();

// WINDOW RESIZE
window.addEventListener('resize', () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize({width: sizes.width, height: sizes.height});
});