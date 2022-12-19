import { extend } from "@react-three/fiber";
import React, { useRef ,useFrame} from "react";
import "./App.css";
import * as THREE from "three";
import { shaderMaterial } from "@react-three/drei";
import glsl from "babel-plugin-glsl/macro";

const WaveShaderMaterial = shaderMaterial(
  //Uniform
  { uTime: 0, uColor: new THREE.Color(0.0, 0.0, 0.0) },
  //Vertex Shader
  glsl`
      precision mediump float;
      varying vec2 vUv;
      uniform float uTime;
  
      #pragma glslify: snoise3 = require(glsl-noise/simplex/3d)
      void main(){
        vUv = uv;
  
        vec3 pos = position;
        float noiseFreq = 2.5;
        float noiseAmp = 0.25;
        vec3 noisePos = vec3(pos.x * noiseFreq + uTime, pos.y,pos.z);
        pos.z += snoise3(noisePos) * noiseAmp;
  
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos,1.0);
      }
    `,
  //Fragment
  glsl`
      precision mediump float;
  
      uniform vec3 uColor;
      uniform float uTime;
      varying vec2 vUv;
  
      void main(){
        gl_FragColor = vec4(sin(vUv.x + uTime) * uColor ,1.0);
      }`
);

extend({ WaveShaderMaterial });

function Wave() {
  const ref = useRef();
    //useFrame(({ clock }) => (ref.current.uTime = clock.getElapsedTime()));
  //useFrame(({clock})=>(ref.current.uTime)) //set ไว้ ที่ 0

  return (
    <mesh>
      <planeBufferGeometry args={[0.6, 0.6, 16, 16]} />
      <waveShaderMaterial uColor={"hotpink"} ref={ref}  />
    </mesh>
  );
}

export default Wave;
