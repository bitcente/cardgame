import { Coords } from "../settings"

type TerrainTile = Coords & {
    canWalk: boolean
}

export const terrainState: {
    TILES_CLICKED: TerrainTile
    TILE_HOVERED: TerrainTile
} = {
    TILES_CLICKED: {x: 0, z: 0, canWalk: false},
    TILE_HOVERED: {x: 0, z: 0, canWalk: false}
}