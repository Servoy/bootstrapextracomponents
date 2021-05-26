angular.module('bootstrapextracomponentsSwitch', ['servoy', 'frapontillo.bootstrap-switch']).directive('bootstrapextracomponentsSwitch', function($apifunctions, $svyProperties, $formatterUtils, $sabloConstants, $timeout) {
		return {
			restrict: 'E',
			scope: {
				name: "=",
				model: "=svyModel",
				handlers: "=svyHandlers",
				api: "=svyApi",
				svyServoyapi: "="
			},
			link: function($scope, $element, $attrs) {
				
				// set selection
				$scope.selection = getSelectionFromDataprovider();
				
				// StyleClass applied while the switch is still initializing. Will be removed as soon dataProvider selection is set
				// Optionally used to hide the component while the state is yet 'indeterminate'
				$scope.initStyleClass = "bts-extra-switch-initializing";

				$scope.switchClicked = function() {
					if ($scope.model.enabled == false) {
						return;
					}
					
					if ($scope.model.selectedValue) {
						$scope.model.dataProviderID = $scope.model.dataProviderID == $scope.model.selectedValue ? null : $scope.model.selectedValue;
					} else if (angular.isString($scope.model.dataProviderID)) {
						$scope.model.dataProviderID = $scope.model.dataProviderID == "1" ? "0" : "1";
					} else {
						$scope.model.dataProviderID = $scope.model.dataProviderID > 0 ? 0 : 1;
					}
					$scope.svyServoyapi.startEdit('dataProviderID');
					$scope.svyServoyapi.apply('dataProviderID')
					if ($scope.handlers.onActionMethodID) {
						$scope.handlers.onActionMethodID(event)
					}
				}
				
				function getSelectionFromDataprovider() {
					if (!$scope.model.dataProviderID) return false;
					if ($scope.model.selectedValue) {
						return $scope.model.dataProviderID == $scope.model.selectedValue;
					}
					if (angular.isString($scope.model.dataProviderID)) {
						return $scope.model.dataProviderID == "1";
					} else {
						return $scope.model.dataProviderID > 0;
					}
				}

				var tooltipState = null;
				Object.defineProperty($scope.model, $sabloConstants.modelChangeNotifier, {
						configurable: true,
						value: function(property, value) {
							switch (property) {
							case "dataProviderID": 
								// 
								$scope.selection = getSelectionFromDataprovider();
								// using timeout because such call should run at the next digest loop when the switch visibility is toggled together with the dataprovider value
								$timeout(function () {
									$element.find("input").bootstrapSwitch('state', $scope.selection, false);
									
									// at next digest loop change the initStyleClass
									$timeout(function () {
										$scope.initStyleClass = "";
									})
								})
								break;
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
						$element.find("input").bootstrapSwitch('destroy');
						destroyListenerUnreg();
						delete $scope.model[$sabloConstants.modelChangeNotifier];
					});
				// data can already be here, if so call the modelChange function so
				// that it is initialized correctly.
				var modelChangFunction = $scope.model[$sabloConstants.modelChangeNotifier];
				for (key in $scope.model) {
					modelChangFunction(key, $scope.model[key]);
				}

				/**
				 * Request the focus to this switch.
				 *
				 * @example %%prefix%%%%elementName%%.requestFocus();
				 */
				$scope.api.requestFocus = function() {
					var input = $element.find('label');
					input[0].focus();
				}

			},
			controller: function($scope, $element, $attrs) {
				var label = $element.find("label");
				
				label.bind("keydown keypress", function(event) {
						switch (event.which) {
						case 13:	// ENTER
						case 32:	// SPACE
							$scope.switchClicked(event);
							event.preventDefault();
							break;
						default:
							break;
						}
					});
			},
			templateUrl: 'bootstrapextracomponents/switch/switch.html'
		};
	})
