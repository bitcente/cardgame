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
            intensity: .8
        }
        const directionalLight = true
        const directionalLightConfiguration = {
            castShadow: true,
            shadowCamera: {
                top: 5,
                right: 5,
                bottom: -5,
                left: -5,
                far: 10,
            },
            shadowMapSize: 2048,
            position: new THREE.Vector3(3, 6, 3),
            target: new THREE.Vector3(0, 1, 0),
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
        this._scene.add(new THREE.AmbientLight(0xffffff, .8));
    }

    loadDirectionalLight(conf: directionalLightConfiguration) {
        const directionalLight = new THREE.DirectionalLight(0xffffff, 4);
        directionalLight.position.set(conf.position.x, conf.position.y, conf.position.z);

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
        directionalLight.shadow.normalBias = 0.01

        // Shadow helper
        if (conf.enableHelper) {
            const directionalLightHelher = new THREE.CameraHelper(directionalLight.shadow.camera)
            this._scene.add(directionalLightHelher)
        }

        if (conf.target) {
            directionalLight.target.position.set(conf.target.x, conf.target.y, conf.target.z)
            directionalLight.target.updateMatrixWorld()
        }

        this._scene.add(directionalLight);
    }
}