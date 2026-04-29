// import { useGLTF } from "@react-three/drei";
// import { useFrame } from "@react-three/fiber";
// import { useRef } from "react";

// export default function Model() {
//   const { scene } = useGLTF("/model.glb");
//   const ref = useRef();

//   useFrame(() => {
//     if (ref.current) {
//       ref.current.rotation.y += 0.003;
//     }
//   });

//   return (
//     <group ref={ref}>
//       {/* Main Model */}
//       <primitive 
//         object={scene} 
//         scale={1.5} 
//         position={[0, -1, 0]} 
//       />

//       {/* Glowing floating spheres */}
//       {[...Array(5)].map((_, i) => (
//         <mesh
//           key={i}
//           position={[
//             Math.sin(i) * 2,
//             1 + i * 0.3,
//             Math.cos(i) * 2
//           ]}
//         >
//           <sphereGeometry args={[0.15, 32, 32]} />
//           <meshStandardMaterial
//             emissive="#ff7a00"
//             emissiveIntensity={3}
//             color="#ffaa33"
//           />
//         </mesh>
//       ))}
//     </group>
//   );
// }

// useGLTF.preload("/model.glb");




import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function Model({ index }) {
  const ref = useRef();

  useFrame(() => {
    ref.current.rotation.y += 0.01;
  });

  return (
    <mesh ref={ref} scale={1.5}>
      
      {index === 0 && <torusKnotGeometry args={[1, 0.3, 128, 32]} />}
      {index === 1 && <sphereGeometry args={[1, 64, 64]} />}
      {index === 2 && <boxGeometry args={[1.5, 1.5, 1.5]} />}

      {/* 💎 GLASS MATERIAL */}
      <meshPhysicalMaterial
        color="#ffffff"
        transmission={1}
        roughness={0}
        metalness={0.2}
        thickness={1}
      />
    </mesh>
  );
}