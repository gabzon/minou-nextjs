# Product
`import {defineField, defineType} from 'sanity'

export const productType = defineType({
  name: 'products',
  title: 'Products',
  type: 'document',
  groups: [
    {
      name: 'classification',
      title: 'Classification',
    },
    {
      name: 'pricing',
      title: 'Pricing',
    },
    {
      name: 'specifications',
      title: 'Specifications',
    },
    {
      name: 'inventory',
      title: 'Inventory & Availability',
    },
    {
      name: 'seo',
      title: 'SEO',
    }
  ],
  fields: [
    // Basic Information
    defineField({
      name: 'name',
      title: 'Product Name',
      type: 'string',
      description: 'The name of the jewelry piece',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'URL-friendly identifier',
      options: {
        source: 'name',
        maxLength: 96
      },
      validation: Rule => Rule.required()
    }),

    defineField({
      name: 'video',
      title: 'Video',
      type: 'url',
      description: 'Video URL for product',
    }),

    // Images
    defineField({
      name: 'images',
      title: 'Product Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true
          },
          fields: [
            {
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
              description: 'Important for SEO and accessibility'
            }
          ]
        }
      ],
      validation: Rule => Rule.required().min(1)
    }),

        // Description
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      rows: 3,
      description: 'Brief description for product cards/previews'
    }),

    defineField({
      name: 'description',
      title: 'Full Description',
      type: 'array',
      of: [{type: 'block'}],
      description: 'Detailed product description with rich text formatting'
    }),

    // Care Instructions
    defineField({
      name: 'careInstructions',
      title: 'Care Instructions',
      type: 'text',
      rows: 3
    }),
    
    // Pricing
    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
      description: 'Price in your local currency',
      group: 'pricing',
      validation: Rule => Rule.required().min(0)
    }),

    defineField({
      name: 'discount',
      title: 'Discount',
      type: 'number',
      description: 'Original price (for showing discounts)',
      group: 'pricing'
    }),
    
    defineField({
      name: 'currency',
      title: 'Currency',
      type: 'string',
      initialValue: 'EUR',
      group: 'pricing',
      options: {
        list: [
            {title: 'EUR - Euro', value: 'EUR'},
            {title: 'USD - US Dollar', value: 'USD'},
            {title: 'GBP - British Pound', value: 'GBP'},
            {title: 'CAD - Canadian Dollar', value: 'CAD'},
            {title: 'AUD - Australian Dollar', value: 'AUD'}
        ]
      }
    }),

    // Category (Reference)
    defineField({
      name: 'type',
      title: 'Type',
      type: 'reference',
      to: [{type: 'genre'}],
      group: 'classification',
      validation: Rule => Rule.required()
    }),

    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{type: 'category'}],
      group: 'classification',
      validation: Rule => Rule.required()
    }),

    // Collection (Reference)
    defineField({
      name: 'collection',
      title: 'Collection',
      type: 'reference',
      to: [{type: 'collection'}],
      group: 'classification',
      description: 'Which collection does this belong to?'
    }),
    
    // Tags
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      group: 'classification',
      of: [{type: 'string'}],
      options: {
        layout: 'tags'
      }
    }),

    defineField({
      name: 'isCustomizable',
      title: 'Is Customizable',
      type: 'boolean',
      group: 'classification',
      description: 'Can this item be customized or made to order?',
    }),

    // Featured & New
    defineField({
      name: 'isFeatured',
      title: 'Featured Product',
      type: 'boolean',
      group: 'classification',
      description: 'Show this product in featured sections'
    }),
    
    defineField({
      name: 'isNew',
      title: 'New Arrival',
      type: 'boolean',
      group: 'classification',
      description: 'Mark this as a new arrival'
    }),

    // Colors (References with additional details)
    defineField({
      name: 'color',
      title: 'Colors',
      type: 'array',
      group: 'specifications',
      of: [
        {
            type: 'reference',
            to: [{type: 'color'}],
        }
      ]
    }),

    // Materials (References - Multiple)
    defineField({
      name: 'materials',
      title: 'Materials',
      type: 'array',
      group: 'specifications',
      of: [
        {
          type: 'reference',
          to: [{type: 'material'}]
        }
      ]
    }),

    // Weight
    defineField({
      name: 'weight',
      title: 'Weight',
      type: 'number',
      group: 'specifications',
      description: 'Weight in grams'
    }),

    // Size Options (Unified)
    defineField({
      name: 'sizeOptions',
      title: 'Available Sizes',
      type: 'array',
      of: [{type: 'string'}],
      group: 'specifications',
      description: 'Ring sizes, chain lengths, bracelet sizes, etc.',
      options: {
        list: [
          // Generic sizes
          {title: 'Extra Small', value: 'XS'},
          {title: 'Small', value: 'S'},
          {title: 'Medium', value: 'M'},
          {title: 'Large', value: 'L'},
          {title: 'Extra Large', value: 'XL'},
          {title: 'One Size', value: 'one-size'}
        ]
      }
    }),

    // Dimensions
    defineField({
      name: 'dimensions',
      title: 'Dimensions',
      type: 'object',
      group: 'specifications',
      options: {
        collapsible: true,
        collapsed: true
      },
      fields: [
        {
          name: 'length',
          title: 'Length (mm)',
          type: 'number'
        },
        {
          name: 'width',
          title: 'Width (mm)',
          type: 'number'
        },
        {
          name: 'height',
          title: 'Height/Thickness (mm)',
          type: 'number'
        }
      ]
    }),

    // Inventory & Availability
    defineField({
      name: 'inStock',
      title: 'In Stock',
      type: 'boolean',
      initialValue: true,
      group: 'inventory'
    }),
    defineField({
      name: 'quantity',
      title: 'Quantity Available',
      type: 'number',
      initialValue: 1,
      group: 'inventory'
    }),
    defineField({
      name: 'sku',
      title: 'SKU',
      type: 'string',
      group: 'inventory',
      description: 'Stock Keeping Unit'
    }),

    // SEO
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'object',
      group: 'seo',
      options: {
        collapsible: true,
        collapsed: false
      },
      fields: [
        {
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string',
          description: 'Title for search engines (50-60 characters)'
        },
        {
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          rows: 3,
          description: 'Description for search engines (150-160 characters)'
        }
      ]
    }),
  ],

  // Preview configuration
  preview: {
    select: {
      title: 'name',
      media: 'images.0',
      price: 'price',
      category: 'category.name',
      inStock: 'inStock'
    },
    prepare({title, media, price, category, inStock}) {
      return {
        title: title,
        subtitle: `${category || 'No category'} - $${price} ${!inStock ? '(Out of Stock)' : ''}`,
        media: media
      }
    }
  }
})`

