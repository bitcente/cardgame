import { CharacterType, characterStats, dummyCharacterStats } from "../data/characters"
import { Character } from "./Character"

export interface PlayerProps {
    name: string
    character: CharacterType
}

export class Player {
    _name: string
    _character: Character

    constructor({ name = 'No Name', character }: PlayerProps) {
        this._name = name
        this._character = new Character({
            id: 'name',
            nameTag: 'name',
            baseStats: characterStats.get(character) ?? dummyCharacterStats,
            position: {x: 0, z: 0},
            character: character
        })

        this.init()
    }

    init() {

    }

    update() {
        
    }
}