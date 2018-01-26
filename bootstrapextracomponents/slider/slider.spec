{
	"name": "bootstrapextracomponents-slider",
	"displayName": "Slider",
	"version": 1,
	"icon": "bootstrapextracomponents/icon/bootstrap-solid.png",
	"definition": "bootstrapextracomponents/slider/slider.js",
	"libraries": [
		{ "name": "rzslider-css", "version": "1.0", "url": "bootstrapextracomponents/slider/rzslider/rzslider.css", "mimetype": "text/css" }, 
		{ "name": "slider", "version": "1.0", "url": "bootstrapextracomponents/slider/slider.css", "mimetype": "text/css" }, 
		{ "name": "rzslider", "version": "6.4.3", "url": "bootstrapextracomponents/slider/rzslider/rzslider.js", "mimetype": "text/javascript" }
	],
	"model":
	{
		"dataProvider" 					: { "type": "dataprovider", "pushToServer": "allow", "ondatachange": { "onchange":"onDataChange", "callback":"onDataChangeCallback"} },
		"dataProviderHigh" 				: { "type": "dataprovider", "pushToServer": "allow", "ondatachange": { "onchange":"onDataChangeHigh", "callback":"onDataChangeCallback"} },
		"enabled" 						: { "type": "enabled", "blockingOn": false, "default": true, "for": ["dataProvider", "dataProviderHigh", "onDataChange", "onDataChangeHigh"] },
		"ticksValuesInterval"			: { "type": "int", "default": 0 },
		"ticksInterval"					: { "type": "int", "default": null },
		"styleClass"					: { "type": "styleclass" },
		"updateOnSlideEnd"				: { "type": "boolean", "default": true },
		"numberFormat"					: { "type": "format", "for":["dataProvider"]},
		"formattingFunction"			: { "type": "tagstring" },
		
		"floor"							: { "type": "int", "default": 0 },
		"ceil"							: { "type": "int", "default": null },
		"step"							: { "type": "int", "default": 1 },
		"precision"						: { "type": "int", "default": 0 },
		"minLimit"						: { "type": "int", "default": null },
		"maxLimit"						: { "type": "int", "default": null },
		"minRange"						: { "type": "int", "default": null },
		"maxRange"						: { "type": "int", "default": null },
		"pushRange"						: { "type": "boolean", "default": false },
		"noSwitching"					: { "type": "boolean", "default": false },
		"draggableRange"				: { "type": "boolean", "default": false },
		"draggableRangeOnly"			: { "type": "boolean", "default": false },
		"showSelectionBar"				: { "type": "boolean", "default": false },
		"showSelectionBarEnd"			: { "type": "boolean", "default": false },
		"showOuterSelectionBars"		: { "type": "boolean", "default": false },
		"showTicks"						: { "type": "boolean", "default": false },
		"hidePointerLabels"				: { "type": "boolean", "default": false },
		"ticksArray"					: { "type": "int[]" },
		"templateUrl"					: { "type": "media" },
		"visible" 						: { "type": "boolean", "default": true}
	},
	"handlers": {
		"onDataChange" : {
			"returns": "boolean", 
	        "parameters": [
					{ "name": "oldValue", "type": "${dataproviderType}" }, 
					{ "name": "newValue", "type": "${dataproviderType}" }, 
					{ "name": "event", "type": "JSEvent"} 
				]
	        },
	    "onDataChangeHigh" : {
			"returns": "boolean", 
	        "parameters": [
					{ "name": "oldValue", "type": "${dataproviderType}" }, 
					{ "name": "newValue", "type": "${dataproviderType}" }, 
					{ "name": "event", "type": "JSEvent"} 
				]
	        },
	    "onSlideStart" : {
			"parameters":[
					{ "name": "event", "type": "JSEvent"} 
				]
	        },
	    "onSlideEnd" : {
			"parameters":[
					{ "name": "event", "type": "JSEvent"} 
				]
	        }
	},
	"types": {
		"gradient" : {
			"from" 					: { "type": "string" },
			"to" 					: { "type": "string" }
		}
	}
}