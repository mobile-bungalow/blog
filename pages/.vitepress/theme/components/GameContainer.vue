<script lang="ts" setup>
    type props = {
        src: string,
        mobile_compat: boolean,
    }
    let props = defineProps<props>();
</script>

<style module>
    .iframe {
        position: relative;
        width: 50%;
        min-height: 250px;
        left: 25%;
    }

    .wrapper {
        width: 100%;
    }

    .concillation {
        display: none;
    }

@media only screen and (max-width: 669px) {
    .concillation {
        display: block;
    }

    .iframe {
        display: none;
    }
}


</style>


<template>
    <div :class="$style.wrapper">
    <iframe :class="$style.iframe" :src="props.src"/>
    </div>
</template>