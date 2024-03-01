import { CharacterType, characterStats, dummyCharacterStats } from "../data/characters"
import { Coords } from "../settings"
import { Character } from "./Character"

export interface PlayerProps {
    name: string
    character: CharacterType
    position?: Coords
}

export class Player {
    private _name: string
    private _character: Character

    constructor({ name = 'No Name', character, position = {x: 0, z: 0} }: PlayerProps) {
        this._name = name
        this._character = new Character({
            id: name,
            nameTag: name,
            baseStats: characterStats.get(character) ?? dummyCharacterStats,
            position,
            character
        })

        this.init()
    }

    init() {

        
    }

    update() {
        
    }

    get name() {
        return this._name
    }
    get character() {
        return this._character
    }

    get position() {
        return this._character.position
    }
    get rotation() {
        return this._character.rotation
    }
}