# Category
`import {defineField, defineType} from 'sanity'

export const categoryType = defineType({
  name: 'category',
  title: 'Categories',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Category Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({ 
      name: 'image',
      title: 'Category Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }), 
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
    },
  },
})
`

# Collection
`import {defineField, defineType} from 'sanity'

export const collectionType = defineType({
  name: 'collection',
  title: 'Collections',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Collection Name',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3
    }),
    defineField({
      name: 'season',
      title: 'Season/Year',
      type: 'string',
      description: 'e.g., Spring 2024, Summer Collection'
    }),
    defineField({
      name: 'image',
      title: 'Collection Image',
      type: 'image',
      options: {
        hotspot: true
      }
    }),
    defineField({
      name: 'isFeatured',
      title: 'Featured Collection',
      type: 'boolean',
      initialValue: false
    })
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'season',
      media: 'image'
    }
  }
})`

# Color
`import {defineField, defineType} from 'sanity'

export const colorType = defineType({
  name: 'color',
  title: 'Colors',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Color Name',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'hex',
      title: 'Hex Code',
      type: 'string',
      validation: Rule => Rule.required()
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'type'
    }
  }
})`

# Genre
`import {defineField, defineType} from 'sanity'

export const genreType = defineType({
  name: 'genre',
  title: 'Genres',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Genre Name',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'description',
      title: 'Genre Description',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'type'
    }
  }
})`

# Material
`import {defineField, defineType} from 'sanity'

export const materialType = defineType({
  name: 'material',
  title: 'Materials',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Material Name',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'type'
    }
  }
})`

