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
