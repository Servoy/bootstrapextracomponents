/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"692E1A4F-2257-4458-B5DA-AC95E03EB45E"}
 */
var stateOnDP = "fa fa-star fa-2x rating-on";

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"CCB26C58-2639-406A-AD0A-1D703866780A"}
 */
var stateOffDP = "fa fa-star fa-2x rating-off";

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"50261B41-74F5-4503-AD0B-94DACF82CBD9",variableType:4}
 */
var maxValueDP = 200;

/**
 * @properties={typeid:35,uuid:"255BD6B3-5F64-4BFA-8E8E-D1AA243C38AF",variableType:-4}
 */
var visibleDP = true;

/**
 * @properties={typeid:35,uuid:"B2364190-0ECA-49E0-9642-49F5C1027F60",variableType:-4}
 */
var enabledDP = true;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"3CD6F914-7F72-4A15-BA98-88E7F3B37837",variableType:4}
 */
var rating = 1;

/**
 * @param {JSEvent} event
 * @param {Number} value
 *
 * @private
 *
 * @properties={typeid:24,uuid:"EBF93105-97B0-4C44-BF1F-460DDF886D77"}
 */
function onHover(event, value) {
	elements.events.text = 'onHover called from \'' + event.getElementName() + '\' with value ' + value;
}

/**
 * @param {JSEvent} event
 * @param {Number} value
 *
 * @private
 *
 * @properties={typeid:24,uuid:"E50275F8-D985-4305-AFCA-DFD0A646C311"}
 */
function onLeave(event, value) {
	elements.events.text = 'onLeave called from \'' + event.getElementName() + '\' with value ' + value;
}

/**
 * Handle changed data, return false if the value should not be accepted.
 * JSEvent.data will contain extra information about dataproviderid, its scope and the scope id (record datasource or form/global variable scope)
 *
 * @param oldValue
 * @param newValue
 * @param {JSEvent} event
 *
 * @return {Boolean}
 *
 * @properties={typeid:24,uuid:"A9F2E20E-C261-4483-9B86-F0102210B2E4"}
 */
function onDataChange(oldValue, newValue, event) {
	elements.onDataChange.text = 'On data change: oldvalue - ' + oldValue + '  new value: - ' + newValue;
	return true;
}

/**
 * Click event. dataTarget parameter is used to identify inner html elements (by their data-target attribute).
 *
 * @param {JSEvent} event
 * @param {String} dataTarget
 *
 * @properties={typeid:24,uuid:"2BB6D42F-EFC2-4DB8-BE87-3108BF652506"}
 */
function onAction_enabled(event, dataTarget) {
	elements.rating_1.enabled = !elements.rating_1.enabled
	elements.rating_2.enabled = !elements.rating_2.enabled
	elements.rating_3.enabled = !elements.rating_3.enabled
	elements.rating_4.enabled = !elements.rating_4.enabled
}

/**
 * Click event. dataTarget parameter is used to identify inner html elements (by their data-target attribute).
 *
 * @param {JSEvent} event
 * @param {String} dataTarget
 *
 * @properties={typeid:24,uuid:"2A3322C3-C812-4597-9B3C-42F21A29D575"}
 */
function onAction_showPercentage(event, dataTarget) {
	elements.rating_1.showPercentageOnHover = !elements.rating_1.showPercentageOnHover
	elements.rating_2.showPercentageOnHover = !elements.rating_2.showPercentageOnHover
	elements.rating_3.showPercentageOnHover = !elements.rating_3.showPercentageOnHover
	elements.rating_4.showPercentageOnHover = !elements.rating_4.showPercentageOnHover

}

/**
 * Click event. dataTarget parameter is used to identify inner html elements (by their data-target attribute).
 *
 * @param {JSEvent} event
 * @param {String} dataTarget
 *
 * @properties={typeid:24,uuid:"2FB06737-63E1-462A-B9AB-6D426F81C460"}
 */
function onAction_visible(event, dataTarget) {
	elements.rating_1.visible = !elements.rating_1.visible
	elements.rating_2.visible = !elements.rating_2.visible
	elements.rating_3.visible = !elements.rating_3.visible
	elements.rating_4.visible = !elements.rating_4.visible
}

/**
 * Handle changed data, return false if the value should not be accepted.
 * JSEvent.data will contain extra information about dataproviderid, its scope and the scope id (record datasource or form/global variable scope)
 *
 * @param oldValue
 * @param newValue
 * @param {JSEvent} event
 *
 * @return {Boolean}
 *
 * @properties={typeid:24,uuid:"C488AC6D-9E11-4E40-A0AE-3826580B90C7"}
 */
function onDataChange_maxValue(oldValue, newValue, event) {
	elements.rating_1.max = maxValueDP
	elements.rating_2.max = maxValueDP
	elements.rating_3.max = maxValueDP
	elements.rating_4.max = maxValueDP
	return true
}

/**
 * Handle changed data, return false if the value should not be accepted.
 * JSEvent.data will contain extra information about dataproviderid, its scope and the scope id (record datasource or form/global variable scope)
 *
 * @param oldValue
 * @param newValue
 * @param {JSEvent} event
 *
 * @return {Boolean}
 *
 * @properties={typeid:24,uuid:"D4CB6331-09EC-40D9-A5F8-967FFDC9C637"}
 */
function onDataChange_stateOff(oldValue, newValue, event) {
	elements.rating_1.stateOff = stateOffDP
	elements.rating_2.stateOff = stateOffDP
	elements.rating_3.stateOff = stateOffDP
	elements.rating_4.stateOff = stateOffDP
	return true
}

/**
 * Handle changed data, return false if the value should not be accepted.
 * JSEvent.data will contain extra information about dataproviderid, its scope and the scope id (record datasource or form/global variable scope)
 *
 * @param oldValue
 * @param newValue
 * @param {JSEvent} event
 *
 * @return {Boolean}
 *
 * @properties={typeid:24,uuid:"C4CEDE57-6ACE-49B3-BAA2-E39EDAC50FD8"}
 */
function onDataChange_stateOn(oldValue, newValue, event) {
	elements.rating_1.stateOn = stateOnDP
	elements.rating_2.stateOn = stateOnDP
	elements.rating_3.stateOn = stateOnDP
	elements.rating_4.stateOn = stateOnDP
	return true
}
