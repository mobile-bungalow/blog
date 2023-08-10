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
        max-width: 850px;
    }
    .wrapper > * > * > * > img {
        width: 100%;
    }

    .wrapper > * > * > * > img, iframe {
        border-image-slice: 18 ;
        border-image-width: 15px ;
        border-image-outset: 5px;
        border-image-source: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24.349' viewBox='0 0 24 24.349'%3E%3Cpath id='Path_28' data-name='Path 28' d='M0-2.175V10' transform='translate(19 14.349)' fill='none' stroke='%23f7f1e5' stroke-width='2'/%3E%3Cline id='Line_21' data-name='Line 21' x1='12' transform='translate(12 19.349)' fill='none' stroke='%23f7f1e5' stroke-width='2'/%3E%3Cpath id='Path_29' data-name='Path 29' d='M0-2.175V10' transform='translate(5 14.349)' fill='none' stroke='%23f7f1e5' stroke-width='2'/%3E%3Cline id='Line_22' data-name='Line 22' x2='12' transform='translate(0 19.349)' fill='none' stroke='%23f7f1e5' stroke-width='2'/%3E%3Cpath id='Path_30' data-name='Path 30' d='M0,10V-2.175' transform='translate(19 2.175)' fill='none' stroke='%23f7f1e5' stroke-width='2'/%3E%3Cline id='Line_23' data-name='Line 23' x1='12' transform='translate(12 5)' fill='none' stroke='%23f7f1e5' stroke-width='2'/%3E%3Cpath id='Path_31' data-name='Path 31' d='M0,10V-2.175' transform='translate(5 2.175)' fill='none' stroke='%23f7f1e5' stroke-width='2'/%3E%3Cline id='Line_24' data-name='Line 24' x2='12' transform='translate(0 5)' fill='none' stroke='%23f7f1e5' stroke-width='2'/%3E%3C/svg%3E%0A");
        border-style: solid;       
        margin-left: auto;
        margin-right: auto;
    }
</style>

<script lang="ts" setup>
import ScrollableCenter from './ScrollableCenter.vue';
</script>


<template>
    <ScrollableCenter>
            <div :class="$style.wrapper">
                <Content class='content'></Content>
            </div>
    </ScrollableCenter>
</template>