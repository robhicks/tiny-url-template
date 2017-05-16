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
		buble(),
		uglify()
	],
	targets: [
		{
			dest: 'dist/UrlTemplate.cjs.js',
			format: 'cjs',
		},
		{
			dest: 'dist/UrlTemplate.es.js',
			format: 'es',
		},
		{
			dest: 'dist/UrlTemplate.iife.js',
			format: 'iife',
			moduleName: 'Uri'
		}
	]
};
