'use client'

import * as React from 'react'
import { useEffect, useState, useRef } from 'react'
import { Waves } from '@/components/ui/wave-background'
import { Navigation } from '@/components/ui/navigation'

export function Portfolio() {
  const [currentSection, setCurrentSection] = useState('hero')
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const sections = ['hero', 'gallery', 'about', 'contact']
    const sectionElements = sections.map(id => document.getElementById(id)).filter(Boolean) as HTMLElement[]
    
    if (sectionElements.length === 0) return

    // Use IntersectionObserver for better accuracy
    const observerOptions = {
      root: null, // viewport
      rootMargin: '-20% 0px -20% 0px', // Require at least 60% visibility
      threshold: [0, 0.5, 1.0]
    }

    const observer = new IntersectionObserver((entries) => {
      // Find the entry with the highest intersection ratio
      let maxRatio = 0
      let mostVisible: string | null = null

      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
          maxRatio = entry.intersectionRatio
          mostVisible = entry.target.id
        }
      })

      // If we found a visible section, update state
      if (mostVisible) {
        setCurrentSection((prev) => {
          if (prev !== mostVisible) {
            return mostVisible as string
          }
          return prev
        })
      }
    }, observerOptions)

    // Observe all sections
    sectionElements.forEach(element => {
      observer.observe(element)
    })

    // Fallback: also check on scroll for immediate feedback
    const handleScroll = () => {
      const viewportCenter = window.innerHeight / 2
      let current = 'hero'
      let closestDistance = Infinity

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId)
        if (element) {
          const rect = element.getBoundingClientRect()
          const sectionCenter = rect.top + rect.height / 2
          const distance = Math.abs(viewportCenter - sectionCenter)
          
          if (distance < closestDistance) {
            closestDistance = distance
            current = sectionId
          }
        }
      }

      setCurrentSection(current)
    }

    let ticking = false
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    
    // Initial check
    setTimeout(() => handleScroll(), 100)

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  // Placeholder images - using Unsplash placeholders
  const galleryImages = [
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=400&fit=crop',
  ]

  // Handle iPhone Safari viewport height issue
  useEffect(() => {
    const setViewportHeight = () => {
      const vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty('--vh', `${vh}px`)
    }
    
    setViewportHeight()
    window.addEventListener('resize', setViewportHeight)
    window.addEventListener('orientationchange', setViewportHeight)
    
    return () => {
      window.removeEventListener('resize', setViewportHeight)
      window.removeEventListener('orientationchange', setViewportHeight)
    }
  }, [])

  return (
    <div ref={containerRef} className="relative w-full min-h-full">
      {/* Waves Background */}
      <div className="fixed inset-0 w-full overflow-hidden" style={{ zIndex: 0, height: '100dvh' }}>
        <Waves className="h-full w-full" strokeColor="#ffffff" backgroundColor="#000000" />
      </div>

      {/* Navigation */}
      <Navigation currentSection={currentSection} />

      {/* Main Content Container */}
      <div className="relative" style={{ zIndex: 10 }}>
        {/* Section 1: Hero/Value Proposition */}
        <section
          id="hero"
          className="min-h-screen w-full flex items-center justify-center snap-start snap-always"
        >
          <div className="container mx-auto px-4 md:px-8 text-center">
            <p className="text-lg md:text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              <span className="text-with-underlay-sm">
                Transforming ideas into reality through creative excellence and technical expertise. 
                We deliver exceptional results that exceed expectations and drive meaningful impact.
              </span>
            </p>
          </div>
        </section>

        {/* Section 2: Gallery */}
        <section
          id="gallery"
          className="min-h-screen w-full flex items-center justify-center snap-start snap-always py-20"
        >
          <div className="container mx-auto px-4 md:px-8">
            <div className="overflow-x-auto pb-4 scrollbar-hide">
              <div className="flex gap-3 sm:gap-4 md:gap-6 lg:gap-8 px-4">
                {galleryImages.map((image, index) => (
                  <div
                    key={index}
                    className="group relative flex-shrink-0 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 cursor-pointer"
                  >
                    <img
                      src={image}
                      alt={`Gallery item ${index + 1}`}
                      className="w-full h-full object-cover transition-all duration-300 group-hover:brightness-50 group-active:brightness-50 shadow-2xl"
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-300">
                      <p className="text-white text-base sm:text-xl md:text-2xl font-semibold text-center px-4">
                        <span className="text-with-underlay-sm">
                          Project {index + 1}
                        </span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: About */}
        <section
          id="about"
          className="min-h-screen w-full flex items-center justify-center snap-start snap-always py-20"
        >
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col items-center gap-8 md:gap-12">
                <div className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 flex-shrink-0">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop"
                    alt="About us"
                    className="w-full h-full object-cover shadow-2xl"
                  />
                </div>
                <div className="text-center max-w-2xl">
                  <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 leading-relaxed mb-4">
                    <span className="text-with-underlay-sm">
                      We are a passionate team of creative professionals dedicated to delivering 
                      exceptional results. With years of experience and a commitment to excellence, 
                      we bring innovative solutions to every project.
                    </span>
                  </p>
                  <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 leading-relaxed">
                    <span className="text-with-underlay-sm">
                      Our mission is to create meaningful connections through design, technology, 
                      and storytelling. We believe in the power of collaboration and the importance 
                      of understanding our clients' unique needs.
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Contact */}
        <section
          id="contact"
          className="min-h-screen w-full flex items-center justify-center snap-start snap-always py-20"
        >
          <div className="container mx-auto px-4 md:px-8 text-center">
            <div className="flex flex-wrap justify-center gap-6 sm:gap-8 md:gap-12">
              <a
                href="mailto:contact@example.com"
                className="text-white text-base sm:text-lg md:text-xl lg:text-2xl font-semibold transition-opacity duration-300 hover:opacity-80"
              >
                <span className="text-with-underlay-sm">Email</span>
              </a>
              <a
                href="tel:+1234567890"
                className="text-white text-base sm:text-lg md:text-xl lg:text-2xl font-semibold transition-opacity duration-300 hover:opacity-80"
              >
                <span className="text-with-underlay-sm">Phone</span>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white text-base sm:text-lg md:text-xl lg:text-2xl font-semibold transition-opacity duration-300 hover:opacity-80"
              >
                <span className="text-with-underlay-sm">Instagram</span>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white text-base sm:text-lg md:text-xl lg:text-2xl font-semibold transition-opacity duration-300 hover:opacity-80"
              >
                <span className="text-with-underlay-sm">LinkedIn</span>
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

