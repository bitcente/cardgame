import * as THREE from 'three'

export const color: {
    WHITE: THREE.Color,
    SELECT: THREE.Color,
    DENY: THREE.Color,

    COPY: THREE.Color,
} = {
    WHITE: new THREE.Color('white'),
    SELECT: new THREE.Color('lightblue'),
    DENY: new THREE.Color('red'),

    COPY: new THREE.Color(),
}