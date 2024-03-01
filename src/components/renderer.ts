import { Sizes } from "../scripts/types";
import * as THREE from "three";

interface RendererProps {
    sizes: Sizes, 
    enableShadowMap?: boolean, 
    toneMapping?: THREE.ToneMapping
    shadowMapType?: THREE.ShadowMapType
    antialias?: boolean
}

export default class Renderer {
    _renderer: THREE.WebGLRenderer
    _sizes: Sizes

    constructor({
        sizes, 
        enableShadowMap, 
        toneMapping,
        shadowMapType,
        antialias
    }: RendererProps) {

        this._sizes = sizes
        this._renderer = new THREE.WebGLRenderer({ antialias: (antialias ? antialias : false) });
        this._renderer.setSize(this._sizes.width, this._sizes.height);
        document.body.appendChild(this._renderer.domElement);

        if (enableShadowMap) {
            this._renderer.shadowMap.enabled = true;
        }
        if (toneMapping) {
            this._renderer.toneMapping = THREE.ReinhardToneMapping;
        }
        if (shadowMapType) {
            this._renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        }
    }

    public getRenderer() {
        return this._renderer
    }
    public getDomElement() {
        return this._renderer.domElement
    }
    public setSize(sizes: Sizes) {
        this._renderer.setSize(sizes.width, sizes.height)
    }
}