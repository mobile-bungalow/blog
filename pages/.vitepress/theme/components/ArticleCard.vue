<style module>
.article_preview {
   display: flex; 
   flex: 1 3;
   border: 1px solid var(--line-color);
   margin-bottom: var(--m-xl);
   max-width: 900px;
   transition: background-image 3s;
}
.preview_image {
    min-width: 180px;
    max-width: 250px;
    height: 100%;
    object-fit:cover;
    align-self: center;
    justify-self: center;
    cursor: pointer;
}


.image_divider {
   border-left: 1px solid var(--line-color);
   text-decoration: none;
}

.preview_image_link {
    text-decoration: none;
}

@media only screen and (max-width: 868px) {
    .image_divider {
       border-left: none; 
    }

    .preview_image {
        display: none;
    }
}


@media only screen and (max-width: 669px) {

    .preview_image {
        display: block;
        max-width: 100%;
    }
    .article_preview {
        flex-direction: column;
    }

    .image_divider {
        border-top: 1px solid var(--line-color)
    }
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
    margin-bottom: var(--m-m);
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
    /* dude what the fuck */
  -webkit-touch-callout: none; 
    -webkit-user-select: none; 
     -khtml-user-select: none; 
       -moz-user-select: none; 
        -ms-user-select: none; 
            user-select: none; 
    cursor: pointer;
}

.selected_tag {
    color: var(--line-color);
    background-color: var(--fill-color);
    font-family: var(--title-font-family);
    margin-left: var(--m-m);
    font-size: var(--boy-size);
    padding: 2px;
    cursor: pointer;
    /* dude what the fuck */
  -webkit-touch-callout: none; 
    -webkit-user-select: none; 
     -khtml-user-select: none; 
       -moz-user-select: none; 
        -ms-user-select: none; 
            user-select: none; 
}

.date {
    border-left: 1px solid var(--line-color);
    display: flex;
    align-items: center;
    justify-content: right;
}


.date > p {
    position: relative;
    text-align: center;
    color: var(--line-color);
    font-family: var(--title-font-family);
    margin: var(--m-m);
    font-size: var(--boy-size);
}
</style>

<script setup lang="ts">
import { withBase } from 'vitepress';
defineEmits(["filterTagClicked"])

type previewProps = {
    filter_tags: string[],
    url: string,
    tags: string[],
    title: string,
    date: string,
    excerpt: string,
    image_url?: string
}

let props = defineProps<previewProps>()
</script>

<template>
  <div :class="$style.article_preview" >
     <a  :class="$style.preview_image_link" :href="withBase(props.url)" >
      <img :class="$style.preview_image" v-bind:src='withBase(props.image_url ? props.image_url : "/")'  />
     </a>
    <div :class="$style.image_divider" :href="withBase(props.url)">
        <a :class="$style.preview_image_link" :href="withBase(props.url)">
         <p :class="$style.title + ' title'" style="margin: 12px"> {{ props.title }} </p>
         <div :class="$style.excerpt + ' body'" v-html="props.excerpt">  </div>
        </a>
      <div :class="$style.date_and_tags">
        <div :class="$style.tags"> 
            <a  v-for="tag in props.tags"  
                @click="$emit('filterTagClicked', tag)" 
                :class='props.filter_tags.includes(tag) ? $style.selected_tag: $style.tag'>
                 {{ "#" + tag  }} 
            </a>
        </div>
        <div :class="$style.date">
          <p> {{ props.date }} </p>
        </div>
      </div>
    </div>
  </div>
</template>