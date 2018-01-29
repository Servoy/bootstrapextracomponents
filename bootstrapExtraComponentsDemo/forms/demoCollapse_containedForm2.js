/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"C7DC19AE-27F0-45D8-814A-B532AFCB7032",variableType:4}
 */
var clickToggle = 0;


/**
 * Handle hide window.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @return {Boolean}
 *
 * @private
 *
 * @properties={typeid:24,uuid:"AF9594F7-3B3C-404F-ACB8-FF4DD7FF3322"}
 */
function onHide(event) {
	application.output('onHide of collapsible contained form properly fired');
	return true
}

/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"ED6FEBE9-0371-4A0C-A19B-0D86706865BF"}
 */
function onShow(firstShow, event) {
	application.output('onShow of collapsible contained form properly fired');
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"83C18346-7B7E-4B22-934E-C45EA01B14D6"}
 */
function onActionClick(event) {
	clickToggle = clickToggle ? 0 : 1;
}
