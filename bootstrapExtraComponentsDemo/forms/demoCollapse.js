/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"EF3E9ADE-17EF-4F19-81DC-3D589783B0BA"}
 */
var lastActionMsg = null;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"F8CD3D02-F2CC-453F-A3ED-C82EB3473F34",variableType:4}
 */
var basicAccordionMode = elements.basic.accordionMode ? 1 : 0;
	
/**
 * @param {JSEvent} event
 * @param {bootstrapextracomponents-collapse.collapsible} collapsible
 * @param {Number} collapsibleIndex
 *
 * @private
 *
 * @properties={typeid:24,uuid:"DEEBB53F-327D-49B5-AA08-E9C810654C47"}
 */
function onCollapsableShown(event, collapsible, collapsibleIndex) {
	lastActionMsg = 'onCollapsableShown fired from element "' + event.getElementName() + '" , collapsible index ' + collapsibleIndex;
}

/**
 * @param {JSEvent} event
 * @param {bootstrapextracomponents-collapse.collapsible} collapsible
 * @param {Number} collapsibleIndex
 *
 * @private
 *
 * @properties={typeid:24,uuid:"C0684131-CB40-48A5-893C-4BB0DEBC8CEC"}
 */
function onCollapsibleHidden(event, collapsible, collapsibleIndex) {
	lastActionMsg = 'onCollapsibleHidden fired from element "' + event.getElementName() + '" , collapsible index ' + collapsibleIndex;
}

/**
 * @param {JSEvent} event
 * @param {bootstrapextracomponents-collapse.card} card
 * @param {bootstrapextracomponents-collapse.collapsible} collapsible
 * @param {Number} cardIndex
 * @param {Number} collapsibleIndex
 *
 * @private
 *
 * @properties={typeid:24,uuid:"27FB6BAC-0704-488C-812E-2E2D57883ED4"}
 */
function onCardClicked(event, card, collapsible, cardIndex, collapsibleIndex) {
	lastActionMsg = 'onCardClicked fired from element "' + event.getElementName() + '" , collapsible index ' + collapsibleIndex + ', card index ' + cardIndex;
	if (card.cardId === 'btnNewLoan') {
		plugins.dialogs.showWarningDialog('Not implemented', 'Sorry, this feature is not implemented in this demo!');
	}
}

/**
 * @param {JSEvent} event
 *
 * @private
 *
 * @properties={typeid:24,uuid:"C517F075-2891-470C-80D7-CC8D80A8B687"}
 */
function onAction_btnBuildWithAPI(event) {
	var component = elements.basicApi;
	var numOfCollapsibles = component.collapsibles ? component.collapsibles.length + 1 : 1;
	
	if (numOfCollapsibles > 5) {
		component.setCollapsibles([]);
		numOfCollapsibles = 1;
	}
	
	var collapsible = component.createCollapsible('Collapsible #' + numOfCollapsibles);
	collapsible.collapsableId = 'collapsable' + numOfCollapsibles;
	if (numOfCollapsibles === 2) {
		collapsible.styleClass = 'collapse-loans';
	} else if (numOfCollapsibles === 3) {
		collapsible.styleClass = 'collapse-savings';
	} else if (numOfCollapsibles === 4) {
		collapsible.styleClass = 'collapse-checking';
	}
	collapsible.cards.push(component.createCard('Card #1', 'card' + numOfCollapsibles + '.1'));
	collapsible.cards.push(component.createCard('Card #2', 'card' + numOfCollapsibles + '.2'));
	collapsible.cards.push(component.createCard('Card #3', 'card' + numOfCollapsibles + '.3'));
	
	component.addCollapsible(collapsible);
	
	component.accordionMode = basicAccordionMode;
}

/**
 * Handle changed data, return false if the value should not be accepted. In NGClient you can return also a (i18n) string, instead of false, which will be shown as a tooltip.
 *
 * @param {Number} oldValue old value
 * @param {Number} newValue new value
 * @param {JSEvent} event the event that triggered the action
 *
 * @return {Boolean}
 *
 * @private
 *
 * @properties={typeid:24,uuid:"408827AD-6316-43CE-A732-ECD2771FAF6F"}
 */
function onDataChange_basicAccordionMode(oldValue, newValue, event) {
	elements.basic.accordionMode = newValue ? true : false;
	return true
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 * @param {Number} index
 *
 * @private
 *
 * @properties={typeid:24,uuid:"7B65F533-70C0-4A2A-82EB-5092452486CF"}
 */
function onAction_btnBasicToggle(event, index) {
	elements.basic.toggle(index);
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"F9943F03-9932-45B9-A708-1540E23A9546"}
 */
function onAction_btnFormToggle(event) {
	elements.formBased.toggle(0)
	elements.formBased.toggle(1)
}
