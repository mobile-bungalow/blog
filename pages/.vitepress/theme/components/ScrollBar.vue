<style module>
.scrollbar {
    height: 100%;
    width: 30px;
}

.rel_wrapper {
    position: relative;
    height: 100%;
}

.gutter {
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
   top: 20px;
   height: 40px;
   background-color: var(--fill-color);
   box-shadow: 1.5px 1.5px var(--line-color);
   left: 10px;
}
</style>

<template>
  <div :class="$style.rel_wrapper" >
    <div :class="$style.scrollbar">
      <div :class="$style.gutter" />
      <div :class="$style.thumb"/>
    </div>
  </div>
</template>