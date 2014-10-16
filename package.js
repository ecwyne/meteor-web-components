Package.describe({
	name: 'ecwyne:web-components',
	summary: 'Use web-components in your Meteor App!',
	version: '0.0.0',
	git: 'http://github.com/ecwyne/meteor-web-components.git'
});

Package.onUse(function(api) {
	api.versionsFrom('0.9.4');
	api.use('underscore');
});

Package.registerBuildPlugin({
	name: 'web-components',
	use: ['meteor', 'underscore'],
	sources: 
	[
		'plugin/bower.js',
		'plugin/handler.js'
	],
	npmDependencies: {
		bower: '1.3.12'
	}
})