{
	"name": "bootstrapextracomponents-dropdown",
	"displayName": "Drop Down",
	"categoryName": "Buttons & Text",
	"version": 1,
	"icon": "bootstrapextracomponents/dropdown/icon.png",
	"definition": "bootstrapextracomponents/dropdown/dropdown.js",
	"doc": "bootstrapextracomponents/dropdown/dropdown_doc.js",
	"serverscript": "bootstrapextracomponents/dropdown/dropdown_server.js",
	"libraries": [
		{"name":"bts-extra-dropdown.css", "version":"1.0.0", "url":"bootstrapextracomponents/dropdown/bts-extra-dropdown.css", "mimetype":"text/css"}
	],
	"keywords": [],
	"model":
	{
		"isButton" 						: { "type": "boolean", "default": true },
		"isSplitButton" 				: { "type": "boolean", "default": false },
		"menuItems"						: { "type": "MenuItem[]", "tags": { "basic": true } },
		"text"							: { "type": "tagstring", "tags": { "basic": true } },
		"styleClass"					: { "type": "styleclass" },
		"buttonStyleClass"				: { "type": "styleclass" },
		"imageStyleClass"				: { "type": "styleclass" },
		"enabled"						: { "type": "enabled", "blockingOn": false, "default": true, "for": ["onAction"] },
		"size"							: { "type": "dimension", "default": { "width": 300, "height": 40 } },
		"visible"						: { "type": "visible" },
		"toolTipText"					: { "type": "tagstring" }
	},
	"api": {
		"setMenuItems": {
			"parameters": [
				{ "name": "menuItems", "type": "MenuItem[]" }
			]
		},
		"addMenuItem": {
			"parameters": [
				{ "name": "menuItem", "type": "MenuItem" }
			]
		},
		"removeMenuItem": {
			"parameters": [
				{ "name": "itemId", "type": "string" }
			]
		}
	}, 
	"handlers": 
	{
		"onAction": {
			"parameters": [
				{"name": "event", "type": "JSEvent"}
			]
		},
		"onMenuItemSelected": {
			"parameters": [
				{"name": "event", "type": "JSEvent"},
				{"name": "menuItem", "type": "MenuItem"}
			]
		}
	},
	"types": {
		"MenuItem": {
			"itemId"							: {"type": "string"},
			"text"								: {"type": "tagstring"},
			"userData"							: {"type": "object"},
			"iconName"							: {"type": "string"},
			"enabled"							: {"type": "enabled", "default": true},
			"onAction" 							: {"type": "function"},
			"isDivider"							: {"type": "boolean"} 
		}
	}
}