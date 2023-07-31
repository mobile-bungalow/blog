<script setup lang="ts">
import { useData, createContentLoader} from 'vitepress'
import MainLayout from './components/MainLayout.vue';
import BlogRoll from './components/BlogRoll.vue';
import Post from './components/Post.vue';

const { frontmatter } = useData()

</script>

<template>
    <MainLayout>
        <BlogRoll v-if="frontmatter.layout == 'blog'"></BlogRoll>
        <Post v-if="frontmatter.layout == 'blog_post'"></Post>
    </MainLayout>
</template>
