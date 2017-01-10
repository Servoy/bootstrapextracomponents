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
