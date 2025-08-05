
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
	var menuItems = [
		{itemId: 1, text: 'Action', iconName: scopes.faIcons.getRandomIcon()},
		{itemId: 2, text: 'More action', iconName: scopes.faIcons.getRandomIcon()},
		{isDivider: true},
		{itemId: 3, text: 'Last action', iconName: scopes.faIcons.getRandomIcon()}
	];
	
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
	var itemToAdd = {itemId: elements.dropdown_api.menuItems.length + 1, text: 'Very last action', iconName: scopes.faIcons.getRandomIcon()};
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
