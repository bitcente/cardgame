import * as THREE from 'three';

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

interface LightProps {
    ambientLight?: boolean
    ambientLightConfiguration?: ambientLightConfiguration
    directionalLight?: boolean
    directionalLightConfiguration?: directionalLightConfiguration
}

export default class Lights {
    _scene: THREE.Scene

    constructor(
        scene: THREE.Scene, 
        { 
            ambientLight,
            ambientLightConfiguration,
            directionalLight,
            directionalLightConfiguration,
        }: LightProps
    ) {
        this._scene = scene
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