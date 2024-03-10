import Terrain from "../classes/Terrain"
import { Coords } from "../settings"

export type TerrainTile = Coords & {
    canWalk: boolean
}

export const terrainState: {
    terrain: Terrain | null
    TILES_CLICKED: TerrainTile
    TILE_HOVERED: TerrainTile
} = {
    terrain: null,
    TILES_CLICKED: {x: 0, z: 0, canWalk: false},
    TILE_HOVERED: {x: 0, z: 0, canWalk: false}
}