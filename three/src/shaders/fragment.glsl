// #version 300 es
precision highp float;

uniform float u_time; // tiempo en segundos
uniform vec2 u_resolution; // resolucion de la pantalla
in vec3 vColor; // color recibido del vertex shader
out vec4 fragColor; // color de salida del fragmento

void main() { 
  fragColor = vec4(vColor, 1.0);


  // NOTAS PROPIAS:
  // La funcion sin(u_time)provca cambio de color con le tiempo


}
// -------------
// default fragment shader you'll find in TONS of tutorials
// uniform float time;
// uniform vec2 resolution;

// void main() {
//   vec2 uv = gl_FragCoord.xy / resolution.xy;
//   gl_FragColor = vec4(uv.x, uv.y, 0.5 + 0.5 * sin(time), 1.0);
// }