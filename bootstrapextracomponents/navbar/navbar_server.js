/**
 * Sets the menu items of the Navbar
 * 
 * @param {Array<CustomType<bootstrapextracomponents-navbar.menuItem>>} menuItems
 */
$scope.api.setMenuItems = function(menuItems) {
	if ($scope.model.servoyMenu) {
		var servoyMenuItems = $scope.model.servoyMenu.getMenuItems();
		for (var i = 0; i < servoyMenuItems.length; i++) {
			$scope.model.servoyMenu.removeMenuItem(servoyMenuItems[i]);
		}
	}
	for (var i = 0; i < menuItems.length; i++) {
		setItemDefaults(menuItems[i]);
		if ($scope.model.servoyMenu) {
			addMenuItemToServoyMenu(menuItems[i]);
		}
	}
	$scope.model.menuItems = menuItems;
}

/**
 * Adds the given menu item to the Navbar
 * 
 * @param {CustomType<bootstrapextracomponents-navbar.menuItem>} menuItem the menuItem to add
 * @param {Number} [index] optional index where the item will be inserted
 */
$scope.api.addMenuItem = function(menuItem, index) {
	setItemDefaults(menuItem);
	if ($scope.model.servoyMenu) {
		addMenuItemToServoyMenu(menuItem, index);
	} else if ($scope.model.menuItems) {
		if (index >= 0) {
			$scope.model.menuItems.splice(index, 0, menuItem);
		} else {
			$scope.model.menuItems.push(menuItem);
		}
	} else {
		$scope.model.menuItems = [menuItem];
	}
}

/**
 * Creates a new menuItem
 * 
 * @param {String} text the item's text
 * @param {String} [itemId] optional ID to identify the item in scripting
 * @param {String} [position] alignment of the item in the navbar as either LEFT or RIGHT
 * @return {CustomType<bootstrapextracomponents-navbar.menuItem>}
 */
$scope.api.createMenuItem = function(text, itemId, position) {
	return {
		text: text,
		itemId: itemId || Math.ceil(Math.random() * 10000000) + '',
		displayType: 'MENU_ITEM',
		position: position || 'LEFT',
		enabled: true
	}
}

/**
 * Removes the menu item with the given item ID
 * 
 * @param {String} menuItemId
 */
$scope.api.removeMenuItem = function(menuItemId) {
	if ($scope.model.servoyMenu) {
		$scope.model.servoyMenu.removeMenuItem(menuItemId);
	} else if ($scope.model.menuItems) {
		for (var i = 0; i < $scope.model.menuItems.length; i++) {
			if ($scope.model.menuItems[i].itemId == menuItemId) {
				$scope.model.menuItems.splice(i, 1);
				break;
			}
		}
	}
}

/**
 * Sets the menu item with the given item ID to selected
 * 
 * @param {String} menuItemId
 */
$scope.api.setMenuSelected = function(menuItemId) {
	if ($scope.model.servoyMenu) {
		var menuItem = $scope.model.servoyMenu.getSelectedItem();
		if (menuItem && menuItem.getName() == menuItemId) {
			$scope.model.servoyMenu.selectMenuItem(null);
		} else {
			$scope.model.servoyMenu.selectMenuItemById(menuItemId);
		}
	} else if ($scope.model.menuItems) {
		for (var i = 0; i < $scope.model.menuItems.length; i++) {
			if ($scope.model.menuItems[i].itemId == menuItemId) {
				$scope.model.menuItems[i].isActive = true;
			} else if ($scope.model.menuItems[i].isActive) {
				$scope.model.menuItems[i].isActive = false;
			}
		}
	}
}

/**
 * Enables or disables the menu with the given item ID
 * 
 * @param {String} menuItemId
 * @param {Boolean} enabled
 */
$scope.api.setMenuItemEnabled = function(menuItemId, enabled) {
	if ($scope.model.servoyMenu) {
		var menuItem = $scope.model.servoyMenu.getMenuItem(menuItemId);
		if (menuItem) {
			menuItem.enabled = enabled;
		}
	} else if ($scope.model.menuItems) {
		for (var i = 0; i < $scope.model.menuItems.length; i++) {
			if ($scope.model.menuItems[i].itemId == menuItemId) {
				$scope.model.menuItems[i].enabled = enabled;
				break;
			}
		}
	}
}

/**
 * Enables or disables the submenu with the given item ID of the menu with the given item ID
 * 
 * @param {String} menuItemId
 * @param {String} subMenuItemId
 * @param {Boolean} enabled
 */
