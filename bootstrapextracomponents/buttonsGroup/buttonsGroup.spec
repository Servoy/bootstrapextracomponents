{"name": "bootstrapextracomponents-buttons-group",
"displayName": "Group Buttons",
"definition": "bootstrapextracomponents/buttonsGroup/buttonsGroup.js",
"libraries": [{"name":"btsextra-buttonsGroup.css", "version":"1.0.0", "url":"bootstrapextracomponents/buttonsGroup/css/btsextra-buttonsGroup.css", "mimetype":"text/css"}],
"version": 1,
	"model":
	{
	   "dataProviderID": 			{ "type": "dataprovider", "pushToServer": "allow", "tags": { "scope" :"design" }, "ondatachange": { "onchange":"onDataChangeMethodID", "callback":"onDataChangeCallback"}},
	   "styleClass": 				{ "type": "styleclass", "tags": { "scope" :"design" }, "values" :["btn-default", "btn-primary"], "default" : "btn-default"}, 
	   "valuelistID": 				{ "type": "valuelist", "tags": { "scope" :"design" }, "for": "dataProviderID"},
	   "inputType": 				{ "type": "string" , "tags": { "scope" :"design" }, "values" : [{"CHECKBOX": "checkbox"}, {"RADIO": "radio"}], "default" : "radio" },
	   "enabled": 					{ "type": "enabled", "blockingOn": false, "default": true, "for": ["dataProviderID","onDataChangeMethodID"] },
	   "toolTipText": 				{ "type": "tagstring"},
	   "visible": 					{ "type": "boolean", "default": true},
	   "location": 					{"type" :"point", "pushToServer": "deep"}, 
	   "size": 						{"type" :"dimension",  "default" : {"width":180, "height":32}, "pushToServer": "deep"},
	   "format": 					{"type" : "format", "for": "dataProviderID", "tags": { "scope" :"private" }}
	   
	},
	"handlers": {
		"onDataChangeMethodID" : {
			"returns": "boolean",
	        "parameters": [
				{ "name": "oldValue", "type": "${dataproviderType}" }, 
				{ "name": "newValue", "type": "${dataproviderType}" }, 
				{ "name": "event", "type": "JSEvent"} 
		 	]
		}
	},
	"api": {
	}
}
