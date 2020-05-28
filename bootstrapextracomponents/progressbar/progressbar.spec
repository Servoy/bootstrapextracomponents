{
	"name": "bootstrapextracomponents-progressbar",
	"displayName": "Progress Bar",
	"categoryName": "Visualization",
	"version": 1,
	"icon": "bootstrapextracomponents/progressbar/progress_bar.png",
	"definition": "bootstrapextracomponents/progressbar/progressbar.js",
	"serverscript": "bootstrapextracomponents/progressbar/progressbar_server.js",
	"libraries": [
		{"name":"bts-extra-progressbar.css", "version":"1.0.0", "url":"bootstrapextracomponents/progressbar/bts-extra-progressbar.css", "mimetype":"text/css"}
	],
	"keywords": ["loading"],
	"model":
	{
		"styleClass" 				: { "type": "styleclass", "values": ["progress-striped", "progress-striped active"]},
		"value"						: "float",
		"type"						: { "type": "string", "default": "info", "values":["info", "success", "warning", "danger"]},
		"animate"					: { "type": "boolean", "default": true},
		"showValue" 				: { "type": "boolean", "default": true},
		"showValueAsPercentage"		: { "type": "boolean", "default": true},
		"valueText"					: { "type": "string" },
		"max" 						: { "type": "int", "default": 100},
		"tabSeq" 					: { "type": "tabseq", "tags": { "scope" :"design" }},
    	"visible" 					: "visible",
    	"size"						: { "type": "dimension", "default": { "width": 300, "height": 25 } }
	},
	"api": 
	{
		"setProgress": {
			"parameters": [
				{ "name": "value", "type": "float" },
				{ "name": "valueText", "type": "string", "optional": true }
			]
		},
		"updateProgressBar": {
			"parameters": [
				{ "name": "value", "type": "float" },
				{ "name": "valueText", "type": "string", "optional": true }
			]
		}
	}
	
}