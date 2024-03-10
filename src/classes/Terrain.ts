import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Tileset, map_objects, map_tileset } from "../settings";
import { IcosahedronGeometry, MeshPhongMaterial } from "three";
import * as THREE from "three";
import { cursorDefault, cursorPointer, input } from "../states/input";
import { color } from "../states/color";
import { playerState } from "../states/player";
import { moveObjectTo, pathFind } from "../scripts/movement";
import { terrainState } from "../states/terrain";
import { modelLoader } from "../loaders/gltfLoader";
import { global } from "../states/global";
import attackController from "../controllers/attackController";

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
                input.ON_CLICK.push({id: "terrain", function: this.tileClicked.bind(this)})
            }
        )

    }

    updateInstanceMesh() {
        if (this._mesh && this._mesh.instanceColor) this._mesh.instanceColor.needsUpdate = true;
    }

    update() {
        const terrainMesh = this._mesh

        if (terrainMesh && input.MOUSE_MOVING) {
            const intersection = input.RAYCASTER?.intersectObject( terrainMesh );
        
            if ( intersection && intersection.length > 0 && playerState.IS_PLAYER_SELECTED && playerState.PLAYER_CAN_MOVE && !input.HOVER_HAND) {
        
                if (input.TILE_INTERSECTED && input.TILE_INTERSECTED.instanceId && input.TILE_INTERSECTED != intersection[ 0 ]) {
                    const tileData = map_tileset.find((tile: any) => tile.instancedIndex === input.TILE_INTERSECTED?.instanceId);   
                    if (tileData) {
                        const canWalk = this.canPlayerWalkToTile(tileData)
                        
                        // Paint the tile blue or white on 'mouseleave'
                        terrainMesh.setColorAt( input.TILE_INTERSECTED.instanceId, color.COPY.setHex(
                            canWalk ? color.WALKABLE.getHex() : color.WHITE.getHex()
                        ) );
                        this.updateInstanceMesh()
                    }
                }
                input.TILE_INTERSECTED = intersection[0]
                
                if (input.TILE_INTERSECTED && input.TILE_INTERSECTED.instanceId) {
                    
                    const tileData = map_tileset.find((tile: any) => tile.instancedIndex === input.TILE_INTERSECTED?.instanceId);   
                    if (tileData) {
                        terrainMesh.getColorAt( input.TILE_INTERSECTED.instanceId, color.COPY );
                        if ( (
                            tileData.hoverState === 'none' ||
                            tileData.hoverState === 'walkable' ||
                            tileData.hoverState === 'unwalkable' 
                        ) && playerState.PLAYER.character.mesh) {
                            const canWalk = this.canPlayerWalkToTile(tileData)
                            // Paint currently hovered tile to blue or red depending on the availability
                            terrainMesh.setColorAt( input.TILE_INTERSECTED.instanceId, color.COPY.setHex( 
                                canWalk ?
                                color.SELECT.getHex() : color.DENY.getHex()
                            ) );
                            this.updateInstanceMesh()

                            if (canWalk) {
                                cursorPointer()
                                tileData.hoverState = 'walkable'
                            } else {
                                cursorDefault()
                                tileData.hoverState = 'unwalkable'
                            }
                        }
                        
                    }

                    
                }
        
            } else {
                // Set last tile hovered to white when the whole map is not hovered
                if ( input.TILE_INTERSECTED && input.TILE_INTERSECTED.instanceId && playerState.PLAYER_CAN_MOVE) {
                    const tileData = map_tileset.find((tile: any) => tile.instancedIndex === input.TILE_INTERSECTED?.instanceId);   
                    if (tileData) {
                        const canWalk = this.canPlayerWalkToTile(tileData)
                        terrainMesh.setColorAt( input.TILE_INTERSECTED.instanceId, color.COPY.setHex( 
                            canWalk ? 
                            color.WALKABLE.getHex() : color.WHITE.getHex()
                        ) );
                        this.updateInstanceMesh()
                    }
                }
                input.TILE_INTERSECTED = null;
            }

        }
    }

    updateWalkableTiles() {
        const terrainMesh = this._mesh
        if (!terrainMesh) return
        if (!playerState.PLAYER_CAN_MOVE) return
        if (!playerState.IS_PLAYER_SELECTED) return
        

        const characterPosition = playerState.PLAYER.character.mesh.position
        const characterMovement = playerState.PLAYER.character.movement
        for (let i = 0; i < map_tileset.length; i++) {
            if (
                Math.abs(characterPosition.x - map_tileset[i].x) <= characterMovement &&
                Math.abs(characterPosition.z - map_tileset[i].z) <= characterMovement
            ) {
                const tile = map_tileset[i];
                const canWalk = this.canPlayerWalkToTile(tile)
                
                if (canWalk) {
                    terrainMesh.setColorAt( tile.instancedIndex, color.COPY.setHex(color.WALKABLE.getHex()) )
                    this.updateInstanceMesh()
                }
            }
        }
        console.log("post updateWalkableTiles");
        
    }

    resetTiles() {
        const terrainMesh = this._mesh
        if (!terrainMesh) return
        

        for (let i = 0; i < map_tileset.length; i++) {
            const tile = map_tileset[i];
            terrainMesh.setColorAt( tile.instancedIndex, color.COPY.setHex(color.WHITE.getHex()) )
            this.updateInstanceMesh()
        }
    }

    tileClicked() {
        if (input.INTERSECTED_OBJECT === this._mesh) {
            const tile = terrainState.TILE_HOVERED

            if (playerState.PREPARING_TILE_ATTACK) {
                // Click tile to attack there
                attackController.attack({ tile })
                
            } else if (tile.canWalk && playerState.PLAYER_CAN_MOVE && playerState.IS_PLAYER_SELECTED) {
                playerState.PLAYER_CAN_MOVE = false
                playerState.IS_PLAYER_SELECTED = false
                cursorDefault()
                const remainingMovementPoints = moveObjectTo(playerState.PLAYER.character.mesh, tile.x || 0, tile.z || 0, () => {
                    playerState.PLAYER_CAN_MOVE = true
                })
                playerState.PLAYER.character.subtractMovement(remainingMovementPoints)
                this.resetTiles()
            }
        }
    }

    canPlayerWalkToTile(tile: Tileset): boolean {
        if (playerState.PLAYER.character.mesh && playerState.PLAYER_CAN_MOVE) {
            const characterPosition = playerState.PLAYER.character.mesh.position
            const pathToTile = pathFind({x: characterPosition.x, z: characterPosition.z}, {x: tile.x, z: tile.z})
            return (pathToTile).length <= playerState.PLAYER.character.movement && pathToTile.length != 0
        } else return false
    }


    get mesh() {
        if (this._mesh)
            return this._mesh
        else
            return null
    }
}