// 作者：古柳 / 微信：xiaoaizhj 备注「可视化加群」欢迎进群交流
// 文章：「Three.js Shader 实现酷炫折射小球效果（上）- 牛衣古柳 - 20250429」
// 链接：https://mp.weixin.qq.com/s/wHW9mY5PxdxvTbr1SLhYww
// 链接：https://juejin.cn/post/7498555234072739840

// Using local Three.js files to avoid CORS issues
// THREE will be loaded via script tag in HTML

console.log('Refracted ball script loading...');

// Wait for THREE.js to be available
function initRefractedBall() {
    if (typeof THREE === 'undefined') {
        console.log('THREE.js not loaded yet, waiting...');
        setTimeout(initRefractedBall, 100);
        return;
    }
    
    console.log('THREE.js loaded, initializing refracted ball...');

let w = 300; // Fixed width for profile section (matches container - 100% larger)
let h = 300; // Fixed height for profile section (matches container - 100% larger)

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, w / h, 0.01, 1000);
camera.position.set(0, 0, 2);
camera.lookAt(new THREE.Vector3());

const renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(w, h);
renderer.setClearColor(0x000000, 0);

// Check if DOM is already loaded or wait for it
function initContainer() {
    const container = document.getElementById("refracted-ball-container");
    if (container) {
        container.appendChild(renderer.domElement);
        console.log('Refracted ball initialized successfully');
        // Start the animation loop
        render();
    } else {
        console.error('Refracted ball container not found');
    }
}

// Run immediately if DOM is ready, otherwise wait
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initContainer);
} else {
    initContainer();
}

// const controls = new OrbitControls(camera, renderer.domElement);

const vertex = /* GLSL */ `
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 eyeVector;

  void main () {
      vUv = uv;
      
      // vNormal = normal;
      // 旋转几何体时法向量重新计算，这样计算和光线的点积时也会改变 diffuse
      vNormal = normalize(normalMatrix * normal);

      vec4 worldPosition = modelMatrix * vec4(position, 1.0);

      // 相机坐标指向每个顶点坐标的向量 eyeVector 作为入射光的角度向量
      eyeVector = normalize(worldPosition.xyz - cameraPosition);

      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragment = /* GLSL */ `
  uniform float uTime;
  uniform sampler2D uTexture;
  // uniform vec2 uResolution;

  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 eyeVector;
  
  // https://gist.github.com/patriciogonzalezvivo/670c22f3966e662d2f83
  float hash(float n) { return fract(sin(n) * 1e4); }
  // float hash(vec2 p) { return fract(1e4 * sin(17.0 * p.x + p.y * 0.1) * (0.1 + abs(sin(p.y * 13.0 + p.x)))); }

  vec2 hash( vec2 p ){
    p = vec2( dot(p,vec2(127.1,311.7)),dot(p,vec2(269.5,183.3)));
    return fract(sin(p)*43758.5453);
  }

  void main() {
    // gl_FragColor = texture2D(uTexture, vUv);
    
    vec3 X = dFdx(vNormal);
    vec3 Y = dFdy(vNormal);
    vec3 normal = normalize(cross(X, Y));

    float diffuse = max(dot(normal, normalize(vec3(1.0))), 0.0);
    
    vec2 rand = hash(vec2(floor(diffuse * 10.0)));
    
    vec2 distortion = vec2(
        sign(rand.x - 0.5) * 1. + (rand.x - 0.5) * 0.6,
        sign(rand.y - 0.5) * 1. + (rand.y - 0.5) * 0.6
    );
    
    vec2 uv = distortion * gl_FragCoord.xy / vec2(1000.0);
    vec3 refracted = refract(eyeVector, normal, 1./3.);
    uv += vec2(0.2, 0.3) * refracted.xy;
    // uv += vec2(1., 1.) * refracted.xy;
    
    vec4 color = texture2D(uTexture, uv);
    float fresnel = pow(1.0 + dot(eyeVector, normal), 2.0);
    gl_FragColor = color * (1. - fresnel);
  }
