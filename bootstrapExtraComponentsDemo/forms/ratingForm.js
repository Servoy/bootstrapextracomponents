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
