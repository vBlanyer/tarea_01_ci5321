import * as THREE from 'three';
import vertexShader from './shaders/vertex.glsl';
import fragmentShader from './shaders/fragment.glsl';

class App {
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private geometry: THREE.BufferGeometry;
  private material: THREE.ShaderMaterial;
  private mesh: THREE.Mesh;
  private startTime: number;

  private camConfig = {
    fov: 75, // field of view
    aspect: window.innerWidth / window.innerHeight, // aspect ratio
    near: 0.1, // near clipping plane
    far: 1000, // far clipping plane
  };

  constructor() {
    // Create scene
    this.scene = new THREE.Scene();

    // Setup camera
    this.camera = new THREE.PerspectiveCamera(
      this.camConfig.fov,
      this.camConfig.aspect,
      this.camConfig.near,
      this.camConfig.far
    );

    // Setup renderer
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance',
    });
    if (!this.renderer.capabilities.isWebGL2) {
      console.warn('WebGL 2.0 is not available on this browser.');
    }
    this.renderer.setClearColor(new THREE.Color('#1b1e2b'), 1);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    document.body.appendChild(this.renderer.domElement);

    const resolution = new THREE.Vector2(window.innerWidth, window.innerHeight);

    // Create shader material
 
    // Definicion de vertices del trinagulo, con posicion, normales, uv y color
    const vertices = [
      { pos: [ 0,  0.87, 0.0], color: [1, 0, 0] }, // Arriba
      { pos: [-0.5, 0.0,  0.0], color: [0, 1, 0] }, // Izquierda
      { pos: [ 0.5, 0.0,  0.0], color: [0, 0, 1] }  // Derecha
    ];
 
    // Separar los atributos en arrays individuales
    const positions = [];
    const colors = [];
    for (const vertex of vertices) { // Iterar sobre cada vertice
      positions.push(...vertex.pos);
      colors.push(...vertex.color);
    }
 
    this.geometry = new THREE.BufferGeometry(); // Crear geometria vacia con cualquier forma
 
    // Asignar los atributos a la geometria
    const positionNumComponents = 3;
    this.geometry.setAttribute(
      'position',
      new THREE.BufferAttribute(new Float32Array(positions), positionNumComponents)
    );
    this.geometry.setAttribute(
      'color',
      new THREE.BufferAttribute(new Float32Array(colors), 3)
    );

    this.material = new THREE.RawShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        // custom uniforms
        u_time: { value: 0.0 },
        u_resolution: { value: resolution },
      },
      glslVersion: THREE.GLSL3,
    });
    
    // Create mesh
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(this.mesh);
    this.camera.position.z = 1.5;

    // Initialize
    this.startTime = Date.now();
    this.onWindowResize();

    // Bind methods
    this.onWindowResize = this.onWindowResize.bind(this);
    this.animate = this.animate.bind(this);

    // Add event listeners
    window.addEventListener('resize', this.onWindowResize);

    // Start the main loop
    this.animate();
  }

  private animate(): void {
    requestAnimationFrame(this.animate);
    const elapsedTime = (Date.now() - this.startTime) / 1000;
    this.material.uniforms.u_time.value = elapsedTime;
    this.renderer.render(this.scene, this.camera);
  }

  private onWindowResize(): void {
    const width = window.innerWidth;
    const height = window.innerHeight;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.material.uniforms.u_resolution.value.set(width, height);
  }
}

new App();
