extern crate reed_solomon;
extern crate wasm_bindgen;

use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub struct Encoder(reed_solomon::Encoder);

#[wasm_bindgen]
impl Encoder {
    #[wasm_bindgen(constructor)]
    pub fn new(ecc_len: usize) -> Encoder {
        Encoder(reed_solomon::Encoder::new(ecc_len))
    }

    pub fn encode(&self, data: &[u8]) -> Vec<u8> {
        self.0.encode(data).to_vec()
    }
}

#[wasm_bindgen]
pub struct Decoder(reed_solomon::Decoder);

#[wasm_bindgen]
impl Decoder {
    #[wasm_bindgen(constructor)]
    pub fn new(ecc_len: usize) -> Decoder {
        Decoder(reed_solomon::Decoder::new(ecc_len))
    }

    pub fn correct(&self, data: &[u8]) -> Vec<u8> {
        self.0.correct(data, None).unwrap().to_vec()
    }

    pub fn correct_erasures(&self, data: &[u8], erasures: &[u8]) -> Vec<u8> {
        self.0.correct(data, Some(erasures)).unwrap().to_vec()
    }

    pub fn is_corrupted(&self, data: &[u8]) -> bool {
        self.0.is_corrupted(data)
    }
}
