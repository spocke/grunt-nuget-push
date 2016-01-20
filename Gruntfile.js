module.exports = function(grunt) {
	grunt.initConfig({
		nugetpack: {
			simple: {
				options: {
					id: "NuGetPack.Simple",
					version: "1.0.6",
					authors: "Some author",
					description: "Description of my simple package."
				},

				src: [
					"tasks/*.js",
					"readme.md"
				]
			},
		},

		nugetpush: {
			simple: {
				options: {
					endPoint: 'https://staging.nuget.org/api/v2/package'
					//apiKey: '...'
				},

				src: [
					"*.nupkg"
				]
			},
		},

		clean: {
			packages: [
				"*.nupkg"
			]
		}
	});

	require('load-grunt-tasks')(grunt);
	grunt.loadTasks('tasks');

	grunt.registerTask('default', ['clean', 'nugetpack', 'nugetpush']);
};
