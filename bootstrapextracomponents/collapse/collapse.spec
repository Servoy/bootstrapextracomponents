{
	"name": "bootstrapextracomponents-collapse",
	"displayName": "Collapse",
	"version": 1,
	"icon": "bootstrapextracomponents/icon/bootstrap-solid.png",
	"definition": "bootstrapextracomponents/collapse/collapse.js",
	"serverscript": "bootstrapextracomponents/collapse/collapse_server.js",
	"libraries": [
		{"name":"collapse.css", "version":"1.0.0", "url":"bootstrapextracomponents/collapse/collapse.css", "mimetype":"text/css"}
	],
	"model":
	{
		"collapsibles"			: { "type": "collapsible[]", "droppable": true, "pushToServer": "shallow" },
		"accordionMode"			: { "type": "boolean", "default": "true" },
		"styleClass"			: { "type": "styleclass" }
	},
	"api": 
	{
		"createCollapsible"		: { 
			"returns" 		: "collapsible", 
			"parameters"	: [ 
				{ "name": "textOrHtml", "type": "string", "optional": true }, 
				{ "name": "collapsableId", "type": "string", "optional": true }
			] 
		},
		"createCard"		: { 
			"returns" 		: "card", 
			"parameters"	: [ 
				{ "name": "textOrHtml", "type": "string", "optional": true }, 
				{ "name": "cardId", "type": "string", "optional": true },
				{ "name": "styleClass", "type": "string", "optional": true }
			] 
		},
		"getCardById"		: {
			"returns"		: "card",
			"parameters"	: [ 
				{ "name": "cardId", "type": "string" }
			] 
		},
		"addCollapsible"		: { 
			"parameters"	: [ 
				{ "name": "collapsible", "type": "collapsible" }, 
				{ "name": "index", "type": "int", "optional": true }
			] 
		},
		"setCollapsibles"		: { 
			"parameters"	: [ 
				{ "name": "collapsibles", "type": "collapsible[]" }
			] 
		},
		"toggle"				: { 
			"parameters"	: [ 
				{ "name": "index", "type": "int", "optional": true } 
			] 
		},
		"show"					: { 
			"parameters"	: [ 
				{ "name": "index", "type": "int", "optional": true } 
			] 
		},
		"hide"					: { 
			"parameters"	: [ 
				{ "name": "index", "type": "int", "optional": true } 
			] 
		}
	},
	"handlers": 
	{
		"onCollapsibleShown"	: 
			{ "parameters": [
					{ "name": "event", "type": "JSEvent" },
					{ "name": "collapsible", "type": "collapsible" },
					{ "name": "collapsibleIndex", "type": "int" }
				] 
			},
		"onCollapsibleHidden"	: 
			{ "parameters": [
					{ "name": "event", "type": "JSEvent" },
					{ "name": "collapsible", "type": "collapsible" },
					{ "name": "collapsibleIndex", "type": "int" }
				] 
			},
		"onCardClicked"			: 
			{ "parameters": [
					{ "name": "event", "type": "JSEvent" },
					{ "name": "card", "type": "card" }, 
					{ "name": "collapsible", "type": "collapsible" }, 
					{ "name": "cardIndex", "type": "int" }, 
					{ "name": "collapsibleIndex", "type": "int" }
				]
			}
	},
	"types": 
	{
		"card" : {
			"cardId"						: "string",
			"contentHtml" 					: "tagstring",
			"styleClass"					: "styleclass"
		},
		"collapsible" : {
			"collapsableId"					: { "type": "string" },
			"headerHtml" 					: { "type": "tagstring", "default": "" },
			"headerStyleClass" 				: { "type": "styleclass", "default": "" },
			"bodyStyleClass"				: { "type": "styleclass" },
			"collapsibleHtml" 				: { "type": "tagstring", "default": "" },
			"form" 							: { "type": "form", "default": "" },
			"isCollapsed"					: { "type": "boolean", "default": "true" },
			"cards"							: { "type": "card[]" },
			"styleClass"					: { "type": "styleclass", "default": "" },
			"collapsedIconName"				: { "type": "string", "default": "fa fa-2x fa-angle-down" },
			"expandedIconName"				: { "type": "string", "default": "fa fa-2x fa-angle-up" }
		}
	}
}