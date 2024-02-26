import * as THREE from "three";
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

export enum Passes {
    UnrealBloomPass,
}

export class Postprocessing {
    _composer: EffectComposer

    constructor(
        renderer: THREE.WebGLRenderer, 
        scene: THREE.Scene, 
        camera: THREE.Camera, 
        sizes: {width: number, height: number},
        passes: Passes[]
    ) {
        this._composer = new EffectComposer(renderer)
        this._composer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        this._composer.setSize(sizes.width, sizes.height)

        const renderPass = new RenderPass(scene, camera)
        this._composer.addPass(renderPass)
        if (passes.includes(Passes.UnrealBloomPass)) {
            const unrealBloomPass = new UnrealBloomPass(new THREE.Vector2(sizes.width, sizes.height), .2, 1.4, .4)
            this._composer.addPass(unrealBloomPass)
        }
    }

    render() {
        this._composer.render()
    }
}