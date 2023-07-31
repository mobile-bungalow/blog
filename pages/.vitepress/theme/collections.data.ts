import { createContentLoader } from 'vitepress'

interface Collection{
  title: string
  image_url?: string 
  date: {
    time: number
    string: string
  }
  excerpt?: string
  tags: string[]
}

declare const data: Collection[]
export { data }

export default createContentLoader('collections/*.md', {
 excerpt: true,
 transform(raw): Collection[] {
   return raw
     .map(({ url, frontmatter, excerpt }) => ({
       title: frontmatter.title,
       url,
       excerpt,
       date: formatDate(frontmatter.date),
       tags: frontmatter.tags,
       image_url: frontmatter.image_url
     }))
     .sort((a, b) => b.date.time - a.date.time)
 }
})

function formatDate(raw: string): Collection['date'] {
  const date = new Date(raw)
  date.setUTCHours(12)
  return {
    time: +date,
    string: date.toLocaleDateString('en-US', {
      year: '2-digit',
      month: '2-digit',
      day: 'numeric'
    })
  }
}