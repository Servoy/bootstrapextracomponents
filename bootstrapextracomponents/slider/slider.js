angular.module('bootstrapextracomponentsSlider', ['servoy', 'rzModule', 'servoyformat'])
	.directive('bootstrapextracomponentsSlider', ['$formatterUtils', '$timeout', '$sabloConstants', '$utils', 
		function($formatterUtils, $timeout, $sabloConstants, $utils) {
		return {
			restrict: 'E',
			scope: {
				model: '=svyModel',
				api: "=svyApi",
				handlers: "=svyHandlers",
				svyServoyapi: "="
			},
			controller: function($scope, $element, $attrs) {
				var options = {
//					floor: 0,
//				    ceil: 100000, //defaults to rz-slider-model
//				    step: 500,
//				    precision: 0,
//				    minLimit: null,
//				    maxLimit: null,
//				    minRange: null,
//				    maxRange: null,
//				    pushRange: false,
//				    id: null,
//				    translate: formatValue,
//				    getLegend: null,
//				    stepsArray: null,
//				    bindIndexForStepsArray: false,
//				    draggableRange: false,
//				    draggableRangeOnly: false,
//				    showSelectionBar: true,
//				    showSelectionBarEnd: false,
//				    showOuterSelectionBars: false,
//				    showSelectionBarFromValue: null,
//				    hidePointerLabels: false,
//				    hideLimitLabels: false,
//				    autoHideLimitLabels: true,
//				    readOnly: false,
//				    disabled: false,
//				    interval: 500,
//				    showTicks: false,
//				    showTicksValues: false,
//				    ticksArray: null,
//				    ticksTooltip: null,
//				    ticksValuesTooltip: null,
//				    vertical: false,
//				    getSelectionBarColor: null,
//				    getTickColor: null,
//				    getPointerColor: null,
//				    keyboardSupport: true,
//				    scale: 1,
//				    enforceStep: true,
//				    enforceRange: false,
//				    noSwitching: false,
//				    onlyBindHandles: false,
//				    onStart: null,
//				    onChange: null,
//				    onEnd: null,
//				    rightToLeft: false,
//				    reversedControls: false,
//				    boundPointerLabels: true,
//				    mergeRangeLabelsIfSame: false,
//				    customTemplateScope: null,
//				    logScale: false,
//				    customValueToPosition: null,
//				    customPositionToValue: null,
//				    selectionBarGradient: {from: '#46B09C' , to: '#324D5C'},
//				    ariaLabel: null,
//				    ariaLabelledBy: null,
//				    ariaLabelHigh: null,
//				    ariaLabelledByHigh: null
				}
				
				$scope.options = {
					onEnd: onSlideEnd,
					onStart: onSlideStart,					
					translate: formatValue
				};
				
				/**
				 * @type {Function}
				 */
				$scope.formattingFunction = null;
				
				/**
				 * called onSlideEnd
				 */
				function onSlideEnd(sliderId, modelValue, highValue, pointerType) {
					if ($scope.model.dataChangeOnSlideEnd && highValue != null) {
						$scope.svyServoyapi.apply('dataProviderHigh');
					}
					if ($scope.model.dataChangeOnSlideEnd && modelValue != null) {
						$scope.svyServoyapi.apply('dataProvider');
					}
					if ($scope.handlers.onSlideEnd) {
						var event = $utils.createJSEvent({target: $element[0]}, 'onSlideEnd');
						$scope.handlers.onSlideEnd(event, modelValue, highValue);
					}
				}
				
				/**
				 * called onSlideStart
				 */
				function onSlideStart(sliderId, modelValue, highValue, pointerType) {
					if ($scope.handlers.onSlideStart) {
						var event = $utils.createJSEvent({target: $element[0]}, 'onSlideStart');
						$scope.handlers.onSlideStart(event, modelValue, highValue);
					}
				}
				
				/**
				 * Formats a value either using a formattingFunction or the given numberFormat
				 */
				function formatValue(value, sliderId, label) {
					if (!$scope.model.numberFormat || !$scope.formattingFunction || !value) return value;
					if ($scope.formattingFunction) {
						if (label === 'model') {
							label = 'value';
						}
						return $scope.formattingFunction(value, label);
					} else {
						return numberFormat(value, $scope.model.numberFormat.display);
					}
				}
				
				/**
				 * Servoy formatter to format a number with the given Servoy pattern
				 */
				function numberFormat(value, format) {
					return $formatterUtils.format(value, format, 'NUMBER')
				}
				
				Object.defineProperty($scope.model, $sabloConstants.modelChangeNotifier, {
					configurable: true,
					value: function(property, value) {
						switch (property) {
							case "dataProvider":
								break;
							case "dataProviderHigh":
								break;
							case "enabled":
								$scope.options.disabled = !value;
								break;
							case "readOnlySlider":
								$scope.options.readOnly = value;
								break;
							case "readOnly":
								break;
							case "ticksValuesInterval":
								$scope.options.showTicksValues = $scope.model.ticksValuesInterval;
								break;								
							case "ticksInterval":
								if ($scope.model.showTicks) {
									$scope.options.showTicks = $scope.model.ticksInterval;
								} else {
									$scope.options.showTicks = false;
								}
								break;
							case "showTicks":
								if ($scope.model.ticksInterval && $scope.options.showTicks) {									
									$scope.options.showTicks = $scope.model.ticksInterval;
								} else {
									$scope.options.showTicks = $scope.model.showTicks || false;
								}
								break;
							case "styleClass":
								break;
							case "stepsValueList":
								var stepsArray = [];
								for (var vl = 0; vl < value.length; vl++) {
									var item = value[vl];
									if (item.realValue == item.displayValue) {
										//no "legend"										
										stepsArray.push({value: item.realValue})
									} else {
										stepsArray.push({value: item.realValue, legend: item.displayValue})
									}
								}
								$scope.options.stepsArray = stepsArray;
								break;
							case "formattingFunction":
								$scope.formattingFunction = eval('(' + value + ')');
								break;
							case "selectionBarColorFunction":
								$scope.options.getSelectionBarColor = eval('(' + value + ')');
								break;
							case "tickColorFunction":
								$scope.options.getTickColor = eval('(' + value + ')');
								break;
							default:
								$scope.options[property] = value;
						}
					}
				});
				
				/**
				 * @type {Function}
				 */
				var modelChangeFunction = $scope.model[$sabloConstants.modelChangeNotifier];
				for (var key in $scope.model) {
					modelChangeFunction(key, $scope.model[key]);
				}
				
				var destroyListenerUnreg = $scope.$on("$destroy", function() {
					destroyListenerUnreg();
					delete $scope.model[$sabloConstants.modelChangeNotifier];
				});
				
				console.log($scope.options);
				
			},
			link: function($scope, $element, $attrs) {
				$scope.$watch('model.dataProvider', function(newValue, oldValue) {
					if (!$scope.model.dataChangeOnSlideEnd) {
						$scope.svyServoyapi.apply('dataProvider');
					}
				});	
				
				$scope.$watch('model.dataProviderHigh', function(newValue, oldValue) {
					if (!$scope.model.dataChangeOnSlideEnd) {
						$scope.svyServoyapi.apply('dataProviderHigh');
					}
				});	
				
				$scope.api.onDataChangeCallback = function(event, returnval) {
					console.log(returnval);
				}
				
				$scope.api.onDataChangeCallbackHigh = function(event, returnval) {
					console.log(returnval);
				}
			},
			templateUrl: 'bootstrapextracomponents/slider/slider.html'
		};
	}])