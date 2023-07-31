import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  themeConfig: {
    logo: 'public/favicon.ico',
    search: {
      provider: 'local'
    }
  },
  title: "Concentrated Bursts",
  description: "the personal site of Paul May."
})
