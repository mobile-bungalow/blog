<style module>
.scrollbar {
    height: 100%;
    width: 30px;
}

.rel_wrapper {
    position: relative;
}

.track {
    position: absolute;
    border-right: 2px solid var(--line-color);
    left: 15px;
    top: 1%;
    height: 96%;
    bottom: 1%;
}

.thumb {
   position: absolute;
   cursor: pointer;
   width: 10px;
   top: 3.5%;
   height: 40px;
   background-color: var(--fill-color);
   box-shadow: 1.5px 1.5px var(--line-color);
   left: 10px;
   z-index: 2;
}
</style>

<script lang="ts">
  let stop_select = (ev: Event) => {
    ev.preventDefault()
  }

  const clamp = function(input, min, max) {
    return Math.min(Math.max(input, min), max);
  };

  export default {
    emits: ["dragged_to"],
    methods: {
      on_target_scroll(event: Event) {
      const element = event?.target as HTMLDivElement;
      const scrollTop = element.scrollTop;
      const scrollHeight = element.scrollHeight;
      const clientHeight = element.clientHeight;

      const scrollPercentage = (scrollTop / (scrollHeight - clientHeight)) * 100;
      this.$refs.thumb.style.top = `${clamp(scrollPercentage - 2, 3.5, 90.5)}%`
      },
      trackClicked(ev: MouseEvent) {
         var rect = (ev?.target as HTMLDivElement).getBoundingClientRect();
         var y = ev.clientY - rect.top;
         this.$emit("dragged_to", y / rect.height);
      },
      dragBegin(ev) {
        document.addEventListener("mouseup", this.dragEnd);
        document.addEventListener('selectstart', stop_select)
        document.addEventListener("mousemove", this.dragging);
      },
      dragEnd(ev) {
        document.removeEventListener("mouseup", this.dragEnd);
        document.removeEventListener('selectstart', stop_select)
        document.removeEventListener("mousemove", this.dragging);
      },
      dragging(ev) {
         var rect = (this.$refs.track as HTMLDivElement).getBoundingClientRect();
         var y = ev.clientY - rect.top;
         this.$emit("dragged_to", clamp(y / rect.height, 0, 1));
      }
    }
  }
</script>


<template>
  <div  :class="$style.rel_wrapper" >
    <div @click="trackClicked" :class="$style.scrollbar">
      <div ref="track" :class="$style.track" />
      <div ref="thumb" @mousedown="dragBegin" :class="$style.thumb"/>
    </div>
  </div>
</template>