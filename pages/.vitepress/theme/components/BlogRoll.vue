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

<script lang="ts" setup>
  import {data as post_data} from '../post.data';
  import ArticleCard from './ArticleCard.vue';
  import ScrollBar from './ScrollBar.vue';


</script>
<script lang="ts">
export default {
  methods: {
    update_scrollY(ratio: number) {
      const scrollContainer = this.$refs.scroll_area;

      const scrollHeight = scrollContainer.scrollHeight;
      const clientHeight = scrollContainer.clientHeight;
      const maxScrollTop = scrollHeight - clientHeight;
      const scrollTop = ratio * maxScrollTop;

      this.$refs.scroll_area.scrollTo({ top: scrollTop });
    },
  },
}
</script>


<template>
  <div  :class='$style.blogroll_wrapper'>
    <div ref="scroll_area" @scroll="(e) => { this.$refs.scrollbar.on_target_scroll(e) }" :class="$style.blogroll">
      <div :class="$style.previews">
          <ArticleCard v-for="post in post_data" 
                      :image_url="post.image_url ? post.image_url: '/assets/logo.svg' "
                      :date="post.date.string"
                      :excerpt="post.excerpt ? post.excerpt : '' "
                      :tags="post.tags" 
                      :title="post.title" ></ArticleCard>
        </div>
    </div>
      <ScrollBar @dragged_to="update_scrollY" ref="scrollbar"></ScrollBar>
  </div>
</template>