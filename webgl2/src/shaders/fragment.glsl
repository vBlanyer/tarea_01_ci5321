#version 300 es
precision highp float;

uniform float u_time;
uniform vec2 u_resolution;
in vec3 vColor;
out vec4 fragColor;

void main() { 
  fragColor = vec4(vColor, 1.0);
}