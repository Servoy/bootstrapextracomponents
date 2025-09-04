/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"0D51D84F-15C2-45DF-AE9B-AD70C0B15534",variableType:-4}
 */
var visibleDP = true;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"EFC86E94-93F6-444A-9901-156FBC706B0B",variableType:-4}
 */
var enabledDP = true;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"C88FBF0B-ED69-4A59-A349-274E98EAA3E6"}
 */
var tooltipTextDP = "Tooltip text";

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"90FC39CD-73D9-46E7-B1DD-CF85D873F170"}
 */
var styleClassDP = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"4C2CEAEC-3B62-429F-B6A2-43DCB0D8A2D4"}
 */
var showAsDP = 'text';

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"78B26687-5DB4-4443-A98F-8A3F32D326CE"}
 */
var checkboxValue = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"F73EF606-442A-4658-994A-4E2977E43276"}
 */
var radioValue = null;

/**
 * @param oldValue
 * @param newValue
 * @param event
 *
 * @properties={typeid:24,uuid:"1B61AED6-4D63-44F9-9B3D-AEABDD501612"}
 */
function onDataChange(oldValue, newValue, event) {
	application.output('onDataChange called from buttonsgroup ' + event.getElementName());
	elements.label_6.text = 'onDataChange called from buttonsgroup ' + event.getElementName();
}

/**
 * @param oldValue
 * @param newValue
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"B10C888C-CC0F-4243-B7DF-6263990F255E"}
 */
function onElementDataChange(oldValue, newValue, event) {
	application.output('onElementDataChange called from buttonsgroup ' + event.getElementName());
	elements.label_6.text = 'onElementDataChange called from buttonsgroup ' + event.getElementName();
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
 * @properties={typeid:24,uuid:"0037F2C7-8604-48BC-89B4-F1D66B06E473"}
 */
function onDataChange_showAs(oldValue, newValue, event) {
	elements.buttons_checkdefault.showAs = showAsDP
	elements.buttons_checkprimary.showAs = showAsDP
	elements.buttons_checkwarning.showAs = showAsDP
	elements.buttons_radio.showAs = showAsDP
	elements.buttons_radiodefault.showAs = showAsDP
	elements.buttons_radiowarning.showAs = showAsDP

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
 * @properties={typeid:24,uuid:"94BAA837-8A88-4B8B-8D0A-C0EB7C8C8AD0"}
 */
function onDataChange_styleClass(oldValue, newValue, event) {
	elements.buttons_checkdefault.styleClass = styleClassDP
	elements.buttons_checkprimary.styleClass = styleClassDP
	elements.buttons_checkwarning.styleClass = styleClassDP
	elements.buttons_radio.styleClass = styleClassDP
	elements.buttons_radiodefault.styleClass = styleClassDP
	elements.buttons_radiowarning.styleClass = styleClassDP

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
 * @properties={typeid:24,uuid:"8EBC995B-0627-4581-BB51-37A6D8B91863"}
 */
function onDataChange_tooltipText(oldValue, newValue, event) {
	return true
}

/**
 * Click event. dataTarget parameter is used to identify inner html elements (by their data-target attribute).
 *
 * @param {JSEvent} event
 * @param {String} dataTarget
 *
 * @properties={typeid:24,uuid:"07F07DDE-2C37-4D1A-A709-ED8C2406B537"}
 */
function onAction_enabled(event, dataTarget) {
	elements.buttons_checkdefault.enabled = !elements.buttons_checkdefault.enabled;
	elements.buttons_checkprimary.enabled = !elements.buttons_checkprimary.enabled;
	elements.buttons_checkwarning.enabled = !elements.buttons_checkwarning.enabled;
	elements.buttons_radio.enabled = !elements.buttons_radio.enabled;
	elements.buttons_radiodefault.enabled = !elements.buttons_radiodefault.enabled;
	elements.buttons_radiowarning.enabled = !elements.buttons_radiowarning.enabled;	
}

/**
 * Click event. dataTarget parameter is used to identify inner html elements (by their data-target attribute).
 *
 * @param {JSEvent} event
 * @param {String} dataTarget
 *
 * @properties={typeid:24,uuid:"116EF0FF-3AB0-4954-89E7-3E1503916424"}
 */
function onAction_visible(event, dataTarget) {
	elements.buttons_checkdefault.visible = !elements.buttons_checkdefault.visible;
	elements.buttons_checkprimary.visible = !elements.buttons_checkprimary.visible;
	elements.buttons_checkwarning.visible = !elements.buttons_checkwarning.visible;
	elements.buttons_radio.visible = !elements.buttons_radio.visible;
	elements.buttons_radiodefault.visible = !elements.buttons_radiodefault.visible;
	elements.buttons_radiowarning.visible = !elements.buttons_radiowarning.visible;
}
