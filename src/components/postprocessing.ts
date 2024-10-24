import * as THREE from "three";
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { SMAAPass } from 'three/examples/jsm/postprocessing/SMAAPass.js';
import { GammaCorrectionShader } from 'three/examples/jsm/shaders/GammaCorrectionShader.js';
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass.js';
import { Sizes } from "../scripts/types";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass";
import { global } from "../states/global";

export enum Passes {
    UnrealBloomPass,
    GammaCorrection,
    SMAAPass,
    OutlinePass
}

export let outlinePassSelf: OutlinePass
export let outlinePassEnemy: OutlinePass

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


       /*  const renderPass2 = new RenderPass(global.sceneCards!, global.cameraCards!)
        this._composer.addPass(renderPass2)

        renderPass2.renderToScreen = true;
        renderPass2.clear = false;
        renderPass2.clearDepth = false; */

        if (passes.includes(Passes.UnrealBloomPass)) {
            const unrealBloomPass = new UnrealBloomPass(new THREE.Vector2(sizes.width, sizes.height), .2, 1.4, .4)
            this._composer.addPass(unrealBloomPass)
        }
        // outlines
        if (passes.includes(Passes.OutlinePass)) {
            outlinePassSelf = new OutlinePass( new THREE.Vector2( window.innerWidth, window.innerHeight ), global.scene!, global.camera! );
            outlinePassSelf.edgeStrength = 6;
            outlinePassSelf.edgeGlow = 0;
            outlinePassSelf.edgeThickness = 1;
            outlinePassSelf.pulsePeriod = 0;
            outlinePassSelf.visibleEdgeColor.set( 'white' );
            outlinePassSelf.hiddenEdgeColor .set( 'white' );
            this._composer.addPass(outlinePassSelf);
        }
        if (passes.includes(Passes.OutlinePass)) {
            outlinePassEnemy = new OutlinePass( new THREE.Vector2( window.innerWidth, window.innerHeight ), global.scene!, global.camera! );
            outlinePassEnemy.edgeStrength = 6;
            outlinePassEnemy.edgeGlow = 0;
            outlinePassEnemy.edgeThickness = 1;
            outlinePassEnemy.pulsePeriod = 0;
            outlinePassEnemy.visibleEdgeColor.set( 'red' );
            outlinePassEnemy.hiddenEdgeColor .set( 'red' );
            this._composer.addPass(outlinePassEnemy);
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