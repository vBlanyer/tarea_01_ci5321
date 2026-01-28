// #version 300 es
precision highp float;

in vec3 position;
in vec3 color;
out vec3 vColor;

void main() {
  vColor = color;
  gl_Position = vec4(position, 1.0);
}
// -------------
// default vertex shader you'll find in TONS of tutorials
// no need to declare position as it is declared by default
// modelViewMatrix is the shorthand for (model * view) operation
// void main() {
//   gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
// }
