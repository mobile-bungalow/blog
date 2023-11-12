let wasm;
export function __wbg_set_wasm(val) {
    wasm = val;
}


const heap = new Array(128).fill(undefined);

heap.push(undefined, null, true, false);

function getObject(idx) { return heap[idx]; }

let heap_next = heap.length;

function dropObject(idx) {
    if (idx < 132) return;
    heap[idx] = heap_next;
    heap_next = idx;
}

function takeObject(idx) {
    const ret = getObject(idx);
    dropObject(idx);
    return ret;
}

const lTextDecoder = typeof TextDecoder === 'undefined' ? (0, module.require)('util').TextDecoder : TextDecoder;

let cachedTextDecoder = new lTextDecoder('utf-8', { ignoreBOM: true, fatal: true });

cachedTextDecoder.decode();

let cachedUint8Memory0 = null;

function getUint8Memory0() {
    if (cachedUint8Memory0 === null || cachedUint8Memory0.byteLength === 0) {
        cachedUint8Memory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8Memory0;
}

function getStringFromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
}

function addHeapObject(obj) {
    if (heap_next === heap.length) heap.push(heap.length + 1);
    const idx = heap_next;
    heap_next = heap[idx];

    heap[idx] = obj;
    return idx;
}

let WASM_VECTOR_LEN = 0;

const lTextEncoder = typeof TextEncoder === 'undefined' ? (0, module.require)('util').TextEncoder : TextEncoder;

let cachedTextEncoder = new lTextEncoder('utf-8');

const encodeString = (typeof cachedTextEncoder.encodeInto === 'function'
    ? function (arg, view) {
    return cachedTextEncoder.encodeInto(arg, view);
}
    : function (arg, view) {
    const buf = cachedTextEncoder.encode(arg);
    view.set(buf);
    return {
        read: arg.length,
        written: buf.length
    };
});

function passStringToWasm0(arg, malloc, realloc) {

    if (realloc === undefined) {
        const buf = cachedTextEncoder.encode(arg);
        const ptr = malloc(buf.length, 1) >>> 0;
        getUint8Memory0().subarray(ptr, ptr + buf.length).set(buf);
        WASM_VECTOR_LEN = buf.length;
        return ptr;
    }

    let len = arg.length;
    let ptr = malloc(len, 1) >>> 0;

    const mem = getUint8Memory0();

    let offset = 0;

    for (; offset < len; offset++) {
        const code = arg.charCodeAt(offset);
        if (code > 0x7F) break;
        mem[ptr + offset] = code;
    }

    if (offset !== len) {
        if (offset !== 0) {
            arg = arg.slice(offset);
        }
        ptr = realloc(ptr, len, len = offset + arg.length * 3, 1) >>> 0;
        const view = getUint8Memory0().subarray(ptr + offset, ptr + len);
        const ret = encodeString(arg, view);

        offset += ret.written;
    }

    WASM_VECTOR_LEN = offset;
    return ptr;
}

function isLikeNone(x) {
    return x === undefined || x === null;
}

let cachedInt32Memory0 = null;

function getInt32Memory0() {
    if (cachedInt32Memory0 === null || cachedInt32Memory0.byteLength === 0) {
        cachedInt32Memory0 = new Int32Array(wasm.memory.buffer);
    }
    return cachedInt32Memory0;
}

function debugString(val) {
    // primitive types
    const type = typeof val;
    if (type == 'number' || type == 'boolean' || val == null) {
        return  `${val}`;
    }
    if (type == 'string') {
        return `"${val}"`;
    }
    if (type == 'symbol') {
        const description = val.description;
        if (description == null) {
            return 'Symbol';
        } else {
            return `Symbol(${description})`;
        }
    }
    if (type == 'function') {
        const name = val.name;
        if (typeof name == 'string' && name.length > 0) {
            return `Function(${name})`;
        } else {
            return 'Function';
        }
    }
    // objects
    if (Array.isArray(val)) {
        const length = val.length;
        let debug = '[';
        if (length > 0) {
            debug += debugString(val[0]);
        }
        for(let i = 1; i < length; i++) {
            debug += ', ' + debugString(val[i]);
        }
        debug += ']';
        return debug;
    }
    // Test for built-in
    const builtInMatches = /\[object ([^\]]+)\]/.exec(toString.call(val));
    let className;
    if (builtInMatches.length > 1) {
        className = builtInMatches[1];
    } else {
        // Failed to match the standard '[object ClassName]'
        return toString.call(val);
    }
    if (className == 'Object') {
        // we're a user defined class or Object
        // JSON.stringify avoids problems with cycles, and is generally much
        // easier than looping through ownProperties of `val`.
        try {
            return 'Object(' + JSON.stringify(val) + ')';
        } catch (_) {
            return 'Object';
        }
    }
    // errors
    if (val instanceof Error) {
        return `${val.name}: ${val.message}\n${val.stack}`;
    }
    // TODO we could test for more things here, like `Set`s and `Map`s.
    return className;
}

