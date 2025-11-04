import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'portfolio',
  title: 'Portfolio',
  type: 'document',
  fields: [
    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      fields: [
        defineField({
          name: 'text',
          title: 'Hero Text',
          type: 'text',
          rows: 3,
        }),
      ],
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery',
      type: 'object',
      fields: [
        defineField({
          name: 'items',
          title: 'Gallery Items',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'image',
                  title: 'Image',
                  type: 'image',
                  options: {
                    hotspot: true,
                  },
                }),
                defineField({
                  name: 'title',
                  title: 'Title',
                  type: 'string',
                }),
              ],
              preview: {
                select: {
                  title: 'title',
                  media: 'image',
                },
              },
            },
          ],
        }),
      ],
    }),
    defineField({
      name: 'about',
      title: 'About Section',
      type: 'object',
      fields: [
        defineField({
          name: 'image',
          title: 'About Image',
          type: 'image',
          options: {
            hotspot: true,
          },
        }),
        defineField({
          name: 'text1',
          title: 'About Text 1',
          type: 'text',
          rows: 3,
        }),
        defineField({
          name: 'text2',
          title: 'About Text 2',
          type: 'text',
          rows: 3,
        }),
      ],
    }),
    defineField({
      name: 'contact',
      title: 'Contact Section',
      type: 'object',
      fields: [
        defineField({
          name: 'email',
          title: 'Email',
          type: 'object',
          fields: [
            defineField({
              name: 'text',
              title: 'Email Text',
              type: 'string',
            }),
            defineField({
              name: 'href',
              title: 'Email Link',
              type: 'string',
            }),
          ],
        }),
        defineField({
          name: 'phone',
          title: 'Phone',
          type: 'object',
          fields: [
            defineField({
              name: 'text',
              title: 'Phone Text',
              type: 'string',
            }),
            defineField({
              name: 'href',
              title: 'Phone Link',
              type: 'string',
            }),
          ],
        }),
        defineField({
          name: 'instagram',
          title: 'Instagram',
          type: 'object',
          fields: [
            defineField({
              name: 'text',
              title: 'Instagram Text',
              type: 'string',
            }),
            defineField({
              name: 'href',
              title: 'Instagram Link',
              type: 'url',
            }),
          ],
        }),
        defineField({
          name: 'linkedin',
          title: 'LinkedIn',
          type: 'object',
          fields: [
            defineField({
              name: 'text',
              title: 'LinkedIn Text',
              type: 'string',
            }),
            defineField({
              name: 'href',
              title: 'LinkedIn Link',
              type: 'url',
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Portfolio Content',
      }
    },
  },
})

