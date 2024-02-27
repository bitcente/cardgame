import gsap from "gsap";
import { Coords, map_objects } from "../settings";
import { adjacentAvailableCoords, adjacentCoords } from "../scripts/adjacentCoords";
import { isObstacleInCoord } from "../scripts/isObstacleInCoord";


function containsObject(obj: Coords, list: any) {
  var i;
  for (i = 0; i < list.length; i++) {
    if (list[i].x === obj.x && list[i].z === obj.z) {
      return true;
    }
  }

  return false;
}

export function pathFind(origin: Coords, target: Coords): Coords[] {
  if (origin.x == null || origin.z == null || target.x == null || target.z == null) return []

  const xDiff = Math.abs(origin.x - target.x)
  const zDiff = Math.abs(origin.z - target.z)

  let path: Coords[] = []
  const obstacles = map_objects

  let open: { x: any; z: any; fCost: number; gCost: number; hCost: number; last: any}[] = []
  const closed: any[] = []
  const startingNode = {x: origin.x, z: origin.z, fCost: xDiff + zDiff, gCost: 0, hCost: 0, last: {x: 0, z: 0}}
  open.push(startingNode)

  let pathFound = false

  while (open.length > 0 || !pathFound) {
    const current: any = open.reduce(function(prev, curr) {
      return prev.fCost < curr.fCost ? prev : curr;
    })
    for (let i = open.length - 1; i >= 0; i--) {
      if (open[i].x === current.x && open[i].z === current.z) {
        open.splice(i, 1);
        break;
      }
    }
    
    closed.push(current)

    if ((current.x == target.x && current.z == target.z)) {
      let cNode = current
      
      while (!(cNode.x == startingNode.x && cNode.z == startingNode.z)) {
        path.push({x: cNode.x, z: cNode.z})
        cNode = cNode.last
      }
      path.reverse()

      open = []
      pathFound = true
    } else {
      
      const adjacentTiles = adjacentAvailableCoords({x: current.x, z: current.z}, obstacles)
      if (adjacentTiles) {
        adjacentTiles.forEach((adjacentTile) => {
          if (!containsObject(adjacentTile, closed)) {
            const newCost = current.gCost + 1
            const hCost = Math.abs(adjacentTile.x - target.x!) + Math.abs(adjacentTile.z - target.z!)
            if (!containsObject(adjacentTile, open) ) {
              if (!open.some(e => e.x === adjacentTile.x && e.z === adjacentTile.z)) {
                const adjacentObject = {
                  x: adjacentTile.x,
                  z: adjacentTile.z,
                  gCost: newCost,
                  hCost: hCost,
                  fCost: newCost + hCost,
                  last: current
                }
                open.push(adjacentObject)
                
              }
            }
          }
        })
      }

    }
  }

  return path
}

export function moveObjectTo(targetObject: any, x: number, z: number, obstacles: Coords[], endCallback?: () => any) {
  if (!targetObject.current) return

  const object = targetObject.current

  const objectX = object.position.x
  const objectZ = object.position.z





  const movementTimeline = gsap.timeline({
    defaults: {
      ease: "linear",
    },
    paused: true,
  })
      
  movementTimeline.eventCallback("onComplete", function() {
    if (endCallback) {
      endCallback()
    }
    movementTimeline.kill()
  })

  let path: Coords[] = pathFind({ x: objectX, z: objectZ }, { x, z })

  let lastAxises = {x: objectX, z: objectZ}
  let lastRotY = object.rotation.y
  
  path.forEach((axis) => {
    if (axis.x == null || axis.z == null) return

    let rotY = null
    if (axis.x < lastAxises.x && lastRotY != Math.PI * -.5) {
      rotY = Math.PI * -.5
      lastRotY = rotY
    } else if (axis.x > lastAxises.x && lastRotY != Math.PI * .5) {
      rotY = Math.PI * .5
      lastRotY = rotY
    }
    if (axis.z < lastAxises.z && (lastRotY != Math.PI && lastRotY != -Math.PI)) {
      if (lastRotY == Math.PI * .5) {
        rotY = Math.PI
      } else {
        rotY = -Math.PI
      }
      lastRotY = rotY
    } else if (axis.z > lastAxises.z && lastRotY != 0) {
      rotY = 0
      lastRotY = rotY
    }

    if (rotY !== null) {
      movementTimeline.to(object.rotation, {
        y: rotY,
        duration: .3,
        ease: "linear",
      })
    }
    
    movementTimeline.to(object.position, {
      x: axis.x,
      z: axis.z,
      duration: .3,
      ease: "linear",
    })

    lastAxises = axis
  })

  movementTimeline.play()
}