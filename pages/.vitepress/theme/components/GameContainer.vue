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
    <button v-if="playing && (pause_button ? pause_button : true)" @click="playing = false"
        :class="$style.pause + '  ' + $style.iframe_de">
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="30" viewBox="0 0 49 60">
            <g id="Rectangle_3" data-name="Rectangle 3" fill="#fff" stroke="#707070" stroke-width="1">
                <rect width="22" height="60" stroke="none" />
                <rect x="0.5" y="0.5" width="21" height="59" fill="none" />
            </g>
            <g id="Rectangle_4" data-name="Rectangle 4" transform="translate(27)" fill="#fff" stroke="#707070"
                stroke-width="1">
                <rect width="22" height="60" stroke="none" />
                <rect x="0.5" y="0.5" width="21" height="59" fill="none" />
            </g>
        </svg>

    </button>
    <div :class="$style.wrapper">
        <div v-if="!playing" :class="$style.preview">
            <button v-if="!playing" @click="playing = true" :class="$style.play">
                <svg xmlns="http://www.w3.org/2000/svg" width="43" height="49" viewBox="0 0 43 49">
                    <g id="Polygon_1" data-name="Polygon 1" transform="translate(43) rotate(90)" fill="#fff">
                        <path
                            d="M 48.13965225219727 42.5 L 0.8603482842445374 42.5 L 24.5 1.00999903678894 L 48.13965225219727 42.5 Z"
                            stroke="none" />
                        <path
                            d="M 24.5 2.019989013671875 L 1.720691680908203 42 L 47.2793083190918 42 L 24.5 2.019989013671875 M 24.5 0 L 49 43 L 0 43 L 24.5 0 Z"
                            stroke="none" fill="#707070" />
                    </g>
                </svg>
            </button>
        </div>
        <iframe v-if="playing" :class="$style.iframe + ' ' + $style.iframe_de" :src="withBase(props.src)" />
        <div :class="!mobile_compat ? $style.concillation : $style.no_show">
            <p> I'm Sorry, this game was not meant to be played on a mobile viewport </p>
        </div>
    </div>
</template>