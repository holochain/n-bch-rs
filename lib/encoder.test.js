const { Encoder } = require('..')

const { expect } = require('chai')

describe('Encoder Suite', () => {
  it('should encode', () => {
    const enc = new Encoder(5)
    expect(enc.encode(Buffer.from('ae3811', 'hex')).toString('hex'))
      .equals('ae38119658010e46')
  })

  it('should throw on bad encoder param', () => {
    expect(() => {
      new Encoder('bad')
    }).throws()
  })

  it('should throw on no encoder ecc_len', () => {
    expect(() => {
      new Encoder()
    }).throws()
  })

  it('should throw on bad encode() buffer', () => {
    const enc = new Encoder(5)
    expect(() => {
      enc.encode('bad')
    }).throws()
  })
})
