<style module>

.blogroll {
    overflow-y: scroll;
    overflow-x: hidden;
    margin: var(--m-m);
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
    max-height: calc(100% - var(--nav-bar-height));
    
}

.collections {
    display: grid; 
    grid-template-columns: 1fr 1fr;
    gap: var(--m-m);
}

@media only screen and (max-width: 868px) {
    .collections {
        grid-template-columns: 1fr;
    }

    .blogroll {
      margin: 0px;
    }
    .blogroll_wrapper {
      margin-left: 0px;
      margin-right: 0px;
    }
}


</style>

<script lang="ts" setup>
  import ScrollBar from './ScrollBar.vue';
  import { useData } from 'vitepress';
  import { ref } from 'vue';
  let { frontmatter } = useData();

  let scrollbar = ref<any|undefined>(undefined);
  let scroll_area = ref<HTMLDivElement|undefined>(undefined);

  const update_scrollY = (ratio: number) => {
    if (scroll_area.value != undefined) {
      const scrollContainer = scroll_area.value;
      const scrollHeight = scrollContainer.scrollHeight;
      const clientHeight = scrollContainer.clientHeight;
      const maxScrollTop = scrollHeight - clientHeight;
      const scrollTop = ratio * maxScrollTop;
      scrollContainer.scrollTo({ top: scrollTop });
    }
  }

defineExpose({ update_scrollY });
</script>


<template>
  <div  :class='$style.blogroll_wrapper'>
    <div ref="scroll_area" @scroll="(e) => { scrollbar.on_target_scroll(e) }" :class="$style.blogroll">
      <div :class="$style[frontmatter.layout]">
        <slot></slot>
        </div>
    </div>
    <ScrollBar @dragged_to="update_scrollY" ref="scrollbar"></ScrollBar>
  </div>
</template>