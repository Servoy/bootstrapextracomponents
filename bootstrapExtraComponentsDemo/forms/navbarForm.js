/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"1364DFD3-F21C-43B2-B540-40D20F8E41CE",variableType:8}
 */
var searchTypeahead = 1;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"88D37B10-370F-4A23-8C22-0A30A1BC4C93"}
 */
var searchField = 'Search Text';

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
 * @param {CustomType<bootstrapextracomponents-navbar.menuItem>} menuItem
 *
 * @private
 *
 * @properties={typeid:24,uuid:"1C2DE078-10A9-418B-BD65-D909FBEB82F1"}
 */
function onMenuItemClicked(event, menuItem) {
	if (menuItem.itemId == 4) {
		plugins.webnotificationsToastr.info("Search " + searchField)
	}
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
	elements.navbar.inverse = elements.navbar_servoyMenu.inverse = newValue ? true : false;
	return true
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"6C2A9AC6-8498-46A2-AA71-BE3EDDB0DD34"}
 * @AllowToRunInFind
 */
function onAction_setMenuItems(event) {
	var menuItem,
		menuItems = [];

	menuItem = elements.navbar.createMenuItem('Accounts', '1');
	menuItem.tooltip = 'Accounts';
	menuItems.push(menuItem);

	menuItems.push({ itemId: '2', text: 'Invoices', tooltip: 'Invoices' });
	menuItems.push({ itemId: '3', text: 'Click me', displayType: 'BUTTON', tooltip: 'Button' });
	menuItems.push({ text: 'Payables', tooltip: 'Payables' });

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

	menuItems.push({ itemId: '7', text: 'Logged in as John Doe', tooltip: 'just text', displayType: 'TEXT', position: 'RIGHT' });

	elements.navbar.brandText = 'Accounting';
	elements.navbar.setMenuItems(menuItems);
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"AC5386BE-7204-4FB0-9D23-D38A16AE2FDE"}
 */
function onAction_addMenuItem(event) {
	/** @type {CustomType<bootstrapextracomponents-navbar.menuItem>} */
	var itemToAdd = { itemId: application.getUUID().toString(), text: 'Item added' }
	elements.navbar.addMenuItem(itemToAdd);
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"B4E14E6F-6ED0-4130-B92E-24422C07CB3B"}
 */
