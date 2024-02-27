import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { map_objects, map_tileset } from "../settings";
import { IcosahedronGeometry, MeshPhongMaterial } from "three";
import * as THREE from "three";
import { input } from "../states/input";
import { color } from "../states/color";
import { playerState } from "../states/player";
import { moveObjectTo, pathFind } from "../scripts/movement";
import { terrainState } from "../states/terrain";

interface TerrainProps {
    scene: THREE.Scene
    gltfLoader: GLTFLoader
}

export default class Terrain {
    _tiles
    _objects
    _scene
    _gltfLoader
    _color
    private _mesh: THREE.InstancedMesh | undefined
    private _objects_mesh: THREE.InstancedMesh | undefined

    constructor({ scene, gltfLoader }: TerrainProps) {
        this._tiles = map_tileset
        this._objects = map_objects
        this._scene = scene
        this._gltfLoader = gltfLoader
        this._color = color.WHITE

        this.init()
    }

    init() {
        // TILES
        this._gltfLoader.load(`./static/models/tileB.glb`, 
            (gltf) => {
                const brickMaterialA = new THREE.MeshStandardMaterial({ color: 'lightgrey' })
                
                const mesh = new THREE.InstancedMesh((gltf.scene.children[0] as THREE.Mesh).geometry, brickMaterialA, this._tiles.length)
                mesh.receiveShadow = true
                this._scene.add(mesh)

                let counter = 0
                const mult = 2
                const dummy = new THREE.Object3D()
                for (let i = 0; i < this._tiles.length; i++) {

                    dummy.position.x = this._tiles[i].x * mult
                    dummy.position.z = this._tiles[i].z * mult
                    dummy.position.y = - 1

                    this._tiles[i].instancedIndex = counter

                    dummy.updateMatrix()
                    mesh.setMatrixAt(counter, dummy.matrix)
                    mesh.setColorAt(counter, this._color)
                    
                    counter++
                    
                    /* for (let j = 0; j < this._tiles[i].length; j++) {
                        dummy.position.x = j * 2
                        dummy.position.z = i * 2
                        dummy.position.y = -1
                        
                        dummy.updateMatrix()
                        mesh.setMatrixAt(counter, dummy.matrix)
                        mesh.setColorAt(counter, this._color)
                        
                        counter++
                    } */
                }

                this._mesh = mesh
            }
        )
        
        // OBSTACLES
        const obstaclesGroup = new THREE.Group()
        this._scene.add(obstaclesGroup)
        this._gltfLoader.load(`./static/models/crate.glb`, 
            (gltf) => {
                const gltfCrate = gltf.scene
                
                this._objects.forEach((object: any) => {
                    const clone = gltfCrate.clone()
                    clone.position.x = object.x * 2
                    clone.position.y = object.y * .5
                    clone.position.z = object.z * 2
                    obstaclesGroup.add(clone)
                })
            }
        )
    }

    update() {
        const terrainMesh = this._mesh

        if (terrainMesh && input.MOUSE_MOVING) {
            const intersection = input.RAYCASTER?.intersectObject( terrainMesh );
        
            if ( intersection && intersection.length > 0 && playerState.IS_PLAYER_SELECTED ) {
        
                if (input.INTERSECTED && input.INTERSECTED.instanceId && input.INTERSECTED != intersection[ 0 ]) {
                    terrainMesh.setColorAt( input.INTERSECTED.instanceId, color.COPY.setHex( color.WHITE.getHex() ) );
                    if (terrainMesh.instanceColor)
                        terrainMesh.instanceColor.needsUpdate = true;
                }
                input.INTERSECTED = intersection[0]
                
                if (input.INTERSECTED && input.INTERSECTED.instanceId) {
                    
                    const tileData = map_tileset.find((tile: any) => tile.instancedIndex === input.INTERSECTED?.instanceId);   
                    if (tileData) {

                        terrainMesh.getColorAt( 0, color.COPY );
                
                        if ( color.COPY.equals( color.WHITE ) && playerState.PLAYER_CAN_MOVE && playerState.PLAYER ) {
                            const pathToTile = pathFind({x: playerState.PLAYER.mesh.position.x * .5, z: playerState.PLAYER.mesh.position.z * .5}, {x: tileData.x, z: tileData.z})
                            // PAINT SELECTED COLOR (BLUE) IF CAN WALK OR DENY COLOR (RED) IF CAN'T WALK OVER TILE
                            terrainMesh.setColorAt( input.INTERSECTED.instanceId, color.COPY.setHex( 
                                (pathToTile).length <= 3 && pathToTile.length != 0 ?
                                color.SELECT.getHex() : color.DENY.getHex()
                                ) );
                            if (terrainMesh.instanceColor)
                                terrainMesh.instanceColor.needsUpdate = true;
                        }
                        
                    }

                    if (input.LEFT_CLICK_DOWN && tileData) {
                        terrainState.TILES_CLICKED = {x: tileData.x, z: tileData.z}
                    }
                }
        
            } else {
                if ( input.INTERSECTED && input.INTERSECTED.instanceId ) {
                    terrainMesh.setColorAt( input.INTERSECTED.instanceId, color.COPY.setHex( color.WHITE.getHex() ) );
                    if (terrainMesh.instanceColor)
                        terrainMesh.instanceColor.needsUpdate = true;
                }

                input.INTERSECTED = null;
            }

        }
    }

    get mesh() {
        if (this._mesh)
            return this._mesh
        else
            return null
    }
}