$scope.api.setSubMenuItemEnabled = function(menuItemId, subMenuItemId, enabled) {
	if ($scope.model.servoyMenu) {
		var menuItem = $scope.model.servoyMenu.getMenuItem(menuItemId);
		if (menuItem) {
			var subMenuItem = menuItem.getMenuItem(subMenuItemId);
			if (subMenuItem) {
				subMenuItem.enabled = enabled;
			}
		}
	} else if ($scope.model.menuItems) {
		for (var i = 0; i < $scope.model.menuItems.length; i++) {
			if ($scope.model.menuItems[i].itemId == menuItemId) {
				if ($scope.model.menuItems[i].subMenuItems) {
					for (var s = 0; s < $scope.model.menuItems[i].subMenuItems.length; s++) {
						if ($scope.model.menuItems[i].subMenuItems[s].itemId == subMenuItemId) {
							$scope.model.menuItems[i].subMenuItems[s].enabled = enabled;
							break;
						}
					}
				}
			}
		}
	}
}

/**
 * Returns the menu item with the given ID or null if not found
 * 
 * @return {CustomType<bootstrapextracomponents-navbar.menuItem>}
 */
$scope.api.getMenuItem = function(itemId) {
	if ($scope.model.servoyMenu) {
		var menuItem = $scope.model.servoyMenu.getMenuItem(itemId);
		if (menuItem) {
			return getMenuItemFromServoyMenuItem(menuItem);
		}
	} else if ($scope.model.menuItems) {
		for (var i = 0; i < $scope.model.menuItems.length; i++) {
			if ($scope.model.menuItems[i].itemId == itemId) {
				return $scope.model.menuItems[i];
			}
		}
	}
	return null;
}

/**
 * Returns the currently selected menu item
 * 
 * @return {CustomType<bootstrapextracomponents-navbar.menuItem>}
 */
$scope.api.getSelectedMenu = function() {
	if ($scope.model.servoyMenu) {
		var menuItem = $scope.model.servoyMenu.getSelectedItem();
		if (menuItem) {
			return getMenuItemFromServoyMenuItem(menuItem);
		}
	} else if ($scope.model.menuItems) {
		for (var i = 0; i < $scope.model.menuItems.length; i++) {
			if ($scope.model.menuItems[i].isActive) {
				return $scope.model.menuItems[i];
			}
		}
	}
	return null;
}

function setItemDefaults(item) {
	item.displayType = item.displayType || 'MENU_ITEM';
	item.position = item.position || 'LEFT';
	item.enabled = item.enabled === undefined ? true : item.enabled;
	item.itemId = item.itemId || Math.ceil(Math.random() * 10000000) + '';
	if (item.subMenuItems && item.subMenuItems.length) {
		for (var i = 0; i < item.subMenuItems.length; i++) {
			var subMenuItem = item.subMenuItems[i];
			subMenuItem.enabled = subMenuItem.enabled === undefined ? true : subMenuItem.enabled;
			subMenuItem.itemId = subMenuItem.itemId || Math.ceil(Math.random() * 10000000) + '';
		}
	}
	return item;
}

function addMenuItemToServoyMenu(item, id) {
	if ($scope.model.servoyMenu) {
		var menuItem;
		if (id >= 0) {
			menuItem = $scope.model.servoyMenu.addMenuItemAt(item.itemId, id);
		}
		else {
			menuItem = $scope.model.servoyMenu.addMenuItem(item.itemId);
		}
		menuItem.menuText = item.text;
		menuItem.enabled = item.enabled;
		menuItem.tooltipText = item.tooltip;
	}
}

function getMenuItemFromServoyMenuItem(jsMenuItem) {
	var item = $scope.api.createMenuItem(jsMenuItem.menuText, jsMenuItem.getName());
	setItemDefaults(item);
	item.enabled = jsMenuItem.enabled;
	item.tooltip = jsMenuItem.tooltipText;
	item.isActive = $scope.model.servoyMenu.getSelectedItem() != null && $scope.model.servoyMenu.getSelectedItem().getName() == jsMenuItem.getName();
	item.styleClass = jsMenuItem.styleClass;
	item.iconName = jsMenuItem.iconStyleClass;
	item.tabindex = jsMenuItem.getExtraProperty('Navbar', 'tabindex');
	item.userData = jsMenuItem.getExtraProperty('Navbar', 'userData');
	item.attributes = jsMenuItem.getExtraProperty('Navbar', 'attributes');
	var position = jsMenuItem.getExtraProperty('Navbar', 'position');
	if (position) {
		item.position = position;
	}
	item.displayType = jsMenuItem.getExtraProperty('Navbar', 'displayType');
	item.dataProvider = jsMenuItem.getExtraProperty('Navbar', 'dataProviderValue');
	item.valuelist = jsMenuItem.getExtraProperty('Navbar', 'valuelist');
	item.inputButtonText = jsMenuItem.getExtraProperty('Navbar', 'inputButtonText');
	item.inputButtonStyleClass = jsMenuItem.getExtraProperty('Navbar', 'inputButtonStyleClass');
	return item;
}