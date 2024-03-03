import * as THREE from "three"

export const global: {
    scene: THREE.Scene | undefined
    camera: THREE.OrthographicCamera | undefined

    UPDATE: { (): void } [],
} = {
    scene: undefined,
    camera: undefined,
    
    UPDATE: []
}