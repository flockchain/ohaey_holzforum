import './style.css'

import * as THREE from 'three';

import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

import {Resizer} from './Resizer';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'), antialias: true
})

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize( window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);

const geometry = new THREE.TorusGeometry( 35, 1, 16, 100);
const material = new THREE.MeshStandardMaterial( {color: 0xFF6347} );
const torus = new THREE.Mesh( geometry, material );

scene.add(torus);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

const controls = new OrbitControls(camera, renderer.domElement);

const treeTexture = new THREE.TextureLoader().load('Wald.jpg');
scene.background = treeTexture;


//Pictures
const pic1Texture = new THREE.TextureLoader().load('pic1.jpg');
const pic1 = new THREE.Mesh(
  new THREE.BoxGeometry(7, 7, 7),
  new THREE.MeshBasicMaterial( { map: pic1Texture } )
);
pic1.position.set(18, 7, -20);
const pic2Texture = new THREE.TextureLoader().load('pic23.jpg');
const pic2 = new THREE.Mesh(
  new THREE.BoxGeometry(7, 7, 7),
  new THREE.MeshBasicMaterial( { map: pic2Texture } )
);
pic2.position.set(12, -6, 4);

//Animation
function animate()
{
  requestAnimationFrame( animate );

  pic1.rotation.x += 0.01;
  pic1.rotation.y += 0.005;
  pic1.rotation.z += 0.01;

  pic2.rotation.x += 0.01;
  pic2.rotation.y += 0.005;
  pic2.rotation.z += 0.01;
  // torus.rotation.y += 0.005;

  controls.update;

  renderer.render( scene, camera);
}

animate();


scene.add(pic1, pic2);

function moveCamera()
{
  const t = document.body.getBoundingClientRect().top;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.position.y = t * -0.0002;
}

document.body.onscroll = moveCamera;

const resizer = new Resizer(camera, renderer);
resizer.onResize = () => {
  this.render();
};