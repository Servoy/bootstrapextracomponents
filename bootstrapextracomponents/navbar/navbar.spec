{
	"name": "bootstrapextracomponents-navbar",
	"displayName": "Navbar",
	"version": 1,
	"definition": "bootstrapextracomponents/navbar/navbar.js",
	"icon": "bootstrapextracomponents/icon/bootstrap-solid.png",
	"serverscript": "bootstrapextracomponents/navbar/navbar_server.js",
	"libraries": [
		{"name":"navbar.css", "version":"1.0.0", "url":"bootstrapextracomponents/navbar/navbar.css", "mimetype":"text/css"},
		{"name":"font-awesome.css", "version":"4.7.0", "url":"bootstrapextracomponents/font-awesome/css/font-awesome.min.css", "mimetype":"text/css", "group":false}
	],
	"model":
	{
		"styleClass" 							: {"type": "styleclass"},
		"brandText"								: {"type": "tagstring", "default": ""},
		"brandLogo"								: {"type": "media"},
		"brandLogoStyleClass" 					: {"type": "styleclass"},
		"menuItems" 							: {"type": "menuItem[]", "pushToServer": "allow"},
		"visible"								: "visible",
		"inverse"								: "boolean",
		"fixed"									: {"type": "string", "default": null, "values": ["top", "bottom"]},
		"markClickedItemActive"					: {"type": "boolean"},
		"size" 									: {"type" :"dimension",  "default" : {"width":600, "height":50}}, 
    	"location" 								: "point"
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
				{ "name": "menuItem", "type": "menuItem" }
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
			"itemId"							: {"type": "string"},
			"text"								: {"type": "tagstring"},
			"enabled"							: {"type": "boolean", "default": true},
			"userData"							: {"type": "object"},
			"iconName"							: {"type": "string"},
			"position"							: {"type": "string", "default": "LEFT", "values": ["LEFT", "RIGHT"]},
			"subMenuItems"						: {"type": "subMenuItem[]"},
			"onAction" 							: {"type": "function"},
			"displayType"						: {"type": "string", "default": "MENU_ITEM", "values": ["MENU_ITEM", "TEXT", "BUTTON", "INPUT", "INPUT_GROUP"]},
			"dataProvider" 						: {"type": "dataprovider", "pushToServer": "allow" },
			"inputButtonText"					: {"type": "tagstring"},
			"inputButtonStyleClass"				: {"type": "styleclass"},
			"isActive"							: {"type": "boolean", "default": false},
			"styleClass"	 					: {"type": "styleclass"},
			"tooltip"							: {"type": "tagstring"},
			"valuelist" 						: {"type" : "valuelist", "tags": { "scope" :"design", "logWhenOverMax": false}, "for": "dataProvider", "default":"autoVL", "pushToServer": "allow"}
		},
		"subMenuItem": {
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