import { cards } from "../data/cards"
import { CharacterType } from "../data/characters"
import { modelLoader } from "../loaders/gltfLoader"
import { castShadows } from "../scripts/castShadows"
import { CardController } from "./CardController"
import { Entity, EntityProps } from "./Entity"
import * as THREE from "three"

export type CharacterProps = EntityProps & {
    character: CharacterType
}

export class Character extends Entity {
    private _character: CharacterType
    private _cardController: CardController

    public constructor({
        id,
        nameTag,
        baseStats,
        position,
        character
    }: CharacterProps) {
        super({
            id,
            nameTag,
            baseStats,
            position,
        })

        modelLoader.load(
            `/static/models/characters/${character}.gltf`,
            (model) => {
                const characterGroup = new THREE.Group()
                characterGroup.name = id
                castShadows(model.scene)
                
                characterGroup.add(model.scene)
                characterGroup.scale.x = characterGroup.scale.y = characterGroup.scale.z = .55
                this.mesh = characterGroup
            }
        )
        
        this._cardController = new CardController({ deck: [
            Object.assign({}, cards[0]),
            Object.assign({}, cards[0]),
            Object.assign({}, cards[0]),
            Object.assign({}, cards[0]),
            Object.assign({}, cards[0]),
            Object.assign({}, cards[0]),
            Object.assign({}, cards[0]),
            Object.assign({}, cards[1]),
            Object.assign({}, cards[1]),
            Object.assign({}, cards[1]),
            Object.assign({}, cards[1]),
            Object.assign({}, cards[1]),
            Object.assign({}, cards[1]),
            Object.assign({}, cards[1]),
        ], ownerEntity: this })
        this._character = character

        //this.cardController.drawHand()
    }

    

    get character() {
        return this._character
    }
    get cardController() {
        return this._cardController
    }
}