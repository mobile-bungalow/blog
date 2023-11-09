<style module>
.article_preview {
  display: flex;
  flex-direction: column;
  border: 1px solid var(--line-color);
  max-width: 350px;
}

.image_divider {
  border-top: 1px solid var(--line-color)
}

.date_and_tags {
  display: flex;
  justify-content: space-between;
  border-top: 1px solid var(--line-color)
}

.title {
  text-align: center;
}

.excerpt {
  margin-right: var(--m-xl);
  margin-left: var(--m-xl);
}

.preview_image {
  min-width: 180px;
  align-self: center;
  justify-self: center;
}

.tags {
  border-right: 1px solid var(--line-color);
  display: flex;
  align-items: center;
  justify-content: left;
  flex-flow: wrap;
  padding-right: var(--m-m);
}

.tag {
  color: var(--fill-color);
  font-family: var(--title-font-family);
  margin-left: var(--m-m);
  font-size: var(--boy-size);
}

.date {
  border-left: 1px solid var(--line-color);
  display: flex;
  align-items: center;
  justify-content: right;
}


.date>p {
  position: relative;
  text-align: center;
  color: var(--line-color);
  font-family: var(--title-font-family);
  margin: var(--m-m);
  font-size: var(--boy-size);
}
</style>

<script setup lang="ts">
let tags = []

type previewProps = {
  tags: string[],
  title: string,
  date: string,
  excerpt: string,
  image_url?: string
}

let props = defineProps<previewProps>()
</script>

<template>
  <div :class="$style.article_preview">
    <img :class="$style.preview_image" v-bind:src='props.image_url' />
    <div :class="$style.image_divider">
      <p :class="$style.title + ' title'" style="margin: 12px"> {{ props.title }} </p>
      <div :class="$style.excerpt + ' body'" v-html="props.excerpt"> </div>
      <div :class="$style.date_and_tags">
        <div :class="$style.tags">
          <a v-for="tag in props.tags" :class="$style.tag"> {{ "#" + tag }} </a>
        </div>
        <div :class="$style.date">
          <p> {{ props.date }} </p>
        </div>
      </div>
    </div>
  </div>
</template>