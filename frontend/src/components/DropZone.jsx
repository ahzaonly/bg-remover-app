import React, { useRef } from 'react'

export default function DropZone({ onFileSelect }) {
  const fileInputRef = useRef(null)
  const [isDragging, setIsDragging] = React.useState(false)

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) onFileSelect(file)
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e) => {
    const file = e.target.files?.[0]
    if (file) onFileSelect(file)
  }

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleClick}
      className={`
        w-full p-12 rounded-2xl border-2 border-dashed cursor-pointer
        transition-all duration-200 text-center
        ${isDragging
          ? 'border-apple-blue bg-blue-50'
          : 'border-gray-300 bg-white hover:border-gray-400'
        }
      `}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      <div className="flex flex-col items-center gap-3">
        <svg
          className="w-16 h-16 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
          />
        </svg>

        <div>
          <p className="text-lg font-medium text-apple-text">
            Drag your image here
          </p>
          <p className="text-sm text-apple-gray mt-1">
            or click to browse
          </p>
        </div>

        <p className="text-xs text-apple-gray mt-2">
          PNG, JPG, WebP up to 50MB
        </p>
      </div>
    </div>
  )
}
