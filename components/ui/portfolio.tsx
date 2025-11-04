'use client'

import * as React from 'react'
import { useEffect, useState, useRef } from 'react'
import { Waves } from '@/components/ui/wave-background'
import { Navigation } from '@/components/ui/navigation'
import { Mail, Phone, Instagram, Linkedin } from 'lucide-react'

export function Portfolio() {
  const [currentSection, setCurrentSection] = useState('hero')
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'gallery', 'about', 'contact']
      const scrollPosition = window.scrollY + window.innerHeight / 2
      let current = 'hero'

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId)
        if (element) {
          const rect = element.getBoundingClientRect()
          const elementTop = window.scrollY + rect.top
          const elementBottom = elementTop + rect.height
          
          if (scrollPosition >= elementTop && scrollPosition < elementBottom) {
            current = sectionId
            break
          }
        }
      }

      setCurrentSection(current)
    }

    // Use requestAnimationFrame for smooth updates
    let rafId: number | null = null
    const onScroll = () => {
      if (rafId === null) {
        rafId = requestAnimationFrame(() => {
          handleScroll()
          rafId = null
        })
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    handleScroll() // Initial check

    return () => {
      window.removeEventListener('scroll', onScroll)
      if (rafId !== null) {
        cancelAnimationFrame(rafId)
      }
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
                      className="w-full h-full object-cover rounded-lg transition-all duration-300 group-hover:brightness-50 group-active:brightness-50 shadow-2xl"
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
                    className="w-full h-full object-cover rounded-lg shadow-2xl"
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
                className="group flex flex-col items-center gap-3 sm:gap-4 p-4 sm:p-6 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all duration-300 min-w-[120px] sm:min-w-[140px]"
              >
                <Mail className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white" />
                <span className="text-white text-sm sm:text-lg md:text-xl font-semibold">
                  <span className="text-with-underlay-sm">Email</span>
                </span>
              </a>
              <a
                href="tel:+1234567890"
                className="group flex flex-col items-center gap-3 sm:gap-4 p-4 sm:p-6 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all duration-300 min-w-[120px] sm:min-w-[140px]"
              >
                <Phone className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white" />
                <span className="text-white text-sm sm:text-lg md:text-xl font-semibold">
                  <span className="text-with-underlay-sm">Phone</span>
                </span>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center gap-3 sm:gap-4 p-4 sm:p-6 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all duration-300 min-w-[120px] sm:min-w-[140px]"
              >
                <Instagram className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white" />
                <span className="text-white text-sm sm:text-lg md:text-xl font-semibold">
                  <span className="text-with-underlay-sm">Instagram</span>
                </span>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center gap-3 sm:gap-4 p-4 sm:p-6 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all duration-300 min-w-[120px] sm:min-w-[140px]"
              >
                <Linkedin className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white" />
                <span className="text-white text-sm sm:text-lg md:text-xl font-semibold">
                  <span className="text-with-underlay-sm">LinkedIn</span>
                </span>
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

