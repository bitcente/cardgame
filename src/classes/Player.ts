import { CharacterType, characterStats, dummyCharacterStats } from "../data/characters"
import { Coords } from "../settings"
import { cursorDefault, input } from "../states/input"
import { playerState } from "../states/player"
import { Character } from "./Character"

export interface PlayerProps {
    name: string
    character: CharacterType
    mine?: boolean // if player of client
}

export class Player {
    private _name: string
    private _character: Character
    private _mine: boolean

    constructor({ name = 'No Name', character, mine = false }: PlayerProps) {
        this._name = name
        this._mine = mine
        this._character = new Character({
            id: name,
            nameTag: name,
            baseStats: characterStats.get(character) ?? dummyCharacterStats,
            character
        })

        input.ON_CLICK.push(this.selectCharacter.bind(this))
        this.init()
    }

    init() {
        
    }

    selectCharacter() {
        if (!input.INTERSECTED_OBJECT) return
        if (!this._mine) return

        let par = input.INTERSECTED_OBJECT.parent;
        if (par) {
            while (par?.name !== this.character.id && par.parent) {
                if (par) par = par.parent
            }

            if (par.name === this.character.id) {
                playerState.IS_PLAYER_SELECTED = !playerState.IS_PLAYER_SELECTED

                if (!playerState.IS_PLAYER_SELECTED) cursorDefault()
            }
        }
    }

    update() {
        
    }

    get name() {
        return this._name
    }
    get character() {
        return this._character
    }

    get rotation() {
        return this._character.rotation
    }
}