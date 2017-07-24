tiny-url-template
=============

tiny-url-template is yet another Javascript library for expanding URI templates according to [RFC-6570](http://tools.ietf.org/html/rfc6570).
Note it doesn't do everything specified in the RFC and deals with expansion only of URI templates.

# Installation

The distribution assets are prebuild and are located in the `dist` directory.

tiny-url-template depends on [tiny-uri](https://github.com/robhicks/tiny-uri).

```shell
npm install tiny-uri tiny-url-template

# or

yarn add tiny-uri tiny-url-template

# or

bower instal https://github.com/robhicks/tiny-url-template.git

```

# Use

You can use the library in the browser or on NodeJs.

In the browser you can load dist/tiny-url-template.iife.js in
a script tag, or if you have a browser which supports ES-2015, or are using an es6 aware bundler like RollupJs, you can import it into your
entry file using Node's resolution algorithm (rollup-plugin-node-resolve).

In NodeJs, require it as usual.

# Examples

See the tests in spec/tiny-url-template.test.js.

# Development

The library requires a build step: `npm run build`

To run the tests: `npm run jasmine`
