---
title: Vue 3.2 Released!
date: 2021-08-05
tags: [test, next]
layout: blog_post
---

We are excited to announce the release of Vue.js 3.2 "Quintessential Quintuplets"! This release includes many significant new features and performance improvements, and contains no breaking changes.

---

## New SFC Features

Two new features for Single File Components (SFCs, aka `.vue` files) have graduated from experimental status and are now considered stable:

- `<script setup>` is a compile-time syntactic sugar that greatly improves the ergonomics when using Composition API inside SFCs.

- `<style> v-bind` enables component state-driven dynamic CSS values in SFC `<style>` tags.

Here is an example component using these two new features together:
