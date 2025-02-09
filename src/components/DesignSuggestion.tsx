interface DesignSuggestionProps {
    suggestion: string
  }
  
  export default function DesignSuggestion({ suggestion }: DesignSuggestionProps) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Design Suggestions</h2>
        {suggestion ? (
          <p className="text-gray-700 whitespace-pre-wrap">{suggestion}</p>
        ) : (
          <p className="text-gray-500 italic">
            Upload room images and click "Get Design Suggestions" to receive AI-generated interior design ideas.
          </p>
        )}
      </div>
    )
  }