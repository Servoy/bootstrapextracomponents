angular.module('bootstrapextracomponentsButtonsRadio', ['servoy']).directive('bootstrapextracomponentsButtonsRadio', function($utils, $svyProperties, $sabloConstants) {
		return {
			restrict: 'E',
			scope: {
				model: "=svyModel",
				handlers: "=svyHandlers",
				api: "=svyApi",
				svyServoyapi: '=svyServoyapi'
			},
			link: function($scope, $element, $attrs) {

				$scope.notNullOrEmpty = $utils.notNullOrEmpty // adding it to the root scope doesn't fix the resolution of the comparator in the filter (in this directive). it has to be in local scope. TODO remove the need for this

				if ($scope.svyServoyapi.isInDesigner()) {
					$scope.model.valuelistID = [{
						displayValue: 'Left',
						realValue: -1
					}, {
						displayValue: 'Middle',
						realValue: 0
					}, {
						displayValue: 'Right',
						realValue: 1
					}];
				}

				var oldValue;
				var tooltipState = null;
				var element = $element.children().first();
				Object.defineProperty($scope.model, $sabloConstants.modelChangeNotifier, {
						configurable: true,
						value: function(property, value) {
							switch (property) {
							case "enabled":
								if (value)
									element.removeAttr("disabled");
								else
									element.attr("disabled", "disabled");
								break;
							case "toolTipText":
								if (tooltipState)
									tooltipState(value);
								else
									tooltipState = $svyProperties.createTooltipState(element, value);
								break;
							}
						}
					});
				var destroyListenerUnreg = $scope.$on("$destroy", function() {
						destroyListenerUnreg();
						delete $scope.model[$sabloConstants.modelChangeNotifier];
					});
				// data can already be here, if so call the modelChange function so
				// that it is initialized correctly.
				var modelChangFunction = $scope.model[$sabloConstants.modelChangeNotifier];
				for (key in $scope.model) {
					modelChangFunction(key, $scope.model[key]);
				}

				$scope.onClick = function(item) {
					// prevent click if is disabled
					if ($scope.model.enabled) {
						// keep the old value. Old value will be restored if onDataChange returns false.
						oldValue = $scope.model.dataProviderID;
						
						// allow deselection
						var selectedValue = item.realValue;
						if (allowEmptyValuelistItem(item) && oldValue == selectedValue) {
							selectedValue = null;
						}
						
						$scope.model.dataProviderID = selectedValue;
						$scope.svyServoyapi.apply('dataProviderID');
					}
				}

				$scope.api.onDataChangeCallback = function(event, returnval) {

					if (returnval == false) { // restore the oldValue
						$scope.model.dataProviderID = oldValue;
						$scope.svyServoyapi.apply('dataProviderID');
					} else {
						oldValue = null;
					}
				}

				function allowEmptyValuelistItem(item) {
					if ($scope.model.valuelistID.length) {
						var item = $scope.model.valuelistID[0];
						return (item.realValue == null || item.realValue == '') && item.displayValue == '';
					}
					return false;
				}
			},
			templateUrl: 'bootstrapextracomponents/buttonsRadio/buttonsRadio.html'
		}
	})
