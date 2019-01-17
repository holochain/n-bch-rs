#!/bin/bash

echo "building" && \
  cargo build --target wasm32-unknown-unknown --release && \
  wasm-bindgen target/wasm32-unknown-unknown/release/n_bch_rs.wasm --out-dir ../node/lib --out-name bindgen --nodejs --no-typescript
