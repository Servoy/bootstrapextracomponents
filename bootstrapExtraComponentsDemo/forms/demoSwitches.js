/**
 * @type {Boolean}
 *
 * @properties={typeid:35,uuid:"10A417B8-C195-4FC6-851E-7E084EFC9F1F",variableType:-4}
 */
var switches_a = true;
/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 * @param {String} color
 * @private
 *
 * @properties={typeid:24,uuid:"A5CF4388-99AF-497A-A460-9CAF58F46486"}
 */
function onAction$updateColor(event, color) {
	
	for (var i=0; i<elements.allnames.length; i++)
	{
		var name = elements.allnames[i];
		var elem = elements[name];
		if (elem['onColor'] && elem['offColor']) {					
			elem['onColor'] = color;
			elem['offColor'] = color;
		}
	}	
}

