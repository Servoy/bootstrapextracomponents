/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"88D37B10-370F-4A23-8C22-0A30A1BC4C93",variableType:8}
 */
var searchField = 4;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"20E9D172-F2D0-420B-85ED-A2B5E1FE0570",variableType:4}
 */
var invertedNavbar = 0;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"C629C89F-A649-4427-8471-4465C34947D9"}
 */
var searchFieldText = "";

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
	elements.lblLastClick.text = 'Menu item "' + menuItem.text + '" with ID ' + menuItem.itemId;
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
 * @AllowToRunInFind
 */
function onAction_createMenu(event) {
	var menuItem,
		menuItems = [];
	
	menuItem = elements.navbar.createMenuItem('Accounts', '1');
	menuItem.tooltip = 'Accounts';
	menuItems.push(menuItem);
	
	menuItems.push({itemId: '2', text: 'Invoices', tooltip: 'Invoices'});
	menuItems.push({itemId: '3', text: 'Click me', displayType: 'BUTTON', tooltip: 'Button'});
	menuItems.push({text: 'Payables', tooltip: 'Payables'});
	
	menuItem = elements.navbar.createMenuItem('Search account...', '5');
	menuItem.displayType = 'INPUT';
	menuItem.iconName = 'glyphicon glyphicon-search';
	menuItem.tooltip = 'Search';
	menuItems.push(menuItem);
	
	menuItem = elements.navbar.createMenuItem('Menu', '6', 'RIGHT');
	menuItem.tooltip = 'A Submenu';
	var submenuItems = [];
	submenuItems.push(elements.navbar.createMenuItem('Action', '6.1'));
	submenuItems.push(elements.navbar.createMenuItem('More action', '6.2'));
	submenuItems.push(elements.navbar.createMenuItem('Last action', '6.3'));
	menuItem.subMenuItems = submenuItems;
	menuItems.push(menuItem);
	
	menuItems.push({itemId: '7', text: 'Logged in as John Doe', tooltip: 'just text', displayType: 'TEXT', position: 'RIGHT'});
	
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
	/** @type {bootstrapextracomponents-navbar.menuItem} */
	var itemToAdd = {itemId: application.getUUID().toString(), text: 'Item added'}
	elements.navbar.addMenuItem(itemToAdd);
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
	//filter only regular menu items, since only those can be selected
	function filterItems(item) {
		return (!item.displayType || (item.displayType == 'MENU_ITEM' && !item.subMenuItems))
	}
	items = items.filter(filterItems);
	//pick random item
	var maxValue = items.length;
	var randNumber = Math.floor(Math.random() * maxValue) + 1;
	var randomItem = items[randNumber-1];
	//set selected
	elements.navbar.setMenuSelected(randomItem.itemId);
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"45BEF13D-9EA4-4FF6-87A8-CD258E3644D4"}
 */
function onAction_createIconMenu(event) {
	var menuItems = [];
	for (var i = 1; i <= 15; i++) {
		var iconName = scopes.faIcons.getRandomIcon('fa-lg');
		menuItems.push({itemId: i, iconName: iconName, tooltip: iconName});
	}
	elements.navbar.setMenuItems(menuItems);
}

/**
 * Called when the user clicks on the brand logo or text.
 *
 * @param {JSEvent} event
 *
 * @private
 *
 * @properties={typeid:24,uuid:"FC8A259F-8EE2-4292-8F30-21E46DE57F40"}
 */
function onBrandClicked(event) {
	elements.lblLastClick.text = 'Brand Logo/Text clicked';
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"DF0B5339-9EDD-4562-B335-A90A68C345EF"}
 */
function onAction_enableDisable(event) {
	var items = elements.navbar.menuItems;
	if (items && items.length > 0) {
		elements.navbar.setMenuItemEnabled(items[0].itemId, !items[0].enabled);
	}
}
