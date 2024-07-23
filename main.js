import * as THREE from 'three'
//Orbit controls allow the camera to orbit around a target.
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { label, max, min } from 'three/examples/jsm/nodes/Nodes.js';

import { Pane } from 'tweakpane';

const pane =  new Pane()
console.log(pane)

//Scenes allow you to set up what and where is to be rendered by three.js. This is where you place objects, lights and cameras.
const scene = new THREE.Scene()

//BoxGeometry is a geometry class for a rectangular cuboid with a given 'width', 'height', and 'depth'. On creation, the cuboid is centred on the origin, with each edge parallel to one of the axes.
let cubeGeometry = new THREE.BoxGeometry(1,1,1,12,12,12)

const planeParameters ={
  width: 1,
  height: 1
}

//A material for drawing geometries in a simple shaded (flat or wireframe) way.
const cubeMaterial = new THREE.MeshBasicMaterial({color: 'red', wireframe: true})

const firstMesh = new THREE.Mesh(cubeGeometry, cubeMaterial)
/*ADDING Meshes to a group
// const secondMesh = new THREE.Mesh(cubeGeometry, cubeMaterial)
// secondMesh.position.x = 2
// const thirdMesh = new THREE.Mesh(cubeGeometry, cubeMaterial)
// thirdMesh.position.x = -2

// const group = new THREE.Group()
// group.add(firstMesh)
// group.add(secondMesh)
 group.add(thirdMesh)*/


 /*Pane Configurtion*/
const planeFolders = pane.addFolder({
  title: "Dimenstions"
})

planeFolders.addBinding(planeParameters, 'width', {
  min: 0,
  max:10,
  step: 0.1,
  label: 'Widht'
}).on('change',(ev)=>{
  cubeGeometry = new THREE.BoxGeometry(planeParameters.width, planeParameters.height, 1,12,12,12)
  firstMesh.geometry = cubeGeometry
})


planeFolders.addBinding(planeParameters, 'height', {
  min: 0,
  max:10,
  step: 0.1,
  label: 'height'
}).on('change',()=>{
  cubeGeometry = new THREE.BoxGeometry(planeParameters.width, planeParameters.height, 1,12,12,12)
  firstMesh.geometry = cubeGeometry
})


// scene.add(group)

//Adding visual representation of axes in scene
const axesHelper = new THREE.AxesHelper(2);
//axes hlper can be added to the scene as well as mesh
// scene.add(axesHelper)
firstMesh.add(axesHelper)
scene.add(firstMesh)

/*PANE CONFIGURATIONS*/
// pane.addBinding(firstMesh.scale, 'x', {
//   min: 0,
//   max: 10,
//   step: 0.1,
//   label: 'Scale X'
// })
// pane.addBinding(firstMesh.scale, 'y', {
//   min: 0,
//   max: 10,
//   step: 0.1,
//   label: 'Scale Y'
// })
// pane.addBinding(firstMesh.scale, 'z', {
//   min: 0,
//   max: 10,
//   step: 0.1,
//   label: 'Scale Z'
// })

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

//Scale and Position
//Every mesh inherits methods from 3d objects, so they also inherit properties like these. we can set all the scale axis together with scale.set(x,y,z)

//Deg units selector
// THREE.MathUtils.degToRad('degree in numbers')