import { Coords } from "../settings";
import { isObstacleInCoord } from "./isObstacleInCoord";

export function adjacentCoords(coords: Coords) {
    if (coords.x !== null && coords.z !== null)
    return [
      {x: coords.x, z: coords.z - 1},
      {x: coords.x + 1, z: coords.z},
      {x: coords.x, z: coords.z + 1},
      {x: coords.x - 1, z: coords.z},
    ]
}
export function adjacentAvailableCoords(coords: Coords, obstacles: Coords[]) {
    if (coords.x == null || coords.z == null) return []

    const adjacentCoords = []
    if (isObstacleInCoord(obstacles, {x: coords.x, z: coords.z - 1})) {
      adjacentCoords[0] = {x: coords.x, z: coords.z - 1}
    }
    if (isObstacleInCoord(obstacles, {x: coords.x + 1, z: coords.z})) {
      adjacentCoords[1] = {x: coords.x + 1, z: coords.z}
    }
    if (isObstacleInCoord(obstacles, {x: coords.x, z: coords.z + 1})) {
      adjacentCoords[2] = {x: coords.x, z: coords.z + 1}
    }
    if (isObstacleInCoord(obstacles, {x: coords.x - 1, z: coords.z})) {
      adjacentCoords[4] = {x: coords.x - 1, z: coords.z}
    }

    return adjacentCoords
}