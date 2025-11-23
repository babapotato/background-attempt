import { client } from './sanity'

export interface PortfolioContent {
  hero: {
    text: string
  }
  gallery: {
    items: Array<{
      image: {
        asset: {
          _ref: string
          _type: string
        }
      }
      title: string
    }>
  }
  about: {
    image: {
      asset: {
        _ref: string
        _type: string
      }
    }
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

export async function getPortfolioContent(): Promise<PortfolioContent | null> {
  try {
    const query = `*[_type == "portfolio"][0]`
    const data = await client.fetch(query)
    
    if (!data) {
      return null
    }

    return data as PortfolioContent
  } catch (error) {
    console.error('Error fetching portfolio content:', error)
    return null
  }
}

