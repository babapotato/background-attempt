import portfolioContent from '@/content/portfolio-content.json'

export interface PortfolioContent {
  hero: {
    text: string
  }
  gallery: {
    items: Array<{
      image: string
      title: string
    }>
  }
  about: {
    image: string
    text1: string
    text2: string
  }
  contact: {
    email: { text: string; href: string }
    phone: { text: string; href: string }
    instagram: { text: string; href: string }
    linkedin: { text: string; href: string }
  }
}

export function getPortfolioContent(): PortfolioContent {
  // Check if we're in the browser and have saved content in localStorage
  if (typeof window !== 'undefined') {
    const savedContent = localStorage.getItem('portfolio-content')
    if (savedContent) {
      try {
        return JSON.parse(savedContent) as PortfolioContent
      } catch (e) {
        console.error('Failed to parse saved content, using default', e)
      }
    }
  }
  return portfolioContent as PortfolioContent
}

