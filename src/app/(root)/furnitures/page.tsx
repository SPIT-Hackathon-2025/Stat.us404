"use client"

import { useEffect, useState } from "react"
import { ModelCard } from "@/components/model-viewer"

interface Model {
  name: string
  url: string
}

export default function ModelsPage() {
  const [models, setModels] = useState<Model[]>([])

  useEffect(() => {
    // This would typically be an API call or file system read
    // For demonstration, we're hardcoding the models
    const modelsList = [
      { name: "BigSofa", url: "/models/BigSofa.glb" },
      { name: "Chair", url: "/models/Chair.glb" },
      { name: "CoffeeTable", url: "/models/CoffeeTable.glb" },
      { name: "Commode", url: "/models/Commode.glb" },
      { name: "HangingMirror", url: "/models/HangingMirror.glb" },
      { name: "Lamp", url: "/models/Lamp.glb" },
      { name: "LampDown", url: "/models/LampDown.glb" },
      { name: "Mirror", url: "/models/Mirror.glb" },
      { name: "Painting", url: "/models/Painting.glb" },
      { name: "Rug", url: "/models/Rug.glb" },
      { name: "SheenChair", url: "/models/SheenChair.glb" },
      { name: "SmallSofa", url: "/models/SmallSofa.glb" },
      { name: "Wardrobe", url: "/models/Wardrobe.glb" },
    ]
    setModels(modelsList)
  }, [])

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">3D Models Gallery</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {models.map((model) => (
          <ModelCard key={model.name} name={model.name} url={model.url} />
        ))}
      </div>
    </div>
  )
}
