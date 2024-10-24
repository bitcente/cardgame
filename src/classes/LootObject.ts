import UIController from "../controllers/UIController";
import { modelLoader } from "../loaders/gltfLoader";
import { castShadows } from "../scripts/castShadows";
import { ObjectProps, ObjectType, map_objects } from "../settings";
import { Entity, EntityProps, entityList, entitySuffix } from "./Entity";
import * as THREE from "three"

type LootObjectProps = EntityProps & {
    type: ObjectType,
    objectData: ObjectProps
}

export const objectStats = new Map<ObjectType, number>([
    [ObjectType.Barrel, .3],
    [ObjectType.Crate, .4],
    [ObjectType.LootSack, .01],
])

export class LootObject extends Entity {
    private _type: ObjectType
    private _objectData: ObjectProps

    constructor({
        id,
        nameTag,
        baseStats,
        position,
        type,
        objectData
    }: LootObjectProps) {
        super({
            id,
            nameTag,
            baseStats,
            position,
        })

        this._type = type
        this._objectData = objectData

        modelLoader.load(`./static/models/${type}.glb`,
            (model) => {
                if (objectData.x != null && objectData.z !== null) {

                    const clone = model.scene.clone()
                    castShadows(clone)

                    clone.scale.x = clone.scale.y = clone.scale.z = .75
                    clone.position.y = objectStats.get(type) ?? 0
                    const lootObject = new THREE.Group()
                    lootObject.name = id + entitySuffix
                    lootObject.add(clone)
                    
                    this.mesh = lootObject
                }
            }
        )
    }

    override kill(): void {
        if (this.mesh) {
            this.mesh.visible = false
            
            const objectInArray = map_objects.find(obj => obj.id === this.id)
            const entityIndex = entityList.findIndex(obj => obj.id === this.id)
            entityList.splice(entityIndex, 1)
            if (objectInArray) {
                objectInArray.destroyed = true
            }
            UIController.sendMessage(`${this.nameTag} ha sido destruido`)
        }
    }
}