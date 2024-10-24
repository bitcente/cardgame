import { entityList } from "../classes/Entity";
import { Coords, map_objects } from "../settings";
import { playerState } from "../states/player";

export function isObstacleInCoord(coords: Coords) {
    let isNotAnObstacle = true;
    const playerPos = playerState.PLAYER.character.position
    for(let i = 0; i < entityList.length; i++) {
        const posX = entityList[i].position?.x ?? 0
        const posZ = entityList[i].position?.z ?? 0
        if (posX === coords.x && posZ === coords.z && entityList[i].position !== playerPos) {
        /* if (map_objects[i].x == coords.x && map_objects[i].z == coords.z && map_objects[i].destroyed !== true) { */
            isNotAnObstacle = false;
            break;
        }
    }
    return isNotAnObstacle
}