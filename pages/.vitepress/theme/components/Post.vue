<style module>

    h3 {
        color: var(--line-color);
        font-family: var(--title-font-family);
    }

    a {
        color: var(--fill-color);
    }

    h2 {
        color: var(--line-color);
        font-family: var(--title-font-family);
    }

    h1 {
        color: var(--line-color);
        font-family: var(--title-font-family);
    }

    p {
        size: var(--body-size);
        color: var(--line-color);
        font-family: var(--title-font-family);
        line-height: var(--m-xl);
    }

    ul {
        color: var(--fill-color);
    }


    hr {
        color: var(--fill-color);
    }

    .wrapper {
        margin-left: var(--m-m);
        margin-right: var(--m-m);
        max-width: 850px;
    }
</style>

<script lang="ts" setup>
import ScrollableCenter from './ScrollableCenter.vue';
</script>


<template>
    <ScrollableCenter>
            <div :class="$style.wrapper">
                <Content></Content>
            </div>
    </ScrollableCenter>
</template>