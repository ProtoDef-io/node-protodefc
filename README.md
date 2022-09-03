# node-protodefc [![NPM version](https://img.shields.io/npm/v/protodefc.svg)](http://npmjs.com/package/protodefc)

Describe your protocol, and read it with ease

A [ProtoDef](https://github.com/ProtoDef-io/ProtoDef) implementation wrapping [protodefc](https://github.com/hansihe/protodefc) and providing a ProtoDef-compatible API, but using ProtoDefc as the protocol descriptor.

# Installation

For release applications, install as NPM module:

```sh
$ npm i --save protodefc
```

Otherwise (e.g.: for development):

```sh
$ git clone https://github.com/ProtoDef-io/node-protodefc.git
$ cd node-protodefc
$ rustup update nightly
$ rustup default nightly
$ rustup target add wasm32-unknown-unknown
$ cargo install wasm-bindgen-cli
$ npm i
```
