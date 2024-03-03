import * as THREE from 'three';
import { global } from '../states/global';
import * as dat from "dat.gui";

interface ambientLightConfiguration {
    intensity: number
}
interface directionalLightConfiguration {
    castShadow: boolean
    shadowCamera?: {
        top?: number
        right?: number
        bottom?: number
        left?: number
        far?: number
        near?: number
    }
    enableHelper?: boolean
    shadowMapSize?: number
    position: THREE.Vector3
    target?: THREE.Vector3
    intensity: number
}

export default class Lights {
    _scene: THREE.Scene

    constructor() {

        const ambientLight = true
        const ambientLightConfiguration = {
            intensity: 1
        }
        const directionalLight = true
        const directionalLightConfiguration = {
            castShadow: true,
            shadowCamera: {
                top: 1,
                right: 8,
                bottom: -25,
                left: -18,
                far: 35,
            },
            shadowMapSize: 2048 * 2,
            position: new THREE.Vector3(14.5, 25.3, 10.1),
            target: new THREE.Vector3(30, -28.9, -2.9),
            intensity: 4,
            enableHelper: false
        }

        this._scene = global.scene!
        if (ambientLight && ambientLightConfiguration) {
            this.loadAmbientLight(ambientLightConfiguration)
        }
        if (directionalLight && directionalLightConfiguration) {
            this.loadDirectionalLight(directionalLightConfiguration)
        }
    }

    loadAmbientLight(conf: ambientLightConfiguration) {
        this._scene.add(new THREE.AmbientLight(0xffffff, conf.intensity));
    }

    loadDirectionalLight(conf: directionalLightConfiguration) {
        //const gui = new dat.GUI()
        const directionalLight = new THREE.DirectionalLight(0xffffff, 4);
        directionalLight.position.set(conf.position.x, conf.position.y, conf.position.z);
        /* gui.add(directionalLight.position, 'x', -100, 100, 0.1)
        gui.add(directionalLight.position, 'y', -100, 100, 0.1)
        gui.add(directionalLight.position, 'z', -100, 100, 0.1) */
        // SHADOWS
        if (conf.castShadow) {
            directionalLight.castShadow = true
            if (conf.shadowCamera) {
                if (conf.shadowCamera.top) directionalLight.shadow.camera.top = conf.shadowCamera.top
                if (conf.shadowCamera.right) directionalLight.shadow.camera.right = conf.shadowCamera.right
                if (conf.shadowCamera.bottom) directionalLight.shadow.camera.bottom = conf.shadowCamera.bottom
                if (conf.shadowCamera.left) directionalLight.shadow.camera.left = conf.shadowCamera.left
                if (conf.shadowCamera.far) directionalLight.shadow.camera.far = conf.shadowCamera.far
                if (conf.shadowCamera.near) directionalLight.shadow.camera.near = conf.shadowCamera.near
            }
            if (conf.shadowMapSize) directionalLight.shadow.mapSize.set(conf.shadowMapSize, conf.shadowMapSize)
        }

        // Shadow correction on models
        directionalLight.shadow.normalBias = 0.02

        // Shadow helper
        if (conf.enableHelper) {
            const directionalLightHelher = new THREE.CameraHelper(directionalLight.shadow.camera)
            this._scene.add(directionalLightHelher)
        }

        if (conf.target) {
            directionalLight.target.position.set(conf.target.x, conf.target.y, conf.target.z)
            directionalLight.target.updateMatrixWorld()
            /* gui.add(directionalLight.target.position, 'x', -100, 100, 0.1).onChange(() => directionalLight.target.updateMatrixWorld())
            gui.add(directionalLight.target.position, 'y', -100, 100, 0.1).onChange(() => directionalLight.target.updateMatrixWorld())
            gui.add(directionalLight.target.position, 'z', -100, 100, 0.1).onChange(() => directionalLight.target.updateMatrixWorld()) */
        }

        this._scene.add(directionalLight);

        global.UPDATE.push(this.updateDirectionalLights.bind(this))
    }

    updateDirectionalLights() {
    }
}