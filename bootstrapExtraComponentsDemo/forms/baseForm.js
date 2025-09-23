
/**
 * @properties={typeid:24,uuid:"9EE6C0B9-3986-45C9-8344-65002B00F4EB"}
 */
function onLoad() {
	var tabSeq = forms.selectorForm.controller.getTabSequence();
	if (tabSeq.length > 0) {
		forms.selectorForm.controller.focusField(tabSeq[0], false);
		forms.selectorForm.elements.button_badge.addStyleClass('selected');
	}
	
	forms.selectorForm.loadComponentForm('Badge', 'badgeForm')
	
}
