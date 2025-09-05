/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"35D7A499-36B4-4226-82CA-06F7D2AC751B"}
 */
var valueTextDP = null;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"148FD5CA-66B9-4E2F-9660-7A0A1D8387FE",variableType:8}
 */
var valueDP = null;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"900D5C31-8D52-42B4-91AC-903664F63450",variableType:8}
 */
var maxValueDP = 200;

/**
 * @properties={typeid:35,uuid:"E05074BD-8A07-4DB9-99CA-CEB4AFAE8957",variableType:-4}
 */
var visibleDP = true;

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

		application.sleep(10);
	}
}

/**
 * Fired when the button is clicked.
 *
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"8571FF03-4454-4CE7-8297-BFC785694609"}
 */
function onAction_updateProgress(event) {
	for (var i = 1; i <= 200; i++) {
		elements.progressbar_1.updateProgressBar(i);
		elements.progressbar_2.updateProgressBar(i);
		elements.progressbar_3.updateProgressBar(i);
		elements.progressbar_4.updateProgressBar(i);

		elements.progressbar_5.updateProgressBar(i, i + ' steps done');

		application.sleep(10);
	}
}

/**
 * Click event. dataTarget parameter is used to identify inner html elements (by their data-target attribute).
 *
 * @param {JSEvent} event
 * @param {String} dataTarget
 *
 * @properties={typeid:24,uuid:"01DBA56B-D214-45FE-A011-59F1BCBAEE26"}
 */
function onAction_animate(event, dataTarget) {
	elements.progressbar_1.animate = !elements.progressbar_1.animate
	elements.progressbar_2.animate = !elements.progressbar_2.animate
	elements.progressbar_3.animate = !elements.progressbar_3.animate
	elements.progressbar_4.animate = !elements.progressbar_4.animate
	elements.progressbar_5.animate = !elements.progressbar_5.animate
}

/**
 * Click event. dataTarget parameter is used to identify inner html elements (by their data-target attribute).
 *
 * @param {JSEvent} event
 * @param {String} dataTarget
 *
 * @properties={typeid:24,uuid:"65D27FDD-8642-4B0D-A245-D204BFD3DD10"}
 */
function onAction_showValue(event, dataTarget) {
	elements.progressbar_1.showValue = !elements.progressbar_1.showValue
	elements.progressbar_2.showValue = !elements.progressbar_2.showValue
	elements.progressbar_3.showValue = !elements.progressbar_3.showValue
	elements.progressbar_4.showValue = !elements.progressbar_4.showValue
	elements.progressbar_5.showValue = !elements.progressbar_5.showValue
}

/**
 * Click event. dataTarget parameter is used to identify inner html elements (by their data-target attribute).
 *
 * @param {JSEvent} event
 * @param {String} dataTarget
 *
 * @properties={typeid:24,uuid:"CCBD6B9F-DF19-45F8-9156-E14501C4E23B"}
 */
function onAction_showValueAsPercentage(event, dataTarget) {
	elements.progressbar_1.showValueAsPercentage = !elements.progressbar_1.showValueAsPercentage
	elements.progressbar_2.showValueAsPercentage = !elements.progressbar_2.showValueAsPercentage
	elements.progressbar_3.showValueAsPercentage = !elements.progressbar_3.showValueAsPercentage
	elements.progressbar_4.showValueAsPercentage = !elements.progressbar_4.showValueAsPercentage
	elements.progressbar_5.showValueAsPercentage = !elements.progressbar_5.showValueAsPercentage
}

/**
 * Click event. dataTarget parameter is used to identify inner html elements (by their data-target attribute).
 *
 * @param {JSEvent} event
 * @param {String} dataTarget
 *
 * @properties={typeid:24,uuid:"D6D98E06-0D8A-4AFB-92E4-C20BEA3E8BCC"}
 */
function onAction_visible(event, dataTarget) {
	elements.progressbar_1.visible = !elements.progressbar_1.visible
	elements.progressbar_2.visible = !elements.progressbar_2.visible
	elements.progressbar_3.visible = !elements.progressbar_3.visible
	elements.progressbar_4.visible = !elements.progressbar_4.visible
	elements.progressbar_5.visible = !elements.progressbar_5.visible
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
 * @properties={typeid:24,uuid:"A1F82456-EEEA-44C8-B5B1-BAC7F2345D4F"}
 */
function onDataChange_maxValue(oldValue, newValue, event) {
	elements.progressbar_1.max = maxValueDP
	elements.progressbar_2.max = maxValueDP
	elements.progressbar_3.max = maxValueDP
	elements.progressbar_4.max = maxValueDP
	elements.progressbar_5.max = maxValueDP
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
 * @properties={typeid:24,uuid:"8538027F-BF79-45F0-8245-DDEEB0E0F77C"}
 */
function onDataChange_value(oldValue, newValue, event) {
	elements.progressbar_1.value = valueDP
	elements.progressbar_2.value = valueDP
	elements.progressbar_3.value = valueDP
	elements.progressbar_4.value = valueDP
	elements.progressbar_5.value = valueDP
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
 * @properties={typeid:24,uuid:"E9D937CF-F670-49D8-9A73-1C5388A07DAB"}
 */
function onDataChange_valueText(oldValue, newValue, event) {
	elements.progressbar_1.valueText = valueTextDP
	elements.progressbar_2.valueText = valueTextDP
	elements.progressbar_3.valueText = valueTextDP
	elements.progressbar_4.valueText = valueTextDP
	elements.progressbar_5.valueText = valueTextDP
	return true
}
