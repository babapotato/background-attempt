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

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setCurrentSection(sectionId)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial check

    return () => window.removeEventListener('scroll', handleScroll)
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

  return (
    <div ref={containerRef} className="relative w-full h-full">
      {/* Waves Background */}
      <div className="fixed inset-0 w-screen h-screen bg-black overflow-hidden -z-10">
        <Waves className="h-full w-full" />
      </div>

      {/* Navigation */}
      <Navigation currentSection={currentSection} />

      {/* Main Content Container */}
      <div className="relative z-10">
        {/* Section 1: Hero/Value Proposition */}
        <section
          id="hero"
          className="min-h-screen w-full flex items-center justify-center snap-start snap-always"
        >
          <div className="container mx-auto px-4 md:px-8 text-center">
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold text-white mb-6 drop-shadow-[0_2px_20px_rgba(0,0,0,0.8)]">
              {currentSection === 'hero' ? 'Innovative Solutions' : 'Home'}
            </h1>
            <p className="text-xl md:text-2xl lg:text-3xl text-white/90 max-w-3xl mx-auto drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] leading-relaxed">
              Transforming ideas into reality through creative excellence and technical expertise. 
              We deliver exceptional results that exceed expectations and drive meaningful impact.
            </p>
          </div>
        </section>

        {/* Section 2: Gallery */}
        <section
          id="gallery"
          className="min-h-screen w-full flex items-center justify-center snap-start snap-always py-20"
        >
          <div className="container mx-auto px-4 md:px-8">
            <h2 className="text-6xl md:text-8xl lg:text-9xl font-bold text-white mb-12 text-center drop-shadow-[0_2px_20px_rgba(0,0,0,0.8)]">
              {currentSection === 'gallery' ? 'Our Work' : 'Gallery'}
            </h2>
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
                      <p className="text-white text-base sm:text-xl md:text-2xl font-semibold drop-shadow-lg text-center px-4">
                        Project {index + 1}
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
            <h2 className="text-6xl md:text-8xl lg:text-9xl font-bold text-white mb-12 text-center drop-shadow-[0_2px_20px_rgba(0,0,0,0.8)]">
              {currentSection === 'about' ? 'About Us' : 'About'}
            </h2>
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
                  <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] leading-relaxed mb-4">
                    We are a passionate team of creative professionals dedicated to delivering 
                    exceptional results. With years of experience and a commitment to excellence, 
                    we bring innovative solutions to every project.
                  </p>
                  <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] leading-relaxed">
                    Our mission is to create meaningful connections through design, technology, 
                    and storytelling. We believe in the power of collaboration and the importance 
                    of understanding our clients' unique needs.
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
            <h2 className="text-6xl md:text-8xl lg:text-9xl font-bold text-white mb-12 drop-shadow-[0_2px_20px_rgba(0,0,0,0.8)]">
              {currentSection === 'contact' ? 'Get In Touch' : 'Contact'}
            </h2>
            <div className="flex flex-wrap justify-center gap-6 sm:gap-8 md:gap-12">
              <a
                href="mailto:contact@example.com"
                className="group flex flex-col items-center gap-3 sm:gap-4 p-4 sm:p-6 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all duration-300 min-w-[120px] sm:min-w-[140px]"
              >
                <Mail className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white drop-shadow-lg" />
                <span className="text-white text-sm sm:text-lg md:text-xl font-semibold drop-shadow-lg">
                  Email
                </span>
              </a>
              <a
                href="tel:+1234567890"
                className="group flex flex-col items-center gap-3 sm:gap-4 p-4 sm:p-6 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all duration-300 min-w-[120px] sm:min-w-[140px]"
              >
                <Phone className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white drop-shadow-lg" />
                <span className="text-white text-sm sm:text-lg md:text-xl font-semibold drop-shadow-lg">
                  Phone
                </span>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center gap-3 sm:gap-4 p-4 sm:p-6 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all duration-300 min-w-[120px] sm:min-w-[140px]"
              >
                <Instagram className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white drop-shadow-lg" />
                <span className="text-white text-sm sm:text-lg md:text-xl font-semibold drop-shadow-lg">
                  Instagram
                </span>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center gap-3 sm:gap-4 p-4 sm:p-6 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all duration-300 min-w-[120px] sm:min-w-[140px]"
              >
                <Linkedin className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white drop-shadow-lg" />
                <span className="text-white text-sm sm:text-lg md:text-xl font-semibold drop-shadow-lg">
                  LinkedIn
                </span>
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

