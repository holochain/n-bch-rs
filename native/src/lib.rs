#[macro_use]
extern crate neon;
extern crate reed_solomon;

use neon::prelude::*;
use reed_solomon::{
    Encoder,
    Decoder,
};

declare_types! {
    pub class JsEncoder for Encoder {
        init(mut cx) {
            let ecc_len = cx.argument::<JsNumber>(0)?.value() as usize;
            Ok(Encoder::new(ecc_len))
        }

        method encode(mut cx) {
            let in_buf: JsBuffer = *cx.argument::<JsBuffer>(0)?;
            let this = cx.this();
            let res;
            {
                let guard = cx.lock();
                let in_buf = in_buf.borrow(&guard).as_slice::<u8>();
                let enc = this.borrow(&guard);
                res = enc.encode(in_buf);
            }
            let mut output = JsBuffer::new(&mut cx, res.len() as u32)?;
            {
                let guard = cx.lock();
                let output = output.borrow_mut(&guard).as_mut_slice::<u8>();
                output.clone_from_slice(&res);
            }
            Ok(output.upcast())
        }
    }
}

declare_types! {
    pub class JsDecoder for Decoder {
        init(mut cx) {
            let ecc_len = cx.argument::<JsNumber>(0)?.value() as usize;
            Ok(Decoder::new(ecc_len))
        }

        method correct(mut cx) {
            let in_buf: JsBuffer = *cx.argument::<JsBuffer>(0)?;
            let this = cx.this();
            let res;
            {
                let guard = cx.lock();
                let in_buf = in_buf.borrow(&guard).as_slice::<u8>();
                let dec = this.borrow(&guard);
                // panic!s will be unwound and throw js errors
                res = dec.correct(in_buf, None).unwrap();
            }
            let mut output = JsBuffer::new(&mut cx, res.len() as u32)?;
            {
                let guard = cx.lock();
                let output = output.borrow_mut(&guard).as_mut_slice::<u8>();
                output.clone_from_slice(&res);
            }
            Ok(output.upcast())
        }

        method is_corrupted(mut cx) {
            let in_buf: JsBuffer = *cx.argument::<JsBuffer>(0)?;
            let this = cx.this();
            let res;
            {
                let guard = cx.lock();
                let in_buf = in_buf.borrow(&guard).as_slice::<u8>();
                let dec = this.borrow(&guard);
                res = dec.is_corrupted(in_buf);
            }
            Ok(cx.boolean(res).upcast())
        }
    }
}

register_module!(mut cx, {
    cx.export_class::<JsEncoder>("Encoder")?;
    cx.export_class::<JsDecoder>("Decoder")?;
    Ok(())
});
