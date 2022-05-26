import * as THREE from "three";

export class Planet {
	constructor(radius, positionX, textureFile) {
		this.radius = radius;
		this.positionX = positionX;
		this.textureFile = textureFile;
	}

	getPath() {
		const geometry = new THREE.TorusGeometry( this.positionX, 0.01, 2, 100 );
		const material = new THREE.MeshBasicMaterial( { color: 0xffff00, wireframe: true } );
		this.torus = new THREE.Mesh( geometry, material );
		this.torus.rotation.x = -Math.PI/2
		return this.torus
	}

	getMesh() {
		if (this.mesh === undefined || this.mesh === null) {
    		this.geometry = new THREE.SphereGeometry(this.radius, 64, 64);
    		const texture = new THREE.TextureLoader().load(this.textureFile);
    		const material = new THREE.MeshBasicMaterial({ map: texture });
    		this.mesh = new THREE.Mesh(this.geometry, material);
    		this.mesh.position.x += this.positionX;
    	}
    	return this.mesh;
  	}
}