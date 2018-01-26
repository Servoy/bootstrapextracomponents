
/**
 * Handle hide window.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @return {Boolean}
 *
 * @private
 *
 * @properties={typeid:24,uuid:"C008F157-67F7-4291-A743-A704563EC080"}
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
 * @properties={typeid:24,uuid:"331FC1BF-C21D-41EC-8498-DA083EB39A68"}
 */
function onShow(firstShow, event) {
	application.output('onShow of collapsible contained form properly fired');
}
