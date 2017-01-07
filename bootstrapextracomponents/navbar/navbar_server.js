$scope.api.setMenuItems = function(menuItems) {
	for (var i = 0; i < menuItems.length; i++) {
		setItemDefaults(menuItems[i]);
	}
	$scope.model.menuItems = menuItems;
}

$scope.api.addMenuItem = function(menuItem) {
	setItemDefaults(menuItem);
	if ($scope.model.menuItems) {
		$scope.model.menuItems.push(menuItem);
	} else {
		$scope.model.menuItems = [menuItem];		
	}
}

$scope.api.removeMenuItem = function(menuItemId) {
	for (var i = 0; i < $scope.model.menuItems.length; i++) {
		if ($scope.model.menuItems[i].itemId == menuItemId) {
			$scope.model.menuItems.splice(i, 1);
			break;
		}
	}
}

$scope.api.setMenuSelected = function(menuItemId) {
	for (var i = 0; i < $scope.model.menuItems.length; i++) {
		if ($scope.model.menuItems[i].itemId == menuItemId) {
			$scope.model.menuItems[i].isActive = true;
		} else if ($scope.model.menuItems[i].isActive) {
			$scope.model.menuItems[i].isActive = false;
		}
	}
}

$scope.api.getSelectedMenu = function() {
	for (var i = 0; i < $scope.model.menuItems.length; i++) {
		if ($scope.model.menuItems[i].isActive) {
			return $scope.model.menuItems[i];
		}
	}
	return null;
}

function setItemDefaults(item) {
	item.displayType = item.displayType || 'MENU_ITEM';
	item.position = item.position || 'LEFT';
	item.enabled = item.enabled === undefined ? true : item.enabled;
	return item;
}