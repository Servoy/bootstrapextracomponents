/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"88D37B10-370F-4A23-8C22-0A30A1BC4C93"}
 */
var searchField;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"20E9D172-F2D0-420B-85ED-A2B5E1FE0570",variableType:4}
 */
var invertedNavbar = 0;

/**
 * Called whenever a menu item is clicked or a submenu item is selected with the JSEvent and the menuItem object clicked on.
 *
 * @param {JSEvent} event
 * @param {bootstrapextracomponents-navbar.menuItem} menuItem
 *
 * @private
 *
 * @properties={typeid:24,uuid:"1C2DE078-10A9-418B-BD65-D909FBEB82F1"}
 */
function onMenuItemClicked(event, menuItem) {
	elements.lblLastClick.text = 'Menu item "' + menuItem.itemText + '" with ID ' + menuItem.itemId;
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
 * @properties={typeid:24,uuid:"D19F4982-AA64-4B3F-A77B-2D23AF2180AF"}
 */
function onDataChange_inverted(oldValue, newValue, event) {
	elements.navbar.inverse = newValue ? true : false;
	return true
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"6C2A9AC6-8498-46A2-AA71-BE3EDDB0DD34"}
 */
function onAction_createMenu(event) {
	var menuItems = [];
	
	menuItems.push({itemId: '1', itemText: 'Accounts'});
	menuItems.push({itemId: '2', itemText: 'Invoices'});
	menuItems.push({itemId: '3', itemText: 'Click me', displayType: 'BUTTON'});
	menuItems.push({itemId: '4', itemText: 'Payables'});
	menuItems.push({itemId: '5', itemText: 'Search account...', displayType: 'INPUT', iconName: 'glyphicon glyphicon-search'});
	menuItems.push({itemId: '6', itemText: 'Menu', position: 'RIGHT', subMenuItems: [{itemId: '6.1', itemText: 'Action'}, {itemId: '6.2', itemText: 'More action'}, {isDivider: true}, {itemId: '6.3', itemText: 'Last action'}]});
	menuItems.push({itemId: '7', itemText: 'Logged in as John Doe', displayType: 'TEXT', position: 'RIGHT'});
	
	elements.navbar.brandText = 'Accounting';
	elements.navbar.setMenuItems(menuItems);
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"AC5386BE-7204-4FB0-9D23-D38A16AE2FDE"}
 */
function onAction_addItem(event) {
	elements.navbar.addMenuItem({itemId: application.getUUID().toString(), itemText: 'Item added'});
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"B4E14E6F-6ED0-4130-B92E-24422C07CB3B"}
 */
function onAction_removeItem(event) {
	var items = elements.navbar.menuItems;
	
	var maxValue = items.length;
	var randNumber = Math.floor(Math.random() * maxValue) + 1;
	var randomItem = items[randNumber-1];
	
	elements.navbar.removeMenuItem(randomItem.itemId);
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"EFD5D754-D9C0-4389-8EE9-D66737CB2A96"}
 */
function onAction_setSelected(event) {
	var items = elements.navbar.menuItems;
	
	var maxValue = items.length;
	var randNumber = Math.floor(Math.random() * maxValue) + 1;
	var randomItem = items[randNumber-1];
	
	elements.navbar.setMenuSelected(randomItem.itemId);
}
