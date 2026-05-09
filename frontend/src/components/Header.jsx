import React from 'react'

export default function Header() {
  return (
    <header className="pt-8 pb-6 border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-apple-text mb-2">
          Background Remover
        </h1>
        <p className="text-apple-gray text-lg">
          Remove backgrounds from images instantly. Works with people, objects, and everything in between.
        </p>
      </div>
    </header>
  )
}
