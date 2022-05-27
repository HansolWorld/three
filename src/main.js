import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import { Planet } from './Planet';
import gsap from 'gsap';

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

const cubeTextureLoader = new THREE.CubeTextureLoader()

// Scene
const scene = new THREE.Scene();
scene.background = cubeTextureLoader.load([
	"./img/stars.jpg", "./img/stars.jpg",
	"./img/stars.jpg", "./img/stars.jpg",
	"./img/stars.jpg", "./img/stars.jpg"
])

// Camera
const camera = new THREE.PerspectiveCamera(
	75,
	window.innerWidth / window.innerHeight,
	0.1,
	1000
);
camera.position.set(0, 80, 100);
camera.lookAt(0, 0, 0)
camera.layers.enableAll()
scene.add(camera);

// // Controls
const controls = new OrbitControls(camera, renderer.domElement);

// Light
const ambientLight = new THREE.AmbientLight('white', 2);
ambientLight.layers.enableAll()
scene.add(ambientLight);

// Mesh
const sunPlanet = new Planet(8, 0, "./img/sun.jpeg");
const sun = sunPlanet.getMesh()
sun.layers.enableAll()
scene.add(sun)

const sunDiv = document.createElement( 'div' );
sunDiv.className = 'label';
sunDiv.textContent = 'Sun';
sunDiv.style.marginTop = '-1em';
const sunLabel = new CSS2DObject( sunDiv );
sunLabel.position.set( 0, 8, 0 );
sun.add( sunLabel );
sunLabel.layers.set( 1 );

const mercury = new Planet(1, 20, "./img/mercury.png")
const mercuryGroup = new THREE.Group()
mercuryGroup.add(mercury.getMesh())
scene.add(mercuryGroup, mercury.getPath())

const venus = new Planet(2.5, 35, "./img/venus.jpeg")
const venusGroup = new THREE.Group()
venusGroup.add(venus.getMesh())
scene.add(venusGroup, venus.getPath())

const earth = new Planet(2.6, 0, "./img/earth.jpeg")
const earthGroup = new THREE.Group()

const moon = new Planet(0.4, 0, "./img/moon.jpg")
const moonGroup = new THREE.Group()
const moonRotationGroup = new THREE.Group()
moonGroup.add(moon.getMesh())
moonGroup.position.x = 6
moonRotationGroup.position.x = 50
moonRotationGroup.add(earth.getMesh(), moonGroup)
earthGroup.add(moonRotationGroup)

scene.add(earthGroup, earth.getPath())

const mars = new Planet(1.4, 75, "./img/mars.jpeg")
const marsGroup = new THREE.Group()
marsGroup.add(mars.getMesh())
scene.add(marsGroup, mars.getPath())


// 그리기
const clock = new THREE.Clock();
let time = 0

function draw() {
	const delta = clock.getDelta();

	// sunGroup.rotation.y += delta
	mercuryGroup.rotation.y += delta / 0.24
	venusGroup.rotation.y += delta / 0.62
	earthGroup.rotation.y += delta / 1
	moonRotationGroup.rotation.y += delta * 0.27
	marsGroup.rotation.y += delta / 1.9
	
	sun.rotation.y += delta / 0.07
	mercury.getMesh().rotation.y += delta / 0.16
	venus.getMesh().rotation.y += delta / 0.67
	// earth.getMesh().rotation.y += delta / 0.0027
	mars.getMesh().rotation.y += delta / 0.0028
	
	// for (var i = 0; i < positionArray.length; i += 3) {
	// 	positionArray[i] += Math.sin(time + randomArray[i] * 100) * 0.05;
	// 	positionArray[i + 1] += Math.sin(time + randomArray[i + 1] * 100) * 0.05;
	// 	positionArray[i + 2] += Math.sin(time + randomArray[i + 2] * 100) * 0.05;
	// }
	
	// sunGeometry.attributes.position.needsUpdate = true;
	// time++

	renderer.render(scene, camera);
	renderer.setAnimationLoop(draw);
}


function setSize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.render(scene, camera);
}

window.addEventListener('resize', setSize);

draw();
