import * as THREE from "three"

export const global: {
    scene: THREE.Scene | undefined
    sceneCards: THREE.Scene | undefined
    camera: THREE.OrthographicCamera | undefined
    cameraCards: any

    UPDATE: { (): void } [],

    turn: number
} = {
    scene: undefined,
    sceneCards: undefined,
    camera: undefined,
    cameraCards: undefined,
    
    UPDATE: [],

    turn: 0,
}