`;

const loader = new THREE.TextureLoader();
let currentPattern = 1;
const patterns = [
  "./assets/backgrounds/pattern1.png",
  "./assets/backgrounds/pattern2.png", 
  "./assets/backgrounds/pattern3.png",
  "./assets/backgrounds/pattern4.png"
];

console.log('Loading texture:', patterns[currentPattern - 1]);
let texture = loader.load(
  patterns[currentPattern - 1],
  function(texture) {
    console.log('Texture loaded successfully:', patterns[currentPattern - 1]);
  },
  undefined,
  function(error) {
    console.error('Error loading texture:', patterns[currentPattern - 1], error);
  }
);
texture.wrapS = texture.wrapT = THREE.MirroredRepeatWrapping; // RepeatWrapping MirroredRepeatWrapping

const geometry = new THREE.IcosahedronGeometry(1, 2);
const material = new THREE.ShaderMaterial({
    extensions: {
      derivatives: "#extension GL_OES_standard_derivatives : enable",
    },
    // flatShading: true,
    vertexShader: vertex,
    fragmentShader: fragment,
    uniforms: {
      uTexture: { value: texture },
      uTime: { value: 0 },
      // uResolution: { value: new THREE.Vector2(w, h) },
    },
  });

const icon = new THREE.Mesh(geometry, material);
// scene.add(icon);

const vertex1 = /* GLSL */ `
  attribute vec3 aBary;

  varying vec2 vUv;
  varying vec3 vBary;

  void main () {
      vUv = uv;
      vBary = aBary;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragment1 = /* GLSL */ `
  varying vec2 vUv;
  varying vec3 vBary;

  void  main(){
      float width = 2.; // 2.0
      vec3 d = fwidth(vBary);
      // 作为颜色就是彩色线条
      vec3 s = smoothstep(d*(width + 0.5), d*(width - 0.5), vBary);
      // 类似向量线段，边缘无锯齿
      float line = max(s.x, max(s.y, s.z));
      // 显示出中间区域，显示出内部的球
      if(line < 0.1) discard;

      gl_FragColor = vec4(vBary, 1.);
      gl_FragColor = vec4(vec3(s), 1.);
      gl_FragColor = vec4(vec3(line), 1.);
      gl_FragColor = vec4(mix(vec3(1.0), vec3(0.), 1.-line), 1.);
  }
`;

const geometry1 = new THREE.IcosahedronGeometry(1.001, 2);
const count = geometry1.attributes.position.array.length / 3;
const bary = [];
for (let i = 0; i < count; i++) {
  bary.push(0, 0, 1, 0, 1, 0, 1, 0, 0);
}

let aBary = new Float32Array(bary);
geometry1.setAttribute("aBary", new THREE.BufferAttribute(aBary, 3));

const material1 = new THREE.ShaderMaterial({
  extensions: {
    derivatives: "#extension GL_OES_standard_derivatives : enable",
  },
  transparent: true,
  vertexShader: vertex1,
  fragmentShader: fragment1,
  uniforms: {
    uTexture: { value: texture },
  },
});

const iconLines = new THREE.Mesh(geometry1, material1);
// scene.add(iconLines);

const group = new THREE.Group();
group.add(icon);
group.add(iconLines);
scene.add(group);

let clock = new THREE.Clock();
function render() {
  let time = clock.getElapsedTime();
  material.uniforms.uTime.value = time * 0.5;
  
  group.rotation.y = time * 0.5;
  group.rotation.x = time * 0.5;

  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

// render() is now called inside DOMContentLoaded event

function resize() {
  w = 300; // Keep fixed size for profile section (matches container - 100% larger)
  h = 300;
  renderer.setSize(w, h);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
}

window.addEventListener("resize", resize);

// Pattern switching function - expose globally
window.switchPattern = function(patternNumber) {
  console.log('switchPattern called with:', patternNumber);
  if (patternNumber >= 1 && patternNumber <= 4) {
    currentPattern = patternNumber;
    
    // Load new texture
    console.log('Loading pattern:', patterns[currentPattern - 1]);
    texture = loader.load(
      patterns[currentPattern - 1],
      function(loadedTexture) {
        console.log('Pattern loaded successfully:', patterns[currentPattern - 1]);
        loadedTexture.wrapS = loadedTexture.wrapT = THREE.MirroredRepeatWrapping;
        
        // Update material uniforms
        material.uniforms.uTexture.value = loadedTexture;
        material1.uniforms.uTexture.value = loadedTexture;
      },
      undefined,
      function(error) {
        console.error('Error loading pattern:', patterns[currentPattern - 1], error);
      }
    );
    
    // Update button styles
    document.querySelectorAll('.pattern-btn').forEach((btn, index) => {
      if (index + 1 === patternNumber) {
        btn.style.backgroundColor = 'var(--salmon)';
      } else {
        btn.style.backgroundColor = 'transparent';
      }
    });
  }
}

} // End of initRefractedBall function

// Start initialization
initRefractedBall();
