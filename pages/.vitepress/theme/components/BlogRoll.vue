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

<template>
  <div :class='$style.blogroll_wrapper'>
    <div  :class="$style.blogroll">
      <div :class="$style.previews">  </div>
    </div>
    <ScrollBar></ScrollBar>
  </div>
</template>