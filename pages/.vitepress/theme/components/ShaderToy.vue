<style module>
.wrapper {
    width: 100%;
    position: relative;
    overflow: hidden;
    /* 16:9 Aspect Ratio (divide 9 by 16 = 0.5625) */
    padding-bottom: 56.25%;
    /* 56.25%; */
}

.iframe {
    width: 91%;
    height: 91%;
    position: absolute;
    top: 4%;
    left: 5%;
    bottom: 0;
    right: 0;
    background: black;
}

.controls {
    background: linear-gradient(to right, rgba(0, 0, 0, 1.0), rgba(0, 0, 0, 0.05));
    position: absolute;
    padding-top: var(--m-xl);
    top: 4%;
    left: 5%;
    height: calc(91% - var(--m-l));
    display: flex;
    flex-direction: column;
    z-index: 0;
    overflow-y: scroll;
    padding-right: var(--m-xl);
}

.code {
    position: absolute !important;
    z-index: 2;
    width: 100%;
    overflow: hidden;
    overflow-y: scroll;
    height: 98% !important;
    opacity: 0.75 !important;
    display: block !important;

}

.button_row {
    display: flex;
    justify-content: space-between;
}

.button_row button,
.demo_select {
    margin-left: 5px;
    border-radius: 0;
    background-color: var(--line-color);
    border: none;
    color: #555555;
    padding: var(--m-sm);
    box-shadow: 2px 2px var(--fill-color);
    cursor: pointer;
    /* Add a pointer cursor to indicate interactivity */
    transition: background-color 0.3s, box-shadow 0.3s, color 0.3s;
    /* Add smooth transitions */

}

.button_row button:hover,
.demo_select:hover {
    background-color: rgb(215, 218, 204);
}

.button_row button:active,
.demo_select:active {
    box-shadow: 3px 3px var(--fill-color);
}

.button_row button:focus,
.demo_select:focus {
    outline: none;
    box-shadow: 0 0 3px 2px var(--outline-color);
}

.flipper {
    display: flex;
    flex-direction: column;
}

@media screen and (max-width: 820px) {

    .flipper {
        flex-direction: column-reverse;
    }

    .button_row {
        flex-direction: column;
        align-items: center;
    }

    .button_row button,
    .demo_select {
        margin: 10px;
        width: 95%;
    }

    .iframe {
        height: 90%;
        width: 90%;
    }
}
</style>

<script lang="ts" setup>
import { withBase } from 'vitepress';
import { ref } from 'vue';
import { Codemirror } from 'vue-codemirror'
import { oneDark } from '@codemirror/theme-one-dark'
import { cpp } from '@codemirror/lang-cpp'
import data from "./shaders.json";
import { MessageQueue, Input, InputList } from "../../../public/game_packages/shader_toy/pkg/tweak_shader_web";
import InputComp from "./Input.vue";


interface input {
    name: string;
    type: string;
    value: any,
    default: any,
    min: any,
    max: any,
}

var show_code = ref<boolean>(false);
var show_controls = ref<boolean>(false);
var inputs = ref<input[]>([]);
var src = ref<string>(data[0].source);
var toy = ref<null | HTMLIFrameElement>(null);
var select = ref<null | HTMLSelectElement>(null);
const tx = ref<null | MessageQueue>(null);
const list = ref<null | InputList>(null);

const reload_ui = (list: Input[]) => {
    var arr: input[] = [];
    for (var i = 0; i < list.length; i++) {
        let new_input = {
            name: list[i].name as string,
            type: list[i].ty as string,
            value: list[i].value,
            default: list[i].default,
            min: list[i].min,
            max: list[i].max
        };
        arr.push(new_input);
    }
    inputs.value = arr;
}

const recompile = () => {
    tx.value?.reload_code(src.value);
    if (list.value !== null) {
        reload_ui(list.value.inputs());
    }
}

const reload = () => {
    let v = select?.value?.value;
    if (v != null) {
        src.value = v;
        tx.value?.reload_code(v);
    }
    if (list.value !== null) {
        reload_ui(list.value.inputs());
    }
    if (show_controls.value) {
        // blink because UI props needs reload, ugh
        show_controls.value = false;
    }
}

const iframe_loaded = (e) => {
    let win = e.target.contentWindow.window;
    e.target.contentWindow.window.init_callback = () => {
        tx.value = win.global_tx;
        list.value = win.global_input_list;
        win.global_input_list.on_update(() => {
            if (list.value !== null) {
                reload_ui(list.value.inputs());
            }
        });
        recompile();
    };
}
</script>


<template>
    <div :class="$style.flipper">
        <div :class="$style.button_row + ' ' + $style.row">
            <select :class="$style.demo_select" ref="select" @change="reload()">
                <option v-for="entry in data" :value='entry.source'>
                    {{ entry.name }}
                </option>
            </select>
            <div>
                <button @click="() => { show_controls = false; show_code = !show_code; }">show editor</button>
                <button @click="() => {
                    if (list !== null) {
                        reload_ui(list.inputs());
                    }
                    show_code = false; show_controls = !show_controls;
                }">show controls</button>
                <button @click="() => { recompile() }">recompile</button>
            </div>
        </div>
        <div :class="$style.wrapper">
            <iframe scrolling="no" ref="toy" seamless id="frame" @load="iframe_loaded" :class="$style.iframe"
                :src="withBase('/game_packages/shader_toy/index.html')" />

            <form v-if="show_controls" ref="controls" :class="$style.controls">
                <div v-for="input in inputs">
                    <InputComp @changed="(name, value) => tx?.update_value(name, value)" :input="input">
                    </InputComp>
                </div>
            </form>

            <Codemirror v-if="show_code" v-model="src" :extensions="[[oneDark, cpp()]]" :class="$style.code">
            </Codemirror>
        </div>
    </div>
</template>