function makeMutClosure(arg0, arg1, dtor, f) {
    const state = { a: arg0, b: arg1, cnt: 1, dtor };
    const real = (...args) => {
        // First up with a closure we increment the internal reference
        // count. This ensures that the Rust closure environment won't
        // be deallocated while we're invoking it.
        state.cnt++;
        const a = state.a;
        state.a = 0;
        try {
            return f(a, state.b, ...args);
        } finally {
            if (--state.cnt === 0) {
                wasm.__wbindgen_export_2.get(state.dtor)(a, state.b);

            } else {
                state.a = a;
            }
        }
    };
    real.original = state;

    return real;
}
function __wbg_adapter_26(arg0, arg1, arg2) {
    wasm._dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h1812ed8eccbc5aa9(arg0, arg1, addHeapObject(arg2));
}

function __wbg_adapter_31(arg0, arg1, arg2) {
    wasm.wasm_bindgen__convert__closures__invoke1_mut__h9d7226382db8a7b6(arg0, arg1, addHeapObject(arg2));
}

/**
* @returns {Promise<Ctx>}
*/
export function new_ctx() {
    const ret = wasm.new_ctx();
    return takeObject(ret);
}

function _assertClass(instance, klass) {
    if (!(instance instanceof klass)) {
        throw new Error(`expected instance of ${klass.name}`);
    }
    return instance.ptr;
}

function getArrayU8FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getUint8Memory0().subarray(ptr / 1, ptr / 1 + len);
}

function handleError(f, args) {
    try {
        return f.apply(this, args);
    } catch (e) {
        wasm.__wbindgen_exn_store(addHeapObject(e));
    }
}

let cachedUint32Memory0 = null;

function getUint32Memory0() {
    if (cachedUint32Memory0 === null || cachedUint32Memory0.byteLength === 0) {
        cachedUint32Memory0 = new Uint32Array(wasm.memory.buffer);
    }
    return cachedUint32Memory0;
}

function getArrayU32FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getUint32Memory0().subarray(ptr / 4, ptr / 4 + len);
}
function __wbg_adapter_335(arg0, arg1, arg2, arg3) {
    wasm.wasm_bindgen__convert__closures__invoke2_mut__h44485c04489181a8(arg0, arg1, addHeapObject(arg2), addHeapObject(arg3));
}

