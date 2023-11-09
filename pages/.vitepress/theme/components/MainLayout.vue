<script setup lang="ts">
import Logo from './Logo.vue';
import Description from './Description.vue';
import ExternalLinks from './ExternalLinks.vue';
import NavBar from './NavBar.vue';
</script>

<style module>
.wrapper {
  position: fixed;
  width: 100%;
  height: 100%;
  overflow-y: hidden;
  overflow-x: hidden;
}

.main_layout {
  display: flex;
  flex: 1 4 1;
  max-width: 1600px;
  height: 95%;
  padding-right: var(--m-m);
  justify-content: center;
  margin: auto;

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
  min-width: 50%;
}

.title {
  align-self: center;
}

@media only screen and (max-width: 669px) {

  .logo_column {
    display: none;
  }

  .main_layout {
    display: flex;
    max-width: 1600px;
    height: 98vh;
    margin-left: 0px;
    margin-right: 0px;
    justify-content: center;
  }
}
</style>

<template>
  <div :class="$style.wrapper">
    <div :class='$style.main_layout'>
      <div :class='$style.logo_column'>
        <div>
          <Logo></Logo>
          <Description></Description>
        </div>
        <ExternalLinks />
      </div>
      <div :class='$style.center_content'>
        <NavBar />
        <slot></slot>
      </div>
      <div :class='$style.right_content' />
    </div>
  </div>
</template>