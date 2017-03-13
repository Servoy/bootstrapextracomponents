
/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"F15BE098-6800-49EA-B7B4-17234FAB4FCE"}
 */
function onAction_btnRandomize(event) {
	elements.progressbar_1.value = Math.round(Math.random() * 200);
	elements.progressbar_2.value = Math.round(Math.random() * 200);
	elements.progressbar_3.value = Math.round(Math.random() * 200);
	elements.progressbar_4.value = Math.round(Math.random() * 200);
	elements.progressbar_5.valueText = null;
	elements.progressbar_5.value = Math.round(Math.random() * 200);
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"B105D079-215A-4E1D-8DD1-88589F5BA07F"}
 */
function onAction_btnPerformHeavyJob(event) {
	for (var i = 1; i <= 200; i++) {
		//calling setProgress will update the progress bar during the process 
		//while simply setting the value would only be updated after this method is finished
		elements.progressbar_1.setProgress(i);
		elements.progressbar_2.setProgress(i);
		elements.progressbar_3.setProgress(i);
		elements.progressbar_4.setProgress(i);
		
		elements.progressbar_5.setProgress(i, i + ' steps done');
		
		application.sleep(50);
	}
}
