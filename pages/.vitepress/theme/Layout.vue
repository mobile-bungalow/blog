<script setup lang="ts">
import { useData, createContentLoader} from 'vitepress'
import MainLayout from './components/MainLayout.vue';
import BlogRoll from './components/BlogRoll.vue';

// https://vitepress.dev/reference/runtime-api#usedata
const { site, frontmatter } = useData()

</script>

<template>
    <MainLayout>
      <div v-if="frontmatter.layout == 'blog'">
        <BlogRoll></BlogRoll>
      </div>
      <div v-if="frontmatter.layout == 'games'">
      </div>
      <div v-if="frontmatter.layout == 'collections'">
      </div>
      <div v-if="frontmatter.layout == 'art'">
      </div>
      <div v-if="frontmatter.layout == 'article'">
      </div>
      <div v-if="frontmatter.layout == 'game_player'">
      </div>
    </MainLayout>
</template>
