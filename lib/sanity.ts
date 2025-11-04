import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

export const client = projectId
  ? createClient({
      projectId,
      dataset,
      useCdn: true,
      apiVersion: '2024-01-01',
    })
  : null

const builder = client ? imageUrlBuilder(client) : null

export function urlFor(source: SanityImageSource) {
  if (!builder) {
    throw new Error('Sanity client not configured. Please set NEXT_PUBLIC_SANITY_PROJECT_ID in your environment variables.')
  }
  return builder.image(source)
}

