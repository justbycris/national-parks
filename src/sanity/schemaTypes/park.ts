import { defineType, defineField } from 'sanity'

export const park = defineType({
  name: 'park',
  title: 'Park',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: { source: 'name' },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'states', type: 'array', of: [{ type: 'string' }] }),
    defineField({
      name: 'region',
      type: 'string',
      options: {
        list: ['West', 'Southwest', 'Midwest', 'Northeast', 'Southeast', 'Alaska'],
      },
    }),
    defineField({ name: 'established', type: 'number' }),
    defineField({ name: 'acres', type: 'number' }),
    defineField({ name: 'annualVisitors', type: 'number' }),
    defineField({ name: 'summary', type: 'text', rows: 3 }),
    defineField({ name: 'highlights', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'bestSeason', type: 'string' }),
    defineField({
      name: 'image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', type: 'string', title: 'Alt text' }),
      ],
    }),
  ],
})