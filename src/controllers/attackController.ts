import { Entity, entityList, entitySuffix } from "../classes/Entity";
import { adjacentAvailableCoords } from "../scripts/adjacentCoords";
import { moveObjectTo, pathFind } from "../scripts/movement";
import { Coords } from "../settings";
import { input } from "../states/input";
import { playerState } from "../states/player";
import { TerrainTile, terrainState } from "../states/terrain";
import { findParentOfMeshByName, removeFromArrayById } from "../utils/utils";
import UIController from "./UIController";



class AttackController {

    private source: Entity | null = null
    private damage: number | null = null
    private range: number | null = null
    private callBack: () => void = () => {}

    constructor() {

    }

    clickEntity(): void {
        const entity = findParentOfMeshByName(input.INTERSECTED_OBJECT, entitySuffix, true)
        if (entity && entity.name !== playerState.PLAYER.character.mesh.name) {

            const characterPosition = playerState.PLAYER.character.mesh.position
            const path = pathFind({ x: entity.position.x, z: entity.position.z }, { x: characterPosition.x, z: characterPosition.z })
            
            if (path.length - 1 <= playerState.PLAYER.character.movement + this.range && path.length > 0) {
                
                terrainState.terrain?.resetTiles()
                this.cancelAttackEntity()

                if (path.length - (this.range || 0) > playerState.PLAYER.character.movement) {
                    playerState.PLAYER_CAN_MOVE = false
                    moveObjectTo(playerState.PLAYER.character.mesh, path[0].x || 0, path[0].z || 0, () => {
                        playerState.PLAYER_CAN_MOVE = true
                        const entityToAttack = entityList.find(ent => ent.mesh?.name === entity.name)
                        if (entityToAttack) {
                            const damage = this.damage || 0
                            UIController.sendMessage(`${playerState.PLAYER.name} ha infligido ${damage} punto${damage > 1 || damage == 0 ? 's' : '' } de daño a ${entityToAttack.nameTag}`)
                            entityToAttack.takeDamage(damage)
                        }
                    })
                } else {
                    const entityToAttack = entityList.find(ent => ent.mesh?.name === entity.name)
                    if (entityToAttack) {
                        const damage = this.damage || 0
                        UIController.sendMessage(`${playerState.PLAYER.name} ha infligido ${damage} punto${damage > 1 || damage == 0 ? 's' : '' } de daño a ${entityToAttack.nameTag}`)
                        entityToAttack.takeDamage(damage)
                    }
                }

                
            } else {

                alert("You need more movement points to reach the objective.")

            }
        }
    }

    cancelAttackEntity(): void {
        removeFromArrayById(input.ON_CLICK, "clickEntity")
        UIController.attacking = false
        playerState.PREPARING_ENTITY_ATTACK = false
    }

    prepareAttackToEntity(source: Entity, damage: number, range: number, callBack?: () => void) {
        playerState.IS_PLAYER_SELECTED = false
        this.source = source
        this.damage = damage
        this.range = range
        if (callBack) this.callBack = callBack

        // Select entity to attack
        playerState.PREPARING_ENTITY_ATTACK = true
        UIController.attacking = true
        input.ON_CLICK.push({ id: "clickEntity", function: this.clickEntity.bind(this) })
    }
    prepareAttackToTile(source: Entity, damage: number, callBack?: () => void) {
        playerState.IS_PLAYER_SELECTED = false
        this.source = source
        this.damage = damage
        if (callBack) this.callBack = callBack

        // Select entity to attack
        playerState.PREPARING_TILE_ATTACK = true
        UIController.attacking = true
    }

    attack({ tile, entity }: {tile?: TerrainTile, entity?: Entity}): void {
        let entityToHit = entity
        if (tile) {
            // Look for entity standing on that tile
            console.log(entityList);

        } else if (entity) {

        }
    }

}

export default new AttackController()