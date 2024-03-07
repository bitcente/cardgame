import * as THREE from 'three';
import { cursorDefault, input } from '../states/input';
import { terrainState } from '../states/terrain';
import { global } from '../states/global';

// RAYCASTER
export const pointer = new THREE.Vector2();
const root = document.documentElement

//const hoveredObjects: any[string] = [];

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
                input.ON_CLICK[i]()
            }
        }
    }
}

window.addEventListener( 'pointermove', onPointerMove );
window.addEventListener( 'mousedown', onClickDown );
window.addEventListener( 'mouseup', onClickUp );