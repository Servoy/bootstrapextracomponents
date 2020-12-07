{
	"name": "bootstrapextracomponents-rating",
	"displayName": "Rating",
	"categoryName": "Input Control",
	"version": 1,
	"definition": "bootstrapextracomponents/rating/rating.js",
	"icon": "bootstrapextracomponents/rating/icon.png",
	"libraries": [
		{"name":"rating.css", "version":"1.0.0", "url":"bootstrapextracomponents/rating/bts-extra-rating.css", "mimetype":"text/css"}
	],
	"keywords": ["valuation", "score", "assessment"],
	"model":
	{
		"dataProviderID" 		: { "type": "dataprovider", "pushToServer": "allow","tags": { "scope" :"design" }, "ondatachange": { "onchange":"onDataChangeMethodID"}},
	    "enabled" 				: { "type": "enabled", "blockingOn": false, "default": true, "for": ["dataProviderID","onActionMethodID","onDataChangeMethodID"] },
		"max"					: { "type": "int", "default": 5 },
		"stateOn"				: { "type": "string" },
		"stateOff"				: { "type": "string" },
		"visible" 				: { "type": "boolean", "default": true}, 
		"location" 				: { "type": "point", "pushToServer": "deep"}, 
		"showPercentageOnHover"	: { "type": "boolean" }, 
	    "size" 					: { "type": "dimension", "default" : {"width":200, "height":32}, "pushToServer": "deep"}
	},
	"handlers": 
	{
		"onLeave": {
			"parameters": [
				{ "name": "event", "type": "JSEvent" },
				{ "name": "value", "type": "int" }
			]
		},
		"onHover": {
			"parameters": [
				{ "name": "event", "type": "JSEvent" },
				{ "name": "value", "type": "int" }
			]
		}
	}
}