import { CharacterType, characterStats, dummyCharacterStats } from "../data/characters"
import { global } from "../states/global"
import { Character } from "./Character"
import * as THREE from "three"

export interface PlayerProps {
    name: string
    character: CharacterType
}

export class Player {
    private _name: string
    private _character: Character
    private _mesh: THREE.Mesh | undefined

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

        const m = new THREE.MeshBasicMaterial()
        const g = new THREE.BoxGeometry(1, 1, 1)
        const mesh = new THREE.Mesh(g, m)
        global.scene?.add(mesh)
        this._mesh = mesh
    }

    update() {
        
    }

    get name() {
        return this._name
    }
    get character() {
        return this._character
    }
    get mesh() {
        return this._mesh
    }
}