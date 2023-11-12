/* tslint:disable */
/* eslint-disable */
/**
* @returns {Promise<Ctx>}
*/
export function new_ctx(): Promise<Ctx>;
/**
*/
export class App {
  free(): void;
/**
* @param {Function} closure
*/
  on_update(closure: Function): void;
/**
* @param {string} src
* @param {string} div_id
* @param {MessageQueue} message_queue
* @param {InputList} list
* @param {Function | undefined} [cb]
* @returns {Promise<App>}
*/
  static new(src: string, div_id: string, message_queue: MessageQueue, list: InputList, cb?: Function): Promise<App>;
/**
* @returns {Promise<void>}
*/
  run(): Promise<void>;
}
/**
*/
export class Ctx {
  free(): void;
}
/**
*/
export class Input {
  free(): void;
/**
*/
  readonly default: any;
/**
*/
  readonly max: any;
/**
*/
  readonly min: any;
/**
*/
  readonly name: any;
/**
*/
  readonly ty: any;
/**
*/
  readonly value: any;
}
/**
*/
export class InputList {
  free(): void;
/**
* @returns {InputList}
*/
  static new(): InputList;
/**
* @returns {InputList}
*/
  clone(): InputList;
/**
* @param {Function} closure
*/
  on_update(closure: Function): void;
/**
* @returns {(Input)[]}
*/
  inputs(): (Input)[];
}
/**
*/
export class MessageQueue {
  free(): void;
/**
* @returns {MessageQueue}
*/
  static new(): MessageQueue;
/**
* @returns {MessageQueue}
*/
  clone(): MessageQueue;
/**
* @param {string} name
* @param {any} val
*/
  update_value(name: string, val: any): void;
/**
* @param {string} source
*/
  reload_code(source: string): void;
/**
* @param {number} width
* @param {number} height
*/
  resize(width: number, height: number): void;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly __wbg_input_free: (a: number) => void;
  readonly input_name: (a: number) => number;
  readonly input_ty: (a: number) => number;
  readonly input_value: (a: number) => number;
  readonly input_min: (a: number) => number;
  readonly input_max: (a: number) => number;
  readonly input_default: (a: number) => number;
  readonly __wbg_messagequeue_free: (a: number) => void;
  readonly __wbg_inputlist_free: (a: number) => void;
  readonly inputlist_new: () => number;
  readonly inputlist_clone: (a: number) => number;
  readonly inputlist_on_update: (a: number, b: number) => void;
  readonly inputlist_inputs: (a: number, b: number) => void;
  readonly messagequeue_new: () => number;
  readonly messagequeue_clone: (a: number) => number;
  readonly messagequeue_update_value: (a: number, b: number, c: number, d: number) => void;
  readonly messagequeue_reload_code: (a: number, b: number, c: number) => void;
  readonly messagequeue_resize: (a: number, b: number, c: number) => void;
  readonly __wbg_app_free: (a: number) => void;
  readonly app_on_update: (a: number, b: number) => void;
  readonly app_new: (a: number, b: number, c: number, d: number, e: number, f: number, g: number) => number;
  readonly app_run: (a: number) => number;
  readonly __wbg_ctx_free: (a: number) => void;
  readonly new_ctx: () => number;
  readonly __wbindgen_malloc: (a: number, b: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
  readonly __wbindgen_export_2: WebAssembly.Table;
  readonly _dyn_core__ops__function__FnMut_____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h80e7886da90bcdf9: (a: number, b: number) => void;
  readonly _dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h1bc83cc9560318f3: (a: number, b: number, c: number) => void;
  readonly _dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__ha511fa6cd675de9c: (a: number, b: number, c: number) => void;
  readonly _dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__hcb133bbaa8fabdb6: (a: number, b: number, c: number) => void;
  readonly wasm_bindgen__convert__closures__invoke1_mut__he381cf16eb809268: (a: number, b: number, c: number) => void;
  readonly __wbindgen_add_to_stack_pointer: (a: number) => number;
  readonly __wbindgen_free: (a: number, b: number, c: number) => void;
  readonly __wbindgen_exn_store: (a: number) => void;
  readonly wasm_bindgen__convert__closures__invoke2_mut__h8ad33c7e53e0bcfb: (a: number, b: number, c: number, d: number) => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;
/**
* Instantiates the given `module`, which can either be bytes or
* a precompiled `WebAssembly.Module`.
*
* @param {SyncInitInput} module
*
* @returns {InitOutput}
*/
export function initSync(module: SyncInitInput): InitOutput;

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {InitInput | Promise<InitInput>} module_or_path
*
* @returns {Promise<InitOutput>}
*/
export default function __wbg_init (module_or_path?: InitInput | Promise<InitInput>): Promise<InitOutput>;
