import { Coords } from "../settings";

export function isObstacleInCoord(obstacles: Coords[], coords: Coords) {
    let isNotAnObstacle = true;
    for(let i = 0; i < obstacles.length; i++) {
        if (obstacles[i].x == coords.x && obstacles[i].z == coords.z) {
            isNotAnObstacle = false;
            break;
        }
    }
    return isNotAnObstacle
}