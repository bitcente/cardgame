import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { map_objects, map_tileset } from "../settings";
import { IcosahedronGeometry, MeshPhongMaterial } from "three";
import * as THREE from "three";
import { cursorDefault, cursorPointer, input } from "../states/input";
import { color } from "../states/color";
import { playerState } from "../states/player";
import { moveObjectTo, pathFind } from "../scripts/movement";
import { terrainState } from "../states/terrain";
import { modelLoader } from "../loaders/gltfLoader";
import { global } from "../states/global";

export default class Terrain {
    _tiles
    _scene
    _color
    private _mesh: THREE.InstancedMesh | undefined

    constructor() {
        this._tiles = map_tileset
        this._scene = global.scene!
        this._color = color.WHITE

        this.init()
    }

    init() {
        // TILES
        modelLoader.load(`./static/models/tileB.glb`, 
            (gltf) => {
                const brickMaterialA = new THREE.MeshStandardMaterial({ color: 'lightgrey' })
                
                const mesh = new THREE.InstancedMesh((gltf.scene.children[0] as THREE.Mesh).geometry, brickMaterialA, this._tiles.length)
                mesh.receiveShadow = true
                this._scene.add(mesh)

                let counter = 0
                const mult = 1
                const dummy = new THREE.Object3D()
                for (let i = 0; i < this._tiles.length; i++) {

                    dummy.position.x = this._tiles[i].x * mult
                    dummy.position.z = this._tiles[i].z * mult
                    dummy.position.y = 0

                    dummy.scale.x = dummy.scale.z = dummy.scale.y = .5

                    this._tiles[i].instancedIndex = counter

                    dummy.updateMatrix()
                    mesh.setMatrixAt(counter, dummy.matrix)
                    mesh.setColorAt(counter, this._color)
                    
                    counter++
                }

                this._mesh = mesh
                
                // Store ON_CLICK function
                input.ON_CLICK.push(this.tileClicked.bind(this))
            }
        )

    }

    update() {
        const terrainMesh = this._mesh

        if (terrainMesh && input.MOUSE_MOVING) {
            const intersection = input.RAYCASTER?.intersectObject( terrainMesh );
        
            if ( intersection && intersection.length > 0 && playerState.IS_PLAYER_SELECTED && playerState.PLAYER_CAN_MOVE) {
        
                if (input.TILE_INTERSECTED && input.TILE_INTERSECTED.instanceId && input.TILE_INTERSECTED != intersection[ 0 ]) {
                    terrainMesh.setColorAt( input.TILE_INTERSECTED.instanceId, color.COPY.setHex( color.WHITE.getHex() ) );
                    if (terrainMesh.instanceColor)
                        terrainMesh.instanceColor.needsUpdate = true;
                }
                input.TILE_INTERSECTED = intersection[0]
                
                if (input.TILE_INTERSECTED && input.TILE_INTERSECTED.instanceId) {
                    
                    const tileData = map_tileset.find((tile: any) => tile.instancedIndex === input.TILE_INTERSECTED?.instanceId);   
                    if (tileData) {

                        terrainMesh.getColorAt( 0, color.COPY );
                
                        if ( color.COPY.equals( color.WHITE ) && playerState.PLAYER.character.mesh) {
                            const characterPosition = playerState.PLAYER.character.mesh.position
                            const pathToTile = pathFind({x: characterPosition.x, z: characterPosition.z}, {x: tileData.x, z: tileData.z})
                            const canWalk = (pathToTile).length <= 3 && pathToTile.length != 0
                            // PAINT SELECTED COLOR (BLUE) IF CAN WALK OR DENY COLOR (RED) IF CAN'T WALK OVER TILE
                            terrainMesh.setColorAt( input.TILE_INTERSECTED.instanceId, color.COPY.setHex( 
                                canWalk ?
                                color.SELECT.getHex() : color.DENY.getHex()
                                ) );
                            if (terrainMesh.instanceColor)
                                terrainMesh.instanceColor.needsUpdate = true;

                            if (canWalk) cursorPointer()
                            else cursorDefault()

                            terrainState.TILE_HOVERED = {x: tileData.x, z: tileData.z, canWalk }
                        }
                        
                    }

                    
                }
        
            } else {
                if ( input.TILE_INTERSECTED && input.TILE_INTERSECTED.instanceId ) {
                    terrainMesh.setColorAt( input.TILE_INTERSECTED.instanceId, color.COPY.setHex( color.WHITE.getHex() ) );
                    if (terrainMesh.instanceColor)
                        terrainMesh.instanceColor.needsUpdate = true;
                }

                input.TILE_INTERSECTED = null;
            }

        }
    }


    tileClicked() {
        if (input.INTERSECTED_OBJECT === this._mesh) {
            const tile = terrainState.TILE_HOVERED
            if (tile.canWalk && playerState.PLAYER_CAN_MOVE && playerState.IS_PLAYER_SELECTED) {
                playerState.PLAYER_CAN_MOVE = false
                cursorDefault()
                moveObjectTo(playerState.PLAYER.character.mesh, tile.x || 0, tile.z || 0, () => {
                    playerState.IS_PLAYER_SELECTED = false
                    playerState.PLAYER_CAN_MOVE = true
                })
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