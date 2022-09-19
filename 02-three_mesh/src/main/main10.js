import * as THREE from "three";
import { CubeCamera, PlaneGeometry, Texture } from "three";
// 导入轨道控制器
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// 导入动画库
import gsap from "gsap";
// 导入dat.gui
import * as dat from "dat.gui";
// 目标： 标准网格材质 金属度metalness

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

// 导入纹理
const textureLoader = new THREE.TextureLoader();
const doorColorTexture = textureLoader.load("./textures/door/color.jpg");
const doorAlphaTexture = textureLoader.load("./textures/door/alpha.jpg");

const doorAoTexture = textureLoader.load(
  "./textures/door/ambientOcclusion.jpg"
);
// 导入置换贴图
const doorHeightTexture = textureLoader.load("./textures/door/height.jpg");
// 导入粗糙度贴图
const roughnessTexture = textureLoader.load("./textures/door/roughness.jpg");
// 导入金属贴图
const metalnessTexture = textureLoader.load("./textures/door/metalness.jpg");
// 添加物体
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1, 100, 100, 100);
// 材质

const standardMaterial = new THREE.MeshStandardMaterial({
  color: "#ffff00", // 设置材质颜色
  map: doorColorTexture, // 加载纹理
  alphaMap: doorAlphaTexture, // 设置透明纹理
  transparent: true, // 是否开启透明
  aoMap: doorAoTexture, // 设置环境遮挡贴图
  opacity: 1, // 设置透明度
  aoMapIntensity: 0.5, //设置环境遮挡贴图强度
  side: THREE.DoubleSide, // 设置渲染面
  displacementMap: doorHeightTexture, // 导入置换贴图
  displacementScale: 0.1,
  roughness: 1, // 粗糙度，0-镜面反射，1-漫反射
  roughnessMap: roughnessTexture, // 粗糙贴图
  metalness: 1, // 金属度
  metalnessMap: metalnessTexture, // 金属贴图
});
const cube = new THREE.Mesh(cubeGeometry, standardMaterial);
scene.add(cube);

// 添加平面
const planeGeometry = new THREE.PlaneGeometry(1, 1, 200, 200);
const plane = new THREE.Mesh(planeGeometry, standardMaterial);
plane.position.set(1.5, 0, 0);
scene.add(plane);
// 给平面设置第二组uv
planeGeometry.setAttribute(
  "uv2",
  new THREE.BufferAttribute(planeGeometry.attributes.uv.array, 2)
);

// 灯光
// 环境光
const ambientLight = new THREE.AmbientLight(0xffffff);

// 直线光源
const directionalLight = new THREE.DirectionalLight(0xffffff);
directionalLight.position.set(10, 10, 10);
scene.add(ambientLight, directionalLight);

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
