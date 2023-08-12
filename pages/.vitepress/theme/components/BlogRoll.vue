<style module>
  .hidden {
    display: none;
  }

  .filter_modal {
    display: block;
    position: absolute;
    background-color: aqua;
    width: 200px;
    height: 50px;
    top: 2%;
    left: 50%;
  }

.spacer {
  height: 3vw;
}
</style>

<script lang="ts" setup>
import {data as post_data} from '../post.data';
const $style = useCssModule();
import { ref,  useCssModule } from 'vue';
import ArticleCard from './ArticleCard.vue';
import ScrollableCenter from './ScrollableCenter.vue';
const modal = ref<null|HTMLDivElement>(null);
const filters = ref<string[]>([]);

function stop_filtering() {
  if (modal.value) {
     modal.value.className = $style["hidden"]
  }
 }

function show_filter_modal() {
   if (modal.value) {
      modal.value.className = $style["filter_modal"]
   }
  }
function add_filter(filter: string) {
  if (!filters.value.includes(filter)) {
    filters.value.push(filter);
    show_filter_modal();
  } else {
    filters.value = filters.value.filter(item => item != filter);
    if (filters.value.length == 0) {
      stop_filtering
    }
  }
}
</script>


<template>
    <ScrollableCenter>
      <div :class="$style.spacer"></div>
          <ArticleCard @filter-tag-clicked="(e) => add_filter(e)" 
                      v-for="post in post_data.filter((a) => a.tags.some(r => filters.length == 0 ? true : filters.includes(r)))" 
                      :filter_tags="filters"
                      :url="post.url"
                      :image_url="post.image_url ? post.image_url: '/assets/logo.svg' "
                      :date="post.date.string"
                      :excerpt="post.excerpt ? post.excerpt : '' "
                      :tags="post.tags" 
                      :title="post.title" ></ArticleCard>
    </ScrollableCenter>
</template>