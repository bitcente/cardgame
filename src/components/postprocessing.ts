import * as THREE from "three";
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { SMAAPass } from 'three/examples/jsm/postprocessing/SMAAPass.js';
import { GammaCorrectionShader } from 'three/examples/jsm/shaders/GammaCorrectionShader.js';
import { Sizes } from "../scripts/types";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass";
import { global } from "../states/global";

export enum Passes {
    UnrealBloomPass,
    GammaCorrection,
    SMAAPass
}

export class Postprocessing {
    _composer: EffectComposer

    constructor(
        renderer: THREE.WebGLRenderer, 
        sizes: {width: number, height: number},
        passes: Passes[]
    ) {
        this._composer = new EffectComposer(renderer)
        this._composer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        this._composer.setSize(sizes.width, sizes.height)

        const renderPass = new RenderPass(global.scene!, global.camera!)
        this._composer.addPass(renderPass)
        if (passes.includes(Passes.UnrealBloomPass)) {
            const unrealBloomPass = new UnrealBloomPass(new THREE.Vector2(sizes.width, sizes.height), .2, 1.4, .4)
            this._composer.addPass(unrealBloomPass)
        }
        // color adjustment
        if (passes.includes(Passes.GammaCorrection)) {
            const gammaCorrectionPass = new ShaderPass(GammaCorrectionShader)
            this._composer.addPass(gammaCorrectionPass)
        }
        // antialias
        if (passes.includes(Passes.SMAAPass)/*  && renderer.getPixelRatio() === 1 && !renderer.capabilities.isWebGL2 */) { // performance
            const smaaPass = new SMAAPass(sizes.width, sizes.height)
            this._composer.addPass(smaaPass)
        }
    }

    render() {
        this._composer.render()
    }

    public setSize(sizes: Sizes) {
        this._composer.setSize(sizes.width, sizes.height)
    }
}