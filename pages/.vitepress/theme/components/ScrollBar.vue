<style module>

:root {
  --thumb-width: min(10px, 2vw);
  --thumb-height: min(40px, 5vh);
}
.rel_wrapper {
    position: relative;
    left: calc(3.1vw - var(--thumb-width));
}

.track {
    position: absolute;
    border-right: 2px solid var(--line-color);
    top: 1%;
    bottom: 1%;
}

.thumb {
   position: absolute;
   cursor: pointer;
   width: var(--thumb-width);
   left: calc(-1 * var(--thumb-width) / 2);
   top: 3.5%;
   height: var(--thumb-height);
   background-color: var(--fill-color);
   box-shadow: 1.5px 1.5px var(--line-color);
   z-index: 2;
}

</style>

<script lang="ts" setup>
  import { ref} from 'vue';

  let stop_select = (ev: Event) => {
    ev.preventDefault()
  }

  const clamp = function(input, min, max) {
    return Math.min(Math.max(input, min), max);
  };

  let thumb = ref<HTMLDivElement | undefined>(undefined);
  let track = ref<HTMLDivElement | undefined>(undefined);
  let emit = defineEmits(["dragged_to"]);
  
  const on_target_scroll = (event: Event) => {
      const element = event?.target as HTMLDivElement;
      const scrollTop = element.scrollTop;
      const scrollHeight = element.scrollHeight;
      const clientHeight = element.clientHeight;
      const scrollPercentage = (scrollTop / (scrollHeight - clientHeight)) * 100;
        if (thumb.value != undefined) {
          thumb.value.style.top = `${clamp(scrollPercentage - 2, 3.5, 90.5)}%`
        }
      }

  const trackClicked = (event: MouseEvent) => {
         var rect = (event?.target as HTMLDivElement).getBoundingClientRect();
         var y = event.clientY - rect.top;
         emit("dragged_to", y / rect.height);
      }

  const dragBegin = (_event) => {
        document.addEventListener("mouseup", dragEnd);
        document.addEventListener('selectstart', stop_select)
        document.addEventListener("mousemove", dragging);
  }

  const touchBegin = (_event) => {
        document.addEventListener("touchend", touchEnd);
        document.addEventListener('selectstart', stop_select)
        document.addEventListener("touchmove", dragging);
  }

  const touchEnd = (_event) => {
        document.removeEventListener("touchend", touchEnd);
        document.removeEventListener('selectstart', stop_select)
        document.removeEventListener("touchmove", dragging);
  }

  const dragEnd = (_ev) => {
        document.removeEventListener("mouseup", dragEnd);
        document.removeEventListener('selectstart', stop_select)
        document.removeEventListener("mousemove", dragging);
  }

  const dragging = (ev) => {
         var rect = (track.value as HTMLDivElement).getBoundingClientRect();
         var y = ev.clientY - rect.top;
         emit("dragged_to", clamp(y / rect.height, 0, 1));
  }

  defineExpose({
    on_target_scroll
  })
</script>


<template>
  <div  :class="$style.rel_wrapper" >
    <div @click="trackClicked" :class="$style.scrollbar">
      <div ref="track" :class="$style.track" />
      <div ref="thumb" @touchstart="touchBegin" @mousedown="dragBegin" :class="$style.thumb"/>
    </div>
  </div>
</template>