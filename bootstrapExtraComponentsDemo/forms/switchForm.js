/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"176AC168-0A07-499C-BCE7-1EB806CEDCD8"}
 */
var labelDP = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"247BFD1B-19B1-4A51-81DC-314313213633"}
 */
var onTextDP = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"458EDE1B-EB56-4A3B-8EDA-291F987DDF9A"}
 */
var offTextDP = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"72964E0E-F1EA-4E1C-88C4-14121A3AE436"}
 */
var labelWidthDP = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"98E40574-6024-462A-A56D-9AAD201CC04D"}
 */
var handleWidthDP = null;

/**
 * @properties={typeid:35,uuid:"C67D3068-EFBE-4EA8-9388-59AA40541725",variableType:-4}
 */
var visibleDP = true;

/**
 * @properties={typeid:35,uuid:"2E5E11B4-7512-47E6-AA4E-276A4EF28996",variableType:-4}
 */
var animateDP = true;

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
		if (elem['onColor'] && elem['offColor'] && name != 'switch_enable') {
			elem.enabled = enable == 1 ? true : false;
		}
	}

	return true;
}

/**
 * Fired when the button is clicked.
 *
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"A19E08FD-FC7C-44FD-B696-7C6B02E7EE63"}
 */
function onAction_requestFocus(event) {
	elements.switch_color.requestFocus();
}

/**
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"84A15FC4-7763-4CA5-B52E-E1B3D4EF332D"}
 */
function onAction(event) {
	elements.label_action.text = 'On Action switch: ' + event.getElementName();
}

/**
 * Handle changed data, return false if the value should not be accepted.
 * JSEvent.data will contain extra information about dataproviderid, its scope and the scope id (record datasource or form/global variable scope) - present since 2021.06 release
 *
 * @param oldValue
 * @param newValue
 * @param {JSEvent} event
 *
 * @return {Boolean}
 *
 * @properties={typeid:24,uuid:"7CAED288-74BC-41E1-816E-41D4D13E44CC"}
 */
function onDataChange(oldValue, newValue, event) {
	elements.label_action.text = 'On data change: ' + event.getElementName();
	return true
}

/**
 * Click event. dataTarget parameter is used to identify inner html elements (by their data-target attribute).
 *
 * @param {JSEvent} event
 * @param {String} dataTarget
 *
 * @properties={typeid:24,uuid:"5A5745E9-B817-4B28-A357-4A7ED76083F6"}
 */
function onAction_animate(event, dataTarget) {
	elements.switch_a.animate = !elements.switch_a.animate
	elements.switch_color.animate = !elements.switch_color.animate
	elements.switch_size.animate = !elements.switch_size.animate
	elements.switch_sizec.animate = !elements.switch_sizec.animate
	elements.switch_sizecc.animate = !elements.switch_sizecc.animate
	elements.switchDisabled.animate = !elements.switchDisabled.animate
}

/**
 * Click event. dataTarget parameter is used to identify inner html elements (by their data-target attribute).
 *
 * @param {JSEvent} event
 * @param {String} dataTarget
 *
 * @properties={typeid:24,uuid:"50076898-92D0-478D-B78F-CA1F4CB0DBB7"}
 */
function onAction_enable(event, dataTarget) {
	elements.switch_a.enabled = !elements.switch_a.enabled
	elements.switch_color.enabled = !elements.switch_color.enabled
	elements.switch_size.enabled = !elements.switch_size.enabled
	elements.switch_sizec.enabled = !elements.switch_sizec.enabled
	elements.switch_sizecc.enabled = !elements.switch_sizecc.enabled
	elements.switchDisabled.enabled = !elements.switchDisabled.enabled
}

/**
 * Click event. dataTarget parameter is used to identify inner html elements (by their data-target attribute).
 *
 * @param {JSEvent} event
 * @param {String} dataTarget
 *
 * @properties={typeid:24,uuid:"003BDBAA-2976-460F-83DC-3F218F95F9BA"}
 */
function onAction_visible(event, dataTarget) {
	elements.switch_a.visible = !elements.switch_a.visible
	elements.switch_color.visible = !elements.switch_color.visible
	elements.switch_size.visible = !elements.switch_size.visible
	elements.switch_sizec.visible = !elements.switch_sizec.visible
	elements.switch_sizecc.visible = !elements.switch_sizecc.visible
	elements.switchDisabled.visible = !elements.switchDisabled.visible
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
 * @properties={typeid:24,uuid:"4056B20C-F883-493E-9A41-4BE6F7DCFEEA"}
 */
function onDataChange_handleWidth(oldValue, newValue, event) {
	elements.switch_a.handleWidth = handleWidthDP
	elements.switch_color.handleWidth = handleWidthDP
	elements.switch_size.handleWidth = handleWidthDP
	elements.switch_sizec.handleWidth = handleWidthDP
	elements.switch_sizecc.handleWidth = handleWidthDP
	elements.switchDisabled.handleWidth = handleWidthDP
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
 * @properties={typeid:24,uuid:"624B1DF5-3AD0-483F-AF71-5481EFC2B6CC"}
 */
function onDataChange_lableWidth(oldValue, newValue, event) {
	elements.switch_a.labelWidth = labelWidthDP
	elements.switch_color.labelWidth = labelWidthDP
	elements.switch_size.labelWidth = labelWidthDP
	elements.switch_sizec.labelWidth = labelWidthDP
	elements.switch_sizecc.labelWidth = labelWidthDP
	elements.switchDisabled.labelWidth = labelWidthDP
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
 * @properties={typeid:24,uuid:"84489B4E-5A9D-4675-92FD-492F7AD402F3"}
 */
function onDataChange_offText(oldValue, newValue, event) {
	elements.switch_a.offText = offTextDP
	elements.switch_color.offText = offTextDP
	elements.switch_size.offText = offTextDP
	elements.switch_sizec.offText = offTextDP
	elements.switch_sizecc.offText = offTextDP
	elements.switchDisabled.offText = offTextDP
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
 * @properties={typeid:24,uuid:"89B98318-6E09-42D2-9536-881127157960"}
 */
function onDataChange_onText(oldValue, newValue, event) {
	elements.switch_a.onText = onTextDP
	elements.switch_color.onText = onTextDP
	elements.switch_size.onText = onTextDP
	elements.switch_sizec.onText = onTextDP
	elements.switch_sizecc.onText = onTextDP
	elements.switchDisabled.onText = onTextDP
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
 * @properties={typeid:24,uuid:"31C927F0-17B4-4869-9EDC-1E7A69EABDD5"}
 */
function onDataChange_label(oldValue, newValue, event) {
	elements.switch_a.label = labelDP
	elements.switch_color.label = labelDP
	elements.switch_size.label = labelDP
	elements.switch_sizec.label = labelDP
	elements.switch_sizecc.label = labelDP
	elements.switchDisabled.label = labelDP
	return true
}
