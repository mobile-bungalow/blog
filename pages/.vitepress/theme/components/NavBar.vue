<style module>

.navbar {
    display: flex;
    justify-content: space-around;
    align-self: center;
    width: 100%;
    margin-top: var(--m-xl);
    margin-bottom: 42px;
    font-family: var(--title-font-family);
    color: var(--line-color);
    font-size: var(--title-size);
}


.page_link > a {
    text-decoration: none;
    color: var(--line-color);
}

.current_link > a {
    color: var(--line-color);
    text-decoration: underline;
}


.navbar_wrapper {
    height: var(--nav-bar-height);
    border-image-slice: 27 23 27 23;
    border-image-width: 20px 20px 20px 20px;
    border-image-outset: 0px 0px 0px 0px;
    border-image-repeat: stretch stretch;
    border-image-source: url("/assets/nav_border.svg");
    border-style: solid; 
}

.help {
    max-height: 35px;
    display: none;
}

@media only screen and (max-width: 669px) {
    .navbar {
        margin-bottom: 0px;
    }

    .help {
        display: block;
    }
}
</style>

<script setup lang="ts">
  import { useData } from 'vitepress'
  import { useCssModule } from 'vue'
  const $style = useCssModule()
  const { frontmatter } = useData()

  let style_link = (link_name: string) => {
    return frontmatter.value.layout != link_name ? $style.page_link : $style.current_link;
  }
</script>

<template>
  <div :class="$style.navbar_wrapper">
    <div :class="$style.navbar">
      <div :class="style_link('blog')">
        <a href="/blog"> blog</a>
      </div>
      <div :class="style_link('collections')">
        <a href="/collections"> collections </a>
      </div>
      <div :class="style_link('games')">
        <a href="/games"> games </a>
      </div>
      <div :class="style_link('art')">
        <a href="/art"> art </a>
      </div>
      <img :class="$style.help" src="/assets/logo.svg" />
    </div>
  </div>
</template>