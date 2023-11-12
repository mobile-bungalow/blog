<template>
    <div v-if="!isBytes" class="input-container">
        <label class="body" :for="input.name">{{ input.name }}</label>
        <div class="input-wrapper">
            <input v-if="isBool" v-model="model" type="checkbox" @change="boolChange" :id="input.name"
                class="custom-checkbox" />
            <button v-else-if="isEvent" @click=""></button>
            <input v-else-if="isColor" v-model="model" type="color" @input="colorChange" :id="input.name" />
            <input v-else-if="isInt" v-model="rangeValue" type="number" :min="input.min?.toFixed(0)" :max="input.max"
                step="1" @input="handleInput" :id="input.name" />
            <select v-else-if="isIntList" v-model="model" @change="handleSelect">
                <option v-for="[k, v] in Object.entries($props.input.value)" :value="v">
                    <p>{{ k }}</p>
                </option>
            </select>
            <input v-else-if="isFloat" v-model="rangeValue" type="number" :min="input.min?.toFixed(2)"
                :max="input.max?.toFixed(2)" step="0.1" @input="handleInput" :id="input.name" />
            <input v-else-if="isPoint" v-model="model" type="text" @input="handleInput" :id="input.name" />
        </div>
        <div class="range-slider" v-if="isInt || isFloat">
            <input v-if="isInt || isFloat" v-model="rangeValue" @input="handleInput" type="range"
                :min="input.min?.toFixed(2)" :max="input.max" :step="isInt ? 1 : 0.01" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch, Ref, computed } from 'vue';
const emits = defineEmits();

interface Input {
    name: string;
    type: 'string' | 'bool' | 'event' | 'color' | 'int' | 'int_list' | 'float' | 'point' | 'image' | 'audio' | 'bytes';
    value: any;
    default: any;
    min?: any;
    max?: any;
}

const props = defineProps<{ input: Input }>();

const isBool = computed(() => props.input.type === 'bool');
const isBytes = computed(() => props.input.type === 'bytes');
const isEvent = computed(() => props.input.type === 'event');
const isColor = computed(() => props.input.type === 'color');
const isInt = computed(() => props.input.type === 'int');
const isIntList = computed(() => props.input.type === 'int_list');
const isFloat = computed(() => props.input.type === 'float');
const isPoint = computed(() => props.input.type === 'point');
const isImage = computed(() => props.input.type === 'image');
const isAudio = computed(() => props.input.type === 'audio');

var real_value;

if (props.input.type === 'int' || props.input.type === 'float') {
    real_value = parseFloat(props.input.value.toFixed(2));
} else if (props.input.type === 'bool') {
    real_value = props.input.value > 0 ? true : false;
}
else if (props.input.type === 'color') {
    const hexComponents = props.input.value.slice(0, 3).map(component => {
        const hex = parseInt((component * 255).toFixed(0)).toString(16).padStart(2, '0');
        return hex;
    });
    const hexColor = '#' + hexComponents.join('');
    real_value = hexColor;
}
else if (props.input.type === 'int_list') {
    real_value = Object.entries(props.input.value)[0][1];
} else {
    real_value = props.input.value;
}

const model: Ref<any> = ref(real_value);
const rangeValue: Ref<any> = ref(props.input.value);

const colorChange = () => {
    var res = model.value.match(/[a-f0-9]{2}/gi);
    var array = res.map(function (v) { return parseInt(v, 16) / 255.0 });
    array.push(1.0);
    emits('changed', props.input.name, array);
}

const boolChange = () => {
    const out = model.value ? 1 : 0;
    emits('changed', props.input.name, out);
};

const handleSelect = () => {
    emits('changed', props.input.name, model.value);
}

const handleInput = () => {
    emits('changed', props.input.name, parseFloat(rangeValue.value));
};

watch(() => props.input.value, (newValue) => {
    rangeValue.value = newValue;
});

watch(() => rangeValue.value, (newValue) => {
    if (isFloat) {
        newValue = parseFloat(newValue).toFixed(2);
    }
    model.value = newValue;
});
</script>

<style scoped>
.input-container {
    font-size: 9px;
    display: flex;
    justify-items: center;
    flex-direction: row;
    align-items: flex-start;
    margin-bottom: 20px;
    flex-grow: 0;
}

.input-wrapper {
    margin-left: 5px;
}

.range-slider {
    margin-left: 10px;
}

.value-display {
    flex-grow: 0;
    margin-top: 5px;
}

label {
    font-size: 9px;
}

input[type="range"] {
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    height: 5px;
    /* Adjust the height of the slider line */
    background-color: var(--line-color);
    outline: none;
}

input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    cursor: pointer;
    width: calc(var(--thumb-height) / 3.0);
    height: calc(var(--thumb-width));
    background-color: var(--fill-color);
    margin-top: -2px;
}

input[type="range"]::-moz-range-thumb {
    cursor: pointer;
    width: calc(var(--thumb-height) / 3.0);
    height: calc(var(--thumb-width));
    background-color: var(--fill-color);
    margin-top: -2px;
}

input[type="range"]::-webkit-slider-runnable-track {
    height: 5px;
    background-color: var(--line-color);
}

input[type="range"]::-moz-range-track {
    height: 5px;
    background-color: var(--line-color);
}

input[type="number"] {
    font-family: var(--title-font-family);
    font-size: 9px;
    padding: var(--m-sm);
    color: #555555;
    border-radius: 0px;
    background-color: var(--line-color);
    border: none;
}
</style>
