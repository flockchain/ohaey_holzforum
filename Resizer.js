import './style.css'

import * as THREE from 'three';

const setSize = (camera, renderer) => {
    camera.aspect =  window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix;

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
};

class Resizer
{
    constructor(camera, renderer)
    {
        setSize(camera, renderer);

        window.addEventListener('resize', () => {
            setSize(camera, renderer);
            this.onResize();
        });
    }

    onResize(){

    }
}

export { Resizer };