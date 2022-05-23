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
	75,
	window.innerWidth / window.innerHeight,
	0.1,
	1000
);
camera.position.set(0, 50, 100);
camera.lookAt(0, 0, 0)
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);


// Light
const ambientLight = new THREE.AmbientLight('white', 1);
scene.add(ambientLight);

// const spotLight = new THREE.SpotLight('white', 0.7);
// spotLight.position.set(0, 0, 0);
// spotLight.castShadow = true;
// spotLight.shadow.mapSize.width = 1024;
// spotLight.shadow.mapSize.height = 1024;
// spotLight.shadow.camera.near = 1;
// spotLight.shadow.camera.far = 200;
// scene.add(spotLight);

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

// const sun = new Planet({ gltfLoader, scene, modelSrc: '/obj/Sun.glb', x: 0, ratio: 109});
// const mercury = new Planet({ gltfLoader, scene, modelSrc: '/obj/Mercury.glb', x: 4, ratio: 0.38});
// const venus = new Planet({ gltfLoader, scene, modelSrc: '/obj/Venus.glb', x: 7, ratio: 0.95});
// const earth = new Planet({ gltfLoader, scene, modelSrc: '/obj/EarthClouds.glb', x: 10, ratio: 1});
// const mars = new Planet({ gltfLoader, scene, modelSrc: '/obj/Mars.glb', x: 15, ratio: 0.52});


const sun = new Planet(8, 0, "/obj/sun.jpeg").getMesh();
scene.add(sun)

const mercury = new Planet(2, 20, "/obj/mercury.png").getMesh();
const mercuryGroup = new THREE.Group()
mercuryGroup.add(mercury)
scene.add(mercuryGroup)

const venus = new Planet(3, 35, "/obj/venus.jpeg").getMesh();
const venusGroup = new THREE.Group()
venusGroup.add(venus)
scene.add(venusGroup)

const earth = new Planet(4, 50, "/obj/earth.jpeg").getMesh();
const earthGroup = new THREE.Group()
earthGroup.add(earth)
scene.add(earthGroup)

const mars = new Planet(3, 75, "/obj/mars.jpeg").getMesh();
const marsGroup = new THREE.Group()
marsGroup.add(mars)
scene.add(marsGroup)


// 그리기
const clock = new THREE.Clock();

function draw() {
	const delta = clock.getDelta();

	// sunGroup.rotation.y += delta
	mercuryGroup.rotation.y += delta / 2.4
	venusGroup.rotation.y += delta / 6.2
	earthGroup.rotation.y += delta / 10
	marsGroup.rotation.y += delta / 19
	
	sun.rotation.y += delta / 0.7
	mercury.rotation.y += delta / 1.6
	venus.rotation.y += delta / 6.7
	earth.rotation.y += delta / 0.02
	mars.rotation.y += delta / 0.02
	

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
