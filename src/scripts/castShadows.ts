import { Group, Object3DEventMap } from "three"

export const castShadows = (scene: Group<Object3DEventMap>) => {
    scene.traverse((child) => {
        if ((<THREE.Mesh> child).isMesh) {
            child.castShadow = true
            child.receiveShadow = true
        }
    })
}