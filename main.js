import * as THREE from 'three'
//Orbit controls allow the camera to orbit around a target.
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

//Scenes allow you to set up what and where is to be rendered by three.js. This is where you place objects, lights and cameras.
const scene = new THREE.Scene()

//BoxGeometry is a geometry class for a rectangular cuboid with a given 'width', 'height', and 'depth'. On creation, the cuboid is centred on the origin, with each edge parallel to one of the axes.
const cubeGeometry = new THREE.BoxGeometry(1,1,1)
//A material for drawing geometries in a simple shaded (flat or wireframe) way.
const cubeMaterial = new THREE.MeshBasicMaterial({color: 'red'})

const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial)

scene.add(cubeMesh)

const aspectRatio = window.innerWidth/window.innerHeight
/**      CAMERA        **/
//This projection mode is designed to mimic the way the human eye sees. It is the most common projection mode used for rendering a 3D scene.
const camera = new THREE.PerspectiveCamera(35, window.innerWidth/window.innerHeight, 0.1, 30)

//In this projection mode, an object's size in the rendered image stays constant regardless of its distance from the camera.
//This can be useful for rendering 2D scenes and UI elements, amongst other things.
// const camera = new THREE.OrthographicCamera(-1*aspectRatio,1*aspectRatio,1,-1,0.1,200)

//position the camera
//this position exists on any 3d object, and decide how far or close the object is from the camera
camera.position.z = 5

//Entry point
const canvas = document.querySelector('canvas.threejs')

//responsible for rendering your 3D scene to the canvas using WebGL
const renderer = new THREE.WebGLRenderer({canvas, antialias: true})

//Set the window size in which you want to show the render, 
//instantiate orbit controls
const controls = new OrbitControls(camera,canvas)
controls.enableDamping = true
controls.autoRotate = true

//To match initial aspect ratio with the screen size at start
renderer.setSize(window.innerWidth, window.innerHeight)

//Setting Anialiasing with device pixel ratio if you have a high pixel device
const maxPixelRatio = Math.min(window.devicePixelRatio, 2)
renderer.setPixelRatio(maxPixelRatio)
// console.log(window.devicePixelRatio)


//Controls the aspect ratio of camera and renderer when window resizes
window.addEventListener('resize', ()=>{
  camera.aspect = window.innerWidth/window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
})

//Render Loop for handling the orbit controls, so that whenever the camera or render is update the snap is regenerated
const rerender = () => {
  controls.update()
  renderer.render(scene, camera)
  //For syncing with the frame rate of your device, so that we must not exceed provided resources
  window.requestAnimationFrame(rerender)
}

rerender()



//Know about device pixel ratio
// window.devicePixelRatio