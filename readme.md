grunt-nuget-push
==================

This is a grunt task for pushing nuget packages without using the nuget.exe. This makes it easier to build nuget packages on non windows environment or continuous integration services like Travis CI or Jenkins. It's created to produce packages for JavaScript projects not .NET libraries so it doesn't have all features that nuget might have.

### Parameters

#### apiKey

Type: `string`

The nuget API key this is something you get from the "account" page. You can also define this api key using an environment variable called NUGET_API_KEY.

#### endPoint

Type: `string`

Optional endpoint defaults to https://www.nuget.org/api/v2/package but can be set to https://staging.nuget.org/api/v2/package if you are testing.

### Example of usage

#### Simple example

Simple example showing the essential options this will add the files specified to the "content" directory if the nupkg.

```
grunt.initConfig({
	nugetpush: {
		simple: {
			options: {
				apiKey: "...",
				endPoint: "https://staging.nuget.org/api/v2/package"
			},

			src: [
				"*.nupkg"
			]
		}
	}
});
```
