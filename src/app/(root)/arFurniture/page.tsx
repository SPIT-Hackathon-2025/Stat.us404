import { ModelGrid } from "@/components/model-grid"

const models = [
  {
    id: "1",
    type: "Chair",
    name: "Pergevö",
    url: "/models/chair-red.glb",
  },
  {
    id: "2",
    type: "Big sofa",
    name: "Mi(love)wicz",
    url: "/models/big-sofa.glb",
  },
  {
    id: "3",
    type: "Small Sofa",
    name: "BigMouth",
    url: "/models/small-sofa.glb",
  },
  {
    id: "4",
    type: "Chair",
    name: "Inkwizytor3000",
    url: "/models/chair-black.glb",
  },
  {
    id: "5",
    type: "Coffee table",
    name: "Apache Kawka",
    url: "/models/coffee-table.glb",
  },
  {
    id: "6",
    type: "Commode",
    name: "NaCzarnaGodzine",
    url: "/models/commode.glb",
  },
  {
    id: "7",
    type: "Wardrobe",
    name: "Wspólłokator",
    url: "/models/wardrobe.glb",
  },
  {
    id: "8",
    type: "Rug",
    name: "Kumpel Pluskwa",
    url: "/models/rug.glb",
  },
]

export default function ModelsPage() {
  return <ModelGrid models={models} />
}