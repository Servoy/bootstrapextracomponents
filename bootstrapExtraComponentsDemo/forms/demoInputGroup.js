/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"5E5733B1-A57B-48E2-A0A9-26D132735EDB"}
 */
var textVar;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"E99DBF73-C4DD-4D65-A385-A8276DF29FA1",variableType:8}
 */
var numberVar;

/**
 *
 * @param {JSEvent} event
 *
 * @private
 *
 * @properties={typeid:24,uuid:"0F340ED4-6D6C-4E08-8986-038128EF43F0"}
 */
function onAction_input(event) {
	application.output('onAction called from ' + event.getElementName());
}

/**
 *
 * @param oldValue
 * @param newValue
 * @param {JSEvent} event
 *
 * @return {boolean}
 *
 * @private
 *
 * @properties={typeid:24,uuid:"5AC804EA-1EC1-4C05-8552-36420F87CCB5"}
 */
function onDataChange_input(oldValue, newValue, event) {
	application.output('onDataChange called from ' + event.getElementName());
	return false;
}

/**
 *
 * @param {JSEvent} event
 *
 * @private
 *
 * @properties={typeid:24,uuid:"AF061EB1-6264-49FC-B010-A70C0396211B"}
 */
function onFocusGained_input(event) {
	application.output('onFocusGained called from ' + event.getElementName());
}

/**
 *
 * @param {JSEvent} event
 *
 * @private
 *
 * @properties={typeid:24,uuid:"065EC1DF-D22F-49A8-83B3-46509C6C2251"}
 */
function onFocusLost_input(event) {
	application.output('onFocusLost called from ' + event.getElementName());
}

/**
 *
 * @param {JSEvent} event
 *
 * @private
 *
 * @properties={typeid:24,uuid:"F74771C9-DCB5-406C-BF32-74B4AE06C388"}
 */
function onRightClick_input(event) {
	application.output('onRightClick called from ' + event.getElementName());
}

/**
 *
 * @param {JSEvent} event
 * @param {String} btnName
 * @param {String} btnText
 * @param {Number} btnIndex
 *
 * @private
 *
 * @properties={typeid:24,uuid:"6D4932F2-5C44-472B-8A57-8FB3A1CA5A41"}
 */
function onAction_button(event, btnName, btnText, btnIndex) {
	application.output('onAction called from button "' + (btnText || btnName) + '" from ' + event.getElementName());
}

/**
 *
 * @param {JSEvent} event
 * @param {String} btnName
 * @param {String} btnText
 * @param {Number} btnIndex
 *
 * @private
 *
 * @properties={typeid:24,uuid:"28F6FBE1-8E86-4D1C-BB97-BE71A66F4D83"}
 */
function onDoubleClick_button(event, btnName, btnText, btnIndex) {
	application.output('onDoubleClick called from button "' + (btnText || btnName) + '" from ' + event.getElementName());
}

/**
 *
 * @param {JSEvent} event
 * @param {String} btnName
 * @param {String} btnText
 * @param {Number} btnIndex
 *
 * @private
 *
 * @properties={typeid:24,uuid:"5685878F-2516-4052-B95C-1EB6A1324755"}
 */
function onRightClick_button(event, btnName, btnText, btnIndex) {
	application.output('onRightClick called from button "' + (btnText || btnName) + '" from ' + event.getElementName());
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"F9CB15B3-4687-40DA-B7EE-344CBF933B3A"}
 */
function onAction_api_create_group(event) {
	elements.input_group_11.clearAddOns();
	elements.input_group_11.clearAddOnButtons();
	elements.input_group_11.setAddOns([{text: '@'}]);
	elements.input_group_11.setAddOnButtons([{position: 'RIGHT', name: 'btnSearch', imageStyleClass: 'glyphicon glyphicon-search', onAction: onAction_button}, {text: 'Search', position: 'RIGHT', styleClass: 'btn-primary', onAction: onAction_button}]);
}
