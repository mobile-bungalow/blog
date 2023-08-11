import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  themeConfig: {
    logo: 'public/favicon.ico',
  },
  title: "Concentrated Bursts",
  description: "the personal site of Paul May.",
  base: "/blog",
  vite: {
    server: {
      headers: {
                "Cross-Origin-Opener-Policy": "same-origin",
                "Cross-Origin-Embedder-Policy": "require-corp",
      },
    },
  },
})
