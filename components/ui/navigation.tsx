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
  ]

  // Debug: log current section
  React.useEffect(() => {
    console.log('Navigation received currentSection:', currentSection)
  }, [currentSection])

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
        <div className="flex gap-3">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={`px-5 py-3 transition-all duration-300 ${
                currentSection === section.id
                  ? 'bg-black text-white font-bold'
                  : 'bg-black text-white font-normal'
              }`}
            >
              <span className="text-with-underlay-sm">{section.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Mobile Navigation - Bottom */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 flex justify-center items-center p-4">
        <div className="flex gap-2">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={`px-3 py-2 text-xs transition-all duration-300 ${
                currentSection === section.id
                  ? 'bg-black text-white font-bold'
                  : 'bg-black text-white font-normal'
              }`}
            >
              <span className="text-with-underlay-sm">{section.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </>
  )
}

