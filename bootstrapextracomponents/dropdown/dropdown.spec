{
	"name": "bootstrapextracomponents-dropdown",
	"displayName": "Drop Down",
	"version": 1,
	"icon": "bootstrapextracomponents/icon/bootstrap-solid.png",
	"definition": "bootstrapextracomponents/dropdown/dropdown.js",
	"serverscript": "bootstrapextracomponents/dropdown/dropdown_server.js",
	"libraries": [
		{"name":"bts-extra-dropdown.css", "version":"1.0.0", "url":"bootstrapextracomponents/dropdown/bts-extra-dropdown.css", "mimetype":"text/css"}
	],
	"model":
	{
		"isButton" 						: { "type": "boolean", "default": true },
		"isSplitButton" 				: { "type": "boolean", "default": false },
		"menuItems"						: { "type": "MenuItem[]" },
		"text"							: { "type": "tagstring" },
		"styleClass"					: { "type": "styleclass" },
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