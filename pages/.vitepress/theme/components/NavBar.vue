<style module>

.navbar {
    display: flex;
    justify-content: space-around;
    align-self: center;
    gap: var(--m-l);
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
    height: 102px;
    border-image-slice: 27 23 27 23;
    border-image-width: 20px 20px 20px 20px;
    border-image-outset: 0px 0px 0px 0px;
    border-image-repeat: stretch stretch;
    border-image-source:  url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='35' height='46' viewBox='0 0 35 46'%3E%3Cg id='Group_36' data-name='Group 36' transform='translate(-383 -93)'%3E%3Cpath id='Path_26' data-name='Path 26' d='M0-2.175V10' transform='translate(390 129)' fill='none' stroke='%23f7f1e5' stroke-width='2'/%3E%3Cg id='Group_35' data-name='Group 35'%3E%3Cline id='Line_21' data-name='Line 21' y2='17' transform='translate(390 93)' fill='none' stroke='%23f7f1e5' stroke-width='2'/%3E%3Cline id='Line_22' data-name='Line 22' y2='17' transform='translate(410 93)' fill='none' stroke='%23f7f1e5' stroke-width='2'/%3E%3Cline id='Line_19' data-name='Line 19' x1='12' transform='translate(383 134)' fill='none' stroke='%23f7f1e5' stroke-width='2'/%3E%3Cpath id='Path_27' data-name='Path 27' d='M0-2.175V10' transform='translate(411 129)' fill='none' stroke='%23f7f1e5' stroke-width='2'/%3E%3Cline id='Line_20' data-name='Line 20' x2='12' transform='translate(406 134)' fill='none' stroke='%23f7f1e5' stroke-width='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E%0A");;
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
        <a href="/"> blog</a>
      </div>
      <!--div :class="style_link('collections')">
        <a href="/collections.html"> collections </a>
      </div-->
      <div :class="style_link('games')">
        <a href="/games.html"> games </a>
      </div>
      <div :class="style_link('art')">
        <a href="/art.html"> art </a>
      </div>
      <a href="/">
        <img :class="$style.help" src="/assets/logo.svg" />
      </a>
    </div>
  </div>
</template>