/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"DACBF2BB-E4A4-4963-B20E-FAEBC5DE6D20"}
 */
var tooltipTextDP = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"F5C77416-8FD1-4D1F-9BA1-27E06E28A939"}
 */
var imageStyleClassDP = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"B51328FC-237D-4DF8-8ADE-39584C3F8A23"}
 */
var textDP = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"F2FFFE34-BA7B-4E54-A4FA-A529DA94CC4D"}
 */
var styleClassDP = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"A85A630A-B4B0-42CB-BD03-96B8427B5302"}
 */
var buttonStyleClassDP = null;

/**
 * @properties={typeid:35,uuid:"91D2D0EB-0022-4688-B9BB-7628E9F8398F",variableType:-4}
 */
var visibleDP = true;

/**
 * @properties={typeid:35,uuid:"6B7AE501-B69A-4970-A5FD-62B0B6BFA678",variableType:-4}
 */
var enabledDP = true;

/**
 * @param {JSEvent} event
 * @param {CustomType<bootstrapextracomponents-dropdown.MenuItem>} menuItem
 *
 * @private
 *
 * @properties={typeid:24,uuid:"2E82BBE7-3AE3-4F8E-9612-B3C624F04233"}
 */
function onMenuItemSelected(event, menuItem) {
	elements.lblLastAction.text = 'Menu item selected from button ' + event.getElementName() + ': ' + JSON.stringify(menuItem);
}

/**
 * @param {JSEvent} event
 *
 * @private
 *
 * @properties={typeid:24,uuid:"A0C402B8-B346-4D80-95F9-33EE58B0C564"}
 */
function onAction_splitButton(event) {
	elements.lblLastAction.text = 'Split button ' + event.getElementName() + ' clicked';
}

/**
 * @param {JSEvent} event
 * @param {CustomType<bootstrapextracomponents-dropdown.MenuItem>} menuItem
 *
 * @private
 *
 * @properties={typeid:24,uuid:"5E091434-C4BC-4F14-826C-D39A2635E9C7"}
 */
function onAction_singleMenuItem(event, menuItem) {
	elements.lblLastAction.text = 'Item specific onAction called from button ' + event.getElementName() + ': ' + JSON.stringify(menuItem);
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"C0010BD5-9F61-4511-BADF-54D531CCEFAE"}
 */
function onAction_createDropDown(event) {
	elements.dropdown_api.text = 'Created by API';
	elements.dropdown_api.styleClass = 'btn-success';

	/** @type {Array<CustomType<bootstrapextracomponents-dropdown.MenuItem>>} */
	var menuItems = [{ itemId: 1, text: 'Action', iconName: scopes.faIcons.getRandomIcon() }, { itemId: 2, text: 'More action', iconName: scopes.faIcons.getRandomIcon() }, { isDivider: true }, { itemId: 3, text: 'Last action', iconName: scopes.faIcons.getRandomIcon() }];

	elements.dropdown_api.setMenuItems(menuItems);
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"FC2A8371-DDFE-4219-B6C9-32B08625E1E6"}
 */
function onAction_addMenuItems(event) {
	/** @type {CustomType<bootstrapextracomponents-dropdown.MenuItem>} */
	var itemToAdd = { itemId: elements.dropdown_api.menuItems.length + 1, text: 'Very last action', iconName: scopes.faIcons.getRandomIcon() };
	elements.dropdown_api.addMenuItem(itemToAdd);
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"97E7AE30-2519-45EB-B002-804AA928CAFA"}
 */
function onAction_removeMenuItem(event) {
	elements.dropdown_api.removeMenuItem('2');
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"AD63293F-8987-4401-863C-387F6A6A7DE6"}
 */
function onAction_toggleEnabled(event) {
	elements.dropdown_api.enabled = !elements.dropdown_api.enabled;
}

/**
 * Click event. dataTarget parameter is used to identify inner html elements (by their data-target attribute).
 *
 * @param {JSEvent} event
 * @param {String} dataTarget
 *
 * @properties={typeid:24,uuid:"6C8C2593-F5C8-4EB8-9DA2-8D68B77CD1FA"}
 */
function onAction_enabled(event, dataTarget) {
	elements.dropdown_api.enabled = !elements.dropdown_api.enabled
	elements.dropdown_button.enabled = !elements.dropdown_button.enabled
	elements.dropdown_link.enabled = !elements.dropdown_link.enabled
	elements.dropdown_split_button.enabled = !elements.dropdown_split_button.enabled
}

/**
 * Click event. dataTarget parameter is used to identify inner html elements (by their data-target attribute).
 *
 * @param {JSEvent} event
 * @param {String} dataTarget
 *
 * @properties={typeid:24,uuid:"8C4EB77E-76F7-49D2-A9EC-D4EFE25B10CF"}
 */
function onAction_visible(event, dataTarget) {
	elements.dropdown_api.visible = !elements.dropdown_api.visible
	elements.dropdown_button.visible = !elements.dropdown_button.visible
	elements.dropdown_link.visible = !elements.dropdown_link.visible
	elements.dropdown_split_button.visible = !elements.dropdown_split_button.visible
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
 * @properties={typeid:24,uuid:"DAFF9F66-5E64-4806-95C4-EC08C5B6DBED"}
 */
function onDataChange_buttonStyleClass(oldValue, newValue, event) {
	elements.dropdown_api.buttonStyleClass = buttonStyleClassDP
	elements.dropdown_button.buttonStyleClass = buttonStyleClassDP
	elements.dropdown_link.buttonStyleClass = buttonStyleClassDP
	elements.dropdown_split_button.buttonStyleClass = buttonStyleClassDP
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
 * @properties={typeid:24,uuid:"33ACE7E1-BE1C-4FBB-BAEF-D31934CB3705"}
 */
function onDataChange_styleClass(oldValue, newValue, event) {
	elements.dropdown_api.styleClass = styleClassDP
	elements.dropdown_button.styleClass = styleClassDP
	elements.dropdown_link.styleClass = styleClassDP
	elements.dropdown_split_button.styleClass = styleClassDP
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
 * @properties={typeid:24,uuid:"FF0C9D0C-BB7C-4588-8282-6E855A1F1ECA"}
 */
function onDataChange_text(oldValue, newValue, event) {
	elements.dropdown_api.text = textDP
	elements.dropdown_button.text = textDP
	elements.dropdown_link.text = textDP
	elements.dropdown_split_button.text = textDP
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
 * @properties={typeid:24,uuid:"BDBBB671-121E-4240-B991-1AAE0A4681D8"}
 */
function onDataChange_imageStyleClass(oldValue, newValue, event) {
	elements.dropdown_api.imageStyleClass = imageStyleClassDP
	elements.dropdown_button.imageStyleClass = imageStyleClassDP
	elements.dropdown_link.imageStyleClass = imageStyleClassDP
	elements.dropdown_split_button.imageStyleClass = imageStyleClassDP
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
 * @properties={typeid:24,uuid:"28D9A366-C112-4C3F-ADC5-B5E31A241EB0"}
 */
function onDataChange_tooltipText(oldValue, newValue, event) {
	elements.dropdown_api.toolTipText = tooltipTextDP
	elements.dropdown_button.toolTipText = tooltipTextDP
	elements.dropdown_link.toolTipText = tooltipTextDP
	elements.dropdown_split_button.toolTipText = tooltipTextDP	
	return true
}
