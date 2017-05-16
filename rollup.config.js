const babel = require('rollup-plugin-babel');
const buble = require('rollup-plugin-buble');
const nodeResolve = require('rollup-plugin-node-resolve');
const uglify = require('rollup-plugin-uglify-es');

module.exports = {
	entry: 'src/UriTemplate.js',
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
			dest: 'dist/UriTemplate.cjs.js',
			format: 'cjs',
		},
		{
			dest: 'dist/UriTemplate.es.js',
			format: 'es',
		},
		{
			dest: 'dist/UriTemplate.iife.js',
			format: 'iife',
			moduleName: 'Uri'
		}
	]
};
