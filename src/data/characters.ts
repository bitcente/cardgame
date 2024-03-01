import { StatPoints } from "../classes/Entity";

export enum CharacterType {
    Rogue = "rogue",
    Mage = "mage",
    Knight = "knight",
    Barbarian = "barbarian"
}

export const dummyCharacterStats = {
    HEALTH: 4,
    MAX_HEALTH: 4,
    MOVEMENT: 1,
    PROTECTION: 0,
    ENERGY: 3,
    MAX_ENERGY: 3,
}

export const characterStats: Map<CharacterType, StatPoints> = new Map<CharacterType, StatPoints>([
    [CharacterType.Rogue, {
        HEALTH: 4,
        MAX_HEALTH: 4,
        MOVEMENT: 2,
        PROTECTION: 0,
        ENERGY: 3,
        MAX_ENERGY: 3,
    }],
    [CharacterType.Mage, {
        HEALTH: 4,
        MAX_HEALTH: 4,
        MOVEMENT: 1,
        PROTECTION: 0,
        ENERGY: 4,
        MAX_ENERGY: 4,
    }],
    [CharacterType.Knight, {
        HEALTH: 5,
        MAX_HEALTH: 5,
        MOVEMENT: 1,
        PROTECTION: 0,
        ENERGY: 3,
        MAX_ENERGY: 3,
    }],
    [CharacterType.Barbarian, {
        HEALTH: 5,
        MAX_HEALTH: 5,
        MOVEMENT: 1,
        PROTECTION: 0,
        ENERGY: 3,
        MAX_ENERGY: 3,
    }],
]);