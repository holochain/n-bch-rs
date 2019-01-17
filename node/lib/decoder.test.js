const { Decoder } = require('..')

const { expect } = require('chai')

describe('Decoder Suite', () => {
  it('should say is corrupted', () => {
    const dec = new Decoder(5)
    expect(dec.is_corrupted(Buffer.from('ae38009658010e46', 'hex')))
      .equals(true)
  })

  it('should say is not corrupted', () => {
    const dec = new Decoder(5)
    expect(dec.is_corrupted(Buffer.from('ae38119658010e46', 'hex')))
      .equals(false)
  })

  it('should correct', () => {
    const dec = new Decoder(5)
    expect(dec.correct(Buffer.from('ae38009658010e46', 'hex')).toString('hex'))
      .equals('ae38119658010e46')
  })

  it('should throw too many errors', () => {
    const dec = new Decoder(5)
    expect(() => {
      dec.correct(Buffer.from('0000009658010e46', 'hex'))
    }).throws()
  })

  it('should throw on bad decoder param', () => {
    expect(() => {
      new Decoder('bad')
    }).throws()
  })

  it('should throw on no decoder ecc_len', () => {
    expect(() => {
      new Decoder()
    }).throws()
  })

  it('should throw on bad correct() buffer', () => {
    const dec = new Decoder(5)
    expect(() => {
      dec.correct('bad')
    }).throws()
  })
})
