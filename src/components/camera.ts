import { OrthographicCamera } from "three"
import { sizes } from "../states/screen";
import { global } from "../states/global";

export default class Camera extends OrthographicCamera {

    constructor() {
        super(
            sizes.width * -.5, 
            sizes.width * .5, 
            sizes.height * .5, 
            sizes.height * -.5, 
            -30, 
            100
        )
        this.zoom = 55
        this.position.x = 10
        this.position.y = 10
        this.position.z = 10
        this.updateProjectionMatrix()

        global.camera = this
    }
}