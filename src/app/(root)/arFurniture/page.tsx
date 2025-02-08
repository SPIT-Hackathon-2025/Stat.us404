"use client";

import { Canvas } from "@react-three/fiber";
import { ARButton, XR, useHitTest } from "@react-three/xr";
import { useState, useRef } from "react";
import { useGLTF, Plane } from "@react-three/drei";
import { useGesture } from "@use-gesture/react";
import * as THREE from "three";

// Load furniture model
function Furniture({ position }: { position: [number, number, number] }) {
  const { scene } = useGLTF("/models/sofa.glb"); // Replace with actual path
  const furnitureRef = useRef<THREE.Group>(null);

  // Gesture control for movement and rotation
  useGesture(
    {
      onDrag: ({ offset: [x, z] }) => {
        if (furnitureRef.current) {
          furnitureRef.current.position.set(x / 10, 0, z / 10);
        }
      },
      onPinch: ({ offset: [scale] }) => {
        if (furnitureRef.current) {
          furnitureRef.current.scale.set(scale, scale, scale);
        }
      },
    },
    { target: furnitureRef }
  );

  return <primitive ref={furnitureRef} object={scene} position={position} />;
}

// Component to handle AR hit test and placement
function PlacementHandler({ onPlace }: { onPlace: (pos: [number, number, number]) => void }) {
  const ref = useRef<THREE.Mesh>(null);
  useHitTest((hitMatrix) => {
    if (ref.current) {
      hitMatrix.decompose(ref.current.position, new THREE.Quaternion(), new THREE.Vector3());
    }
  });

  return (
    <mesh
      ref={ref}
      onClick={() => ref.current && onPlace([ref.current.position.x, 0, ref.current.position.z])}
    >
      <planeGeometry args={[0.2, 0.2]} />
      <meshBasicMaterial color="blue" transparent opacity={0.5} />
    </mesh>
  );
}

// Main Page
export default function Page() {
  const [placedObjects, setPlacedObjects] = useState<[number, number, number][]>([]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-2xl font-semibold my-4">AR-Based Furniture Placement</h1>
      <ARButton className="px-4 py-2 bg-blue-500 rounded-lg text-white font-medium">Enter AR</ARButton>
      <Canvas className="w-full h-screen">
        <XR>
          <ambientLight intensity={0.5} />
          <directionalLight position={[2, 5, 2]} intensity={1} />
          <PlacementHandler onPlace={(pos) => setPlacedObjects([...placedObjects, pos])} />
          {placedObjects.map((pos, index) => (
            <Furniture key={index} position={pos} />
          ))}
        </XR>
      </Canvas>
    </div>
  );
}
