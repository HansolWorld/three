// import * as THREE from 'three';

// export class Planet {
// 	constructor(info) {
// 		this.x = info.x;
// 		this.ratio = 0.001*info.ratio

// 		info.gltfLoader.load(
// 			info.modelSrc,
// 			glb => {
// 				this.mesh = glb.scene.children[0];

// 				this.mesh.castShadow = true;
// 				this.mesh.position.set(this.x, 0, 0);


// 				this.mesh.scale.set(this.ratio, this.ratio, this.ratio)
// 				info.scene.add(this.mesh);

// 				// const box = new THREE.Box3().setFromObject(this.mesh);
// 				// const size = box.getSize();
// 				// console.log(size)
// 			}
// 		);
// 	}
// }


import * as THREE from "three";

export class Planet {
  constructor(radius, positionX, textureFile) {
    this.radius = radius;
    this.positionX = positionX;
    this.textureFile = textureFile;
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