---
title: Yet Another Shadertoy 
date: 2023-11-08
tags: [graphics, wgpu]
layout: blog_post
image_url: "/assets/blog_2.png"
excerpt: Introducing the web version of my procedural art project `Tweak Shader`, a webgpu based shadertoy leveraging wasm and the Naga library for reflection and runtime uniform manipulation. Play with it in the post.
---

## Tweak Shader 

If your browser is webgpu capable then below is a web demo of [tweak shader](https://github.com/mobile-bungalow/tweak_shader). You can modify the uniforms and as long as you provide a pragma tagging the new input you will be able to play with the input in the UI. You can read more about the pragmas and it's features in the linked repository.

<script lang="ts" setup>
    import ShaderToy from '../.vitepress/theme/components/ShaderToy.vue';
</script>

<ShaderToy />
