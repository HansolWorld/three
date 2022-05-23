import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Planet } from './Planet';
import gsap from 'gsap';

// ----- 주제: 스크롤에 따라 움직이는 3D 페이지

// Renderer
const canvas = document.querySelector('#three-canvas');
const renderer = new THREE.WebGLRenderer({
	canvas,
	antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// Scene
const scene = new THREE.Scene();
// scene.background = new THREE.Color('white');

// Camera
const camera = new THREE.PerspectiveCamera(
	100,
	window.innerWidth / window.innerHeight,
	0.1,
	100000
);
camera.position.set(0, 0, 10);
camera.lookAt(0, 0, 0)
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);


// Light
const ambientLight = new THREE.AmbientLight('white', 1);
scene.add(ambientLight);

const spotLight = new THREE.SpotLight('white', 0.7);
spotLight.position.set(0, 0, 0);
spotLight.castShadow = true;
spotLight.shadow.mapSize.width = 1024;
spotLight.shadow.mapSize.height = 1024;
spotLight.shadow.camera.near = 1;
spotLight.shadow.camera.far = 200;
scene.add(spotLight);

// const lightHelper = new THREE.SpotLightHelper(spotLight);
// scene.add(lightHelper);

const gltfLoader = new GLTFLoader();

// // Mesh
// const floorMesh = new THREE.Mesh(
// 	new THREE.PlaneGeometry(100, 100),
// 	new THREE.MeshStandardMaterial({ color: 'white' })
// );
// floorMesh.rotation.x = -Math.PI / 2;
// floorMesh.receiveShadow = true;
// scene.add(floorMesh);

const sun = new Planet({ gltfLoader, scene, modelSrc: '/obj/Sun.glb', x: 0, ratio: 109});
const mercury = new Planet({ gltfLoader, scene, modelSrc: '/obj/Mercury.glb', x: 4, ratio: 0.38});
const venus = new Planet({ gltfLoader, scene, modelSrc: '/obj/Venus.glb', x: 7, ratio: 0.95});
const earth = new Planet({ gltfLoader, scene, modelSrc: '/obj/EarthClouds.glb', x: 10, ratio: 1});
const mars = new Planet({ gltfLoader, scene, modelSrc: '/obj/Mars.glb', x: 15, ratio: 0.52});

// 그리기
const clock = new THREE.Clock();

function draw() {
	const delta = clock.getDelta();

	renderer.render(scene, camera);
	renderer.setAnimationLoop(draw);
}

function setSize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.render(scene, camera);
}

// 이벤트
// window.addEventListener('scroll', setSection);
window.addEventListener('resize', setSize);

draw();
