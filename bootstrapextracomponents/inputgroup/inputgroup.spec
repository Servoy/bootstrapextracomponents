{
	"name": "bootstrapextracomponents-input-group",
	"displayName": "Input Group",
	"categoryName": "Input Control",
	"version": 1,
	"definition": "bootstrapextracomponents/inputgroup/inputgroup.js",
	"icon": "bootstrapextracomponents/inputgroup/icon.png",
	"serverscript": "bootstrapextracomponents/inputgroup/inputgroup_server.js",
	"libraries": [
		{"name":"inputgroup.css", "version":"1.0.0", "url":"bootstrapextracomponents/inputgroup/inputgroup.css", "mimetype":"text/css"}
	],
	"keywords": [],
	"model": 
	{
		"dataProvider"						: { "type": "dataprovider", "pushToServer": "allow", "tags": { "scope": "design" }, "ondatachange": { "onchange": "onDataChangeMethodID" } },
		"enabled"							: { "type": "enabled", "blockingOn": false, "default": true, "for": ["dataProvider", "onAction", "onDataChange", "onFocusGained", "onFocusLost", "onRightClick" ] },
		"editable" 							: { "type": "protected", "blockingOn": false, "default": true,"for": ["dataProvider","onDataChangeMethodID"] },
		"format"							: { "type": "format", "for": [ "dataProvider" ] },
		"inputType"							: { "type": "string", "tags": { "scope": "design" }, "values": [ "text", "password", "number" ], "default": "text" },
		"readOnly"							: { "type": "protected", "blockingOn": true, "default": false, "for": [ "dataProvider", "onDataChangeMethodID" ], "tags": { "scope": "runtime" } },
		"placeholderText"					: { "type": "tagstring" } ,
		"styleClass"						: { "type": "styleclass", "tags": { "scope": "design" } },
		"tabSeq"							: { "type": "tabseq", "tags": { "scope": "design" } },
		"visible"							: { "type": "visible" }, 
		"addOns"							: { "type": "AddOn[]" },
		"addOnButtons"						: { "type": "AddOnButton[]" },
		"size"								: { "type": "dimension", "default": { "width": 300, "height": 40 } },
		"toolTipText"						: { "type": "tagstring" }
	},
	"handlers": 
	{
		"onAction": 
		{
			"parameters": 
			[
				{ "name": "event", "type": "JSEvent" }
			]
		},
		"onDataChangeMethodID": 
		{
			"returns": "boolean",
			"parameters": 
			[
				{ "name": "oldValue", "type": "${dataproviderType}" },
				{ "name": "newValue", "type": "${dataproviderType}" },
 				{ "name": "event", "type": "JSEvent" }
			],
			"doc": "Handle changed data, return false if the value should not be accepted.\nJSEvent.data will contain extra information about dataproviderid, its scope and the scope id (record datasource or form/global variable scope)"
		},
		"onFocusGainedMethodID": 
		{
			"parameters": 
			[
				{ "name": "event", "type": "JSEvent" }
			]
		},
		"onFocusLostMethodID": 
		{
			"parameters": 
			[
				{ "name": "event", "type": "JSEvent" }
			]
		},
		"onRightClick": 
		{
			"parameters": 
			[
				{ "name": "event", "type": "JSEvent" }
			]
		}
	},
	"api": 
	{
		"requestFocus": 
		{
			"delayUntilFormLoads": true,
			"discardPreviouslyQueuedSimilarCalls": true
		},
		"addAddOn": 
		{
			"parameters": 
			[
				{ "name": "addOn", "type": "AddOn" }
			]
		},
		"setAddOns": 
		{
			"parameters": 
			[
				{ "name": "addOns", "type": "AddOn[]" }
			]
		},
		"clearAddOns": 
		{
		},
		"addAddOnButton": 
		{
			"parameters": 
			[
				{ "name": "addOnButton", "type": "AddOnButton" }
			]
		},
		"setAddOnButtons": 
		{
			"parameters": 
			[
				{ "name": "addOnButtons", "type": "AddOnButton[]" }
			]
		},
		"clearAddOnButtons": 
		{
		}
	},
	"types": 
	{
		"AddOn": 
		{
			"attributes"						: {"type": "map"},
			"text"								: { "type": "tagstring", "initialValue": "addOn" },
			"position"							: { "type": "string", "default": "LEFT", "values": [ "LEFT", "RIGHT" ] }
		},
		"AddOnButton": 
		{
			"attributes"						: {"type": "map"},
			"text"								: { "type": "tagstring", "initialValue": "addOn" },
			"name"								: { "type": "string", "initialValue": "btn" },
			"position"							: { "type": "string", "default": "RIGHT", "values": [ "LEFT", "RIGHT" ] },
			"onAction"							: { "type": "function" },
			"onDoubleClick"						: { "type": "function" },
			"onRightClick"						: { "type": "function" },
			"styleClass"						: { "type": "styleclass", "default": "btn-default" },
			"imageStyleClass"					: { "type": "styleclass" }
		}
	}
}