const buble = require('rollup-plugin-buble');
const uglify = require('rollup-plugin-uglify');

module.exports = {
	entry: 'src/UriTemplate.js',
	external: [],
	globals: {
	},
	plugins: [
		buble()
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
