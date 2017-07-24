const babel = require('rollup-plugin-babel');
const buble = require('rollup-plugin-buble');
const nodeResolve = require('rollup-plugin-node-resolve');
const uglify = require('rollup-plugin-uglify-es');

module.exports = {
	entry: 'src/TinyUrlTemplate.js',
	external: [
		{TinyUri: 'TinyUri'}
	],
	globals: {
	},
	plugins: [
		nodeResolve(),
		// babel()
		buble()
	],
	targets: [
		{
			dest: 'dist/tiny-url-template.cjs.js',
			format: 'cjs',
		},
		{
			dest: 'dist/tiny-url-template.es.js',
			format: 'es',
		},
		{
			dest: 'dist/tiny-url-template.iife.js',
			format: 'iife',
			moduleName: 'TinyUrlTemplate'
		}
	]
};
