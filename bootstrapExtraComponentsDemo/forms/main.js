
/**
 * Callback method when the user changes tab in a tab panel or divider position in split pane.
 *
 * @param {Number} previousIndex index of tab shown before the change
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"F017AB23-C945-4D6D-839C-51DF413B7AC2"}
 */
function onTabChange(previousIndex, event) {
	elements.lblSolutionName.text = elements.tabs.getTabTextAt(elements.tabs.tabIndex);
}

/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"A885F466-139C-4C1C-8523-F7B3B63D3BE9"}
 */
function onShow(firstShow, event) {
	onTabChange(-1, event);
}
