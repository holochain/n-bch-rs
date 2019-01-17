# n-bch-rs

nodejs bindings for rust bch reed-solomon library https://crates.io/crates/reed-solomon

### Usage

```javascript
const { Encoder, Decoder } = require('@holochain/n-bch-rs')

const enc = new Encoder(5)
const dec = new Decoder(5)

const res = enc.encode(Buffer.from([1, 2, 3]))

// corrupt
res.writeUInt8(0, 0)

dec.is_corrupted(res) // true

const fixed = dec.correct(res) // 1, 2, 3, ...parity bytes
```

### Development

Uses rust's https://crates.io/crates/wasm-bindgen to generate webassembly. Currently only targeting nodejs.

To build:

```shell
# make sure you are using nightly rust
rustup default nightly

# install the wasm-bindgen commandline tool
cargo install wasm-bindgen-cli

# enter the rust directory
cd rust

# run the build script
./build.sh
```
