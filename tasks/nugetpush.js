var path = require('path');
var fs = require('fs');
var request = require('request');

module.exports = function(grunt) {
	function pushPackage(src, endPoint, apiKey, callback) {
		request({
		    method: 'PUT',
		    url: endPoint,
				headers: {
					'X-NuGet-ApiKey': apiKey,
					'content-type': 'application/octet-stream'
				},
		    formData: {
					package: {
				    value: fs.createReadStream(src),
				    options: {
				      filename: path.basename(src),
				      contentType: 'application/octet-stream'
				    }
			  	}
				}
		}, function (error, response, body) {
			if (response.statusCode >= 400) {
				callback(response.statusMessage);
			} else {
				callback();
			}
		});
	}

	grunt.registerMultiTask('nugetpush', 'Pushes nupkg packages.', function() {
		var done = this.async(), target = grunt.config([this.name, this.target]), apiKey, endPoint;

		if (typeof target.options != "object") {
			grunt.fail.fatal("Required options not specified for nugetpush.");
		}

		endPoint = target.options.endPoint;
		if (typeof endPoint != "string") {
			endPoint = 'https://www.nuget.org/api/v2/package';
		}

		if (process.env.NUGET_API_KEY) {
			apiKey = process.env.NUGET_API_KEY;
		} else if (typeof target.options.apiKey == "string") {
			apiKey = target.options.apiKey;
		}

		if (typeof apiKey != "string" || apiKey === "") {
			grunt.fail.fatal("Required apiKey not specified.");
		}

		this.files.forEach(function(filePair) {
			filePair.src.forEach(function(src) {
				pushPackage(src, endPoint, apiKey, function(error) {
					if (error) {
							grunt.fail.fatal(error);
					} else {
						grunt.log.ok("Pushed nupkg file:", src);
					}

					done();
				});
			});
		});;
	});
};
