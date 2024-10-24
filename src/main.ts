import * as THREE from 'three';
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
import { LootObject } from './classes/LootObject';
import { map_objects } from './settings';
import * as Stats from 'stats.js';
import Camera from './components/camera';
import { terrainState } from './states/terrain';
import { Character } from './classes/Character';

// GUI CONTROLLER
//const gui = new dat.GUI()

// PERFORMANCE MONITOR
var stats = new Stats();
stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild( stats.dom );

// SCENE
const scene = new THREE.Scene()
scene.background = new THREE.Color('#669EFF')
global.scene = scene

/* const sceneCards = new THREE.Scene();
global.sceneCards = sceneCards

const m = new THREE.MeshBasicMaterial({ color: new THREE.Color('red') })
const g = new THREE.PlaneGeometry(100, 150)
const mesh = new THREE.Mesh(g, m)
global.sceneCards.add(mesh) */

// CAMERA
const camera = new Camera()
/* const cameraCards = new THREE.OrthographicCamera( - sizes.width / 2, sizes.width / 2, sizes.height / 2, - sizes.height / 2, 1, 10 );
cameraCards.position.z = 1;
global.cameraCards = cameraCards */

// RENDERER
const renderer = new Renderer({sizes: sizes, enableShadowMap: true, toneMapping: THREE.ReinhardToneMapping, shadowMapType: THREE.PCFSoftShadowMap, antialias: true})

// EFFECT COMPOSER - POSTPROCESSING
const postprocessing = new Postprocessing(renderer.getRenderer(), sizes, [Passes.GammaCorrection, Passes.SMAAPass, Passes.OutlinePass])

// LIGHTS
const lights = new Lights()

// MAP CONTROLS
const controls = new MapControls(camera, renderer.getDomElement())

// PLAYER
const player = new Player({ name: 'Player1', character: CharacterType.Rogue, mine: true })
/* const player2 = new Player({ name: 'Bitcente', character: CharacterType.Mage, position: {x: 1, z: 0} })
const player3 = new Player({ name: 'Bitcente', character: CharacterType.Knight, position: {x: 2, z: 0} })
const player4 = new Player({ name: 'Bitcente', character: CharacterType.Barbarian, position: {x: 3, z: 0} }) */
playerState.PLAYER = player

const character1 = new Character({ id: 'Player2', nameTag: 'Player2', character: CharacterType.Knight, position: {x: 2, z: 0} })

// TERRAIN
const terrain = new Terrain()
terrainState.terrain = terrain

map_objects.forEach((object: any, index: number) => {
    if (object.x != null && object.z !== null) {
        new LootObject({ 
            id: object.id, 
            nameTag: object.type, 
            baseStats: {HEALTH: 3, MAX_HEALTH: 3},
            type: object.type,
            position: {x: object.x, z: object.z},
            objectData: object
        })
    }
})

// FRAME LOOP
const clock = new THREE.Clock()
let prevTime = 0
function animate() {

    stats.begin();

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

    if (global.UPDATE.length) {
        for (let i = 0; i < global.UPDATE.length; i++) {
            global.UPDATE[i]()
        }
    }

    // RENDER WITH POST PROCESSING
    postprocessing.render()

    stats.end();

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

    // Fix camera aspect
    camera.updateProjectionMatrix()

    renderer.setSize({width: sizes.width, height: sizes.height})
    postprocessing.setSize({width: sizes.width, height: sizes.height})
})