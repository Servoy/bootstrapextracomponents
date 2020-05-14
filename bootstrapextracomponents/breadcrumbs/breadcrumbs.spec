{
	"name": "bootstrapextracomponents-breadcrumbs",
	"displayName": "Breadcrumbs",
	"categoryName": "Navigation",
	"version": 1,
	"definition": "bootstrapextracomponents/breadcrumbs/breadcrumbs.js",
	"icon": "bootstrapextracomponents/icon/bootstrap-solid.png",
	"serverscript": "bootstrapextracomponents/breadcrumbs/breadcrumbs_server.js",
	"libraries": [
		{"name":"breadcrumbs.css", "version":"1.0.0", "url":"bootstrapextracomponents/breadcrumbs/breadcrumbs.css", "mimetype":"text/css"}
	],
	"model":
	{
		"breadcrumbs" 					: {"type": "crumb[]", "pushToServer": "allow"},
		"autoRemoveWhenClicked"			: {"type": "boolean", "default": true}, 
		"styleClass"					: {"type": "styleclass"},
		"crumbStyleClass"				: {"type": "styleclass"},
		"lastCrumbStyleClass"			: {"type": "styleclass"},
		"size" 							: {"type" :"dimension",  "default" : {"width":600, "height":40}}, 
    	"location" 						: {"type": "point" },
    	"visible"						: {"type": "visible" }
	},
	"api": 
	{
		"setCrumbs": {
			"parameters": [
				{"name": "crumbs", "type": "crumb[]"}
			]
		},
		"addCrumb": {
			"parameters": [
				{"name": "crumb", "type": "crumb"}
			]
		},
		"removeCrumbsAfter": {
			"parameters": [
				{"name": "index", "type": "int"}
			]
		},
		"removeLastCrumb": {
		}
	},
	"handlers": 
	{
		"onCrumbClicked": {
			"description": "Called whenever a breadcrumb item is clicked with the JSEvent and the item clicked on",
			"parameters": [{
				"name": "event",
				"type": "JSEvent"
			}, {
				"name": "crumb",
				"type": "crumb"
			}, {
				"name": "index",
				"type": "int"
			}]
		}
	},
	"types":
	{
		"crumb" : {
			"crumbId": "string",
			"displayName": "tagstring"
		}
	}
}