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
}
