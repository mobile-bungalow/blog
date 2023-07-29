<script setup lang="ts">
import { useData } from 'vitepress'
import MainLayout from './components/MainLayout.vue';
import BlogRoll from './components/BlogRoll.vue';

// https://vitepress.dev/reference/runtime-api#usedata
const { site, frontmatter } = useData()
</script>

<template>
  <div v-if="frontmatter.home">
    <MainLayout>
      <BlogRoll></BlogRoll>
    </MainLayout>
  </div>
</template>
