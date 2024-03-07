import * as THREE from 'three'

export const input: {
    LEFT_CLICK_DOWN: boolean,
    DOUBLE_CLICK: boolean,
    RIGHT_CLICK_DOWN: boolean,
    ESC: boolean,
    ESPACE: boolean,
    MOUSE_MOVING: boolean,

    ON_CLICK: { (): void } [],

    HOVER_HAND: boolean
    TILE_INTERSECTED: THREE.Intersection | null,
    INTERSECTED_OBJECT: THREE.Object3D<THREE.Object3DEventMap> | null,
    RAYCASTER: THREE.Raycaster | null,
} = {
    LEFT_CLICK_DOWN: false,
    DOUBLE_CLICK: false,
    RIGHT_CLICK_DOWN: false,
    ESC: false,
    ESPACE: false,
    MOUSE_MOVING: false,

    ON_CLICK: [],

    HOVER_HAND: false,
    TILE_INTERSECTED: null,
    INTERSECTED_OBJECT: null,
    RAYCASTER: new THREE.Raycaster(),
}


export const cursorPointer = () => {
    document.body.style.cursor = "pointer"
}
export const cursorDefault = () => {
    document.body.style.cursor = "default"
}