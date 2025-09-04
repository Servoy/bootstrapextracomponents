/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"C7D56DBE-2EA6-4ECE-9993-DBD5E0DF0BDB"}
 */
var tooltipTextDP = "Badge tooltip";

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"DAE90DA4-6522-49A7-8136-9B9D03B059B8"}
 */
var imageStyleClassDP = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"33732FB6-642F-4164-9F71-70C3A351FDEC"}
 */
var textDP = "Text";

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"79943711-3672-4825-ABF1-AD0343E7B3E3"}
 */
var styleClassDP = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"A31F946F-A2FF-43ED-A14D-5074E21C607B"}
 */
var badgeTextDP = "Badge Text";

/**
 * @properties={typeid:35,uuid:"4077DC35-0234-4FB3-9F8C-8166AE03C48B",variableType:-4}
 */
var visibleDP = true;

/**
 * @properties={typeid:35,uuid:"8D53AC28-ACFE-49EE-9198-B2F83F45B680",variableType:-4}
 */
var enabledDP = true;

/**
 *
 * @param {JSEvent} event
 *
 * @private
 *
 * @properties={typeid:24,uuid:"34B0984E-52D2-4FC1-B102-0FF531DBD7CC"}
 */
function onAction_badge(event) {
	application.output('onAction called from badge ' + event.getElementName());
	elements.label_output.text = 'onAction called from badge ' + event.getElementName();
}

/**
 *
 * @param {JSEvent} event
 *
 * @private
 *
 * @properties={typeid:24,uuid:"564A02E7-F9A5-4036-A219-2CC5A6D0E8C3"}
 */
function onDoubleClick_badge(event) {
	application.output('onDoubleClick called from badge ' + event.getElementName());
	elements.label_output.text = 'onDoubleClick called from badge ' + event.getElementName();
}

/**
 *
 * @param {JSEvent} event
 *
 * @private
 *
 * @properties={typeid:24,uuid:"94D748B8-4288-46C1-9B33-5FD1214E86CB"}
 */
function onRightClick_badge(event) {
	application.output('onRightClick called from badge ' + event.getElementName());
	elements.label_output.text = 'onRightClick called from badge ' + event.getElementName();
}

/**
 * Click event. dataTarget parameter is used to identify inner html elements (by their data-target attribute).
 *
 * @param {JSEvent} event
 * @param {String} dataTarget
 *
 * @properties={typeid:24,uuid:"D3131C71-246F-4A9F-BBA6-092AA32C9DA4"}
 */
function onAction_enabled(event, dataTarget) {
	elements.badge_button.enabled = !elements.badge_button.enabled
	elements.badge_button2.enabled = !elements.badge_button2.enabled
	elements.badge_label.enabled = !elements.badge_label.enabled
}

/**
 * Click event. dataTarget parameter is used to identify inner html elements (by their data-target attribute).
 *
 * @param {JSEvent} event
 * @param {String} dataTarget
 *
 * @properties={typeid:24,uuid:"87439089-C06D-4AB1-B022-72A35890DD58"}
 */
function onAction_visible(event, dataTarget) {
	elements.badge_button.visible = !elements.badge_button.visible
	elements.badge_button2.visible = !elements.badge_button2.visible
	elements.badge_label.visible = !elements.badge_label.visible
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
 * @properties={typeid:24,uuid:"6C90B138-8F5B-43BA-A51D-49FED6960680"}
 */
function onDataChang_badgeText(oldValue, newValue, event) {
	// TODO Auto-generated method stub
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
 * @properties={typeid:24,uuid:"3FF9C084-7FC1-4AF7-BC5E-3C7B89ABFA56"}
 */
function onDataChange_styleClass(oldValue, newValue, event) {
	elements.badge_button.styleClass = styleClassDP
	elements.badge_button2.styleClass = styleClassDP
	elements.badge_label.styleClass = styleClassDP
	elements.badge_button_disabled.styleClass = styleClassDP
	elements.badge_label_disabled.styleClass = styleClassDP
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
 * @properties={typeid:24,uuid:"E543EEBF-2B49-4D41-9D8E-7F72B48913D7"}
 */
function onDataChange_text(oldValue, newValue, event) {
	// TODO Auto-generated method stub
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
 * @properties={typeid:24,uuid:"DADD116E-8E04-4E43-8022-5A7877984E79"}
 */
function onDataChange_imageStyleClass(oldValue, newValue, event) {
	elements.badge_button.imageStyleClass = imageStyleClassDP
	elements.badge_button2.imageStyleClass = imageStyleClassDP
	elements.badge_label.imageStyleClass = imageStyleClassDP
	elements.badge_button_disabled.imageStyleClass = imageStyleClassDP
	elements.badge_label_disabled.imageStyleClass = imageStyleClassDP
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
 * @properties={typeid:24,uuid:"28742A56-E893-44A4-91D7-49FDBB49F020"}
 */
function onDataChange_tooltipText(oldValue, newValue, event) {
	// TODO Auto-generated method stub
	return true
}
