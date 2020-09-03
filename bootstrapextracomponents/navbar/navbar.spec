{
	"name": "bootstrapextracomponents-navbar",
	"displayName": "Navbar",
	"categoryName": "Navigation",
	"version": 1,
	"definition": "bootstrapextracomponents/navbar/navbar.js",
	"icon": "bootstrapextracomponents/navbar/icon.png",
	"serverscript": "bootstrapextracomponents/navbar/navbar_server.js",
	"libraries": [
		{"name":"navbar.css", "version":"1.0.0", "url":"bootstrapextracomponents/navbar/navbar.css", "mimetype":"text/css"}
	],
	"keywords": ["navigation"],
	"model":
	{
		"styleClass" 							: {"type": "styleclass"},
		"brandText"								: {"type": "tagstring", "default": ""},
		"brandTextTabindex"						: {"type": "string"},
		"brandLogo"								: {"type": "media"},
		"brandLogoStyleClass" 					: {"type": "styleclass"},
		"brandLogoTabindex"						: {"type": "string"},
		"menuItems" 							: {"type": "menuItem[]", "pushToServer": "shallow"},
		"visible"								: {"type": "visible"},
		"inverse"								: {"type": "boolean"},
		"fixed"									: {"type": "string", "default": null, "values": ["top", "bottom"]},
		"markClickedItemActive"					: {"type": "boolean"},
		"size" 									: {"type" :"dimension",  "default" : {"width":600, "height":50}}, 
    	"location" 								: {"type": "point"},
    	"collapsing"							: {"type": "boolean", "default": false},
    	"collapseOnClick"						: {"type": "boolean", "default": true}
	},
	"api": 
	{
		"setMenuItems": {
			"parameters": [
				{ "name": "menuItems", "type": "menuItem[]" }
			]
		},
		"addMenuItem": {
			"parameters": [
				{ "name": "menuItem", "type": "menuItem" },
				{ "name": "index", "type": "int", "optional": true }
			]
		},
		"getMenuItem": {
			"returns": "menuItem",
			"parameters": [
				{ "name": "itemId", "type": "string" }
			]
		},
		"removeMenuItem": {
			"parameters": [
				{ "name": "itemId", "type": "string" }
			]
		},
		"setMenuSelected": {
			"parameters": [
				{ "name": "itemId", "type": "string" }
			]
		},
		"getSelectedMenu": {
		},
		"setMenuItemEnabled": {
			"parameters": [
				{ "name": "itemId", "type": "string" },
				{ "name": "enabled", "type": "boolean" }
			]
		},
		"setSubMenuItemEnabled": {
			"parameters": [
				{ "name": "itemId", "type": "string" },
				{ "name": "submenuItemId", "type": "string" },
				{ "name": "enabled", "type": "boolean" }
			]
		},
		"createMenuItem": {
			"returns": "menuItem",
			"parameters": [
				{ "name": "text", "type": "string" },
				{ "name": "itemId", "type": "string", "optional": true },
				{ "name": "position", "type": "string", "optional": true }
			]
		},
		"requestFocus": {
			"parameters": [
				{ "name": "itemId", "type": "string" }
			]
		},
		"getLocation": 
		{
			"parameters": 
			[
				{ "name": "itemId",	"type": "string" }
			],
			"returns" : "point"
		},
		"getSize": 
		{
			"parameters": 
			[
				{ "name": "itemId",	"type": "string" }
			],
			"returns" : "dimension"
		}
	},
	"handlers": 
	{
		"onMenuItemClicked": {
			"description": "Called whenever a menu item is clicked or a submenu item is selected with the JSEvent and the menuItem object clicked on",
			"parameters": [{
				"name": "event",
				"type": "JSEvent"
			}, {
				"name": "menuItem",
				"type": "menuItem"
			}]
		},
		"onBrandClicked": {
			"description": "Called when the user clicks on the brand logo or text",
			"parameters": [{
				"name": "event",
				"type": "JSEvent"
			}]
		}
	},
	"types":
	{
		"menuItem": {
			"attributes"						: {"type": "map"},
			"itemId"							: {"type": "string"},
			"tabindex"							: {"type": "string"},
			"text"								: {"type": "tagstring"},
			"enabled"							: {"type": "boolean", "default": true},
			"userData"							: {"type": "object"},
			"iconName"							: {"type": "string"},
			"position"							: {"type": "string", "default": "LEFT", "values": ["LEFT", "RIGHT"]},
			"subMenuItems"						: {"type": "subMenuItem[]"},
			"onAction" 							: {"type": "function"},
			"displayType"						: {"type": "string", "default": "MENU_ITEM", "values": ["MENU_ITEM", "TEXT", "BUTTON", "INPUT", "INPUT_GROUP", "IMAGE"]},
			"dataProvider" 						: {"type": "dataprovider", "pushToServer": "allow" },
			"displayValue" 						: {"type": "string", "tags": { "scope": "private" } },
			"inputButtonText"					: {"type": "tagstring"},
			"inputButtonStyleClass"				: {"type": "styleclass"},
			"isActive"							: {"type": "boolean", "default": false},
			"styleClass"	 					: {"type": "styleclass"},
			"tooltip"							: {"type": "tagstring"},
			"valuelist" 						: {"type" : "valuelist", "tags": { "scope" :"design", "logWhenOverMax": false}, "for": "dataProvider", "pushToServer": "allow"},
			"value"								: {"type": "object", "tags": { "scope": "private" }} 
		},
		"subMenuItem": {
			"itemId"							: {"type": "string"},
			"tabindex"							: {"type": "string"},
			"text"								: {"type": "tagstring"},
			"userData"							: {"type": "object"},
			"iconName"							: {"type": "string"},
			"enabled"							: {"type": "boolean", "default": true},
			"onAction" 							: {"type": "function"},
			"isDivider"							: {"type": "boolean"} ,
			"styleClass"	 					: {"type": "styleclass"}
		}
	}
}