import { useState, useRef } from "react"
import { Camera, Upload } from "lucide-react"

interface ImageUploaderProps {
  angle: string
  onImageUpload: (angle: string, base64: string) => void
}

export default function ImageUploader({ angle, onImageUpload }: ImageUploaderProps) {
  const [preview, setPreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const base64 = reader.result as string
        setPreview(base64)
        onImageUpload(angle, base64.split(",")[1])
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="relative">
      <input type="file" accept="image/*" onChange={handleFileChange} ref={fileInputRef} className="hidden" />
      <div
        onClick={() => fileInputRef.current?.click()}
        className="w-full h-40 border-2 border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 transition-colors"
      >
        {preview ? (
          <img
            src={preview || "/placeholder.svg"}
            alt={`${angle} view`}
            className="w-full h-full object-cover rounded-md"
          />
        ) : (
          <>
            <Upload className="w-8 h-8 text-gray-400 mb-2" />
            <p className="text-sm text-gray-500 capitalize">{angle} View</p>
          </>
        )}
      </div>
      <button
        onClick={() => fileInputRef.current?.click()}
        className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"
      >
        <Camera className="w-5 h-5 text-gray-600" />
      </button>
    </div>
  )
}