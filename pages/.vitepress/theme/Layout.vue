<script setup lang="ts">
import { useData, createContentLoader} from 'vitepress'
import MainLayout from './components/MainLayout.vue';
import BlogRoll from './components/BlogRoll.vue';
import Collections from './components/Collections.vue';

// https://vitepress.dev/reference/runtime-api#usedata
const { site, frontmatter } = useData()

</script>

<template>
    <MainLayout>
        <BlogRoll v-if="frontmatter.layout == 'blog'"></BlogRoll>
        <Collections v-if="frontmatter.layout == 'collections'"></Collections>
    </MainLayout>
</template>
