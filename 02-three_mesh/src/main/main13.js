import * as THREE from "three";
// 导入轨道控制器
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// 导入动画库
import gsap from "gsap";
// 导入dat.gui
import * as dat from "dat.gui";
// 目标： 环境贴图envMap（6张图）

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

// 设置cube纹理加载器
const cubeTextureLoader = new THREE.CubeTextureLoader();
const envMapTexture = cubeTextureLoader.load([
  "./textures/environmentMaps/2/px.jpg",
  "./textures/environmentMaps/2/nx.jpg",
  "./textures/environmentMaps/2/py.jpg",
  "./textures/environmentMaps/2/ny.jpg",
  "./textures/environmentMaps/2/pz.jpg",
  "./textures/environmentMaps/2/nz.jpg",
]);

// 添加物体
const sphereGeometry = new THREE.SphereGeometry(1, 20, 20);
const material = new THREE.MeshStandardMaterial({
  metalness: 0.7,
  roughness: 0,
  // envMap: envMapTexture,  // 给物体添加环境贴图
});
const sphere = new THREE.Mesh(sphereGeometry, material);
scene.add(sphere);
// 给场景添加背景
scene.background = envMapTexture;
// 给场景所有物体添加默认的环境贴图
scene.environment = envMapTexture;
// 灯光
// 环境光
const ambientLight = new THREE.AmbientLight(0xffffff);

// 直线光源
const directionalLight = new THREE.DirectionalLight(0xffffff);
directionalLight.position.set(10, 10, 10);
scene.add(ambientLight);

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

// 设置控制器阻尼，让控制器更有真实效果，必须在动画循环里调用.update()
controls.enableDamping = true;

// 添加坐标轴辅助器
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

// 渲染函数
function render() {
  controls.update();
  renderer.render(scene, camera);
  // 渲染下一帧的时候再次调用render函数
  requestAnimationFrame(render);
}

render();

// 监听画面的变化，更新渲染画面
window.addEventListener("resize", () => {
  // 更新摄像头
  camera.aspect = window.innerWidth / window.innerHeight;
  // 更新摄像机的投影矩阵
  camera.updateProjectionMatrix();

  // 更新渲染器
  renderer.setSize(window.innerWidth, window.innerHeight);
  // 设置渲染器的像素比
  renderer.setPixelRatio(window.devicePixelRatio);
});
