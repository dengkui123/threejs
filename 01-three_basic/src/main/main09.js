import * as THREE from "three";
import { CubeCamera } from "three";
// 导入轨道控制器
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// 导入动画库
import gsap from "gsap";
// 导入dat.gui
import * as dat from "dat.gui";
// 目标： 导入dat.gui
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
cube.position.x = 0;

// // 缩放
// cube.scale.set(3, 2, 1);
// cube.scale.x = 4;

// // 旋转
// cube.rotation.set(Math.PI / 4, 0, 0);
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

// 设置控制器阻尼，让控制器更有真实效果，必须在动画循环里调用.update()
controls.enableDamping = true;

// 添加坐标轴辅助器
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

// 设置时钟
const clock = new THREE.Clock();

// 设置动画gsap
// const animate1 = gsap.to(cube.position, {
//   x: 5,
//   duration: 5,
//   ease: "power1.inOut",
//   // 重复运动
//   repeat: -1,
//   // 往返运动
//   yoyo: true,
//   // delay, 延迟2秒运动
//   delay: 2,
//   onComplete: () => {
//     console.log("动画完成");
//   },
//   onStart: () => {
//     console.log("动画开始");
//   },
// });
// gsap.to(cube.rotation, {
//   x: 2 * Math.PI,
//   duration: 5,
//   // 重复运动
//   repeat: -1,
//   // 往返运动
//   yoyo: true,
//   ease: "power1.inOut",
// });

window.addEventListener("dblclick", () => {
  // 双击控制屏幕进入全屏，退出全屏
  if (!document.fullscreenElement) {
    // 进入全屏
    renderer.domElement.requestFullscreen();
  } else {
    // 退出全屏
    document.exitFullscreen();
  }
});

// 创建dat.gui
const gui = new dat.GUI();
// 添加修改属性控制
gui
  .add(cube.position, "x")
  .min(0)
  .max(5)
  .step(0.01)
  .name("移动x轴")
  .onChange((value) => {
    console.log("数值修改时触发", value);
  })
  .onFinishChange((value) => {
    console.log("完全停下来时候触发", value);
  });

const params = {
  color: "#ffff00",
  fn: () => {
    // 让立方体运动起来
    gsap.to(cube.position, { x: 5, duration: 2, yoyo: true, repeat: -1 });
  },
};
// 修改颜色
gui
  .addColor(params, "color")
  .name("颜色")
  .onChange((value) => {
    console.log("值被修改", value);
    cube.material.color.set(value);
  });
// 显示隐藏物体，设置选项框
gui.add(cube, "visible").name("是否显示");

// 设置按钮点击触发某个事件
gui.add(params, "fn").name("立方体运动");

// 文件夹功能
const folder = gui.addFolder("设置立方体");
folder.add(cube.material, "wireframe");

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
