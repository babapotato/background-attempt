'use client'

import * as React from 'react'
import { useEffect, useState, useRef } from 'react'
import { Waves } from '@/components/ui/wave-background'
import { Navigation } from '@/components/ui/navigation'
import { getPortfolioContent } from '@/lib/sanity-queries'
import { urlFor } from '@/lib/sanity'
import { getPortfolioContent as getFallbackContent } from '@/lib/content'

export function Portfolio() {
  const [content, setContent] = useState<ReturnType<typeof getFallbackContent> | null>(null)
  const [currentSection, setCurrentSection] = useState('hero')
  const containerRef = useRef<HTMLDivElement>(null)

  // Fetch content from Sanity
  useEffect(() => {
    async function fetchContent() {
      const sanityContent = await getPortfolioContent()
      if (sanityContent) {
        // Transform Sanity image objects to URLs
        const transformedContent = {
          hero: sanityContent.hero,
          gallery: {
            items: sanityContent.gallery.items.map((item) => ({
              image: urlFor(item.image).width(800).height(800).url(),
              title: item.title,
            })),
          },
          about: {
            image: urlFor(sanityContent.about.image).width(800).height(800).url(),
            text1: sanityContent.about.text1,
            text2: sanityContent.about.text2,
          },
          contact: sanityContent.contact,
        }
        setContent(transformedContent)
      } else {
        // Fallback to JSON content if Sanity is not configured
        setContent(getFallbackContent())
      }
    }
    fetchContent()
  }, [])

  useEffect(() => {
    // Don't set up scroll detection until content is loaded
    if (!content) return

    const sections = ['hero', 'gallery', 'about', 'contact']
    
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

    // Use IntersectionObserver for better accuracy
    const observerOptions = {
      root: null, // viewport
      rootMargin: '-30% 0px -30% 0px', // Require section to be in center portion of viewport
      threshold: [0, 0.25, 0.5, 0.75, 1.0]
    }

    const observer = new IntersectionObserver((entries) => {
      // Find the entry with the highest intersection ratio that's intersecting
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
        setCurrentSection(mostVisible)
      }
    }, observerOptions)

    // Get section elements after content is loaded
    const sectionElements = sections.map(id => document.getElementById(id)).filter(Boolean) as HTMLElement[]
    
    if (sectionElements.length > 0) {
      // Observe all sections
      sectionElements.forEach(element => {
        observer.observe(element)
      })
    }

    // Also check on scroll for immediate feedback
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
    
    // Initial check after a short delay to ensure DOM is ready
    setTimeout(() => handleScroll(), 100)

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
    }
  }, [content])


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

  if (!content) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white">
        <p>Loading...</p>
      </div>
    )
  }

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
                {content.hero.text}
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
                {content.gallery.items.map((item, index) => (
                  <div
                    key={index}
                    className="group relative flex-shrink-0 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 cursor-pointer"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-all duration-300 group-hover:brightness-50 group-active:brightness-50 shadow-2xl"
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-300">
                      <p className="text-white text-base sm:text-xl md:text-2xl font-semibold text-center px-4">
                        <span className="text-with-underlay-sm">
                          {item.title}
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
                    src={content.about.image}
                    alt="About us"
                    className="w-full h-full object-cover shadow-2xl"
                  />
                </div>
                <div className="text-center max-w-2xl">
                  <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 leading-relaxed mb-4">
                    <span className="text-with-underlay-sm">
                      {content.about.text1}
                    </span>
                  </p>
                  <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 leading-relaxed">
                    <span className="text-with-underlay-sm">
                      {content.about.text2}
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
                href={content.contact.email.href}
                className="text-white text-base sm:text-lg md:text-xl lg:text-2xl font-semibold transition-opacity duration-300 hover:opacity-80"
              >
                <span className="text-with-underlay-sm">{content.contact.email.text}</span>
              </a>
              <a
                href={content.contact.phone.href}
                className="text-white text-base sm:text-lg md:text-xl lg:text-2xl font-semibold transition-opacity duration-300 hover:opacity-80"
              >
                <span className="text-with-underlay-sm">{content.contact.phone.text}</span>
              </a>
              <a
                href={content.contact.instagram.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white text-base sm:text-lg md:text-xl lg:text-2xl font-semibold transition-opacity duration-300 hover:opacity-80"
              >
                <span className="text-with-underlay-sm">{content.contact.instagram.text}</span>
              </a>
              <a
                href={content.contact.linkedin.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white text-base sm:text-lg md:text-xl lg:text-2xl font-semibold transition-opacity duration-300 hover:opacity-80"
              >
                <span className="text-with-underlay-sm">{content.contact.linkedin.text}</span>
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

