import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { useState, Suspense } from "react";
import Model from "./Model";

function ScrollManager({ setIndex }) {
  useFrame(() => {
    const scroll = window.scrollY;
    if (scroll < 500) setIndex(0);
    else if (scroll < 1000) setIndex(1);
    else setIndex(2);
  });
  return null;
}

export default function Scene() {
  const [index, setIndex] = useState(0);

  return (
    <Canvas camera={{ position: [0, 1, 6], fov: 45 }}>
      <Suspense fallback={null}>
        <Environment preset="sunset" />
        <ambientLight intensity={0.3} />
        <Model index={index} />
        <ScrollManager setIndex={setIndex} />
        <OrbitControls enableZoom enablePan={false} />
      </Suspense>
    </Canvas>
  );
}
