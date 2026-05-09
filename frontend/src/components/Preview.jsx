import React from 'react'

export default function Preview({ originalImage, processedImage, loading, onImageClick }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      {/* Original Image */}
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200 group cursor-pointer" onClick={onImageClick}>
        <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex items-center justify-between">
          <h3 className="text-sm font-medium text-apple-text">Original</h3>
          <span className="text-xs text-apple-gray opacity-0 group-hover:opacity-100 transition-opacity">Click to change</span>
        </div>
        <div className="aspect-square bg-gray-100 flex items-center justify-center overflow-hidden relative">
          <img
            src={originalImage}
            alt="Original"
            className="w-full h-full object-cover group-hover:opacity-75 transition-opacity"
          />
          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-5 transition-opacity flex items-center justify-center">
            <svg className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
            </svg>
          </div>
        </div>
      </div>

      {/* Processed Image */}
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200">
        <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex items-center justify-between">
          <h3 className="text-sm font-medium text-apple-text">Result</h3>
          {loading && (
            <span className="text-xs text-apple-gray">Processing...</span>
          )}
        </div>
        <div className="aspect-square flex items-center justify-center overflow-hidden" style={{backgroundImage: 'linear-gradient(45deg, #f0f0f0 25%, transparent 25%), linear-gradient(-45deg, #f0f0f0 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #f0f0f0 75%), linear-gradient(-45deg, transparent 75%, #f0f0f0 75%)', backgroundSize: '20px 20px', backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px', backgroundColor: 'white'}}>
          {loading ? (
            <div className="flex flex-col items-center gap-3">
              <div className="w-8 h-8 border-2 border-gray-200 border-t-apple-blue rounded-full animate-spin" />
              <p className="text-sm text-apple-gray">Removing background...</p>
            </div>
          ) : processedImage ? (
            <img
              src={processedImage}
              alt="Processed"
              className="w-full h-full object-cover"
            />
          ) : (
            <p className="text-sm text-apple-gray">Your result will appear here</p>
          )}
        </div>
      </div>
    </div>
  )
}