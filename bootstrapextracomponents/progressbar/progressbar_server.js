/**
 * Sets the progress, optionally setting the text of the bar
 *
 * @param {Number} value
 * @param {String} text
 */
$scope.api.setProgress = function(value, text) {
	$scope.model.value = value;
	if (text != undefined) {
		$scope.model.valueText = text;
	}
	$scope.api.updateProgressBar($scope.model.value, $scope.model.valueText);
}