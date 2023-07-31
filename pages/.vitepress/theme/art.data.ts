import { createContentLoader } from 'vitepress'

interface Art{
  title: string
  image_url?: string 
}

declare const data: Art[]
export { data }

export default createContentLoader('art/*.md', {
 excerpt: true,
 transform(raw): Art[] {
   return raw
     .map(({ frontmatter }) => ({
       title: frontmatter.title,
       image_url: frontmatter.image_url
     }))
 }
})
