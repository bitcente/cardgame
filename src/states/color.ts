import * as THREE from 'three'

export const color: {
    WHITE: THREE.Color,
    SELECT: THREE.Color,
    WALKABLE: THREE.Color,
    DENY: THREE.Color,

    COPY: THREE.Color,
} = {
    WHITE: new THREE.Color(0xffffff),
    SELECT: new THREE.Color(0x41FF53),
    WALKABLE: new THREE.Color(0x41D7F9),
    DENY: new THREE.Color(0xFF3030),

    COPY: new THREE.Color(),
}