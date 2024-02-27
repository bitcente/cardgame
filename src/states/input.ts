import * as THREE from 'three'

export const input: {
    LEFT_CLICK_DOWN: boolean,
    DOUBLE_CLICK: boolean,
    RIGHT_CLICK_DOWN: boolean,
    ESC: boolean,
    ESPACE: boolean,

    INTERSECTED: THREE.Intersection | null,
    RAYCASTER: THREE.Raycaster | null,
} = {
    LEFT_CLICK_DOWN: false,
    DOUBLE_CLICK: false,
    RIGHT_CLICK_DOWN: false,
    ESC: false,
    ESPACE: false,

    INTERSECTED: null,
    RAYCASTER: null,
}