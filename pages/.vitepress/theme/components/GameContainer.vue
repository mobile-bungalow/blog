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
        position: relative;
        width: 70%;
        min-height: 250px;
        flex-direction: column;
        justify-content: center;
        border: 1px solid var(--line-color);
        padding: var(--m-m); 
        margin: auto;
    }

@media only screen and (max-width: 669px) {
    .concillation {
        display: flex;
    }

    .iframe {
        display: none;
    }
}


</style>


<template>
    <div :class="$style.wrapper">
    <iframe :class="$style.iframe" :src="props.src"/>
    <div :class="$style.concillation">
        <p> I'm Sorry, this game was not meant to be played on a mobile viewport </p>
    </div>
    </div>
</template>