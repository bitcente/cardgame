import * as THREE from 'three';
import { input } from '../states/input';

// RAYCASTER
export const pointer = new THREE.Vector2();

let timer: NodeJS.Timeout
function onPointerMove( event: PointerEvent ) {
	pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

    input.MOUSE_MOVING = true
    clearTimeout(timer)
    timer = setTimeout(() => input.MOUSE_MOVING = false, 200)
}
function onClick() {
	input.RIGHT_CLICK_DOWN = true
}
function onClickUp() {
	input.RIGHT_CLICK_DOWN = false
}

window.addEventListener( 'pointermove', onPointerMove );
window.addEventListener( 'mousedown', onClick );
window.addEventListener( 'mouseup', onClickUp );