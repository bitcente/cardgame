import { cards } from "../data/cards"
import { CharacterType } from "../data/characters"
import { CardController } from "./CardController"
import { Entity, EntityProps } from "./Entity"

export type CharacterProps = EntityProps & {
    character: CharacterType
}

export class Character extends Entity {
    _character: CharacterType
    _cardController: CardController

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
            position
        })
        
        this._cardController = new CardController({ deck: cards, ownerEntity: this })
        this._character = character
    }
}