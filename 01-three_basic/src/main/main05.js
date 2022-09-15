import * as THREE from "three";
import { CubeCamera } from "three";
// 导入轨道控制器
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// 1. 创建场景
const scene = new THREE.Scene();

// 2. 创建相机
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.set(0, 0, 10);
scene.add(camera);

// 添加物体
// 创建几何体
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({
  color: 0xffff00,
});
const cube = new THREE.Mesh(cubeGeometry, material);

// 修改物体的位置
cube.position.set(5, 0, 0);
cube.position.x = 3;

// 缩放
cube.scale.set(3, 2, 1);
cube.scale.x = 4;

// 旋转
cube.rotation.set(Math.PI / 4, 0, 0);
// cube.rotateY(Math.PI / 4);
// 将几何体添加到场景中
scene.add(cube);

// 初始化渲染器
const renderer = new THREE.WebGLRenderer();
// 设置渲染的尺寸大小
renderer.setSize(window.innerWidth, window.innerHeight);
console.log(renderer);
// 将 webgl 渲染的 cavans 内容添加到 body
document.body.appendChild(renderer.domElement);
// // 使用渲染器，通过相机将场景渲染进来
// renderer.render(scene, camera);

// 创建轨道控制器
const controls = new OrbitControls(camera, renderer.domElement);

// 添加坐标轴辅助器
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

// 设置时钟
const clock = new THREE.Clock();
function render() {
  let time = clock.getElapsedTime();
  console.log("时钟运行总时长：", time);
  // let deltaTime = clock.getDelta();
  // console.log("两次获取时间的间隔时间：", deltaTime);
  let t = time % 5;
  cube.position.x = t * 1;

  renderer.render(scene, camera);
  // 渲染下一帧的时候再次调用render函数
  requestAnimationFrame(render);
}

render();