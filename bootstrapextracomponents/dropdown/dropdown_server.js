/**
 * Sets the menu items of the Dropdown
 * 
 * @param {bootstrapextracomponents-dropdown.MenuItem[]} menuItems
 */
$scope.api.setMenuItems = function(menuItems) {
	for (var i = 0; i < menuItems.length; i++) {
		setItemDefaults(menuItems[i]);
	}
	$scope.model.menuItems = menuItems;
}

/**
 * Adds the given menu item to the Dropdown
 * 
 * @param {bootstrapextracomponents-dropdown.MenuItem} menuItem
 */
$scope.api.addMenuItem = function(menuItem) {
	setItemDefaults(menuItem);
	if ($scope.model.menuItems) {
		$scope.model.menuItems.push(menuItem);
	} else {
		$scope.model.menuItems = [menuItem];		
	}
}

/**
 * Removes the menu item with the given item ID
 * 
 * @param {String} menuItemId
 */
$scope.api.removeMenuItem = function(menuItemId) {
	if (!$scope.model.menuItems || $scope.model.menuItems.length == 0) {
		return;
	}
	for (var i = 0; i < $scope.model.menuItems.length; i++) {
		if ($scope.model.menuItems[i].itemId == menuItemId) {
			$scope.model.menuItems.splice(i, 1);
			break;
		}
	}
}

function setItemDefaults(item) {
	item.itemId = (item.itemId || Math.ceil(Math.random() * 10000000)) + '';
	return item;
}