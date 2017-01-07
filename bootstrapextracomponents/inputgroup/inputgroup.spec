{
	"name": "bootstrapextracomponents-input-group",
	"displayName": "Input Group",
	"version": 1,
	"definition": "bootstrapextracomponents/inputgroup/inputgroup.js",
	"libraries": [],
	"model": 
	{
		"dataProviderID": 
		{
			"type": "dataprovider",
			"pushToServer": "allow",
			"tags": 
			{
				"scope": "design"
			},

			"ondatachange": 
			{
				"onchange": "onDataChangeMethodID",
				"callback": "onDataChangeCallback"
			}
		},
		"enabled": 
		{
			"type": "enabled",
			"blockingOn": false,
			"default": true,
			"for": 
			[
				"dataProviderID",
				"onActionMethodID",
				"onDataChangeMethodID",
				"onFocusGainedMethodID",
				"onFocusLostMethodID",
				"onRightClickMethodID"
			]
		},
		"format": 
		{
			"for": 
			[
				"dataProviderID"
			],

			"type": "format"
		},
		"inputType": 
		{
			"type": "string",
			"tags": 
			{
				"scope": "design"
			},

			"default": "text",
			"values": 
			[
				"text",
				"password",
				"number"
			]
		},
		"readOnly": 
		{
			"type": "protected",
			"blockingOn": true,
			"default": false,
			"for": 
			[
				"dataProviderID",
				"onDataChangeMethodID"
			]
		},
		"placeholderText": "tagstring",
		"styleClass": 
		{
			"type": "styleclass",
			"tags": 
			{
				"scope": "design"
			}
		},
		"tabSeq": 
		{
			"type": "tabseq",
			"tags": 
			{
				"scope": "design"
			}
		},
		"visible": "visible",
		"addOns": 
		{
			"type": "AddOn[]"
		},
		"addOnButtons": 
		{
			"type": "AddOnButton[]"
		},
		"size": 
		{
			"type": "dimension",
			"default": 
			{
				"width": 300,
				"height": 40
			}
		}
	},
	"handlers": 
	{
		"onActionMethodID": 
		{
			"parameters": 
			[
				{
					"name": "event",
					"type": "JSEvent"
				}
			]
		},
		"onDataChangeMethodID": 
		{
			"returns": "boolean",
			"parameters": 
			[
				{
					"name": "oldValue",
					"type": "${dataproviderType}"
				},

				{
					"name": "newValue",
					"type": "${dataproviderType}"
				},

				{
					"name": "event",
					"type": "JSEvent"
				}
			]
		},
		"onFocusGainedMethodID": 
		{
			"parameters": 
			[
				{
					"name": "event",
					"type": "JSEvent"
				}
			]
		},
		"onFocusLostMethodID": 
		{
			"parameters": 
			[
				{
					"name": "event",
					"type": "JSEvent"
				}
			]
		},
		"onRightClickMethodID": 
		{
			"parameters": 
			[
				{
					"name": "event",
					"type": "JSEvent"
				}
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
				{
					"name": "addOn",
					"type": "AddOn"
				}
			]
		},
		"setAddOns": 
		{
			"parameters": 
			[
				{
					"name": "addOn",
					"type": "AddOn[]"
				}
			]
		},
		"clearAddOns": 
		{
			
		},
		"addAddOnButton": 
		{
			"parameters": 
			[
				{
					"name": "addOnButton",
					"type": "AddOnButton"
				}
			]
		},
		"setAddOnButtons": 
		{
			"parameters": 
			[
				{
					"name": "addOnButton",
					"type": "AddOnButton[]"
				}
			]
		},
		"clearAddOnButtons": 
		{
			"parameters": 
			[
				{
					"name": "addOnButton",
					"type": "AddOnButton"
				}
			]
		}
	},
	"types": 
	{
		"AddOn": 
		{
			"text": 
			{
				"type": "tagstring",
				"initialValue": "addOn"
			},
			"position": 
			{
				"type": "string",
				"default": "LEFT",
				"values": 
				[
					"LEFT",
					"RIGHT"
				]
			}
		},
		"AddOnButton": 
		{
			"text": 
			{
				"type": "tagstring",
				"initialValue": "addOn"
			},
			"position": 
			{
				"type": "string",
				"default": "RIGHT",
				"values": 
				[
					"LEFT",
					"RIGHT"
				]
			},
			"onActionMethodID": 
			{
				"type": "function"
			},
			"onDoubleClickMethodID": 
			{
				"type": "function"
			},
			"onRightClickMethodID": 
			{
				"type": "function"
			},
			"styleClass": 
			{
				"type": "styleclass",
				"default": "btn-default"
			},
			"imageStyleClass": 
			{
				"type": "styleclass"
			}
		}
	}
}