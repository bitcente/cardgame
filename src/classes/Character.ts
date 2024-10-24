import { cards } from "../data/cards"
import { CharacterType, characterStats, dummyCharacterStats } from "../data/characters"
import { modelLoader } from "../loaders/gltfLoader"
import { castShadows } from "../scripts/castShadows"
import { CardController } from "./CardController"
import { Entity, EntityProps, entitySuffix } from "./Entity"
import * as THREE from "three"

export type CharacterProps = EntityProps & {
    character: CharacterType
}

export class Character extends Entity {
    private _character: CharacterType
    
    public constructor({
        id,
        nameTag,
        position,
        character
    }: CharacterProps) {
        super({
            id,
            nameTag,
            baseStats: characterStats.get(character) ?? dummyCharacterStats,
            position,
        })

        modelLoader.load(
            `/static/models/characters/${character}.gltf`,
            (model) => {
                const characterGroup = new THREE.Group()
                characterGroup.name = id + entitySuffix
                castShadows(model.scene)
                
                characterGroup.add(model.scene)
                characterGroup.scale.x = characterGroup.scale.y = characterGroup.scale.z = .55
                this.mesh = characterGroup
            }
        )
        
        this._character = character

        //this.cardController.drawHand()
    }

    

    get character() {
        return this._character
    }
    
}