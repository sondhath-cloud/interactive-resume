function initRefractedBall() {
    if (typeof THREE === 'undefined') {
        // THREE.js not loaded yet, waiting...
        setTimeout(initRefractedBall, 100);
        return;
    }
    
    // THREE.js loaded, initializing refracted ball

let w = 300; // Fixed width for profile section (matches container - 100% larger)
let h = 300; // Fixed height for profile section (matches container - 100% larger)

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, w / h, 0.01, 1000);
camera.position.set(0, 0, 2);
camera.lookAt(new THREE.Vector3());

// Mobile performance optimization
const isMobile = window.innerWidth <= 768;
const isLowEndDevice = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4;
const pixelRatio = isMobile ? Math.min(window.devicePixelRatio, 1.5) : window.devicePixelRatio;

// Reduce quality on mobile/low-end devices
const antialias = !isMobile && !isLowEndDevice;
const powerPreference = isMobile ? "low-power" : "high-performance";

const renderer = new THREE.WebGLRenderer({
  antialias: antialias,
  alpha: true,
  powerPreference: powerPreference
});

renderer.setPixelRatio(pixelRatio);
renderer.setSize(w, h);
renderer.setClearColor(0x000000, 0);

// Mobile-specific optimizations
if (isMobile) {
    renderer.shadowMap.enabled = false;
    renderer.outputEncoding = THREE.sRGBEncoding;
    
    // Reduce animation frame rate on mobile for better performance
    let frameCount = 0;
    const originalRender = renderer.render;
    renderer.render = function(scene, camera) {
        frameCount++;
        if (frameCount % 2 === 0) { // Render every other frame on mobile
            originalRender.call(this, scene, camera);
        }
    };
}

