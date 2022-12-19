import { Canvas, useThree } from "@react-three/fiber";
import React, { Suspense } from "react";
import "./App.css"; 
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { useEffect } from "react";
import Wave from "./wave";

const Controls = () => {
  const { camera, gl } = useThree();

  useEffect(() => {
    const control = new OrbitControls(camera, gl.domElement);
    control.minDistance = 3;
    control.maxDistance = 20;
    return () => {
      control.dispose();
    };
  }, [camera, gl]);
  return null;
};

function App() {
  return (
    <Canvas camera={{ fov: 7, position: [4, 0.5, 4] }}>
      <Controls />
      <Suspense fallback={null}>
        <Wave />
      </Suspense>
    </Canvas>
  );
}

export default App;
