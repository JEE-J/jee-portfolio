import { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://jee.codes',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    // When you add an 'about' or 'projects' page later, you just add them to this list!
  ]
}