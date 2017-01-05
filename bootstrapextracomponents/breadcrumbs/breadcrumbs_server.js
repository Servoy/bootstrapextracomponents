/**
 * Sets all crumbs
 *
 * @param {Array<bootstrapextracomponents-breadcrumbs.crumb>} crumbs
 */
$scope.api.setCrumbs = function(crumbs) {
	$scope.model.breadcrumbs = crumbs;
}

/**
 * Adds a crumb at the end
 *
 * @param {bootstrapextracomponents-breadcrumbs.crumb} crumb
 */
$scope.api.addCrumb = function(crumb) {
	if (!$scope.model.breadcrumbs) {
		$scope.model.breadcrumbs = [crumb];
	} else {
		$scope.model.breadcrumbs.push(crumb);
	}
}

/**
 * Removes all crumbs after the given index
 *
 * @param {Number} index
 */
$scope.api.removeCrumbsAfter = function(index) {
	if ($scope.model.breadcrumbs) {
		$scope.model.breadcrumbs.splice(index + 1, $scope.model.breadcrumbs.length - index - 1);
	}
}

/**
 * Removes the last crumb
 */
$scope.api.removeLastCrumb = function() {
	if ($scope.model.breadcrumbs) {
		$scope.model.breadcrumbs.pop();
	}
}