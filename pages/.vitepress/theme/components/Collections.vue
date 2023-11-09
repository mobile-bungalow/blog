<script lang="ts" setup>
import ScrollableCenter from './ScrollableCenter.vue';
import { data as collection_data } from '../collections.data';
import CollectionCard from './CollectionCard.vue';


</script>

<template>
    <ScrollableCenter>
        <CollectionCard v-for="post in collection_data" :image_url="post.image_url ? post.image_url : '/assets/logo.svg'"
            :date="post.date.string" :excerpt="post.excerpt ? post.excerpt : ''" :tags="post.tags" :title="post.title">
        </CollectionCard>
    </ScrollableCenter>
</template>