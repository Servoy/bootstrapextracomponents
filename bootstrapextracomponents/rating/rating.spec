{
	"name": "bootstrapextracomponents-rating",
	"displayName": "Rating",
	"version": 1,
	"definition": "bootstrapextracomponents/rating/rating.js",
	"libraries": [
		{"name":"rating.css", "version":"1.0.0", "url":"bootstrapextracomponents/rating/bts-extra-rating.css", "mimetype":"text/css"}
	],
	"model":
	{
		"dataProviderID" 		: { "type":"dataprovider", "pushToServer": "allow","tags": { "scope" :"design" }, "ondatachange": { "onchange":"onDataChangeMethodID", "callback":"onDataChangeCallback"}},
	    "enabled" 				: { "type": "enabled", "blockingOn": false, "default": true, "for": ["dataProviderID","onActionMethodID","onDataChangeMethodID"] },
		"max"					: { "type": "int", "default": 5 },
		"readonly"				: { "type": "readonly", "default": false },
		"stateOn"				: { "type": "string" },
		"stateOff"				: { "type": "string" },
		"visible" 				: { "type": "boolean", "default": true}, 
		"location" 				: { "type" :"point", "pushToServer": "deep"}, 
	    "size" 					: { "type" :"dimension", "default" : {"width":200, "height":32}, "pushToServer": "deep"}
	}
}