/**
*/
export class Ctx {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(Ctx.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_ctx_free(ptr);
    }
}
/**
*/
export class RenderContextWasm {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(RenderContextWasm.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_rendercontextwasm_free(ptr);
    }
    /**
    * @param {string} source
    * @param {Ctx} ctx
    * @returns {RenderContextWasm}
    */
    static new(source, ctx) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passStringToWasm0(source, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len0 = WASM_VECTOR_LEN;
            _assertClass(ctx, Ctx);
            var ptr1 = ctx.__destroy_into_raw();
            wasm.rendercontextwasm_new(retptr, ptr0, len0, ptr1);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return RenderContextWasm.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {number} height
    * @param {number} width
    * @returns {Uint8Array}
    */
    render_to_vec(height, width) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.rendercontextwasm_render_to_vec(retptr, this.__wbg_ptr, height, width);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}

export function __wbg_ctx_new(arg0) {
    const ret = Ctx.__wrap(arg0);
    return addHeapObject(ret);
};

export function __wbindgen_object_drop_ref(arg0) {
    takeObject(arg0);
};

export function __wbindgen_string_new(arg0, arg1) {
    const ret = getStringFromWasm0(arg0, arg1);
    return addHeapObject(ret);
};

export function __wbindgen_object_clone_ref(arg0) {
    const ret = getObject(arg0);
    return addHeapObject(ret);
};

export function __wbindgen_cb_drop(arg0) {
    const obj = takeObject(arg0).original;
    if (obj.cnt-- == 1) {
        obj.a = 0;
        return true;
    }
    const ret = false;
    return ret;
};

export function __wbindgen_string_get(arg0, arg1) {
    const obj = getObject(arg1);
    const ret = typeof(obj) === 'string' ? obj : undefined;
    var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len1 = WASM_VECTOR_LEN;
    getInt32Memory0()[arg0 / 4 + 1] = len1;
    getInt32Memory0()[arg0 / 4 + 0] = ptr1;
};

export function __wbindgen_is_object(arg0) {
    const val = getObject(arg0);
    const ret = typeof(val) === 'object' && val !== null;
    return ret;
};

export function __wbg_Window_7bd5d737b6110ed5(arg0) {
    const ret = getObject(arg0).Window;
    return addHeapObject(ret);
};

export function __wbindgen_is_undefined(arg0) {
    const ret = getObject(arg0) === undefined;
    return ret;
};

export function __wbg_WorkerGlobalScope_10e1fa12a09a520b(arg0) {
    const ret = getObject(arg0).WorkerGlobalScope;
    return addHeapObject(ret);
};

export function __wbindgen_number_new(arg0) {
    const ret = arg0;
    return addHeapObject(ret);
};

export function __wbg_queueMicrotask_e5949c35d772a669(arg0) {
    queueMicrotask(getObject(arg0));
};

export function __wbg_queueMicrotask_2be8b97a81fe4d00(arg0) {
    const ret = getObject(arg0).queueMicrotask;
    return addHeapObject(ret);
};

export function __wbindgen_is_function(arg0) {
    const ret = typeof(getObject(arg0)) === 'function';
    return ret;
};

export function __wbg_querySelectorAll_c03e8664a5a0f0c5() { return handleError(function (arg0, arg1, arg2) {
    const ret = getObject(arg0).querySelectorAll(getStringFromWasm0(arg1, arg2));
    return addHeapObject(ret);
}, arguments) };

export function __wbg_instanceof_Window_9029196b662bc42a(arg0) {
    let result;
    try {
        result = getObject(arg0) instanceof Window;
    } catch (_) {
        result = false;
    }
    const ret = result;
    return ret;
};

export function __wbg_document_f7ace2b956f30a4f(arg0) {
    const ret = getObject(arg0).document;
    return isLikeNone(ret) ? 0 : addHeapObject(ret);
};

export function __wbg_navigator_7c9103698acde322(arg0) {
    const ret = getObject(arg0).navigator;
    return addHeapObject(ret);
};

export function __wbg_navigator_41bd88b80ed4685e(arg0) {
    const ret = getObject(arg0).navigator;
    return addHeapObject(ret);
};

export function __wbg_instanceof_GpuCanvasContext_7a77e275c38d41d8(arg0) {
    let result;
    try {
        result = getObject(arg0) instanceof GPUCanvasContext;
    } catch (_) {
        result = false;
    }
    const ret = result;
    return ret;
};

export function __wbg_configure_93a57a4e5e0f8bcf(arg0, arg1) {
    getObject(arg0).configure(getObject(arg1));
};

export function __wbg_getCurrentTexture_ecedc4f6f71990d2(arg0) {
    const ret = getObject(arg0).getCurrentTexture();
    return addHeapObject(ret);
};

export function __wbg_get_c77649dd3862b63a(arg0, arg1) {
    const ret = getObject(arg0)[arg1 >>> 0];
    return isLikeNone(ret) ? 0 : addHeapObject(ret);
};

export function __wbg_gpu_1678673f109c8aeb(arg0) {
    const ret = getObject(arg0).gpu;
    return addHeapObject(ret);
};

export function __wbg_features_dfb2178c91fa1dd7(arg0) {
    const ret = getObject(arg0).features;
    return addHeapObject(ret);
};

export function __wbg_limits_45ceb777867eb768(arg0) {
    const ret = getObject(arg0).limits;
    return addHeapObject(ret);
};

export function __wbg_queue_f2aeb5c277e56f93(arg0) {
    const ret = getObject(arg0).queue;
    return addHeapObject(ret);
};

export function __wbg_setonuncapturederror_b3c814f611d5e585(arg0, arg1) {
    getObject(arg0).onuncapturederror = getObject(arg1);
};

export function __wbg_createBindGroup_fa5515d52f9c6a69(arg0, arg1) {
    const ret = getObject(arg0).createBindGroup(getObject(arg1));
    return addHeapObject(ret);
};

export function __wbg_createBindGroupLayout_af3b9d9ee0a1f5f9(arg0, arg1) {
    const ret = getObject(arg0).createBindGroupLayout(getObject(arg1));
    return addHeapObject(ret);
};

export function __wbg_createBuffer_36e159f52cc644a7(arg0, arg1) {
    const ret = getObject(arg0).createBuffer(getObject(arg1));
    return addHeapObject(ret);
};

export function __wbg_createCommandEncoder_a50a1dab2b499b95(arg0, arg1) {
    const ret = getObject(arg0).createCommandEncoder(getObject(arg1));
    return addHeapObject(ret);
};

export function __wbg_createComputePipeline_89131452dfd12672(arg0, arg1) {
    const ret = getObject(arg0).createComputePipeline(getObject(arg1));
    return addHeapObject(ret);
};

export function __wbg_createPipelineLayout_1e10c8281fb85c01(arg0, arg1) {
    const ret = getObject(arg0).createPipelineLayout(getObject(arg1));
    return addHeapObject(ret);
};

export function __wbg_createQuerySet_ccb746122176f8e5(arg0, arg1) {
    const ret = getObject(arg0).createQuerySet(getObject(arg1));
    return addHeapObject(ret);
};

export function __wbg_createRenderBundleEncoder_ad2d0237f581427b(arg0, arg1) {
    const ret = getObject(arg0).createRenderBundleEncoder(getObject(arg1));
    return addHeapObject(ret);
};

export function __wbg_createRenderPipeline_745f00bcb1ca6edf(arg0, arg1) {
    const ret = getObject(arg0).createRenderPipeline(getObject(arg1));
    return addHeapObject(ret);
};

export function __wbg_createSampler_09cd36835c9befb3(arg0, arg1) {
    const ret = getObject(arg0).createSampler(getObject(arg1));
    return addHeapObject(ret);
};

export function __wbg_createShaderModule_59bbf537b8b5cf7c(arg0, arg1) {
    const ret = getObject(arg0).createShaderModule(getObject(arg1));
    return addHeapObject(ret);
};

export function __wbg_createTexture_dbd00b550944125c(arg0, arg1) {
    const ret = getObject(arg0).createTexture(getObject(arg1));
    return addHeapObject(ret);
};

export function __wbg_destroy_abb6deaa6cb27aa3(arg0) {
    getObject(arg0).destroy();
};

export function __wbg_popErrorScope_19075fb98a08b740(arg0) {
    const ret = getObject(arg0).popErrorScope();
    return addHeapObject(ret);
};

export function __wbg_pushErrorScope_0728aae3f2d3ed48(arg0, arg1) {
    getObject(arg0).pushErrorScope(takeObject(arg1));
};

export function __wbg_has_8720889cf3ad610c(arg0, arg1, arg2) {
    const ret = getObject(arg0).has(getStringFromWasm0(arg1, arg2));
    return ret;
};

export function __wbg_instanceof_GpuAdapter_c0a5a310603ba618(arg0) {
    let result;
    try {
        result = getObject(arg0) instanceof GPUAdapter;
    } catch (_) {
        result = false;
    }
    const ret = result;
    return ret;
};

export function __wbg_features_88901f43932fb28e(arg0) {
    const ret = getObject(arg0).features;
    return addHeapObject(ret);
};

export function __wbg_limits_a7f3fbf58768b61f(arg0) {
    const ret = getObject(arg0).limits;
    return addHeapObject(ret);
};

export function __wbg_requestDevice_068e794820eb88eb(arg0, arg1) {
    const ret = getObject(arg0).requestDevice(getObject(arg1));
    return addHeapObject(ret);
};

export function __wbg_instanceof_GpuOutOfMemoryError_45166ef4e2774fbe(arg0) {
    let result;
    try {
        result = getObject(arg0) instanceof GPUOutOfMemoryError;
    } catch (_) {
        result = false;
    }
    const ret = result;
    return ret;
};

export function __wbg_copyExternalImageToTexture_819ec294d299f624(arg0, arg1, arg2, arg3) {
    getObject(arg0).copyExternalImageToTexture(getObject(arg1), getObject(arg2), getObject(arg3));
};

export function __wbg_submit_3104e9b014f75846(arg0, arg1) {
    getObject(arg0).submit(getObject(arg1));
};

export function __wbg_writeBuffer_becf0c8f0323ffd7(arg0, arg1, arg2, arg3, arg4, arg5) {
    getObject(arg0).writeBuffer(getObject(arg1), arg2, getObject(arg3), arg4, arg5);
};

export function __wbg_writeTexture_465ecc6146e5052c(arg0, arg1, arg2, arg3, arg4) {
    getObject(arg0).writeTexture(getObject(arg1), getObject(arg2), getObject(arg3), getObject(arg4));
};

export function __wbg_instanceof_GpuValidationError_af2aa2e306669317(arg0) {
    let result;
    try {
        result = getObject(arg0) instanceof GPUValidationError;
    } catch (_) {
        result = false;
    }
    const ret = result;
    return ret;
};

export function __wbg_setwidth_a667a942dba6656e(arg0, arg1) {
    getObject(arg0).width = arg1 >>> 0;
};

export function __wbg_setheight_a747d440760fe5aa(arg0, arg1) {
    getObject(arg0).height = arg1 >>> 0;
};

export function __wbg_getContext_7c5944ea807bf5d3() { return handleError(function (arg0, arg1, arg2) {
    const ret = getObject(arg0).getContext(getStringFromWasm0(arg1, arg2));
    return isLikeNone(ret) ? 0 : addHeapObject(ret);
}, arguments) };

export function __wbg_setwidth_15266a5e81f43cf0(arg0, arg1) {
    getObject(arg0).width = arg1 >>> 0;
};

export function __wbg_setheight_2e9bab573f1775a6(arg0, arg1) {
    getObject(arg0).height = arg1 >>> 0;
};

export function __wbg_getPreferredCanvasFormat_1f6c9ef810196b92(arg0) {
    const ret = getObject(arg0).getPreferredCanvasFormat();
    return addHeapObject(ret);
};

export function __wbg_requestAdapter_d8298d7a27a391f0(arg0, arg1) {
    const ret = getObject(arg0).requestAdapter(getObject(arg1));
    return addHeapObject(ret);
};

export function __wbg_end_bdfb66792e0c59a2(arg0) {
    getObject(arg0).end();
};

export function __wbg_executeBundles_0a1fdfd83c1a3e57(arg0, arg1) {
    getObject(arg0).executeBundles(getObject(arg1));
};

export function __wbg_setBlendConstant_e89574db5137b2f6(arg0, arg1) {
    getObject(arg0).setBlendConstant(getObject(arg1));
};

export function __wbg_setScissorRect_0af8c89e90a6e89c(arg0, arg1, arg2, arg3, arg4) {
    getObject(arg0).setScissorRect(arg1 >>> 0, arg2 >>> 0, arg3 >>> 0, arg4 >>> 0);
};

export function __wbg_setStencilReference_71be0db67db2f7ab(arg0, arg1) {
    getObject(arg0).setStencilReference(arg1 >>> 0);
};

export function __wbg_setViewport_9c5fb686baf1cf4f(arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
    getObject(arg0).setViewport(arg1, arg2, arg3, arg4, arg5, arg6);
};

export function __wbg_setBindGroup_ed098a3302f084a7(arg0, arg1, arg2) {
    getObject(arg0).setBindGroup(arg1 >>> 0, getObject(arg2));
};

export function __wbg_setBindGroup_ce4432036922cd83(arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
    getObject(arg0).setBindGroup(arg1 >>> 0, getObject(arg2), getArrayU32FromWasm0(arg3, arg4), arg5, arg6 >>> 0);
};

export function __wbg_draw_6357a5fbc8a6b097(arg0, arg1, arg2, arg3, arg4) {
    getObject(arg0).draw(arg1 >>> 0, arg2 >>> 0, arg3 >>> 0, arg4 >>> 0);
};

export function __wbg_drawIndexed_5d1dd89d7375148c(arg0, arg1, arg2, arg3, arg4, arg5) {
    getObject(arg0).drawIndexed(arg1 >>> 0, arg2 >>> 0, arg3 >>> 0, arg4, arg5 >>> 0);
};

export function __wbg_drawIndexedIndirect_526599171cfbbee5(arg0, arg1, arg2) {
    getObject(arg0).drawIndexedIndirect(getObject(arg1), arg2);
};

export function __wbg_drawIndirect_8dd595dc622e21ac(arg0, arg1, arg2) {
    getObject(arg0).drawIndirect(getObject(arg1), arg2);
};

export function __wbg_setIndexBuffer_1f4a86d1cc8c16d9(arg0, arg1, arg2, arg3) {
    getObject(arg0).setIndexBuffer(getObject(arg1), takeObject(arg2), arg3);
};

export function __wbg_setIndexBuffer_9f8493460611f96b(arg0, arg1, arg2, arg3, arg4) {
    getObject(arg0).setIndexBuffer(getObject(arg1), takeObject(arg2), arg3, arg4);
};

export function __wbg_setPipeline_18ce556bdea62cc5(arg0, arg1) {
    getObject(arg0).setPipeline(getObject(arg1));
};

export function __wbg_setVertexBuffer_2a2c84d65c1063f9(arg0, arg1, arg2, arg3) {
    getObject(arg0).setVertexBuffer(arg1 >>> 0, getObject(arg2), arg3);
};

export function __wbg_setVertexBuffer_176c2dff823c42c1(arg0, arg1, arg2, arg3, arg4) {
    getObject(arg0).setVertexBuffer(arg1 >>> 0, getObject(arg2), arg3, arg4);
};

export function __wbg_createView_3e46af1f54fdcd1f(arg0, arg1) {
    const ret = getObject(arg0).createView(getObject(arg1));
    return addHeapObject(ret);
};

export function __wbg_destroy_728f676d96e34538(arg0) {
    getObject(arg0).destroy();
};

export function __wbg_gpu_24536c9523d924b1(arg0) {
    const ret = getObject(arg0).gpu;
    return addHeapObject(ret);
};

export function __wbg_maxTextureDimension1D_4d1ddb46ed9dc470(arg0) {
    const ret = getObject(arg0).maxTextureDimension1D;
    return ret;
};

export function __wbg_maxTextureDimension2D_37a46e61490c8297(arg0) {
    const ret = getObject(arg0).maxTextureDimension2D;
    return ret;
};

export function __wbg_maxTextureDimension3D_7e3a97204d211743(arg0) {
    const ret = getObject(arg0).maxTextureDimension3D;
    return ret;
};

export function __wbg_maxTextureArrayLayers_fee4db585706a5eb(arg0) {
    const ret = getObject(arg0).maxTextureArrayLayers;
    return ret;
};

export function __wbg_maxBindGroups_dc8a5f97ba653c91(arg0) {
    const ret = getObject(arg0).maxBindGroups;
    return ret;
};

export function __wbg_maxBindingsPerBindGroup_3d5ab311420be5df(arg0) {
    const ret = getObject(arg0).maxBindingsPerBindGroup;
    return ret;
};

export function __wbg_maxDynamicUniformBuffersPerPipelineLayout_6b839b7dc97f34f0(arg0) {
    const ret = getObject(arg0).maxDynamicUniformBuffersPerPipelineLayout;
    return ret;
};

export function __wbg_maxDynamicStorageBuffersPerPipelineLayout_5328cd2b9d884831(arg0) {
    const ret = getObject(arg0).maxDynamicStorageBuffersPerPipelineLayout;
    return ret;
};

export function __wbg_maxSampledTexturesPerShaderStage_ac006b00cf776b4a(arg0) {
    const ret = getObject(arg0).maxSampledTexturesPerShaderStage;
    return ret;
};

export function __wbg_maxSamplersPerShaderStage_dc092d6a272be20a(arg0) {
    const ret = getObject(arg0).maxSamplersPerShaderStage;
    return ret;
};

export function __wbg_maxStorageBuffersPerShaderStage_dc5b58734b9ab932(arg0) {
    const ret = getObject(arg0).maxStorageBuffersPerShaderStage;
    return ret;
};

export function __wbg_maxStorageTexturesPerShaderStage_2fec939cb0d5bbfd(arg0) {
    const ret = getObject(arg0).maxStorageTexturesPerShaderStage;
    return ret;
};

export function __wbg_maxUniformBuffersPerShaderStage_b30d53cbf89caeae(arg0) {
    const ret = getObject(arg0).maxUniformBuffersPerShaderStage;
    return ret;
};

export function __wbg_maxUniformBufferBindingSize_eec576e1342504b5(arg0) {
    const ret = getObject(arg0).maxUniformBufferBindingSize;
    return ret;
};

export function __wbg_maxStorageBufferBindingSize_1ef0cc5e43dad09b(arg0) {
    const ret = getObject(arg0).maxStorageBufferBindingSize;
    return ret;
};

export function __wbg_minUniformBufferOffsetAlignment_3af8c32faa30c5d8(arg0) {
    const ret = getObject(arg0).minUniformBufferOffsetAlignment;
    return ret;
};

export function __wbg_minStorageBufferOffsetAlignment_766ef8ea8f9fe6e1(arg0) {
    const ret = getObject(arg0).minStorageBufferOffsetAlignment;
    return ret;
};

export function __wbg_maxVertexBuffers_b4d31be9e3f93990(arg0) {
    const ret = getObject(arg0).maxVertexBuffers;
    return ret;
};

export function __wbg_maxBufferSize_2d8398a691b9a8ce(arg0) {
    const ret = getObject(arg0).maxBufferSize;
    return ret;
};

export function __wbg_maxVertexAttributes_904c5eb19a6f6c65(arg0) {
    const ret = getObject(arg0).maxVertexAttributes;
    return ret;
};

export function __wbg_maxVertexBufferArrayStride_6800975c373d83bc(arg0) {
    const ret = getObject(arg0).maxVertexBufferArrayStride;
    return ret;
};

export function __wbg_maxInterStageShaderComponents_b9f179b1cde06d08(arg0) {
    const ret = getObject(arg0).maxInterStageShaderComponents;
    return ret;
};

export function __wbg_maxComputeWorkgroupStorageSize_9318e498283b79fb(arg0) {
    const ret = getObject(arg0).maxComputeWorkgroupStorageSize;
    return ret;
};

export function __wbg_maxComputeInvocationsPerWorkgroup_2bfea723194ac5a0(arg0) {
    const ret = getObject(arg0).maxComputeInvocationsPerWorkgroup;
    return ret;
};

export function __wbg_maxComputeWorkgroupSizeX_91fc9ba04de4148f(arg0) {
    const ret = getObject(arg0).maxComputeWorkgroupSizeX;
    return ret;
};

export function __wbg_maxComputeWorkgroupSizeY_9052627dce4a7d1f(arg0) {
    const ret = getObject(arg0).maxComputeWorkgroupSizeY;
    return ret;
};

export function __wbg_maxComputeWorkgroupSizeZ_45a1a82f8446a750(arg0) {
    const ret = getObject(arg0).maxComputeWorkgroupSizeZ;
    return ret;
};

export function __wbg_maxComputeWorkgroupsPerDimension_100ee7392cc04c20(arg0) {
    const ret = getObject(arg0).maxComputeWorkgroupsPerDimension;
    return ret;
};

export function __wbg_label_c7970304720cf8b0(arg0, arg1) {
    const ret = getObject(arg1).label;
    const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len1 = WASM_VECTOR_LEN;
    getInt32Memory0()[arg0 / 4 + 1] = len1;
    getInt32Memory0()[arg0 / 4 + 0] = ptr1;
};

export function __wbg_beginComputePass_579a2563c561da68(arg0, arg1) {
    const ret = getObject(arg0).beginComputePass(getObject(arg1));
    return addHeapObject(ret);
};

export function __wbg_beginRenderPass_d04327f7231bd5af(arg0, arg1) {
    const ret = getObject(arg0).beginRenderPass(getObject(arg1));
    return addHeapObject(ret);
};

export function __wbg_clearBuffer_c370e7adb8398388(arg0, arg1, arg2) {
    getObject(arg0).clearBuffer(getObject(arg1), arg2);
};

export function __wbg_clearBuffer_b8e6751290709d43(arg0, arg1, arg2, arg3) {
    getObject(arg0).clearBuffer(getObject(arg1), arg2, arg3);
};

export function __wbg_copyBufferToBuffer_79ac12f409453cf0(arg0, arg1, arg2, arg3, arg4, arg5) {
    getObject(arg0).copyBufferToBuffer(getObject(arg1), arg2, getObject(arg3), arg4, arg5);
};

export function __wbg_copyBufferToTexture_ac956e6d47c24e73(arg0, arg1, arg2, arg3) {
    getObject(arg0).copyBufferToTexture(getObject(arg1), getObject(arg2), getObject(arg3));
};

export function __wbg_copyTextureToBuffer_787ec8d8c4c216f1(arg0, arg1, arg2, arg3) {
    getObject(arg0).copyTextureToBuffer(getObject(arg1), getObject(arg2), getObject(arg3));
};

export function __wbg_copyTextureToTexture_a86e849469b0ef38(arg0, arg1, arg2, arg3) {
    getObject(arg0).copyTextureToTexture(getObject(arg1), getObject(arg2), getObject(arg3));
};

export function __wbg_finish_5153789564a5eee5(arg0) {
    const ret = getObject(arg0).finish();
    return addHeapObject(ret);
};

export function __wbg_finish_d1049a13335e8326(arg0, arg1) {
    const ret = getObject(arg0).finish(getObject(arg1));
    return addHeapObject(ret);
};

export function __wbg_resolveQuerySet_8ac49c71e15cdf6a(arg0, arg1, arg2, arg3, arg4, arg5) {
    getObject(arg0).resolveQuerySet(getObject(arg1), arg2 >>> 0, arg3 >>> 0, getObject(arg4), arg5 >>> 0);
};

export function __wbg_writeTimestamp_107647519ce52436(arg0, arg1, arg2) {
    getObject(arg0).writeTimestamp(getObject(arg1), arg2 >>> 0);
};

export function __wbg_finish_863657abae52896e(arg0) {
    const ret = getObject(arg0).finish();
    return addHeapObject(ret);
};

export function __wbg_finish_e580ef236d53f04b(arg0, arg1) {
    const ret = getObject(arg0).finish(getObject(arg1));
    return addHeapObject(ret);
};

export function __wbg_setBindGroup_e6d2dd2ab3573b6d(arg0, arg1, arg2) {
    getObject(arg0).setBindGroup(arg1 >>> 0, getObject(arg2));
};

export function __wbg_setBindGroup_6bc8944422dbb3cd(arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
    getObject(arg0).setBindGroup(arg1 >>> 0, getObject(arg2), getArrayU32FromWasm0(arg3, arg4), arg5, arg6 >>> 0);
};

export function __wbg_draw_3958097471a10642(arg0, arg1, arg2, arg3, arg4) {
    getObject(arg0).draw(arg1 >>> 0, arg2 >>> 0, arg3 >>> 0, arg4 >>> 0);
};

export function __wbg_drawIndexed_8856cc4ccffa3498(arg0, arg1, arg2, arg3, arg4, arg5) {
    getObject(arg0).drawIndexed(arg1 >>> 0, arg2 >>> 0, arg3 >>> 0, arg4, arg5 >>> 0);
};

export function __wbg_drawIndexedIndirect_0404fa6cb9a6db25(arg0, arg1, arg2) {
    getObject(arg0).drawIndexedIndirect(getObject(arg1), arg2);
};

export function __wbg_drawIndirect_95c6eb1494a44d06(arg0, arg1, arg2) {
    getObject(arg0).drawIndirect(getObject(arg1), arg2);
};

export function __wbg_setIndexBuffer_4dc5432dc348458d(arg0, arg1, arg2, arg3) {
    getObject(arg0).setIndexBuffer(getObject(arg1), takeObject(arg2), arg3);
};

export function __wbg_setIndexBuffer_f3bae4da9e407eaf(arg0, arg1, arg2, arg3, arg4) {
    getObject(arg0).setIndexBuffer(getObject(arg1), takeObject(arg2), arg3, arg4);
};

export function __wbg_setPipeline_66f1e900256fc946(arg0, arg1) {
    getObject(arg0).setPipeline(getObject(arg1));
};

export function __wbg_setVertexBuffer_c782d133fd439184(arg0, arg1, arg2, arg3) {
    getObject(arg0).setVertexBuffer(arg1 >>> 0, getObject(arg2), arg3);
};

export function __wbg_setVertexBuffer_4da0a96267ce82db(arg0, arg1, arg2, arg3, arg4) {
    getObject(arg0).setVertexBuffer(arg1 >>> 0, getObject(arg2), arg3, arg4);
};

export function __wbg_size_6540ddb49e0d7120(arg0) {
    const ret = getObject(arg0).size;
    return ret;
};

export function __wbg_usage_f5b34f3e0170424b(arg0) {
    const ret = getObject(arg0).usage;
    return ret;
};

export function __wbg_destroy_9b5398e5b148e210(arg0) {
    getObject(arg0).destroy();
};

export function __wbg_getMappedRange_becef7e3d9dc5489(arg0, arg1, arg2) {
    const ret = getObject(arg0).getMappedRange(arg1, arg2);
    return addHeapObject(ret);
};

export function __wbg_mapAsync_91acdcf41b7ae21d(arg0, arg1, arg2, arg3) {
    const ret = getObject(arg0).mapAsync(arg1 >>> 0, arg2, arg3);
    return addHeapObject(ret);
};

export function __wbg_unmap_1677c09514e08e64(arg0) {
    getObject(arg0).unmap();
};

export function __wbg_getBindGroupLayout_20dc45d52b96fa42(arg0, arg1) {
    const ret = getObject(arg0).getBindGroupLayout(arg1 >>> 0);
    return addHeapObject(ret);
};

export function __wbg_getBindGroupLayout_dfc1b97f78c04beb(arg0, arg1) {
    const ret = getObject(arg0).getBindGroupLayout(arg1 >>> 0);
    return addHeapObject(ret);
};

export function __wbg_error_f85e77a2651e41dc(arg0) {
    const ret = getObject(arg0).error;
    return addHeapObject(ret);
};

export function __wbg_dispatchWorkgroups_c484cd3530a3801d(arg0, arg1, arg2, arg3) {
    getObject(arg0).dispatchWorkgroups(arg1 >>> 0, arg2 >>> 0, arg3 >>> 0);
};

export function __wbg_dispatchWorkgroupsIndirect_2b89ee1731fab5f8(arg0, arg1, arg2) {
    getObject(arg0).dispatchWorkgroupsIndirect(getObject(arg1), arg2);
};

export function __wbg_end_dab719019df5969c(arg0) {
    getObject(arg0).end();
};

export function __wbg_setPipeline_598117fdeb73cf8f(arg0, arg1) {
    getObject(arg0).setPipeline(getObject(arg1));
};

export function __wbg_setBindGroup_c619f49c16ef095b(arg0, arg1, arg2) {
    getObject(arg0).setBindGroup(arg1 >>> 0, getObject(arg2));
};

export function __wbg_setBindGroup_dffce83253968cdd(arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
    getObject(arg0).setBindGroup(arg1 >>> 0, getObject(arg2), getArrayU32FromWasm0(arg3, arg4), arg5, arg6 >>> 0);
};

export function __wbg_message_c934153af8567cdb(arg0, arg1) {
    const ret = getObject(arg1).message;
    const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len1 = WASM_VECTOR_LEN;
    getInt32Memory0()[arg0 / 4 + 1] = len1;
    getInt32Memory0()[arg0 / 4 + 0] = ptr1;
};

export function __wbg_new_08236689f0afb357() {
    const ret = new Array();
    return addHeapObject(ret);
};

export function __wbg_newnoargs_ccdcae30fd002262(arg0, arg1) {
    const ret = new Function(getStringFromWasm0(arg0, arg1));
    return addHeapObject(ret);
};

export function __wbg_call_669127b9d730c650() { return handleError(function (arg0, arg1) {
    const ret = getObject(arg0).call(getObject(arg1));
    return addHeapObject(ret);
}, arguments) };

export function __wbg_new_c728d68b8b34487e() {
    const ret = new Object();
    return addHeapObject(ret);
};

export function __wbg_self_3fad056edded10bd() { return handleError(function () {
    const ret = self.self;
    return addHeapObject(ret);
}, arguments) };

export function __wbg_window_a4f46c98a61d4089() { return handleError(function () {
    const ret = window.window;
    return addHeapObject(ret);
}, arguments) };

export function __wbg_globalThis_17eff828815f7d84() { return handleError(function () {
    const ret = globalThis.globalThis;
    return addHeapObject(ret);
}, arguments) };

export function __wbg_global_46f939f6541643c5() { return handleError(function () {
    const ret = global.global;
    return addHeapObject(ret);
}, arguments) };

export function __wbg_push_fd3233d09cf81821(arg0, arg1) {
    const ret = getObject(arg0).push(getObject(arg1));
    return ret;
};

export function __wbg_call_53fc3abd42e24ec8() { return handleError(function (arg0, arg1, arg2) {
    const ret = getObject(arg0).call(getObject(arg1), getObject(arg2));
    return addHeapObject(ret);
}, arguments) };

export function __wbg_instanceof_Object_3c95bd459efa5c3c(arg0) {
    let result;
    try {
        result = getObject(arg0) instanceof Object;
    } catch (_) {
        result = false;
    }
    const ret = result;
    return ret;
};

export function __wbg_valueOf_10fedcc86f3d8ddc(arg0) {
    const ret = getObject(arg0).valueOf();
    return addHeapObject(ret);
};

export function __wbg_new_feb65b865d980ae2(arg0, arg1) {
    try {
        var state0 = {a: arg0, b: arg1};
        var cb0 = (arg0, arg1) => {
            const a = state0.a;
            state0.a = 0;
            try {
                return __wbg_adapter_335(a, state0.b, arg0, arg1);
            } finally {
                state0.a = a;
            }
        };
        const ret = new Promise(cb0);
        return addHeapObject(ret);
    } finally {
        state0.a = state0.b = 0;
    }
};

export function __wbg_resolve_a3252b2860f0a09e(arg0) {
    const ret = Promise.resolve(getObject(arg0));
    return addHeapObject(ret);
};

export function __wbg_then_89e1c559530b85cf(arg0, arg1) {
    const ret = getObject(arg0).then(getObject(arg1));
    return addHeapObject(ret);
};

export function __wbg_then_1bbc9edafd859b06(arg0, arg1, arg2) {
    const ret = getObject(arg0).then(getObject(arg1), getObject(arg2));
    return addHeapObject(ret);
};

export function __wbg_buffer_344d9b41efe96da7(arg0) {
    const ret = getObject(arg0).buffer;
    return addHeapObject(ret);
};

export function __wbg_newwithbyteoffsetandlength_2dc04d99088b15e3(arg0, arg1, arg2) {
    const ret = new Uint8Array(getObject(arg0), arg1 >>> 0, arg2 >>> 0);
    return addHeapObject(ret);
};

export function __wbg_new_d8a000788389a31e(arg0) {
    const ret = new Uint8Array(getObject(arg0));
    return addHeapObject(ret);
};

export function __wbg_set_dcfd613a3420f908(arg0, arg1, arg2) {
    getObject(arg0).set(getObject(arg1), arg2 >>> 0);
};

export function __wbg_length_a5587d6cd79ab197(arg0) {
    const ret = getObject(arg0).length;
    return ret;
};

export function __wbg_buffer_b334b57bee6f611b(arg0) {
    const ret = getObject(arg0).buffer;
    return addHeapObject(ret);
};

export function __wbg_set_40f7786a25a9cc7e() { return handleError(function (arg0, arg1, arg2) {
    const ret = Reflect.set(getObject(arg0), getObject(arg1), getObject(arg2));
    return ret;
}, arguments) };

export function __wbindgen_debug_string(arg0, arg1) {
    const ret = debugString(getObject(arg1));
    const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len1 = WASM_VECTOR_LEN;
    getInt32Memory0()[arg0 / 4 + 1] = len1;
    getInt32Memory0()[arg0 / 4 + 0] = ptr1;
};

export function __wbindgen_throw(arg0, arg1) {
    throw new Error(getStringFromWasm0(arg0, arg1));
};

export function __wbindgen_memory() {
    const ret = wasm.memory;
    return addHeapObject(ret);
};

export function __wbindgen_closure_wrapper777(arg0, arg1, arg2) {
    const ret = makeMutClosure(arg0, arg1, 258, __wbg_adapter_26);
    return addHeapObject(ret);
};

export function __wbindgen_closure_wrapper779(arg0, arg1, arg2) {
    const ret = makeMutClosure(arg0, arg1, 258, __wbg_adapter_26);
    return addHeapObject(ret);
};

export function __wbindgen_closure_wrapper797(arg0, arg1, arg2) {
    const ret = makeMutClosure(arg0, arg1, 268, __wbg_adapter_31);
    return addHeapObject(ret);
};

