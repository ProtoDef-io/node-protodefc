extern crate wasm_bindgen;
extern crate protodefc;

use wasm_bindgen::prelude::*;
use protodefc::*;

#[wasm_bindgen]
pub fn compile(file: &str) -> String {
    let c = spec_to_final_compilation_unit(&file).unwrap();
    return backend::javascript::compile(&c).unwrap();
}
