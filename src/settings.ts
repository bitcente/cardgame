export type Coords = {
    x: number | null,
    z: number | null
}
export type Rotation = {
    y: number,
}

export type Tileset = {
    x: number, 
    z: number, 
    instancedIndex: any,
    hoverState: 'walkable' | 'unwalkable' | 'click-to-walk' | 'none'
}

// How tiles are positioned
export const map_tileset: Tileset[] = [
    {x: 0, z: 0, instancedIndex: undefined, hoverState: 'none'},
    {x: 1, z: 0, instancedIndex: undefined, hoverState: 'none'},
    {x: 2, z: 0, instancedIndex: undefined, hoverState: 'none'},
    {x: 3, z: 0, instancedIndex: undefined, hoverState: 'none'},
    {x: 4, z: 0, instancedIndex: undefined, hoverState: 'none'},
    {x: 5, z: 0, instancedIndex: undefined, hoverState: 'none'},
    {x: 6, z: 0, instancedIndex: undefined, hoverState: 'none'},
    {x: 7, z: 0, instancedIndex: undefined, hoverState: 'none'},
    {x: 8, z: 0, instancedIndex: undefined, hoverState: 'none'},
    {x: 9, z: 0, instancedIndex: undefined, hoverState: 'none'},
    {x: 10, z: 0, instancedIndex: undefined, hoverState: 'none'},
    {x: 11, z: 0, instancedIndex: undefined, hoverState: 'none'},
    {x: 12, z: 0, instancedIndex: undefined, hoverState: 'none'},
    {x: 13, z: 0, instancedIndex: undefined, hoverState: 'none'},
    {x: 14, z: 0, instancedIndex: undefined, hoverState: 'none'},
 
    {x: 0, z: 1, instancedIndex: undefined, hoverState: 'none'},
    {x: 1, z: 1, instancedIndex: undefined, hoverState: 'none'},
    {x: 2, z: 1, instancedIndex: undefined, hoverState: 'none'},
    {x: 3, z: 1, instancedIndex: undefined, hoverState: 'none'},
    {x: 4, z: 1, instancedIndex: undefined, hoverState: 'none'},
    {x: 5, z: 1, instancedIndex: undefined, hoverState: 'none'},
    {x: 6, z: 1, instancedIndex: undefined, hoverState: 'none'},
    {x: 7, z: 1, instancedIndex: undefined, hoverState: 'none'},
    {x: 8, z: 1, instancedIndex: undefined, hoverState: 'none'},
    {x: 9, z: 1, instancedIndex: undefined, hoverState: 'none'},
    {x: 10, z: 1, instancedIndex: undefined, hoverState: 'none'},
    {x: 11, z: 1, instancedIndex: undefined, hoverState: 'none'},
    {x: 12, z: 1, instancedIndex: undefined, hoverState: 'none'},
    {x: 13, z: 1, instancedIndex: undefined, hoverState: 'none'},
    {x: 14, z: 1, instancedIndex: undefined, hoverState: 'none'},
 
    {x: 0, z: 2, instancedIndex: undefined, hoverState: 'none'},
    {x: 1, z: 2, instancedIndex: undefined, hoverState: 'none'},
    {x: 2, z: 2, instancedIndex: undefined, hoverState: 'none'},
    {x: 3, z: 2, instancedIndex: undefined, hoverState: 'none'},
    {x: 4, z: 2, instancedIndex: undefined, hoverState: 'none'},
    {x: 5, z: 2, instancedIndex: undefined, hoverState: 'none'},
    {x: 6, z: 2, instancedIndex: undefined, hoverState: 'none'},
    {x: 7, z: 2, instancedIndex: undefined, hoverState: 'none'},
    {x: 8, z: 2, instancedIndex: undefined, hoverState: 'none'},
    {x: 9, z: 2, instancedIndex: undefined, hoverState: 'none'},
    {x: 10, z: 2, instancedIndex: undefined, hoverState: 'none'},
    {x: 11, z: 2, instancedIndex: undefined, hoverState: 'none'},
    {x: 12, z: 2, instancedIndex: undefined, hoverState: 'none'},
    {x: 13, z: 2, instancedIndex: undefined, hoverState: 'none'},
    {x: 14, z: 2, instancedIndex: undefined, hoverState: 'none'},
 
    {x: 0, z: 3, instancedIndex: undefined, hoverState: 'none'},
    {x: 1, z: 3, instancedIndex: undefined, hoverState: 'none'},
    {x: 2, z: 3, instancedIndex: undefined, hoverState: 'none'},
    {x: 3, z: 3, instancedIndex: undefined, hoverState: 'none'},
    {x: 4, z: 3, instancedIndex: undefined, hoverState: 'none'},
    {x: 5, z: 3, instancedIndex: undefined, hoverState: 'none'},
    {x: 6, z: 3, instancedIndex: undefined, hoverState: 'none'},
    {x: 7, z: 3, instancedIndex: undefined, hoverState: 'none'},
    {x: 8, z: 3, instancedIndex: undefined, hoverState: 'none'},
    {x: 9, z: 3, instancedIndex: undefined, hoverState: 'none'},
    {x: 10, z: 3, instancedIndex: undefined, hoverState: 'none'},
    {x: 11, z: 3, instancedIndex: undefined, hoverState: 'none'},
    {x: 12, z: 3, instancedIndex: undefined, hoverState: 'none'},
    {x: 13, z: 3, instancedIndex: undefined, hoverState: 'none'},
    {x: 14, z: 3, instancedIndex: undefined, hoverState: 'none'},
 
    {x: 0, z: 4, instancedIndex: undefined, hoverState: 'none'},
    {x: 1, z: 4, instancedIndex: undefined, hoverState: 'none'},
    {x: 2, z: 4, instancedIndex: undefined, hoverState: 'none'},
    {x: 3, z: 4, instancedIndex: undefined, hoverState: 'none'},
    {x: 4, z: 4, instancedIndex: undefined, hoverState: 'none'},
    {x: 5, z: 4, instancedIndex: undefined, hoverState: 'none'},
    {x: 6, z: 4, instancedIndex: undefined, hoverState: 'none'},
    {x: 7, z: 4, instancedIndex: undefined, hoverState: 'none'},
    {x: 8, z: 4, instancedIndex: undefined, hoverState: 'none'},
    {x: 9, z: 4, instancedIndex: undefined, hoverState: 'none'},
    {x: 10, z: 4, instancedIndex: undefined, hoverState: 'none'},
    {x: 11, z: 4, instancedIndex: undefined, hoverState: 'none'},
    {x: 12, z: 4, instancedIndex: undefined, hoverState: 'none'},
    {x: 13, z: 4, instancedIndex: undefined, hoverState: 'none'},
    {x: 14, z: 4, instancedIndex: undefined, hoverState: 'none'},
 
    {x: 0, z: 5, instancedIndex: undefined, hoverState: 'none'},
    {x: 1, z: 5, instancedIndex: undefined, hoverState: 'none'},
    {x: 2, z: 5, instancedIndex: undefined, hoverState: 'none'},
    {x: 3, z: 5, instancedIndex: undefined, hoverState: 'none'},
    {x: 4, z: 5, instancedIndex: undefined, hoverState: 'none'},
    {x: 5, z: 5, instancedIndex: undefined, hoverState: 'none'},
    {x: 6, z: 5, instancedIndex: undefined, hoverState: 'none'},
    {x: 7, z: 5, instancedIndex: undefined, hoverState: 'none'},
    {x: 8, z: 5, instancedIndex: undefined, hoverState: 'none'},
    {x: 9, z: 5, instancedIndex: undefined, hoverState: 'none'},
    {x: 10, z: 5, instancedIndex: undefined, hoverState: 'none'},
    {x: 11, z: 5, instancedIndex: undefined, hoverState: 'none'},
    {x: 12, z: 5, instancedIndex: undefined, hoverState: 'none'},
    {x: 13, z: 5, instancedIndex: undefined, hoverState: 'none'},
    {x: 14, z: 5, instancedIndex: undefined, hoverState: 'none'},
 
    {x: 0, z: 6, instancedIndex: undefined, hoverState: 'none'},
    {x: 1, z: 6, instancedIndex: undefined, hoverState: 'none'},
    {x: 2, z: 6, instancedIndex: undefined, hoverState: 'none'},
    {x: 3, z: 6, instancedIndex: undefined, hoverState: 'none'},
    {x: 4, z: 6, instancedIndex: undefined, hoverState: 'none'},
    {x: 5, z: 6, instancedIndex: undefined, hoverState: 'none'},
    {x: 6, z: 6, instancedIndex: undefined, hoverState: 'none'},
    {x: 7, z: 6, instancedIndex: undefined, hoverState: 'none'},
    {x: 8, z: 6, instancedIndex: undefined, hoverState: 'none'},
    {x: 9, z: 6, instancedIndex: undefined, hoverState: 'none'},
    {x: 10, z: 6, instancedIndex: undefined, hoverState: 'none'},
    {x: 11, z: 6, instancedIndex: undefined, hoverState: 'none'},
    {x: 12, z: 6, instancedIndex: undefined, hoverState: 'none'},
    {x: 13, z: 6, instancedIndex: undefined, hoverState: 'none'},
    {x: 14, z: 6, instancedIndex: undefined, hoverState: 'none'},
 
    {x: 0, z: 7, instancedIndex: undefined, hoverState: 'none'},
    {x: 1, z: 7, instancedIndex: undefined, hoverState: 'none'},
    {x: 2, z: 7, instancedIndex: undefined, hoverState: 'none'},
    {x: 3, z: 7, instancedIndex: undefined, hoverState: 'none'},
    {x: 4, z: 7, instancedIndex: undefined, hoverState: 'none'},
    {x: 5, z: 7, instancedIndex: undefined, hoverState: 'none'},
    {x: 6, z: 7, instancedIndex: undefined, hoverState: 'none'},
    {x: 7, z: 7, instancedIndex: undefined, hoverState: 'none'},
    {x: 8, z: 7, instancedIndex: undefined, hoverState: 'none'},
    {x: 9, z: 7, instancedIndex: undefined, hoverState: 'none'},
    {x: 10, z: 7, instancedIndex: undefined, hoverState: 'none'},
    {x: 11, z: 7, instancedIndex: undefined, hoverState: 'none'},
    {x: 12, z: 7, instancedIndex: undefined, hoverState: 'none'},
    {x: 13, z: 7, instancedIndex: undefined, hoverState: 'none'},
    {x: 14, z: 7, instancedIndex: undefined, hoverState: 'none'},
 
    {x: 0, z: 8, instancedIndex: undefined, hoverState: 'none'},
    {x: 1, z: 8, instancedIndex: undefined, hoverState: 'none'},
    {x: 2, z: 8, instancedIndex: undefined, hoverState: 'none'},
    {x: 3, z: 8, instancedIndex: undefined, hoverState: 'none'},
    {x: 4, z: 8, instancedIndex: undefined, hoverState: 'none'},
    {x: 5, z: 8, instancedIndex: undefined, hoverState: 'none'},
    {x: 6, z: 8, instancedIndex: undefined, hoverState: 'none'},
    {x: 7, z: 8, instancedIndex: undefined, hoverState: 'none'},
    {x: 8, z: 8, instancedIndex: undefined, hoverState: 'none'},
    {x: 9, z: 8, instancedIndex: undefined, hoverState: 'none'},
    {x: 10, z: 8, instancedIndex: undefined, hoverState: 'none'},
    {x: 11, z: 8, instancedIndex: undefined, hoverState: 'none'},
    {x: 12, z: 8, instancedIndex: undefined, hoverState: 'none'},
    {x: 13, z: 8, instancedIndex: undefined, hoverState: 'none'},
    {x: 14, z: 8, instancedIndex: undefined, hoverState: 'none'},
 
    {x: 0, z: 9, instancedIndex: undefined, hoverState: 'none'},
    {x: 1, z: 9, instancedIndex: undefined, hoverState: 'none'},
    {x: 2, z: 9, instancedIndex: undefined, hoverState: 'none'},
    {x: 3, z: 9, instancedIndex: undefined, hoverState: 'none'},
    {x: 4, z: 9, instancedIndex: undefined, hoverState: 'none'},
    {x: 5, z: 9, instancedIndex: undefined, hoverState: 'none'},
    {x: 6, z: 9, instancedIndex: undefined, hoverState: 'none'},
    {x: 7, z: 9, instancedIndex: undefined, hoverState: 'none'},
    {x: 8, z: 9, instancedIndex: undefined, hoverState: 'none'},
    {x: 9, z: 9, instancedIndex: undefined, hoverState: 'none'},
    {x: 10, z: 9, instancedIndex: undefined, hoverState: 'none'},
    {x: 11, z: 9, instancedIndex: undefined, hoverState: 'none'},
    {x: 12, z: 9, instancedIndex: undefined, hoverState: 'none'},
    {x: 13, z: 9, instancedIndex: undefined, hoverState: 'none'},
    {x: 14, z: 9, instancedIndex: undefined, hoverState: 'none'},
 
    {x: 0, z: 10, instancedIndex: undefined, hoverState: 'none'},
    {x: 1, z: 10, instancedIndex: undefined, hoverState: 'none'},
    {x: 2, z: 10, instancedIndex: undefined, hoverState: 'none'},
    {x: 3, z: 10, instancedIndex: undefined, hoverState: 'none'},
    {x: 4, z: 10, instancedIndex: undefined, hoverState: 'none'},
    {x: 5, z: 10, instancedIndex: undefined, hoverState: 'none'},
    {x: 6, z: 10, instancedIndex: undefined, hoverState: 'none'},
    {x: 7, z: 10, instancedIndex: undefined, hoverState: 'none'},
    {x: 8, z: 10, instancedIndex: undefined, hoverState: 'none'},
    {x: 9, z: 10, instancedIndex: undefined, hoverState: 'none'},
    {x: 10, z: 10, instancedIndex: undefined, hoverState: 'none'},
    {x: 11, z: 10, instancedIndex: undefined, hoverState: 'none'},
    {x: 12, z: 10, instancedIndex: undefined, hoverState: 'none'},
    {x: 13, z: 10, instancedIndex: undefined, hoverState: 'none'},
    {x: 14, z: 10, instancedIndex: undefined, hoverState: 'none'},
 
    {x: 0, z: 11, instancedIndex: undefined, hoverState: 'none'},
    {x: 1, z: 11, instancedIndex: undefined, hoverState: 'none'},
    {x: 2, z: 11, instancedIndex: undefined, hoverState: 'none'},
    {x: 3, z: 11, instancedIndex: undefined, hoverState: 'none'},
    {x: 4, z: 11, instancedIndex: undefined, hoverState: 'none'},
    {x: 5, z: 11, instancedIndex: undefined, hoverState: 'none'},
    {x: 6, z: 11, instancedIndex: undefined, hoverState: 'none'},
    {x: 7, z: 11, instancedIndex: undefined, hoverState: 'none'},
    {x: 8, z: 11, instancedIndex: undefined, hoverState: 'none'},
    {x: 9, z: 11, instancedIndex: undefined, hoverState: 'none'},
    {x: 10, z: 11, instancedIndex: undefined, hoverState: 'none'},
    {x: 11, z: 11, instancedIndex: undefined, hoverState: 'none'},
    {x: 12, z: 11, instancedIndex: undefined, hoverState: 'none'},
    {x: 13, z: 11, instancedIndex: undefined, hoverState: 'none'},
    {x: 14, z: 11, instancedIndex: undefined, hoverState: 'none'},
 
    {x: 0, z: 12, instancedIndex: undefined, hoverState: 'none'},
    {x: 1, z: 12, instancedIndex: undefined, hoverState: 'none'},
    {x: 2, z: 12, instancedIndex: undefined, hoverState: 'none'},
    {x: 3, z: 12, instancedIndex: undefined, hoverState: 'none'},
    {x: 4, z: 12, instancedIndex: undefined, hoverState: 'none'},
    {x: 5, z: 12, instancedIndex: undefined, hoverState: 'none'},
    {x: 6, z: 12, instancedIndex: undefined, hoverState: 'none'},
    {x: 7, z: 12, instancedIndex: undefined, hoverState: 'none'},
    {x: 8, z: 12, instancedIndex: undefined, hoverState: 'none'},
    {x: 9, z: 12, instancedIndex: undefined, hoverState: 'none'},
    {x: 10, z: 12, instancedIndex: undefined, hoverState: 'none'},
    {x: 11, z: 12, instancedIndex: undefined, hoverState: 'none'},
    {x: 12, z: 12, instancedIndex: undefined, hoverState: 'none'},
    {x: 13, z: 12, instancedIndex: undefined, hoverState: 'none'},
    {x: 14, z: 12, instancedIndex: undefined, hoverState: 'none'},
 
    {x: 0, z: 13, instancedIndex: undefined, hoverState: 'none'},
    {x: 1, z: 13, instancedIndex: undefined, hoverState: 'none'},
    {x: 2, z: 13, instancedIndex: undefined, hoverState: 'none'},
    {x: 3, z: 13, instancedIndex: undefined, hoverState: 'none'},
    {x: 4, z: 13, instancedIndex: undefined, hoverState: 'none'},
    {x: 5, z: 13, instancedIndex: undefined, hoverState: 'none'},
    {x: 6, z: 13, instancedIndex: undefined, hoverState: 'none'},
    {x: 7, z: 13, instancedIndex: undefined, hoverState: 'none'},
    {x: 8, z: 13, instancedIndex: undefined, hoverState: 'none'},
    {x: 9, z: 13, instancedIndex: undefined, hoverState: 'none'},
    {x: 10, z: 13, instancedIndex: undefined, hoverState: 'none'},
    {x: 11, z: 13, instancedIndex: undefined, hoverState: 'none'},
    {x: 12, z: 13, instancedIndex: undefined, hoverState: 'none'},
    {x: 13, z: 13, instancedIndex: undefined, hoverState: 'none'},
    {x: 14, z: 13, instancedIndex: undefined, hoverState: 'none'},
 
    {x: 0, z: 14, instancedIndex: undefined, hoverState: 'none'},
    {x: 1, z: 14, instancedIndex: undefined, hoverState: 'none'},
    {x: 2, z: 14, instancedIndex: undefined, hoverState: 'none'},
    {x: 3, z: 14, instancedIndex: undefined, hoverState: 'none'},
    {x: 4, z: 14, instancedIndex: undefined, hoverState: 'none'},
    {x: 5, z: 14, instancedIndex: undefined, hoverState: 'none'},
    {x: 6, z: 14, instancedIndex: undefined, hoverState: 'none'},
    {x: 7, z: 14, instancedIndex: undefined, hoverState: 'none'},
    {x: 8, z: 14, instancedIndex: undefined, hoverState: 'none'},
    {x: 9, z: 14, instancedIndex: undefined, hoverState: 'none'},
    {x: 10, z: 14, instancedIndex: undefined, hoverState: 'none'},
    {x: 11, z: 14, instancedIndex: undefined, hoverState: 'none'},
    {x: 12, z: 14, instancedIndex: undefined, hoverState: 'none'},
    {x: 13, z: 14, instancedIndex: undefined, hoverState: 'none'},
    {x: 14, z: 14, instancedIndex: undefined, hoverState: 'none'},
 
]

export enum ObjectType {
    Barrel = "barrel",
    Crate = "crate",
    LootSack = "lootSack",
}

export type ObjectProps = Coords & {
    type: ObjectType
}

// How tiles are positioned
export const map_objects: ObjectProps[] = [
    {x: 0, z: 10, type: ObjectType.Barrel},
    {x: 6, z: 14, type: ObjectType.Crate},
    {x: 6, z: 5, type: ObjectType.LootSack},
    {x: 8, z: 9, type: ObjectType.LootSack},
    {x: 8, z: 0, type: ObjectType.Crate},
    {x: 14, z: 4, type: ObjectType.Barrel},
]
