angular.module('bootstrapextracomponentsBadge', ['servoy']).directive('bootstrapextracomponentsBadge', function($svyProperties, $sabloConstants) {
		return {
			restrict: 'E',
			scope: {
				model: "=svyModel",
				api: "=svyApi",
				svyServoyapi: "=",
				handlers: "=svyHandlers"
			},
			controller: function($scope, $element, $attrs) {
				var tooltipState = null;
				
				Object.defineProperty($scope.model, $sabloConstants.modelChangeNotifier, {
						configurable: true,
						value: function(property, value) {
							switch (property) {
							case "toolTipText":
								if (tooltipState)
									tooltipState(value);
								else
									tooltipState = $svyProperties.createTooltipState($element, value);
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
				var modelChangeFunction = $scope.model[$sabloConstants.modelChangeNotifier];
				for (key in $scope.model) {
					modelChangeFunction(key, $scope.model[key]);
				}
			},
			templateUrl: 'bootstrapextracomponents/badge/badge.html'
		};
	})