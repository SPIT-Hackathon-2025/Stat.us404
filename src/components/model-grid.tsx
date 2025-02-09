"use client"

import { useState } from "react"
import { ArrowLeft, Expand } from "lucide-react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "../components/ui/dialog"

interface ModelItem {
  id: string
  name: string
  type: string
  url: string
}

interface ModelGridProps {
  models: ModelItem[]
}

export function ModelGrid({ models }: ModelGridProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedModel, setSelectedModel] = useState<ModelItem | null>(null)

  const filteredModels = models.filter(
    (model) =>
      model.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      model.type.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-4">
            <Link href="#" className="text-gray-600 hover:text-gray-900">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div className="flex-1 max-w-md">
              <Input
                type="search"
                placeholder="Search for model..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Grid */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredModels.map((model) => (
            <div key={model.id} className="bg-white rounded-lg overflow-hidden border shadow-sm group relative">
              <div className="aspect-square relative">
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => setSelectedModel(model)}
                >
                  <Expand className="h-4 w-4" />
                </Button>
              </div>
              <div className="p-4">
                <div className="text-sm text-muted-foreground">{model.type}</div>
                <h3 className="font-medium mt-1">{model.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Fullscreen Dialog */}
      <Dialog open={!!selectedModel} onOpenChange={() => setSelectedModel(null)}>
        <DialogContent className="max-w-[95vw] w-[1200px] h-[90vh] p-0">
          {selectedModel && (
            <div className="h-full flex flex-col">
              <div className="flex items-center justify-between p-4 border-b">
                <div>
                  <div className="text-sm text-muted-foreground">{selectedModel.type}</div>
                  <h2 className="text-2xl font-semibold">{selectedModel.name}</h2>
                </div>
                <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setSelectedModel(null)}>
                  <span className="sr-only">Close</span>
                </Button>
              </div>
              <div className="flex-1 bg-gray-50">
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}