import * as THREE from 'three';
import { cursorDefault, input } from '../states/input';
import { terrainState } from '../states/terrain';
import { global } from '../states/global';

// RAYCASTER
export const pointer = new THREE.Vector2();

//const hoveredObjects: any[string] = [];

let timer: NodeJS.Timeout
function onPointerMove( event: PointerEvent ) {
	pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

    input.MOUSE_MOVING = true
    clearTimeout(timer)
    timer = setTimeout(() => input.MOUSE_MOVING = false, 100)

    input.RAYCASTER?.setFromCamera( pointer, global.camera! );
		
    const intersects = input.RAYCASTER?.intersectObjects(global.scene!.children, true);

	if (!intersects) return
    // collect array of uuids of currently hovered objects
    // hoveredObjectUuids = intersects.map(el => el.object.uuid);


	if (intersects[0]) {
		input.INTERSECTED_OBJECT = intersects[0].object
	} else {
		input.INTERSECTED_OBJECT = null
		cursorDefault()
	}
	
    /* for (let i = 0; i < intersects.length; i++) {
        const hoveredObj = intersects[i].object;
        if (hoveredObjects[hoveredObj.uuid]) {
            continue; // this object was hovered and still hovered
        } else {
			// First time hovering
			console.log(hoveredObj);
		}

        // collect hovered object
        hoveredObjects[hoveredObj.uuid] = hoveredObj;
		return
    }

    for (let uuid of Object.keys(hoveredObjects)) {
        let idx = hoveredObjectUuids.indexOf(uuid);
        if (idx === -1) {
            // object with given uuid was unhovered
            let unhoveredObj = hoveredObjects[uuid];
            delete hoveredObjects[uuid];
        }
    } */
}
function onClick() {
	input.RIGHT_CLICK_DOWN = true
	
	// Execute all functions stored inside ON_CLICK global array
	if (input.ON_CLICK.length) {
		for (let i = 0; i < input.ON_CLICK.length; i++) {
			input.ON_CLICK[i]()
		}
	}
}
function onClickUp() {
	input.RIGHT_CLICK_DOWN = false
}

window.addEventListener( 'pointermove', onPointerMove );
window.addEventListener( 'mousedown', onClick );
window.addEventListener( 'mouseup', onClickUp );