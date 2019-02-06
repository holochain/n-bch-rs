/* tslint:disable */
var wasm;

let cachegetUint8Memory = null;
function getUint8Memory() {
    if (cachegetUint8Memory === null || cachegetUint8Memory.buffer !== wasm.memory.buffer) {
        cachegetUint8Memory = new Uint8Array(wasm.memory.buffer);
    }
    return cachegetUint8Memory;
}

let WASM_VECTOR_LEN = 0;

function passArray8ToWasm(arg) {
    const ptr = wasm.__wbindgen_malloc(arg.length * 1);
    getUint8Memory().set(arg, ptr / 1);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
}

function getArrayU8FromWasm(ptr, len) {
    return getUint8Memory().subarray(ptr / 1, ptr / 1 + len);
}

let cachedGlobalArgumentPtr = null;
function globalArgumentPtr() {
    if (cachedGlobalArgumentPtr === null) {
        cachedGlobalArgumentPtr = wasm.__wbindgen_global_argument_ptr();
    }
    return cachedGlobalArgumentPtr;
}

let cachegetUint32Memory = null;
function getUint32Memory() {
    if (cachegetUint32Memory === null || cachegetUint32Memory.buffer !== wasm.memory.buffer) {
        cachegetUint32Memory = new Uint32Array(wasm.memory.buffer);
    }
    return cachegetUint32Memory;
}

function freeEncoder(ptr) {

    wasm.__wbg_encoder_free(ptr);
}
/**
*/
class Encoder {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;
        freeEncoder(ptr);
    }

    /**
    * @param {number} arg0
    * @returns {}
    */
    constructor(arg0) {
        this.ptr = wasm.encoder_new(arg0);
    }
    /**
    * @param {Uint8Array} arg0
    * @returns {Uint8Array}
    */
    encode(arg0) {
        const ptr0 = passArray8ToWasm(arg0);
        const len0 = WASM_VECTOR_LEN;
        const retptr = globalArgumentPtr();
        try {
            wasm.encoder_encode(retptr, this.ptr, ptr0, len0);
            const mem = getUint32Memory();
            const rustptr = mem[retptr / 4];
            const rustlen = mem[retptr / 4 + 1];

            const realRet = getArrayU8FromWasm(rustptr, rustlen).slice();
            wasm.__wbindgen_free(rustptr, rustlen * 1);
            return realRet;


        } finally {
            wasm.__wbindgen_free(ptr0, len0 * 1);

        }

    }
}
module.exports.Encoder = Encoder;

function freeDecoder(ptr) {

    wasm.__wbg_decoder_free(ptr);
}
/**
*/
class Decoder {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;
        freeDecoder(ptr);
    }

    /**
    * @param {number} arg0
    * @returns {}
    */
    constructor(arg0) {
        this.ptr = wasm.decoder_new(arg0);
    }
    /**
    * @param {Uint8Array} arg0
    * @returns {Uint8Array}
    */
    correct(arg0) {
        const ptr0 = passArray8ToWasm(arg0);
        const len0 = WASM_VECTOR_LEN;
        const retptr = globalArgumentPtr();
        try {
            wasm.decoder_correct(retptr, this.ptr, ptr0, len0);
            const mem = getUint32Memory();
            const rustptr = mem[retptr / 4];
            const rustlen = mem[retptr / 4 + 1];

            const realRet = getArrayU8FromWasm(rustptr, rustlen).slice();
            wasm.__wbindgen_free(rustptr, rustlen * 1);
            return realRet;


        } finally {
            wasm.__wbindgen_free(ptr0, len0 * 1);

        }

    }
    /**
    * @param {Uint8Array} arg0
    * @param {Uint8Array} arg1
    * @returns {Uint8Array}
    */
    correct_erasures(arg0, arg1) {
        const ptr0 = passArray8ToWasm(arg0);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passArray8ToWasm(arg1);
        const len1 = WASM_VECTOR_LEN;
        const retptr = globalArgumentPtr();
        try {
            wasm.decoder_correct_erasures(retptr, this.ptr, ptr0, len0, ptr1, len1);
            const mem = getUint32Memory();
            const rustptr = mem[retptr / 4];
            const rustlen = mem[retptr / 4 + 1];

            const realRet = getArrayU8FromWasm(rustptr, rustlen).slice();
            wasm.__wbindgen_free(rustptr, rustlen * 1);
            return realRet;


        } finally {
            wasm.__wbindgen_free(ptr0, len0 * 1);
            wasm.__wbindgen_free(ptr1, len1 * 1);

        }

    }
    /**
    * @param {Uint8Array} arg0
    * @returns {boolean}
    */
    is_corrupted(arg0) {
        const ptr0 = passArray8ToWasm(arg0);
        const len0 = WASM_VECTOR_LEN;
        try {
            return (wasm.decoder_is_corrupted(this.ptr, ptr0, len0)) !== 0;

        } finally {
            wasm.__wbindgen_free(ptr0, len0 * 1);

        }

    }
}
module.exports.Decoder = Decoder;

const TextDecoder = require('util').TextDecoder;

let cachedTextDecoder = new TextDecoder('utf-8');

function getStringFromWasm(ptr, len) {
    return cachedTextDecoder.decode(getUint8Memory().subarray(ptr, ptr + len));
}

module.exports.__wbindgen_throw = function(ptr, len) {
    throw new Error(getStringFromWasm(ptr, len));
};

wasm = require('./bindgen_bg');
