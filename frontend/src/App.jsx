import React, { useState, useRef } from 'react'
import axios from 'axios'
import DropZone from './components/DropZone'
import Preview from './components/Preview'
import Header from './components/Header'

export default function App() {
  const [selectedFile, setSelectedFile] = useState(null)
  const [originalImage, setOriginalImage] = useState(null)
  const [processedImage, setProcessedImage] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [fileId, setFileId] = useState(null)
  const fileInputRef = useRef(null)

  const API_URL = import.meta.env.DEV ? 'http://localhost:8000' : ''

  const handleFileSelect = async (file) => {
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file')
      return
    }

    setError(null)
    setSelectedFile(file)

    const reader = new FileReader()
    reader.onload = (e) => {
      setOriginalImage(e.target.result)
      setProcessedImage(null)
    }
    reader.readAsDataURL(file)
  }

  const handleRemoveBackground = async () => {
    if (!selectedFile) return

    setLoading(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append('file', selectedFile)

      const response = await axios.post(`${API_URL}/api/remove-bg`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })

      const id = response.data.file_id
      setFileId(id)

      const imageResponse = await axios.get(`${API_URL}/api/download/${id}`, {
        responseType: 'blob'
      })

      const url = URL.createObjectURL(imageResponse.data)
      setProcessedImage(url)
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to process image')
      console.error('Error:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = () => {
    if (!fileId) return

    const link = document.createElement('a')
    link.href = `${API_URL}/api/download/${fileId}`
    link.download = `background_removed_${fileId}.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleReset = () => {
    setSelectedFile(null)
    setOriginalImage(null)
    setProcessedImage(null)
    setFileId(null)
    setError(null)
  }

  const handleImageClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="min-h-screen bg-apple-bg">
      <Header />

      <main className="max-w-6xl mx-auto px-4 py-12">
        {!originalImage ? (
          <DropZone onFileSelect={handleFileSelect} />
        ) : (
          <>
            <Preview
              originalImage={originalImage}
              processedImage={processedImage}
              loading={loading}
              onImageClick={handleImageClick}
            />
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) handleFileSelect(file)
              }}
              className="hidden"
            />

            <div className="mt-8 flex gap-3 justify-center">
              {!processedImage && (
                <button
                  onClick={handleRemoveBackground}
                  disabled={loading}
                  className="px-6 py-3 bg-apple-blue text-white rounded-lg font-medium hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  {loading ? 'Processing...' : 'Remove Background'}
                </button>
              )}

              {processedImage && (
                <button
                  onClick={handleDownload}
                  className="px-6 py-3 bg-apple-blue text-white rounded-lg font-medium hover:bg-opacity-90 transition-all"
                >
                  Download PNG
                </button>
              )}

              <button
                onClick={handleReset}
                className="px-6 py-3 bg-white text-apple-text border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-all"
              >
                Start Over
              </button>
            </div>

            {error && (
              <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-center">
                {error}
              </div>
            )}
          </>
        )}
      </main>

      <footer className="mt-16 py-8 text-center text-apple-gray text-sm">
        <p>Background Remover • Made by Ahza</p>
      </footer>
    </div>
  )
}
