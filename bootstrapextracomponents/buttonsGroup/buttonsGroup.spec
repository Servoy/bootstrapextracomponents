{"name": "bootstrapextracomponents-buttons-group",
"displayName": "Group Buttons",
"categoryName": "Input Control",
"definition": "bootstrapextracomponents/buttonsGroup/buttonsGroup.js",
"doc": "bootstrapextracomponents/buttonsGroup/buttonsgroup_doc.js",
"icon": "bootstrapextracomponents/buttonsGroup/icon.png",
"libraries": [{"name":"btsextra-buttonsGroup.css", "version":"1.0.0", "url":"bootstrapextracomponents/buttonsGroup/css/btsextra-buttonsGroup.css", "mimetype":"text/css"}],
"keywords": ["set"],
"version": 1,
	"model":
	{
	   "dataProviderID": 			{ "type": "dataprovider", "pushToServer": "allow", "tags": { "wizard": true, "scope" :"design" }, "ondatachange": { "onchange":"onDataChangeMethodID", "callback":"onDataChangeCallback"}},
	   "styleClass": 				{ "type": "styleclass", "tags": { "scope" :"design" }, "values" :["btn-default", "btn-primary"], "default" : "btn-default"}, 
	   "valuelistID": 				{ "type": "valuelist",  "for": "dataProviderID"},
	   "inputType": 				{ "type": "string" , "tags": { "scope" :"design" }, "values" : [{"CHECKBOX": "checkbox"}, {"RADIO": "radio"}], "default" : "radio" },
	   "enabled": 					{ "type": "enabled", "blockingOn": false, "default": true, "for": ["dataProviderID","onDataChangeMethodID"] },
	   "toolTipText": 				{ "type": "tagstring"},
	   "visible": 					{ "type": "boolean", "default": true},
	   "location": 					{ "type": "point", "pushToServer": "deep"}, 
	   "size": 						{ "type": "dimension",  "default" : {"width":180, "height":32}, "pushToServer": "deep"},
	   "format": 					{ "type": "format", "for": "dataProviderID", "tags": { "scope" :"private" }},
	   "tabSeq": 					{ "type": "tabseq", "tags": { "scope" :"design" }},
	   "showAs": 					{ "type": "string", "values": [{"text":null}, {"html":"html"}, {"trusted_html":"trusted_html"}]}
	},
	"handlers": {
		"onDataChangeMethodID" : {
			"returns": "boolean",
	        "parameters": [
				{ "name": "oldValue", "type": "${dataproviderType}" }, 
				{ "name": "newValue", "type": "${dataproviderType}" }, 
				{ "name": "event", "type": "JSEvent"} 
		 	],
		 	"code": "return true",
		 	"doc": "Handle changed data, return false if the value should not be accepted.\nJSEvent.data will contain extra information about dataproviderid, its scope and the scope id (record datasource or form/global variable scope) - present since 2021.06 release"
		}
	},
	"api": {
	}
}
