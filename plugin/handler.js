var path = Npm.require('path');


function handleComponents(compileStep, options){
	//make sure there aren't any errors in options object
	checkForErrors(options);

	var installDir = path.join(path.relative(process.cwd(), path.dirname(compileStep._fullInputPath)), '.meteor/local/components');

	var componentList = _.map(options.components, function (e){return _.last(e.bower.split('='))});

	var localCache = Bower.list(null, {offline: true, directory: installDir});
	localCache = _.values(localCache.pkgMeta.dependencies);

	var installList = _.difference(componentList, localCache);


	if(installList.length)
		var installedPackages = Bower.install(installList, {save: true}, {directory: installDir});

	_.each(installedPackages, function (val, name){
		console.log('[web-component] installed ' + name + ' at #' + val.pkgMeta.version);
	})
}

function checkForErrors(options){
	if (!(options.components instanceof Array)){
		compileStep.error({
			message: 'components property must be an Array in ' + compileStep.inputPath
		});
	}
}

Plugin.registerSourceHandler('json', function (compileStep){
	if (!/components/.test(compileStep.inputPath)) return;
	var content = compileStep.read().toString('utf8');
	try {
		var options = JSON.parse(content);
	} catch (e){
		compileStep.error({
			message: 'Syntax error in ' + compileStep.inputPath,
			line: e.line,
			column: e.column
		});
	}
	handleComponents(compileStep, options);
});