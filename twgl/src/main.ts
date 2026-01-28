import * as twgl from 'twgl.js';
import vertexShaderSource from './shaders/vertex.glsl';
import fragmentShaderSource from './shaders/fragment.glsl';

class App {
  private canvas: HTMLCanvasElement;
  private gl: WebGL2RenderingContext;
  private programInfo: twgl.ProgramInfo;
  private bufferInfo: twgl.BufferInfo;

  constructor() {
    this.canvas = document.createElement('canvas');
    document.body.appendChild(this.canvas);

    const gl = this.canvas.getContext('webgl2');
    if (!gl) {
      throw new Error('WebGL2 is not available in this browser.');
    }
    this.gl = gl;

    this.programInfo = twgl.createProgramInfo(this.gl, [vertexShaderSource, fragmentShaderSource]);
    this.bufferInfo = twgl.createBufferInfoFromArrays(this.gl, {
      position: { numComponents: 2, data: [0.0, 0.87, -0.5, 0.0, 0.5, 0.0] },
      color: { numComponents: 3, data: [1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0] },
    });

    this.gl.clearColor(0.10588, 0.11765, 0.16863, 1);
    requestAnimationFrame(this.render);
  }

  private render = (time: number) => {
    twgl.resizeCanvasToDisplaySize(this.canvas);
    this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);

    this.gl.useProgram(this.programInfo.program);
    twgl.setBuffersAndAttributes(this.gl, this.programInfo, this.bufferInfo);
    twgl.setUniforms(this.programInfo, {
      u_time: time * 0.001,
      u_resolution: [this.canvas.width, this.canvas.height],
    });

    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    twgl.drawBufferInfo(this.gl, this.bufferInfo);

    requestAnimationFrame(this.render);
  };
}

new App();
