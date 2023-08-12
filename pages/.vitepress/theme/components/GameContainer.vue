<style module>
    .iframe {
        position: relative;
        min-height: 450px;
        flex-grow: 1;
        margin: var(--m-m);
        background: black;
    }

    .preview {
        background-color: black;
        position: relative;
        min-height: 450px;
        flex-grow: 1;
        margin: var(--m-m);
    }

    .wrapper {
        display: flex;
        width: 100%;
        justify-content: center;
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

    .play {
        position: relative;
        left: calc(50% - 42px);
        top: calc(50% - 84px);
        background: none;
        color: var(--line-color);
        border: none;
        font-size: 84px;
        cursor: pointer;
    }

    .pause {
        position: relative;
        background: none;
        color: var(--line-color);
        border: none;
        font-size: 32px;
        cursor: pointer;
        z-index: 10;
        top: 64px;
        left: calc(100% - 64px);
    }

@media only screen and (max-width: 886px) {
    .concillation {
        display: flex;
    }

    .preview {
        display: none;
    }

    .iframe_de {
        display: none;
    }

    .no_show {
        display: none;
    }
}

</style>

<script lang="ts" setup>
    import { ref } from 'vue';
    import { withBase } from 'vitepress';
    type props = {
        src: string,
        preview_image?: string,
        pause_button?: boolean,
        mobile_compat: boolean,
    }
    let props = defineProps<props>();
    let playing = ref(false);
</script>

<template>
    <button  v-if="playing && (pause_button ? pause_button : true)" 
             @click="playing = false"
             :class="$style.pause + '  ' + $style.iframe_de ">⏸</button>
    <div :class="$style.wrapper">
        <div v-if="!playing" :class="$style.preview">
            <button v-if="!playing" @click="playing = true" :class="$style.play">⏵</button>
        </div>
    <iframe v-if="playing" :class="$style.iframe + ' ' + $style.iframe_de" :src="withBase(props.src)"/>
    <div :class="!mobile_compat ?  $style.concillation : $style.no_show">
        <p> I'm Sorry, this game was not meant to be played on a mobile viewport </p>
    </div>
    </div>
</template>