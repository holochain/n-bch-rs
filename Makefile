SHELL		= /bin/bash

.PHONY: all version test build install clean

all: test

test: build

# On Mac: x86_64-apple-darwin
#	rustup target add x86_64-apple-darwin
#	rustup target add x86_64-unknown-linux-gnu
tools:
	rustup override set nightly-2019-01-24
	rustup target add wasm32-unknown-unknown
	which wasm-bindgen || cargo install --force wasm-bindgen-cli --version "=0.2.33"

build: tools
	cd rust && cargo build --target wasm32-unknown-unknown --release
	cd rust && wasm-bindgen target/wasm32-unknown-unknown/release/n_bch_rs.wasm --out-dir ../lib --out-name bindgen --nodejs --no-typescript

clean:
	rm -rf rust/target lib/bindgen_bg.wasm
