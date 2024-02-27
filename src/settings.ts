export type Coords = {
    x: number | null,
    z: number | null
}

// Floor types
export enum F {
    A = 0, // with stones
    B = 1, // polished 
}

export type Tileset = {
    x: number, 
    z: number, 
    instancedIndex: any
}

// How tiles are positioned
export const map_tileset: Tileset[] = [
    {x: 0, z: 0, instancedIndex: undefined},
    {x: 1, z: 0, instancedIndex: undefined},
    {x: 2, z: 0, instancedIndex: undefined},
    {x: 3, z: 0, instancedIndex: undefined},
    {x: 4, z: 0, instancedIndex: undefined},
    {x: 0, z: 1, instancedIndex: undefined},
    {x: 1, z: 1, instancedIndex: undefined},
    {x: 2, z: 1, instancedIndex: undefined},
    {x: 3, z: 1, instancedIndex: undefined},
    {x: 4, z: 1, instancedIndex: undefined},
    {x: 0, z: 2, instancedIndex: undefined},
    {x: 1, z: 2, instancedIndex: undefined},
    {x: 2, z: 2, instancedIndex: undefined},
    {x: 3, z: 2, instancedIndex: undefined},
    {x: 4, z: 2, instancedIndex: undefined},
]

// Object types
export enum O {
    Air = 0,
    Crate = 1,
    Barrel = 2,
    LootSack = 3,
    Coin = 4,
}

// How tiles are positioned
export const map_objects = [
    {x: 0, z: 2}
]
