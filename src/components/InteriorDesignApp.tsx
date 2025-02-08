"use client"

import { useState } from "react"
import ImageUploader from "./ImageUploader"
import DesignSuggestion from "./DesignSuggestion"

export default function InteriorDesignApp() {
  const [images, setImages] = useState<{ [key: string]: string }>({})
  const [suggestion, setSuggestion] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleImageUpload = (angle: string, base64: string) => {
    setImages((prevImages) => ({ ...prevImages, [angle]: base64 }))
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/generate-design", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userInput: "Please suggest interior design ideas based on these room images.",
          imageBase64: Object.values(images)[0], // Send the first image for now
        }),
      })
      const data = await response.json()
      setSuggestion(data.generatedText)
    } catch (error) {
      console.error("Error generating design suggestion:", error)
      setSuggestion("Sorry, an error occurred while generating the design suggestion.")
    }
    setIsLoading(false)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Interior Design AI Assistant</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Upload Room Images</h2>
          <div className="grid grid-cols-2 gap-4">
            {["front", "back", "left", "right"].map((angle) => (
              <ImageUploader key={angle} angle={angle} onImageUpload={handleImageUpload} />
            ))}
          </div>
          <button
            onClick={handleSubmit}
            disabled={Object.keys(images).length === 0 || isLoading}
            className="mt-6 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? "Generating..." : "Get Design Suggestions"}
          </button>
        </div>
        <DesignSuggestion suggestion={suggestion} />
      </div>
    </div>
  )
}