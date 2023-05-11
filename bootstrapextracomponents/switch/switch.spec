{
	"name": "bootstrapextracomponents-switch",
	"displayName": "Switch",
	"categoryName": "Input Control",
	"version": 1,
	"definition": "bootstrapextracomponents/switch/switch.js",
	"icon": "bootstrapextracomponents/switch/icon.png",
	"libraries": [
	{"name":"switch.css", "version":"1.0.0", "url":"bootstrapextracomponents/switch/switch.css", "mimetype":"text/css"},
	{"name":"bootstrap-switch.css", "version":"3.3.4", "url":"bootstrapextracomponents/switch/bootstrap-switch.css", "mimetype":"text/css"},
	{"name":"bootstrap-switch.js", "version":"3.3.4", "url":"bootstrapextracomponents/switch/bootstrap-switch.js", "mimetype":"text/javascript"},
	{"name":"angular-bootstrap-switch.js", "version":"0.5.2", "url":"bootstrapextracomponents/switch/angular-bootstrap-switch.js", "mimetype":"text/javascript"}
	],
	"keywords": ["swap"],
	"model":
	{	
		 	"dataProviderID" : { "type":"dataprovider", "pushToServer": "allow", "tags": { "scope": "design" }, "ondatachange": { "onchange":"onDataChangeMethodID"}}, 	        
	        "enabled" : { "type": "enabled", "blockingOn": false, "default": true, "for": ["dataProviderID","onActionMethodID","onDataChangeMethodID"] }, 	        
	        "styleClass" : { "type" :"styleclass", "tags": { "scope" :"design" }, "default":"switch"},
	        "animate" : { "type" : "boolean" ,"default": true },
	        "onText" : { "type" : "tagstring" ,"default": "On" },
	        "offText" : { "type" : "tagstring" ,"default": "Off" },
	        "onColor" : { "type" : "tagstring" ,"default": "primary" , "values":[{"Primary":"primary"},{"Info":"info"},{"Success":"success"},{"Warning":"warning"},{"Danger":"danger"}]},
	        "offColor" : { "type" : "tagstring" ,"default": "primary" , "values":[{"Primary":"primary"},{"Info":"info"},{"Success":"success"},{"Warning":"warning"},{"Danger":"danger"}]},	          
	        "label" : { "type" : "tagstring" ,"default": "Switch" },
	        "labelWidth" : { "type" : "tagstring" ,"default": "150" },
	        "handleWidth" : { "type" : "tagstring" ,"default": "150" },
	        "componentSize" : { "type" : "tagstring" ,"default": "Normal", "values":[{"Mini":"mini"},{"Small":"small"},{"Normal":"normal"},{"Large":"large"}] },
			"tabSeq" : {"type" :"tabseq", "tags": { "scope" :"design" }},	
			"size" : {"type" :"dimension",  "default" : {"width":300, "height":40}},				
	        "visible" : "visible"
	},
	"handlers":
	{
	        "onActionMethodID" : {	         	
	        	"parameters":[{"name":"event","type":"JSEvent"}]
	        }, 
	        "onDataChangeMethodID" : {
	          "returns": "boolean", 
	         	"parameters":[
								{"name":"oldValue","type":"${dataproviderType}"}, 
								{"name":"newValue","type":"${dataproviderType}"}, 
								{"name":"event","type":"JSEvent"} 
							 ],
				"code": "return true",
				"doc": "Handle changed data, return false if the value should not be accepted.\nJSEvent.data will contain extra information about dataproviderid, its scope and the scope id (record datasource or form/global variable scope) - present since 2021.06 release"			 
	        }
	},
	"api": {
			"requestFocus": {
				"delayUntilFormLoads": true,
				"discardPreviouslyQueuedSimilarCalls": true
	        }
	}
}