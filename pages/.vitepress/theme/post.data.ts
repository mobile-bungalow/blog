import { createContentLoader } from 'vitepress'

interface Post {
  title: string
  url: string
  image_url?: string 
  date: {
    time: number
    string: string
  }
  excerpt?: string
  tags: string[]
}

declare const data: Post[]
export { data }

export default createContentLoader('posts/*.md', {
 excerpt: true,
 transform(raw): Post[] {
   return raw
     .map(({ url, frontmatter }) => ({
       title: frontmatter.title,
       url,
       excerpt: frontmatter.excerpt,
       date: formatDate(frontmatter.date),
       tags: frontmatter.tags,
       image_url: frontmatter.image_url
     }))
     .sort((a, b) => b.date.time - a.date.time)
 }
})

function formatDate(raw: string): Post['date'] {
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