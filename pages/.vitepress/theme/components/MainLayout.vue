<script setup lang="ts">
import { useData } from 'vitepress'
import Logo from './Logo.vue';
import Description from './Description.vue';
import ExternalLinks from './ExternalLinks.vue';
import NavBar from './NavBar.vue';
import BlogRoll from './BlogRoll.vue';

</script>

<style module>
.main_layout {
    display: flex;
    flex: 1 4 1;
    max-width: 1600px;
    height: 95vh;
    margin-left: auto;
    margin-right: auto;
    justify-content: center;

}

.logo_column {
    display: flex;
    flex-direction: column;
    height: 100%;
    max-width: 300px;
    justify-content: space-between;
}

.center_content {
    display: flex;
    flex-direction: column;
}

.title {
    align-self: center;
}

@media only screen and (max-width: 669px) {

    .logo_column {
        display: none;
    }

    .center_content {
        display: flex;
        flex-direction: column-reverse;
    }
}
</style>

<template>
  <div :class='$style.main_layout'>
    <div :class='$style.logo_column'>
      <div>
        <Logo></Logo>
        <Description></Description>
      </div>
      <ExternalLinks />
    </div>
    <div :class='$style.center_column'>
      <NavBar/>
      <BlogRoll></BlogRoll>
    </div>
    <div :class='$style.right_content' />
  </div>
</template>