{
	"name": "bootstrapextracomponents-carousel",
	"displayName": "Carousel",
	"version": 1,
	"icon": "bootstrapextracomponents/icon/bootstrap-solid.png",
	"definition": "bootstrapextracomponents/carousel/carousel.js",
	"serverscript": "bootstrapextracomponents/carousel/carousel_server.js",
	"libraries": [
		{"name":"carousel.css", "version":"1.0.0", "url":"bootstrapextracomponents/carousel/bts-extra-carousel.css", "mimetype":"text/css"}
	],
	"model":
	{
		"cycleInterval" 					: { "type": "int", "default": 5000 },
		"noPause"							: { "type": "boolean", "default": false },
		"noTransition"						: { "type": "boolean", "default": false },
		"slides"							: { "type": "slide[]", "pushToServer": "deep" },
		"slidesFoundset"					: { "type": "foundset", "dataproviders": ["image", "caption"] },
		"lazyLoading" 						: { "type": "boolean", "default": true },
		"imageOptions" 						: { "type": "string", "default": "Reduce", "values" : ["Reduce", "Reduce/Enlarge", "Scale to fit", "Crop"] },
		"visible"							: { "type": "visible" },
		"size" 								: { "type" :"dimension",  "default" : {"width": 400, "height": 300}}, 
		"location" 							: { "type": "point" },
		"styleClass" 						: { "type": "styleclass"},
		"imageCssInternal"					: { "type": "object", "tags" : { "scope": "private" } },
		"imageCss"							: { "type": "cssProperty[]" },
		"responsiveHeight": 				  { "type": "int", "default": 300 }
	},
	"api": 
	{
		"addSlide": {
			"parameters": [
				{ "type": "slide", "name": "slideToAdd" }
			]
		},
		"removeSlide": {
			"parameters": [
				{ "type": "int", "name": "index" }
			]
		},
		"setSlides": {
			"parameters": [
				{ "type": "slide[]", "name": "slides" }
			]
		},
		"getSelectedIndex": {
			"returns": "int"
		},
		"setSelectedIndex": {
			"parameters": [
				{ "type": "int", "name": "index" }
			]
		}
	},
	"handlers": 
	{
		"onSlideClicked": {
			"parameters": [
				{ "name": "event", "type": "JSEvent" },
				{ "name": "slide", "type": "slide" }
			]
		}
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