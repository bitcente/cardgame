import { modelLoader } from "../loaders/gltfLoader";
import { castShadows } from "../scripts/castShadows";
import { ObjectProps, ObjectType } from "../settings";
import { Entity, EntityProps } from "./Entity";
import * as THREE from "three"

type LootObjectProps = EntityProps & {
    type: ObjectType,
    objectData: ObjectProps
}

export const characterStats = new Map<ObjectType, number>([
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
                    clone.position.y = characterStats.get(type) ?? 0
                    const lootObject = new THREE.Group()
                    lootObject.add(clone)
                    
                    this.mesh = lootObject
                }
            }
        )
    }
}