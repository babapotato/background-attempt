'use client'

import * as React from 'react'

interface NavigationProps {
  currentSection: string
}

export function Navigation({ currentSection }: NavigationProps) {
  const sections = [
    { id: 'hero', label: 'Home' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ]

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <>
      {/* Desktop Navigation - Top */}
      <nav className="hidden md:flex fixed top-0 left-0 right-0 z-50 justify-center items-center gap-4 p-6">
        <div className="flex gap-3 bg-black/30 backdrop-blur-md rounded-2xl p-3 shadow-lg">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={`px-5 py-3 rounded-xl transition-all duration-300 font-medium ${
                currentSection === section.id
                  ? 'bg-white/30 text-white scale-105 shadow-lg'
                  : 'bg-white/10 text-white/80 hover:bg-white/20 hover:text-white'
              }`}
            >
              {section.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Mobile Navigation - Bottom */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 flex justify-center items-center p-4">
        <div className="flex gap-2 bg-black/30 backdrop-blur-md rounded-2xl p-2 shadow-lg">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={`px-3 py-2 rounded-xl text-xs transition-all duration-300 font-medium ${
                currentSection === section.id
                  ? 'bg-white/30 text-white scale-105 shadow-lg'
                  : 'bg-white/10 text-white/80 hover:bg-white/20 hover:text-white'
              }`}
            >
              {section.label}
            </button>
          ))}
        </div>
      </nav>
    </>
  )
}

