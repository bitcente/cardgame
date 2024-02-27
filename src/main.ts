import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { MapControls } from 'three/examples/jsm/controls/MapControls.js';
import * as dat from "dat.gui";
import Lights from './components/lights';
import { Passes, Postprocessing } from './components/postprocessing';
import Renderer from './components/renderer';
import { Player } from './classes/Player';
import Terrain from './classes/Terrain';
import { playerState } from './states/player';
import { input } from './states/input';
import { sizes } from './states/screen';
import { CharacterType } from './data/characters';
import { pointer } from './components/inputController';
import { global } from './states/global';

// GUI CONTROLLER
const gui = new dat.GUI()

// SCENE
const scene = new THREE.Scene()
scene.background = new THREE.Color('#669EFF')
global.scene = scene

// CAMERA
const camera = new THREE.OrthographicCamera(
    sizes.width * -.5, 
    sizes.width * .5, 
    sizes.height * .5, 
    sizes.height * -.5, 
    -30, 
    100
);
camera.zoom = 55
camera.position.x = 10
camera.position.y = 10
camera.position.z = 10
camera.updateProjectionMatrix()

// RENDERER
const renderer = new Renderer({scene: scene, camera: camera, sizes: sizes, enableShadowMap: true, toneMapping: THREE.ReinhardToneMapping, shadowMapType: THREE.PCFSoftShadowMap, antialias: true})

// EFFECT COMPOSER - POSTPROCESSING
const postprocessing = new Postprocessing(renderer.getRenderer(), scene, camera, sizes, [Passes.GammaCorrection, Passes.SMAAPass])

// GLFTLOADER
const GLFTLoader = new GLTFLoader()

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

// MAP CONTROLS
const controls = new MapControls(camera, renderer.getDomElement())

// PLAYER
const player = new Player({ name: 'Bitcente', character: CharacterType.Rogue })
playerState.PLAYER = player

// TERRAIN
const terrain = new Terrain({ scene: scene, gltfLoader: GLFTLoader })


// FRAME LOOP
const clock = new THREE.Clock()
let prevTime = 0
function animate() {
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - prevTime
    prevTime = elapsedTime

    // CONTROLS
    controls.update()

    // RAYCASTER
    // update the picking ray with the camera and pointer position
    input.RAYCASTER?.setFromCamera( pointer, camera );
    
    terrain.update()

    player.update()

    // RENDER WITH POST PROCESSING
    postprocessing.render()

    requestAnimationFrame(animate);
}
animate()


// WINDOW RESIZE
window.addEventListener('resize', () => {
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
        
    camera.top = sizes.height * .5
    camera.right = sizes.width * .5
    camera.bottom = sizes.height * -.5
    camera.left = sizes.width * -.5

    renderer.setSize({width: sizes.width, height: sizes.height})
    postprocessing.setSize({width: sizes.width, height: sizes.height})
})