const babel = require('rollup-plugin-babel');
const buble = require('rollup-plugin-buble');
const nodeResolve = require('rollup-plugin-node-resolve');
const uglify = require('rollup-plugin-uglify-es');

module.exports = {
	entry: 'src/UrlTemplate.js',
	external: [
		{Uri: 'Uri'}
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
			dest: 'dist/url-template-.cjs.js',
			format: 'cjs',
		},
		{
			dest: 'dist/url-template-.es.js',
			format: 'es',
		},
		{
			dest: 'dist/url-template-.iife.js',
			format: 'iife',
			moduleName: 'UrlTemplate'
		}
	]
};
