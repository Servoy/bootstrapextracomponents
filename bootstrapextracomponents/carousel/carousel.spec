{
	"name": "bootstrapextracomponents-carousel",
	"displayName": "Carousel",
	"version": 1,
	"definition": "bootstrapextracomponents/carousel/carousel.js",
	"libraries": [
		{"name":"carousel.css", "version":"1.0.0", "url":"bootstrapextracomponents/carousel/bts-extra-carousel.css", "mimetype":"text/css"}
	],
	"model":
	{
		"cycleInterval" 					: { "type": "int", "default": 5000 },
		"noPause"							: { "type": "boolean", "default": false },
		"noTransition"						: { "type": "boolean", "default": false },
		"slides"							: { "type": "slide[]" },
		"slidesFoundset"					: { "type": "foundset", "dataproviders": ["image", "caption"] },
		"lazyLoading" 						: { "type": "boolean", "default": true },
		"imageOptions" 						: { "type": "string", "default": "Reduce", "values" : ["Reduce", "Reduce/Enlarge", "Scale to fit", "Crop"] },
		"visible"							: { "type": "visible" },
		"size" 								: { "type" :"dimension",  "default" : {"width": 400, "height": 300}}, 
		"location" 							: { "type": "point" },
		"styleClass" 						: { "type": "styleclass"},
		"imageCssInternal"					: { "type": "object", "tags" : { "scope": "private" } },
		"imageCss"							: { "type": "cssProperty[]" }
	},
	"types": 
	{
		"slide": {
			"imageUrl"						: { "type": "string" },
			"caption"						: { "type": "tagstring" }
		},
		"cssProperty": {
			"propertyName"					: { "type": "string" },
			"propertyValue"				: { "type": "string" }
		}
	}
}