<style module>
    h2 {
        size: var(--title-size);
        color: var(--line-color);
        font-family: var(--title-font-family);
    }

    p {
        size: var(--body-size);
        color: var(--line-color);
        font-family: var(--title-font-family);
    }

    ul {
        color: var(--fill-color);
    }


    hr {
        color: var(--fill-color);
    }

</style>

<script lang="ts" setup>
import ScrollableCenter from './ScrollableCenter.vue';
</script>


<template>
    <ScrollableCenter>
        <Content></Content>
    </ScrollableCenter>
</template>