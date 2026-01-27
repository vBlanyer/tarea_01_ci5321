import vertexShaderSource from './shaders/vertex.glsl';
import fragmentShaderSource from './shaders/fragment.glsl';

class App {
  private canvas: HTMLCanvasElement;
  private gl: WebGL2RenderingContext;
  private program: WebGLProgram;

  constructor() {
    this.canvas = document.createElement('canvas');
    document.body.appendChild(this.canvas);

    const gl = this.canvas.getContext('webgl2');
    if (!gl) {
      throw new Error('WebGL2 is not available in this browser.');
    }
    this.gl = gl;

    this.program = this.createProgram(
      this.gl,
      this.createShader(this.gl, this.gl.VERTEX_SHADER, vertexShaderSource),
      this.createShader(this.gl, this.gl.FRAGMENT_SHADER, fragmentShaderSource)
    );
    
    const positionAttributeLocation = this.gl.getAttribLocation(this.program, 'position'); // debe coincidir con el "in" del vertex shader
    const colorAttributeLocation = this.gl.getAttribLocation(this.program, 'color');

    // Atributo de posicion
    const positionBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, positionBuffer);
    const positions = [
      0.0,  0.87,
     -0.5,  0.0,
      0.5,  0.0,
    ];
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(positions), this.gl.STATIC_DRAW);

    const vao = this.gl.createVertexArray();
    this.gl.bindVertexArray(vao);

    this.gl.enableVertexAttribArray(positionAttributeLocation);
    this.gl.vertexAttribPointer(positionAttributeLocation, 2, this.gl.FLOAT, false, 0, 0);

    // Atributo de color
    const colorBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, colorBuffer);
    const colors = [
      1.0, 0.0, 0.0, // rojo
      0.0, 1.0, 0.0, // verde
      0.0, 0.0, 1.0, // azul
    ];
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(colors), this.gl.STATIC_DRAW);
    this.gl.enableVertexAttribArray(colorAttributeLocation);
    this.gl.vertexAttribPointer(colorAttributeLocation, 3, this.gl.FLOAT, false, 0, 0);

    // Configurar viewport
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);

    this.gl.useProgram(this.program);

    this.gl.bindVertexArray(vao);
    this.gl.clearColor(0, 0, 0, 1);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    this.gl.drawArrays(this.gl.TRIANGLES, 0, 3);
  }

  private createShader(gl: WebGL2RenderingContext, type: number, source: string): WebGLShader {
    const shader = gl.createShader(type);
    if (!shader) {
      throw new Error('Unable to create shader.');
    }
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (!success) {
      const info = gl.getShaderInfoLog(shader);
      gl.deleteShader(shader);
      throw new Error('Could not compile shader:\n' + info);
    }
    return shader;
  }

  private createProgram(gl: WebGL2RenderingContext, vertexShader: WebGLShader, fragmentShader: WebGLShader): WebGLProgram {
    const program = gl.createProgram();
    if (!program) {
      throw new Error('Unable to create program.');
    }
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    const success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (!success) {
      const info = gl.getProgramInfoLog(program);
      gl.deleteProgram(program);
      throw new Error('Could not link program:\n' + info);
    }
    return program;
  }
};

new App();
