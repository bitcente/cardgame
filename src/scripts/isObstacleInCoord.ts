import { Coords, map_objects } from "../settings";

export function isObstacleInCoord(coords: Coords) {
    let isNotAnObstacle = true;
    for(let i = 0; i < map_objects.length; i++) {
        if (map_objects[i].x == coords.x && map_objects[i].z == coords.z && map_objects[i].destroyed !== true) {
            isNotAnObstacle = false;
            break;
        }
    }
    return isNotAnObstacle
}