'use client'

import * as React from 'react'
import { useState, useEffect } from 'react'
import { getPortfolioContent } from '@/lib/content'
import portfolioContent from '@/content/portfolio-content.json'

export default function AdminPage() {
  const [content, setContent] = useState(portfolioContent)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    // Load content from localStorage if available
    const savedContent = localStorage.getItem('portfolio-content')
    if (savedContent) {
      try {
        setContent(JSON.parse(savedContent))
      } catch (e) {
        console.error('Failed to parse saved content', e)
      }
    }
  }, [])

  const handleSave = () => {
    localStorage.setItem('portfolio-content', JSON.stringify(content, null, 2))
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const handleExport = () => {
    const blob = new Blob([JSON.stringify(content, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'portfolio-content.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleReset = () => {
    if (confirm('Reset to original content? This will discard your changes.')) {
      setContent(portfolioContent)
      localStorage.removeItem('portfolio-content')
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold text-gray-800">Portfolio Content Editor</h1>
            <div className="flex gap-2">
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                Save to Browser
              </button>
              <button
                onClick={handleExport}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
              >
                Export JSON
              </button>
              <button
                onClick={handleReset}
                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
              >
                Reset
              </button>
            </div>
          </div>
          {saved && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
              Content saved to browser! Changes will be visible on the main page.
            </div>
          )}
          <p className="text-gray-600 mb-4">
            Edit the content below. Changes are saved to your browser. To make them permanent, export the JSON and replace{' '}
            <code className="bg-gray-200 px-2 py-1 rounded">content/portfolio-content.json</code> in your repository.
          </p>
        </div>

        {/* Hero Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Hero Section</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Hero Text</label>
            <textarea
              value={content.hero.text}
              onChange={(e) => setContent({ ...content, hero: { ...content.hero, text: e.target.value } })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
            />
          </div>
        </div>

        {/* Gallery Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Gallery Section</h2>
          <div className="space-y-4">
            {content.gallery.items.map((item, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex gap-4 mb-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-24 h-24 object-cover rounded"
                  />
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
                    <input
                      type="text"
                      value={item.image}
                      onChange={(e) => {
                        const newItems = [...content.gallery.items]
                        newItems[index] = { ...newItems[index], image: e.target.value }
                        setContent({ ...content, gallery: { ...content.gallery, items: newItems } })
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                    />
                    <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                    <input
                      type="text"
                      value={item.title}
                      onChange={(e) => {
                        const newItems = [...content.gallery.items]
                        newItems[index] = { ...newItems[index], title: e.target.value }
                        setContent({ ...content, gallery: { ...content.gallery, items: newItems } })
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <button
                  onClick={() => {
                    const newItems = content.gallery.items.filter((_, i) => i !== index)
                    setContent({ ...content, gallery: { ...content.gallery, items: newItems } })
                  }}
                  className="text-red-600 hover:text-red-800 text-sm"
                >
                  Remove Item
                </button>
              </div>
            ))}
            <button
              onClick={() => {
                const newItems = [...content.gallery.items, { image: '', title: 'New Project' }]
                setContent({ ...content, gallery: { ...content.gallery, items: newItems } })
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              Add Gallery Item
            </button>
          </div>
        </div>

        {/* About Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">About Section</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">About Image URL</label>
            <input
              type="text"
              value={content.about.image}
              onChange={(e) => setContent({ ...content, about: { ...content.about, image: e.target.value } })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            />
            <img
              src={content.about.image}
              alt="About preview"
              className="w-32 h-32 object-cover rounded mb-4"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">About Text 1</label>
            <textarea
              value={content.about.text1}
              onChange={(e) => setContent({ ...content, about: { ...content.about, text1: e.target.value } })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">About Text 2</label>
            <textarea
              value={content.about.text2}
              onChange={(e) => setContent({ ...content, about: { ...content.about, text2: e.target.value } })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
            />
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Contact Section</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Text</label>
              <input
                type="text"
                value={content.contact.email.text}
                onChange={(e) =>
                  setContent({
                    ...content,
                    contact: { ...content.contact, email: { ...content.contact.email, text: e.target.value } },
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
              />
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Link</label>
              <input
                type="text"
                value={content.contact.email.href}
                onChange={(e) =>
                  setContent({
                    ...content,
                    contact: { ...content.contact, email: { ...content.contact.email, href: e.target.value } },
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone Text</label>
              <input
                type="text"
                value={content.contact.phone.text}
                onChange={(e) =>
                  setContent({
                    ...content,
                    contact: { ...content.contact, phone: { ...content.contact.phone, text: e.target.value } },
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
              />
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone Link</label>
              <input
                type="text"
                value={content.contact.phone.href}
                onChange={(e) =>
                  setContent({
                    ...content,
                    contact: { ...content.contact, phone: { ...content.contact.phone, href: e.target.value } },
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Instagram Text</label>
              <input
                type="text"
                value={content.contact.instagram.text}
                onChange={(e) =>
                  setContent({
                    ...content,
                    contact: { ...content.contact, instagram: { ...content.contact.instagram, text: e.target.value } },
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
              />
              <label className="block text-sm font-medium text-gray-700 mb-2">Instagram Link</label>
              <input
                type="text"
                value={content.contact.instagram.href}
                onChange={(e) =>
                  setContent({
                    ...content,
                    contact: { ...content.contact, instagram: { ...content.contact.instagram, href: e.target.value } },
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn Text</label>
              <input
                type="text"
                value={content.contact.linkedin.text}
                onChange={(e) =>
                  setContent({
                    ...content,
                    contact: { ...content.contact, linkedin: { ...content.contact.linkedin, text: e.target.value } },
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
              />
              <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn Link</label>
              <input
                type="text"
                value={content.contact.linkedin.href}
                onChange={(e) =>
                  setContent({
                    ...content,
                    contact: { ...content.contact, linkedin: { ...content.contact.linkedin, href: e.target.value } },
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

