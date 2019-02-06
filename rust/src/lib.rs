extern crate reed_solomon;
extern crate wasm_bindgen;

use wasm_bindgen::prelude::*;

pub type JsResult<T> = Result<T, JsValue>;

#[wasm_bindgen]
pub struct Encoder(reed_solomon::Encoder);

#[wasm_bindgen]
impl Encoder {
    #[wasm_bindgen(constructor)]
    pub fn new(ecc_len: usize) -> JsResult<Encoder> {
        Ok(Encoder(reed_solomon::Encoder::new(ecc_len)))
    }

    pub fn encode(&self, data: &[u8]) -> JsResult<Vec<u8>> {
        Ok(self.0.encode(data).to_vec())
    }
}

#[wasm_bindgen]
pub struct Decoder(reed_solomon::Decoder);

#[wasm_bindgen]
impl Decoder {
    #[wasm_bindgen(constructor)]
    pub fn new(ecc_len: usize) -> JsResult<Decoder> {
        Ok(Decoder(reed_solomon::Decoder::new(ecc_len)))
    }

    pub fn correct(&self, data: &[u8]) -> JsResult<Vec<u8>> {
        self.correct_erasures(data, &[])
    }

    pub fn correct_erasures(&self, data: &[u8], erasures: &[u8]) -> JsResult<Vec<u8>> {
        let erasures = if erasures.len() == 0 {
            None
        } else {
            Some(erasures)
        };
        match self.0.correct(data, erasures) {
            Ok(v) => Ok(v.to_vec()),
            Err(e) => Err(JsValue::from_str(&format!("{:?}", e))),
        }
    }

    pub fn is_corrupted(&self, data: &[u8]) -> JsResult<bool> {
        Ok(self.0.is_corrupted(data))
    }
}
