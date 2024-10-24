import * as THREE from 'three';
import { cursorDefault, cursorPointer, input } from '../states/input';
import { terrainState } from '../states/terrain';
import { global } from '../states/global';
import { map_tileset } from '../settings';
import { playerState } from '../states/player';
import { outlinePassEnemy, outlinePassSelf } from './postprocessing';
import { findParentOfMeshByName } from '../utils/utils';
import { entitySuffix } from '../classes/Entity';

// RAYCASTER
export const pointer = new THREE.Vector2();
const root = document.documentElement

let timer: NodeJS.Timeout
function onPointerMove( event: PointerEvent ) {
	pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

    if (root) {
        root.style.setProperty('--mouse-x', `${event.clientX}px`);
        root.style.setProperty('--mouse-y', `${event.clientY}px`);
    }

    input.MOUSE_MOVING = true
    clearTimeout(timer)
    timer = setTimeout(() => input.MOUSE_MOVING = false, 100)

    input.RAYCASTER?.setFromCamera( pointer, global.camera! );
		
    const intersects = input.RAYCASTER?.intersectObjects(global.scene!.children, true);

	if (!intersects) return

	if (intersects[0]) {
		input.INTERSECTED_OBJECT = intersects[0].object

        const parentEntity = findParentOfMeshByName(input.INTERSECTED_OBJECT, entitySuffix, true)
        const playerMesh = playerState.PLAYER.character.mesh

        // PLAYER OUTLINE HOVER
        if (parentEntity && outlinePassSelf) {
            if (parentEntity.name === playerMesh.name) {
                outlinePassSelf.selectedObjects = [ parentEntity ]
            }
            cursorPointer()
        } else {
            if (playerState.IS_PLAYER_SELECTED) {
                outlinePassSelf.selectedObjects = [ playerMesh ]
            } else {
                outlinePassSelf.selectedObjects = []
                cursorDefault()
            }
        }

        // ENEMY OUTLINE HOVER
        if (parentEntity && outlinePassEnemy) {
            if (parentEntity.name !== playerMesh.name) {
                outlinePassEnemy.selectedObjects = [ parentEntity ]
            }
            cursorPointer()
        } else {
            outlinePassEnemy.selectedObjects = []
        }

        // Set tile of terrain hovered
        if (terrainState.terrain && terrainState.terrain.mesh && playerState.IS_PLAYER_SELECTED) {
            const intersection = input.RAYCASTER?.intersectObject( terrainState.terrain.mesh );
            if (intersection && intersection.length > 0 && intersection[0].instanceId) {
                const tileData = map_tileset.find((tile: any) => tile.instancedIndex === intersection[0].instanceId); 
                if (tileData) {
                    terrainState.TILE_HOVERED = {x: tileData.x, z: tileData.z, canWalk: terrainState.terrain.canPlayerWalkToTile(tileData) }
                }
            }
        }
	} else {
		input.INTERSECTED_OBJECT = null
		cursorDefault()
        if (playerState.IS_PLAYER_SELECTED) {
            outlinePassSelf.selectedObjects = [playerState.PLAYER.character.mesh]
        } else {
            outlinePassSelf.selectedObjects = []
        }
        outlinePassEnemy.selectedObjects = []
	}
}

let prevX = 0
let prevY = 0

const onClickDown = (e: any) => {
	input.RIGHT_CLICK_DOWN = true

    prevX = e.x
    prevY = e.y
}
const onClickUp = (e: any) => {
	input.RIGHT_CLICK_DOWN = false
    
    // Accept click if mouse didn't move more than 10px in each axis before leaving up the click button
    if (Math.abs(prevX - e.x) < 10 && Math.abs(prevY - e.y) < 10) {
        
        // Execute all functions stored inside ON_CLICK global array
        if (input.ON_CLICK.length) {
            for (let i = 0; i < input.ON_CLICK.length; i++) {
                input.ON_CLICK[i].function()
            }
        }
    }
}

window.addEventListener( 'pointermove', onPointerMove );
window.addEventListener( 'mousedown', onClickDown );
window.addEventListener( 'mouseup', onClickUp );