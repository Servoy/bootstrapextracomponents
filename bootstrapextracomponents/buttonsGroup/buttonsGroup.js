angular.module('bootstrapextracomponentsButtonsGroup', ['servoy']).directive('bootstrapextracomponentsButtonsGroup', function($utils, $svyProperties, $sabloConstants) {
		return {
			restrict: 'E',
			scope: {
				model: "=svyModel",
				handlers: "=svyHandlers",
				api: "=svyApi",
				svyServoyapi: '=svyServoyapi'
			},
			link: function($scope, $element, $attrs) {
				
				var TYPE = {
					RADIO: 'radio',
					CHECKBOX: 'checkbox'
				}
				

				$scope.notNullOrEmpty = $utils.notNullOrEmpty // adding it to the root scope doesn't fix the resolution of the comparator in the filter (in this directive). it has to be in local scope. TODO remove the need for this
				$scope.selectedValues = {};
				
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
								case "dataProviderID":
									updateSelectedValues(value);
								break;	
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
						var newValue;
						var selectedValue = item.realValue;			
						
						if (oldValue == selectedValue) {	// deselect last value
							if (allowEmptyValuelistItem(item) && oldValue == selectedValue) {	// deselect last option
								newValue = null;
								$scope.selectedValues = {};
							} else { 	// cannot deselect last value
								// Do nothing
								newValue = oldValue;
								return;
							}
						} else {	// select/deselect a value
							if (hasMultiSelection() && isTypeString()) {
								if ($scope.selectedValues[selectedValue]) {	// value is already selected;
									// TODO remove it
									delete $scope.selectedValues[selectedValue];
									var values = $scope.model.dataProviderID.toString().split("\n");	// dataProviderID should be filled since there is a selectedValue
									newValue = values.filter(function (value) {
										return value != selectedValue 
									}).join("\n");
								} else { // value was not selected;
									$scope.selectedValues[selectedValue] = true;
									if (oldValue !== null && oldValue !== undefined && oldValue !== "") {
										newValue = oldValue + '\n' + selectedValue;
									} else {
										newValue = selectedValue;
									}
								}
							} else {
								// update selection
								newValue = selectedValue;
								delete $scope.selectedValues[oldValue];
								$scope.selectedValues[selectedValue] = true;
							}
						}
						
						$scope.model.dataProviderID = newValue;
						$scope.svyServoyapi.apply('dataProviderID');
					}
				}

				$scope.api.onDataChangeCallback = function(event, returnval) {

					if (returnval == false) { // restore the oldValue
						updateSelectedValues(oldValue);
						$scope.model.dataProviderID = oldValue;
						$scope.svyServoyapi.apply('dataProviderID');
					} else {
						oldValue = null;
					}
				}
				
				function updateSelectedValues(value) {
					var selectedValues = {};
					if (value || value == 0) {
						// store clientside selected values
						if (hasMultiSelection()) {
							var values = value.toString().split("\n");
							for (var i = 0; i < values.length; i++) {
								selectedValues[values[i]] = true;
							}
						} else {	// store the selectedValue
							selectedValues[value] = true;
						}
					} 
					$scope.selectedValues = selectedValues;
				}
				
				function isValueSelected(realValue) {
					if ($scope.model.dataProviderID && hasMultiSelection()) {
						console($scope.notNullOrEmpty)
					} else {
						return realValue === $scope.model.dataProviderID;
					}
				}

				function allowEmptyValuelistItem(item) {
					if ($scope.model.valuelistID.length) {
						var item = $scope.model.valuelistID[0];
						return (item.realValue == null || item.realValue == '') && item.displayValue == '';
					}
					return false;
				}
				
				/**
				 * Returns true if allow multiselection with input group 
				 * */
				function hasMultiSelection() {
					return $scope.model.inputType === TYPE.CHECKBOX;
				}
				
				function isTypeString() {
					return  (!$scope.model.format && ($scope.model.dataProviderID === null ||  $scope.model.dataProviderID === undefined)) || ($scope.model.format && $scope.model.format.type === 'TEXT')
				} 
				
				function isTypeNan() {
					return  $scope.model.format && ($scope.model.format.type === 'INTEGER' || $scope.model.format.type === 'NUMBER');
				}
				
				function isTypeBoolean() {
					return  $scope.model.format && $scope.model.format.type === 'MEDIA';
				}
			},
			templateUrl: 'bootstrapextracomponents/buttonsGroup/buttonsGroup.html'
		}
	})
