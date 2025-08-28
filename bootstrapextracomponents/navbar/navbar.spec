{
	"name": "bootstrapextracomponents-navbar",
	"displayName": "Navbar",
	"categoryName": "Navigation",
	"version": 1,
	"definition": "bootstrapextracomponents/navbar/navbar.js",
	"doc": "bootstrapextracomponents/navbar/navbar_doc.js",
	"icon": "bootstrapextracomponents/navbar/icon.png",
	"serverscript": "bootstrapextracomponents/navbar/navbar_server.js",
	"libraries": [
		{"name":"navbar.css", "version":"1.0.0", "url":"bootstrapextracomponents/navbar/navbar.css", "mimetype":"text/css"}
	],
	"keywords": ["navigation"],
	"model":
	{
		"styleClass" 							: {"type": "styleclass","tags": { "doc" :"The CSS class(es) to be added to navbar element."}},
		"brandText"								: {"type": "tagstring", "default": "","tags": { "doc" :"An optional branding text shown in the upper left corner (after the optional brandLogo)."}},
		"brandTextTabindex"						: {"type": "string","tags": { "doc" :"Tab order for the brandText in the tab navigation sequence."}},
		"brandLogo"								: {"type": "media","tags": { "doc" :"An optional media shown as branding logo in the upper left corner."}},
		"brandLogoStyleClass" 					: {"type": "styleclass","tags": { "doc" :"An optional media shown as branding logo in the upper left corner."}},
		"brandLogoTabindex"						: {"type": "string","tags": { "doc" :"Tab order for the brandLogo in the tab navigation sequence."}},
		"menuItems" 							: {"type": "menuItem[]", "pushToServer": "deep","tags": { "doc" :"The array holding all menu items currently shown. Menu items can be specified either by menuItems or servoyMenu property."}},
		"servoyMenu"                            : {"type" :"JSMenu", "pushToServer": "shallow", "tags": { "doc" :"Menu property that defines the menu items to be shown (and all its properties). Can be used instead of menuItems property."}, "extraPropertiesCategory" : "Navbar","extraProperties": { "attributes": "map","tabindex": "string", "userData": "object", "position": {"type": "string", "default": "LEFT", "values": ["LEFT", "RIGHT"]}, "displayType": {"type": "string", "default": "MENU_ITEM", "values": ["MENU_ITEM", "TEXT", "BUTTON", "INPUT", "INPUT_GROUP", "IMAGE", "HTML_TEXT"]},"inputButtonText" : "tagstring", "inputButtonStyleClass": "styleclass","isActive" : "boolean","isDivider":"boolean","dataProviderValue" : "string", "valuelist" : {"type" : "valuelist", "tags": {  "logWhenOverMax": false}, "for": "dataProviderValue"}}},
		"visible"								: {"type": "visible","tags": { "doc" : "Controls whether the component is visible or hidden."}},
		"inverse"								: {"type": "boolean","tags": { "doc" : "Inverts the color scheme of the navbar for dark backgrounds."}},
		"fixed"									: {"type": "string", "default": null, "values": ["top", "bottom"], "tags": { "doc" : "Controls whether the toolbar is fixed to either top or bottom of the screen."}},
		"markClickedItemActive"					: {"type": "boolean","tags": { "doc" : "When 'true', items of displayType MENU_ITEM will be shown as 'active' when clicked."}},
		"size" 									: {"type" :"dimension",  "default" : {"width":600, "height":50}}, 
    	"location" 								: {"type": "point"},
    	"collapsing"							: {"type": "boolean", "default": false,"tags": { "doc" : "Indicates if the navbar should have a collapsing behavior."}},
    	"collapseOnClick"						: {"type": "boolean", "default": true,"tags": { "doc" : "Controls whether the navbar collapses when a menu item is clicked (typically for mobile views)."}}
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
			"returns": "menuItem"
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
		"openSubMenu": {
            "parameters": [
                { "name": "itemId", "type": "string" }
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
			"doc": "Called whenever a menu item is clicked or a submenu item is selected with the JSEvent and the menuItem object clicked on",
			"parameters": [{
				"name": "event",
				"type": "JSEvent"
			}, {
				"name": "menuItem",
				"type": "menuItem"
			}]
		},
		"onBrandClicked": {
			"doc": "Called when the user clicks on the brand logo or text",
			"parameters": [{
				"name": "event",
				"type": "JSEvent"
			}]
		}
	},
	"types":
	{
		"menuItem": {
			"attributes"						: {"type": "map","tags": { "doc" :"Additional custom HTML attributes for the menu item."}},
			"itemId"							: {"type": "string","tags": { "doc" :"Identifier of a menu item. This property is required to allow the component to figure out what item a user selected."}},
			"tabindex"							: {"type": "string","tags": { "doc" :"Tab order for the menu item in the tab navigation sequence."}},
			"text"								: {"type": "tagstring","tags": { "doc" :"The text shown. Is used as placeholder text on INPUT or INPUT_GROUP items."}},
			"enabled"							: {"type": "boolean", "default": true,"tags": { "doc" :"Determines whether the menu item is interactive or disabled."}},
			"userData"							: {"type": "object", "tags": { "doc" :"Custom data associated with the menu item for reference."}},
			"iconName"							: {"type": "string", "tags": { "doc" :"An optional icon added to the menu item. Any glyphicon or font awesome icon can be used (e.g. 'fa fa-car'). When used with INPUT or INPUT_GROUP used as the button's icon."}},
			"position"							: {"type": "string", "default": "LEFT", "values": ["LEFT", "RIGHT"], "tags": { "doc" :"Controls whether an item is shown on the left or on the right of the navbar."}},
			"subMenuItems"						: {"type": "subMenuItem[]", "tags": { "doc" :"An optional array of sub menus for a MENU_ITEM type. When set, the item will be shown as a dropdown."}},
			"onAction" 							: {"type": "function", "tags": { "doc" :"Function that will be called if the item is clicked on (MENU_ITEM, BUTTON), a submenu is selected (MENU_ITEM with subMenuItems) or the user hits enter, leaves the field or clicks the optional button (INPUT, INPUT_GROUP). If not set, the component will call the onMenuItemClicked method assigned to the component itself."}},
			"displayType"						: {"type": "string", "default": "MENU_ITEM", "values": ["MENU_ITEM", "TEXT", "BUTTON", "INPUT", "INPUT_GROUP", "IMAGE", "HTML_TEXT"], "tags": { "doc" :"Controls the appearance of the menu item. One of 'MENU_ITEM', 'TEXT', 'BUTTON', 'INPUT' or 'INPUT_GROUP'."}},
			"dataProvider" 						: {"type": "dataprovider", "pushToServer": "allow", "tags": { "wizard": true, "doc" :"Dataprovider for a text field (only used for display types 'INPUT' and 'INPUT_GROUP')" } },
			"displayValue" 						: {"type": "string", "tags": { "scope": "private" } },
			"inputButtonText"					: {"type": "tagstring","tags": { "doc" :"Text of the optional button shown with INPUT or INPUT_GROUP."}},
			"inputButtonStyleClass"				: {"type": "styleclass","tags": { "doc" :"Style class to control the optional button shown with INPUT or INPUT_GROUP. Typically one of bootstraps button classes ('btn-default', 'btn-primary', 'btn-success', 'btn-info', 'btn-warning', 'btn-danger', 'btn-link')."}},
			"isActive"							: {"type": "boolean", "default": false,"tags": { "doc" :"When 'true', a MENU_ITEM item will be shown as 'active'."}},
			"styleClass"	 					: {"type": "styleclass","tags": { "doc" :"Additional style class(es) of the menu item."}},
			"tooltip"							: {"type": "tagstring","tags": { "doc" :"Tooltip text shown when hovering over the menu item."}},
			"valuelist" 						: {"type" : "valuelist", "tags": {  "logWhenOverMax": false, "doc" :"When set, an INPUT or INPUT_GROUP item will show a typeahead list."}, "for": "dataProvider", "pushToServer": "allow"},
			"value"								: {"type": "object", "tags": { "scope": "private" }} 
		},
		"subMenuItem": {
			"itemId"							: {"type": "string","tags": { "doc" :"Identifier of a submenu item. This property is required to allow the component to figure out what item a user selected."}},
			"tabindex"							: {"type": "string","tags": { "doc" :"Tab order for the submenu item in the tab navigation sequence."}},
			"text"								: {"type": "tagstring","tags": { "doc" :"The text shown. Is used as placeholder text on INPUT or INPUT_GROUP items."}},
			"userData"							: {"type": "object","tags": { "doc" :"Custom data associated with the submenu item for reference."}},
			"iconName"							: {"type": "string","tags": { "doc" :"An optional icon added to the submenu item. Any glyphicon or font awesome icon can be used (e.g. 'fa fa-car'). When used with INPUT or INPUT_GROUP used as the button's icon."}},
			"enabled"							: {"type": "boolean", "default": true,"tags": { "doc" :"Determines whether the submenu item is interactive or disabled."}},
			"onAction" 							: {"type": "function","tags": { "doc" :"Function that will be called if the item is clicked."}},
			"isDivider"							: {"type": "boolean","tags": { "doc" :"When this property is set to `true`, then the submenu item will be displayed as a visually divider line."}} ,
			"styleClass"	 					: {"type": "styleclass","tags": { "doc" :"Additional style class(es) of the menu item."}}
		}
	}
}