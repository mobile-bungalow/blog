<style module>

.blogroll {
    overflow-y: scroll;
    margin: var(--m-m);
}

.blogroll{
    -ms-overflow-style: none;  /* Internet Explorer 10+ */
    scrollbar-width: none;  /* Firefox */
}

.blogroll::-webkit-scrollbar { 
    display: none;  /* Safari and Chrome */
}

.blogroll_wrapper {
    display: flex;
    flex-direction: row;
    margin-right: var(--m-l);
    margin-left: var(--m-l);
    max-height: 90%;
}
</style>

<script setup>
  import {data as post_data} from '../post.data';
import ArticleCard from './ArticleCard.vue';
  console.log("help");
</script>

<template>
  <div :class='$style.blogroll_wrapper'>
    <div :class="$style.blogroll">
      <div :class="$style.previews">
          <ArticleCard v-for="post in post_data" 
                      :date="post.date.string"
                      :excerpt="post.excerpt"
                      :tags="post.tags" 
                      :title="post.title" ></ArticleCard>
        </div>
    </div>
    <ScrollBar></ScrollBar>
  </div>
</template>