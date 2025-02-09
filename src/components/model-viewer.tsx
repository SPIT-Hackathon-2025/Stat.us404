"use client"

import { Canvas, useThree } from "@react-three/fiber"
// import { Primitive } from "@react-three/drei"
import { OrbitControls, Stage } from "@react-three/drei"
import { useGLTF } from "@react-three/drei"

function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url)
  return <Primitive object={scene} />
}

interface ModelViewerProps {
  url: string
  isPreview?: boolean
}

export function ModelViewer({ url, isPreview = false }: ModelViewerProps) {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 45 }} className={isPreview ? "h-full" : "h-[80vh]"}>
      <Stage environment="city" intensity={0.5}>
        <Model url={url} />
      </Stage>
      <OrbitControls
        makeDefault
        minPolarAngle={0}
        maxPolarAngle={Math.PI / 2}
        enableZoom={!isPreview}
        enablePan={!isPreview}
      />
    </Canvas>
  )
}