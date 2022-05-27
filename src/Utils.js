import * as THREE from "three";
import {CSS2DObject} from "three/examples/jsm/renderers/CSS2DRenderer.js"


export function getPath(radius, color=0xffff00) {
    const geometry = new THREE.TorusGeometry( radius, 0.01, 2, 100 );
    const material = new THREE.MeshBasicMaterial( { color: color, wireframe: true } );
    const path = new THREE.Mesh( geometry, material)
    path.rotation.x = -Math.PI/2
    return path
}


export function getLabel(mesh, text, position=0, className="label") {
    const div = document.createElement("div");
    div.className = className
    div.textContent = text;
    div.style.marginTop = "-1em";

    const label = new CSS2DObject(div);
    label.position.set( 0, position, 0 );
    mesh.add(label);
}