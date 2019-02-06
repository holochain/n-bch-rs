const bindgen = require('./bindgen')

class Encoder {
  constructor (ecc_len) {
    if (typeof ecc_len !== 'number') {
      throw new Error('ecc_len must be a number')
    }
    this._raw = new bindgen.Encoder(ecc_len)
  }

  encode (data) {
    if (!(data instanceof Buffer)) {
      throw new Error('data must be a Buffer')
    }
    return Buffer.from(this._raw.encode(data))
  }
}

exports.Encoder = Encoder

class Decoder {
  constructor (ecc_len) {
    if (typeof ecc_len !== 'number') {
      throw new Error('ecc_len must be a number')
    }
    this._raw = new bindgen.Decoder(ecc_len)
  }

  correct (data, erasures) {
    if (!(data instanceof Buffer)) {
      throw new Error('data must be a Buffer')
    }
    // optionally support erasures Buffer
    if (erasures && !(erasures instanceof Buffer)) {
      throw new Error('erasures must be a Buffer')
    }
    if (erasures && erasures.length) {
	return Buffer.from(this._raw.correct_erasures(data, erasures))
    }
    // erasures undefined, or an empty Buffer
    return Buffer.from(this._raw.correct(data))
  }

  is_corrupted (data) {
    if (!(data instanceof Buffer)) {
      throw new Error('data must be a Buffer')
    }
    return this._raw.is_corrupted(data)
  }
}

exports.Decoder = Decoder
