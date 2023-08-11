import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  head: [
    [ 'script', {src: '/blog/coi-serviceworker.js'} ]
  ],
  themeConfig: {
    logo: 'public/favicon.ico',
  },
  title: "Concentrated Bursts",
  description: "the personal site of Paul May.",
  base: "/blog",
})
