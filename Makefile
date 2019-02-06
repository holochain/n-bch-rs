SHELL		= /bin/bash

.PHONY: all version test build install

all: test

# On Mac: x86_64-apple-darwin
#	rustup target add x86_64-apple-darwin
#	rustup target add x86_64-unknown-linux-gnu
version:
	rustup override set nightly-2019-01-24
	rustup target add wasm32-unknown-unknown

build: version
	cd rust && ( which wasm-bindgen || cargo install --force wasm-bindgen-cli; ./build.sh; )

