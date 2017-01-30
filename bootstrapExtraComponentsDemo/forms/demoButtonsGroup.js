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
 *
 * @param {JSEvent} event
 *
 * @private
 *
 * @properties={typeid:24,uuid:"AB97DAF0-FF0C-49A3-A2F6-D98F5CC960C6"}
 */
function onAction_badge(event) {
	application.output('onAction called from badge ' + event.getElementName());
}

/**
 *
 * @param {JSEvent} event
 *
 * @private
 *
 * @properties={typeid:24,uuid:"BD8F7069-70FF-4EC1-9B9E-632E3B5B0CDC"}
 */
function onDoubleClick_badge(event) {
	application.output('onDoubleClick called from badge ' + event.getElementName());
}

/**
 *
 * @param {JSEvent} event
 *
 * @private
 *
 * @properties={typeid:24,uuid:"984F4C77-5326-4C0F-893E-5E58F3E103C5"}
 */
function onRightClick_badge(event) {
	application.output('onRightClick called from badge ' + event.getElementName());
}

/**
 * @param oldValue
 * @param newValue
 * @param event
 *
 * @properties={typeid:24,uuid:"1B61AED6-4D63-44F9-9B3D-AEABDD501612"}
 */
function onDataChange(oldValue, newValue, event) {
	application.output('onDataChange called from badge ' + event.getElementName());
}

/**
 * @param oldValue
 * @param newValue
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"B10C888C-CC0F-4243-B7DF-6263990F255E"}
 */
function onElementDataChange(oldValue, newValue, event) {
	application.output('onElementDataChange called from badge ' + event.getElementName());
}