function onAction_removeMenuItem(event) {
	var items = elements.navbar.menuItems;

	var maxValue = items.length;
	var randNumber = Math.floor(Math.random() * maxValue) + 1;
	var randomItem = items[randNumber - 1];

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
	var randomItem = items[randNumber - 1];
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
		menuItems.push({ itemId: i, iconName: iconName, tooltip: iconName });
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
function onAction_enableDisableMenuItem(event) {
	var items = elements.navbar.menuItems;
	if (items && items.length > 0) {
		elements.navbar.setMenuItemEnabled(items[0].itemId, !items[0].enabled);
	}
}

/**
 * @properties={typeid:24,uuid:"972F73D6-F645-4BB2-B6A1-F52B7AB90CCC"}
 */
function onActionSearch() {
	plugins.webnotificationsToastr.success("Search " + searchField)
}

/**
 * @properties={typeid:24,uuid:"17ED2B3A-B6F5-4B66-91EF-8BB9F7387FDB"}
 */
function onActionSearchTypeahead() {
	plugins.webnotificationsToastr.success("Search " + searchTypeahead)
}

/**
 * Fired when the button is clicked.
 *
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"DF440E86-6697-4ADF-B3BB-B9510095DD84"}
 */
function onAction_getMenuItem(event) {
	elements.label_get.text = 'Get menu item: ' + elements.navbar.getMenuItem('2').text;
}

/**
 * Fired when the button is clicked.
 *
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"55D955E9-6555-4843-9367-1115F8E1B4A6"}
 */
function onAction_getSelectedMenu(event) {
	elements.label_get.text = 'Get Selected Menu: ' + elements.navbar.getSelectedMenu().text;
}

/**
 * Fired when the button is clicked.
 *
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"5A117D25-37B7-42EB-9712-94D2ECFD6477"}
 */
function onAction_enableDisableSubMenuItem(event) {
	elements.navbar.setSubMenuItemEnabled('3', '3.1', false);
}

/**
 * Fired when the button is clicked.
 *
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"2524366D-4815-4FC3-9A62-FC65CC2B400D"}
 */
function onAction_openSubMenu(event) {
	elements.navbar.openSubMenu('3');
}

/**
 * Fired when the button is clicked.
 *
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"31232432-A9DB-41E1-8AC0-C5225DBD9D49"}
 */
function onAction_requestFocus(event) {
	elements.navbar.requestFocus('1');
}

/**
 * Fired when the button is clicked.
 *
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"CB1CED5B-0ADD-4766-A18A-F6B657021332"}
 */
function onAction_getLocation(event) {
	var location = elements.navbar.getLocation('4');
	elements.label_3c.text = 'Get Location: x: ' + location.x + ' y: ' + location.y;
}

/**
 * Fired when the button is clicked.
 *
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"2F47A515-77BB-4FC5-A327-448BD8A73E0F"}
 */
function onAction_getSize(event) {
	var size = elements.navbar.getSize('4');
	elements.label_3c.text = 'Get size: height: ' + size.height + ' width: ' + size.width;
}

/**
 * Fired when the button is clicked.
 *
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"D309C36B-8B9F-4B27-AC7A-0C8458D6CBA6"}
 */
function onAction_setMenuItems1(event) {
	var menuItem,
		menuItems = [];

	menuItem = elements.navbar_servoyMenu.createMenuItem('Accounts', '1');
	menuItem.tooltip = 'Accounts';
	menuItems.push(menuItem);

	menuItems.push({ itemId: '2', text: 'Invoices', tooltip: 'Invoices' });
	menuItems.push({ itemId: '3', text: 'Click me', displayType: 'BUTTON', tooltip: 'Button' });
	menuItems.push({ text: 'Payables', tooltip: 'Payables' });

	menuItem = elements.navbar_servoyMenu.createMenuItem('Search account...', '5');
	menuItem.displayType = 'INPUT';
	menuItem.iconName = 'glyphicon glyphicon-search';
	menuItem.tooltip = 'Search';
	menuItems.push(menuItem);

	menuItem = elements.navbar_servoyMenu.createMenuItem('Menu', '6', 'RIGHT');
	menuItem.tooltip = 'A Submenu';
	var submenuItems = [];
	submenuItems.push(elements.navbar_servoyMenu.createMenuItem('Action', '6.1'));
	submenuItems.push(elements.navbar_servoyMenu.createMenuItem('More action', '6.2'));
	submenuItems.push(elements.navbar_servoyMenu.createMenuItem('Last action', '6.3'));
	menuItem.subMenuItems = submenuItems;
	menuItems.push(menuItem);

	menuItems.push({ itemId: '7', text: 'Logged in as John Doe', tooltip: 'just text', displayType: 'TEXT', position: 'RIGHT' });

	elements.navbar_servoyMenu.brandText = 'Accounting';
	elements.navbar_servoyMenu.setMenuItems(menuItems);
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"F64FD2D4-8269-418D-949D-725AA83D2491"}
 */
function onAction_addMenuItem1(event) {
	/** @type {CustomType<bootstrapextracomponents-navbar.menuItem>} */
	var itemToAdd = { itemId: application.getUUID().toString(), text: 'Item added' }
	elements.navbar_servoyMenu.addMenuItem(itemToAdd);
}

/**
 * @param event
 *
 * @properties={typeid:24,uuid:"E4A33195-A933-43CF-A7D7-25B827946978"}
 */
function onAction_removeMenuItem1(event) {
	//TODO: Does this work with servoy menu?	
	elements.navbar_servoyMenu.removeMenuItem('menuitem6');
}

/**
 * @param event
 *
 * @properties={typeid:24,uuid:"4E419FDF-BEBC-4F93-8620-84A611EC256A"}
 */
function onAction_setSelected1(event) {
	//TODO: Does this work with servoy menu?
}

/**
 * @param event
 *
 * @properties={typeid:24,uuid:"0B9AD789-4B73-4CB1-9525-7E988FCFC0C3"}
 */
function onAction_createIconMenu1(event) {
	var menuItems = [];
	for (var i = 1; i <= 15; i++) {
		var iconName = scopes.faIcons.getRandomIcon('fa-lg');
		menuItems.push({ itemId: i, iconName: iconName, tooltip: iconName });
	}
	elements.navbar_servoyMenu.setMenuItems(menuItems);
}

/**
 * @param event
 *
 * @properties={typeid:24,uuid:"B7ED4A04-F146-461C-BEA8-A2B134DB8C7D"}
 */
function onBrandClicked1(event) {
	elements.lblLastClick1.text = 'Brand Logo/Text clicked';
}


/**
 * @param event
 *
 * @properties={typeid:24,uuid:"BF76A607-3D83-4F3B-8355-9A055F509207"}
 */
function onAction_enableDisableMenuItem1(event) {
	var items = elements.navbar_servoyMenu.servoyMenu;
	if (items) {
		//TODO: Does this work with servoy menu?		
		//elements.navbar_servoyMenu.setMenuItemEnabled(items[0].itemId, !items[0].enabled);
	}
}



/**
 * @param event
 *
 * @properties={typeid:24,uuid:"D48F37DF-C0E2-48EA-83C5-F7E77397D768"}
 */
function onAction_getMenuItem1(event) {
	elements.label_getc.text = 'Get menu item: ' + elements.navbar_servoyMenu.getMenuItem('menuitem12');
}


/**
 * @param event
 *
 * @properties={typeid:24,uuid:"8B5BAD58-F7DC-4F13-993B-329341086038"}
 */
function onAction_getSelectedMenu1(event) {
	//TODO: Does this work with servoy menu?	
	//elements.label_getc.text = 'Get Selected Menu: ' + elements.navbar_servoyMenu.getSelectedMenu().text;
}

/**
 * @param event
 *
 * @properties={typeid:24,uuid:"8AE57AF2-C2F2-4F1C-8AA4-17C24451D47A"}
 */
function onAction_enableDisableSubMenuItem1(event) {
	elements.navbar_servoyMenu.setSubMenuItemEnabled('menuitem1', 'menuitem12', false);
}

/**
 * @param event
 *
 * @properties={typeid:24,uuid:"1F33FDCB-AEE8-4C89-A99E-EF3B02255BE9"}
 */
function onAction_openSubMenu1(event) {
	elements.navbar_servoyMenu.openSubMenu('menuitem1');
}

/**
 * @param event
 *
 * @properties={typeid:24,uuid:"42113012-37E2-428C-B2D5-BD28B79D991A"}
 */
function onAction_requestFocus1(event) {
	elements.navbar_servoyMenu.requestFocus('menuitem5');
}

/**
 * @param event
 *
 * @properties={typeid:24,uuid:"FBE0EC9A-9F28-4A49-A360-B22AC811035B"}
 */
function onAction_getLocation1(event) {
	var location = elements.navbar_servoyMenu.getLocation('menuitem1');
	elements.label_3c.text = 'Get Location: x: ' + location.x + ' y: ' + location.y;
}

/**
 * @param event
 *
 * @properties={typeid:24,uuid:"FFA65F7E-1DF5-4005-8608-89BAC35D7A75"}
 */
function onAction_getSize1(event) {
	var size = elements.navbar_servoyMenu.getSize('menuitem1');
	elements.label_3c.text = 'Get size: height: ' + size.height + ' width: ' + size.width;
}

/**
 * TODO generated, please specify type and doc for the params
 * @param event
 * @param menuItem
 *
 * @properties={typeid:24,uuid:"09E9D676-591E-458B-AB54-1C2B49C9F4EC"}
 */
function onMenuItemClicked1(event, menuItem) {
	if (menuItem.itemId == 4) {
		plugins.webnotificationsToastr.info("Search " + searchField)
	}
	elements.lblLastClick1.text = 'Menu item "' + menuItem.text + '" with ID ' + menuItem.itemId;
}