// Check if DOM is already loaded or wait for it
function initContainer() {
    const container = document.getElementById("refracted-ball-container");
    if (container) {
        container.appendChild(renderer.domElement);
        // Refracted ball initialized successfully
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

// Color schemes for each pattern
const colorSchemes = {
  1: {
    // Pattern 1: ULTRA-VIBRANT Pink/Purple/Blue
    bgColor: '#ffffff',
    textColor: '#1a1a1a',
    textSecondary: '#2c2c2c',
    circleGradientStart: '#ff0080',
    circleGradientMid: '#8b00ff',
    circleGradientEnd: '#0066ff',
    salmon: '#ff0080',
    salmonLight: '#ff3399',
    salmonDark: '#cc0066',
    white: '#ffffff',
    lightGray: '#f8f8f8',
    mediumGray: '#e0e0e0',
    darkGray: '#2c2c2c',
    darkerGray: '#1a1a1a',
    threeColumnBg: 'rgba(255, 0, 128, 0.15)',
    experienceBg: 'rgba(255, 0, 128, 0.2)',
    experienceBgEnd: 'rgba(255, 0, 128, 0.1)',
    
    // Additional elements - MAXIMUM VIBRANCY
    primaryAccent: '#ff0080',
    secondaryAccent: '#0066ff',
    tertiaryAccent: '#ffcc00',
    teal: '#00ffcc',
    tealDark: '#00cc99',
    headerBg: 'rgba(255, 0, 128, 0.25)',
    cardBg: 'rgba(255, 255, 255, 0.98)',
    borderColor: 'rgba(255, 0, 128, 0.6)',
    shadowColor: 'rgba(255, 0, 128, 0.4)',
    // Testimonial colors - ULTRA VIBRANT
    testimonialColor1: 'linear-gradient(135deg, #ff0080, #ff3399)',
    testimonialColor2: 'linear-gradient(135deg, #0066ff, #3399ff)',
    testimonialColor3: 'linear-gradient(135deg, #00ffcc, #33ffcc)',
    testimonialColor4: 'linear-gradient(135deg, #ffcc00, #ffdd33)',
    testimonialColor5: 'linear-gradient(135deg, #8b00ff, #aa33ff)',
    testimonialColor6: 'linear-gradient(135deg, #ff3399, #ff66aa)',
    testimonialColor7: 'linear-gradient(135deg, #00ffcc, #33ffcc)',
    testimonialColor8: 'linear-gradient(135deg, #ffcc00, #ffdd33)',
    testimonialColor9: 'linear-gradient(135deg, #8b00ff, #aa33ff)'
  },
  2: {
    // Pattern 2: ULTRA-VIBRANT Electric Red/Orange
    bgColor: '#ffffff',
    textColor: '#000000',
    textSecondary: '#1a1a1a',
    circleGradientStart: '#ff0000',
    circleGradientMid: '#ff6600',
    circleGradientEnd: '#ffaa00',
    salmon: '#ff0000',
    salmonLight: '#ff3333',
    salmonDark: '#cc0000',
    white: '#ffffff',
    lightGray: '#f8f8f8',
    mediumGray: '#e0e0e0',
    darkGray: '#1a1a1a',
    darkerGray: '#000000',
    threeColumnBg: 'rgba(255, 0, 0, 0.15)',
    experienceBg: 'rgba(255, 0, 0, 0.2)',
    experienceBgEnd: 'rgba(255, 0, 0, 0.1)',
    // Additional elements - ELECTRIC VIBRANCY
    primaryAccent: '#ff0000',
    secondaryAccent: '#ff6600',
    tertiaryAccent: '#ffaa00',
    teal: '#00ff88',
    tealDark: '#00cc66',
    headerBg: 'rgba(255, 0, 0, 0.25)',
    cardBg: 'rgba(255, 255, 255, 0.98)',
    borderColor: 'rgba(255, 0, 0, 0.6)',
    shadowColor: 'rgba(255, 0, 0, 0.4)',
    // Testimonial colors - ELECTRIC VIBRANT
    testimonialColor1: 'linear-gradient(135deg, #ff0000, #ff3333)',
    testimonialColor2: 'linear-gradient(135deg, #ff6600, #ff8833)',
    testimonialColor3: 'linear-gradient(135deg, #ffaa00, #ffbb33)',
    testimonialColor4: 'linear-gradient(135deg, #00ff88, #33ff99)',
    testimonialColor5: 'linear-gradient(135deg, #ff0000, #ff3333)',
    testimonialColor6: 'linear-gradient(135deg, #ff6600, #ff8833)',
    testimonialColor7: 'linear-gradient(135deg, #ffaa00, #ffbb33)',
    testimonialColor8: 'linear-gradient(135deg, #00ff88, #33ff99)',
    testimonialColor9: 'linear-gradient(135deg, #ff0000, #ff3333)'
  },
  3: {
    // Pattern 3: ULTRA-VIBRANT Neon Teal/Orange
    bgColor: '#ffffff',
    textColor: '#1a1a1a',
    textSecondary: '#2c2c2c',
    circleGradientStart: '#00ffcc',
    circleGradientMid: '#ff6600',
    circleGradientEnd: '#ffcc00',
    salmon: '#ff6600',
    salmonLight: '#ff8833',
    salmonDark: '#cc5500',
    white: '#ffffff',
    lightGray: '#f8f8f8',
    mediumGray: '#e0e0e0',
    darkGray: '#2c2c2c',
    darkerGray: '#1a1a1a',
    threeColumnBg: 'rgba(0, 255, 204, 0.15)',
    experienceBg: 'rgba(0, 255, 204, 0.2)',
    experienceBgEnd: 'rgba(0, 255, 204, 0.1)',
    // Additional elements - NEON VIBRANCY
    primaryAccent: '#00ffcc',
    secondaryAccent: '#ff6600',
    tertiaryAccent: '#ffcc00',
    teal: '#00ffcc',
    tealDark: '#00cc99',
    headerBg: 'rgba(0, 255, 204, 0.25)',
    cardBg: 'rgba(255, 255, 255, 0.98)',
    borderColor: 'rgba(0, 255, 204, 0.6)',
    shadowColor: 'rgba(0, 255, 204, 0.4)',
    // Testimonial colors - NEON VIBRANT
    testimonialColor1: 'linear-gradient(135deg, #00ffcc, #33ffcc)',
    testimonialColor2: 'linear-gradient(135deg, #ff6600, #ff8833)',
    testimonialColor3: 'linear-gradient(135deg, #ffcc00, #ffdd33)',
    testimonialColor4: 'linear-gradient(135deg, #00ffcc, #33ffcc)',
    testimonialColor5: 'linear-gradient(135deg, #ff6600, #ff8833)',
    testimonialColor6: 'linear-gradient(135deg, #ffcc00, #ffdd33)',
    testimonialColor7: 'linear-gradient(135deg, #00ffcc, #33ffcc)',
    testimonialColor8: 'linear-gradient(135deg, #ff6600, #ff8833)',
    testimonialColor9: 'linear-gradient(135deg, #ffcc00, #ffdd33)'
  },
  4: {
    // Pattern 4: ULTRA-VIBRANT Purple/Gold
    bgColor: '#ffffff',
    textColor: '#1a1a1a',
    textSecondary: '#2c2c2c',
    circleGradientStart: '#8b00ff',
    circleGradientMid: '#ffcc00',
    circleGradientEnd: '#ff6600',
    salmon: '#8b00ff',
    salmonLight: '#aa33ff',
    salmonDark: '#6b00cc',
    white: '#ffffff',
    lightGray: '#f8f8f8',
    mediumGray: '#e0e0e0',
    darkGray: '#2c2c2c',
    darkerGray: '#1a1a1a',
    threeColumnBg: 'rgba(139, 0, 255, 0.15)',
    experienceBg: 'rgba(139, 0, 255, 0.2)',
    experienceBgEnd: 'rgba(139, 0, 255, 0.1)',
    // Additional elements - ROYAL VIBRANCY
    primaryAccent: '#8b00ff',
    secondaryAccent: '#ffcc00',
    tertiaryAccent: '#ff6600',
    teal: '#00ff88',
    tealDark: '#00cc66',
    headerBg: 'rgba(139, 0, 255, 0.25)',
    cardBg: 'rgba(255, 255, 255, 0.98)',
    borderColor: 'rgba(139, 0, 255, 0.6)',
    shadowColor: 'rgba(139, 0, 255, 0.4)',
    // Testimonial colors - ROYAL VIBRANT
    testimonialColor1: 'linear-gradient(135deg, #8b00ff, #aa33ff)',
    testimonialColor2: 'linear-gradient(135deg, #ffcc00, #ffdd33)',
    testimonialColor3: 'linear-gradient(135deg, #ff6600, #ff8833)',
    testimonialColor4: 'linear-gradient(135deg, #00ff88, #33ff99)',
    testimonialColor5: 'linear-gradient(135deg, #8b00ff, #aa33ff)',
    testimonialColor6: 'linear-gradient(135deg, #ffcc00, #ffdd33)',
    testimonialColor7: 'linear-gradient(135deg, #ff6600, #ff8833)',
    testimonialColor8: 'linear-gradient(135deg, #00ff88, #33ff99)',
    testimonialColor9: 'linear-gradient(135deg, #8b00ff, #aa33ff)'
  }
};

// Loading texture
let texture = loader.load(
  patterns[currentPattern - 1],
  function(texture) {
    // Texture loaded successfully
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

// Function to apply color scheme to the page
function applyColorScheme(scheme) {
  const root = document.documentElement;
  
  // Apply all color scheme variables
  root.style.setProperty('--bg-color', scheme.bgColor);
  root.style.setProperty('--text-color', scheme.textColor);
  root.style.setProperty('--text-secondary', scheme.textSecondary);
  root.style.setProperty('--circle-gradient-start', scheme.circleGradientStart);
  root.style.setProperty('--circle-gradient-mid', scheme.circleGradientMid);
  root.style.setProperty('--circle-gradient-end', scheme.circleGradientEnd);
  root.style.setProperty('--salmon', scheme.salmon);
  root.style.setProperty('--salmon-light', scheme.salmonLight);
  root.style.setProperty('--salmon-dark', scheme.salmonDark);
  root.style.setProperty('--white', scheme.white);
  root.style.setProperty('--light-gray', scheme.lightGray);
  root.style.setProperty('--medium-gray', scheme.mediumGray);
  root.style.setProperty('--dark-gray', scheme.darkGray);
  root.style.setProperty('--darker-gray', scheme.darkerGray);
  root.style.setProperty('--three-column-bg', scheme.threeColumnBg);
  root.style.setProperty('--experience-bg', scheme.experienceBg);
  root.style.setProperty('--experience-bg-end', scheme.experienceBgEnd);
  
  // Apply additional color variables for more variety
  root.style.setProperty('--primary-accent', scheme.primaryAccent);
  root.style.setProperty('--secondary-accent', scheme.secondaryAccent);
  root.style.setProperty('--tertiary-accent', scheme.tertiaryAccent);
  root.style.setProperty('--teal', scheme.teal);
  root.style.setProperty('--teal-dark', scheme.tealDark);
  root.style.setProperty('--header-bg', scheme.headerBg);
  root.style.setProperty('--card-bg', scheme.cardBg);
  root.style.setProperty('--border-color', scheme.borderColor);
  root.style.setProperty('--shadow-color', scheme.shadowColor);
  
  // Apply testimonial colors
  root.style.setProperty('--testimonial-color-1', scheme.testimonialColor1);
  root.style.setProperty('--testimonial-color-2', scheme.testimonialColor2);
  root.style.setProperty('--testimonial-color-3', scheme.testimonialColor3);
  root.style.setProperty('--testimonial-color-4', scheme.testimonialColor4);
  root.style.setProperty('--testimonial-color-5', scheme.testimonialColor5);
  root.style.setProperty('--testimonial-color-6', scheme.testimonialColor6);
  root.style.setProperty('--testimonial-color-7', scheme.testimonialColor7);
  root.style.setProperty('--testimonial-color-8', scheme.testimonialColor8);
  root.style.setProperty('--testimonial-color-9', scheme.testimonialColor9);
  
  // Color scheme applied
}

// Pattern switching function - expose globally
window.switchPattern = function(patternNumber) {
  // switchPattern called
  if (patternNumber >= 1 && patternNumber <= 4) {
    currentPattern = patternNumber;
    
    // Apply color scheme for this pattern
    const scheme = colorSchemes[patternNumber];
    applyColorScheme(scheme);
    
    // Load new texture
    texture = loader.load(
      patterns[currentPattern - 1],
      function(loadedTexture) {
        // Pattern loaded successfully
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
    
    // Update button styles with new accent color
    document.querySelectorAll('.pattern-btn').forEach((btn, index) => {
      if (index + 1 === patternNumber) {
        btn.style.backgroundColor = scheme.salmon;
      } else {
        btn.style.backgroundColor = 'transparent';
      }
    });
    
    // Save the selected pattern to localStorage
    localStorage.setItem('selectedPattern', patternNumber);
  }
}

// Load saved pattern preference on page load
const savedPattern = localStorage.getItem('selectedPattern');
if (savedPattern) {
  const patternNum = parseInt(savedPattern);
  if (patternNum >= 1 && patternNum <= 4) {
    // Apply the saved color scheme immediately
    applyColorScheme(colorSchemes[patternNum]);
  }
}

} // End of initRefractedBall function

// Start initialization
initRefractedBall();
