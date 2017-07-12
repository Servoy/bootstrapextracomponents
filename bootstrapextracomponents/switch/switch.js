angular.module('bootstrapextracomponentsSwitch', ['servoy', 'frapontillo.bootstrap-switch']).directive('bootstrapextracomponentsSwitch', function() {
		return {
			restrict: 'E',
			scope: {
				name: "=",
				model: "=svyModel",
				handlers: "=svyHandlers",
				api: "=svyApi",
				svyServoyapi: "="
			},
			link: function($scope, $element, $attrs, $event) {

				$scope.selection = false;
				$scope.radioSelection = [];
				$scope.isRadio = false;

				$scope.$watch('model.dataProviderID', function() {
						$scope.selection = getSelectionFromDataprovider();
						setSelectionFromDataprovider();
					})

				$scope.$watch('model.valuelistID', function() {
						if ($scope.model.valuelistID) {
							$scope.isRadio = true;
						} else {
							$scope.isRadio = false;
						}
						if ($scope.svyServoyapi.isInDesigner() && !$scope.model.valuelistID) {
							$scope.model.valuelistID = [{ realValue: 1, displayValue: "Item1" }, { realValue: 2, displayValue: "Item2" }, { realValue: 3, displayValue: "Item3" }];
						}
						if (!$scope.model.valuelistID) return; // not loaded yet
						setSelectionFromDataprovider();
					})

				$scope.switchClicked = function($event, $index) {
					//if we are using switch radio - only allow one item to be selected at a time.
					if ($scope.isRadio) {
						$scope.model.dataProviderID = $scope.model.valuelistID[$index].realValue;			
						setSelectionFromDataprovider();
					} else {
						if ($scope.selection) {
							$scope.model.dataProviderID = $scope.model.dataProviderID == $scope.selection ? 0 : $scope.selection;
						} else if (angular.isString($scope.model.dataProviderID)) {
							$scope.model.dataProviderID = $scope.model.dataProviderID == "1" ? "0" : "1";
						} else {
							$scope.model.dataProviderID = $scope.model.dataProviderID > 0 ? 0 : 1;
						}
					}
					$scope.svyServoyapi.apply('dataProviderID');
					if (typeof $scope.handlers.onActionMethodID === 'function')
					$scope.handlers.onActionMethodID($event);

				}

				function setSelectionFromDataprovider() {
					if (!$scope.model.valuelistID) return;
					$scope.radioSelection = [];
					if ($scope.model.dataProviderID === null || $scope.model.dataProviderID === undefined) return;
					var arr = $scope.model.dataProviderID.split ? $scope.model.dataProviderID.split('\n') : [$scope.model.dataProviderID];
					arr.forEach(function(element, index, array) {
							for (var i = 0; i < $scope.model.valuelistID.length; i++) {
								var item = $scope.model.valuelistID[i];
								if (item.realValue && item.realValue == element)
									$scope.radioSelection[i] = $scope.model.dataProviderID;
							}
					});
				}

				function getSelectionFromDataprovider() {
					if ($scope.isRadio) {
						var ret = "";
						$scope.radioSelection.forEach(function(element, index, array) {
							if (element == true) ret += $scope.model.valuelistID[index].realValue + '\n';
						});
						if (ret === "") ret = null
						return ret;
					} else {

						if (!$scope.model.dataProviderID) return false;
						if ($scope.selection) {
							return $scope.model.dataProviderID == $scope.selection;
						}
						if (angular.isString($scope.model.dataProviderID)) {
							return $scope.model.dataProviderID == "1";
						} else {
							return $scope.model.dataProviderID > 0;
						}
					}
				}

				/**
				 * Request the focus to this switch.
				 *
				 * @example %%prefix%%%%elementName%%.requestFocus();
				 */
				$scope.api.requestFocus = function(mustExecuteOnFocusGainedMethod) {
					$element.find('input')[0].focus();
					
				}
			},
			templateUrl: 'bootstrapextracomponents/switch/switch.html'
		};
	})
