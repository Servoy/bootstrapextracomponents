/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"707D93D7-86D4-4B17-A3FB-6CD701E57000"}
 */
var switchRadio = '3';

/**
 * @type {Boolean}
 *
 * @properties={typeid:35,uuid:"54843FFA-BB0D-484B-A6DC-0387B3CD8474",variableType:-4}
 */
var enable = true;

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

	for (var i = 0; i < elements.allnames.length; i++) {
		var name = elements.allnames[i];
		var elem = elements[name];
		if (elem['onColor'] && elem['offColor']) {
			elem['onColor'] = color;
			elem['offColor'] = color;
		}
	}
}

/**
 * @param oldValue
 * @param newValue
 * @param {JSEvent} event
 * @return {boolean}
 *
 * @properties={typeid:24,uuid:"A80867E5-6DA4-439F-A91F-6C2EE61DD2E9"}
 */
function onDataChangeMethodID(oldValue, newValue, event) {
	for (var i = 0; i < elements.allnames.length; i++) {
		var name = elements.allnames[i];
		var elem = elements[name];		
		if (elem['onColor'] && elem['offColor'] && name!='switch_enable') {
			elem.enabled = enable == 1 ? true : false;
		}
	}

	return false;
}
