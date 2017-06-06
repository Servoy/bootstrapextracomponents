angular.module('bootstrapextracomponentsInputGroup', ['servoy']).directive('bootstrapextracomponentsInputGroup',
	function($formatterUtils) {
		return {
			restrict: 'E',
			scope: {
				model: "=svyModel",
				api: "=svyApi",
				handlers: "=svyHandlers"
			},
			link: function($scope, $element, $attrs) {

				var formatState = null;
				var child = $element.children().children();
				var ngModel = child.controller("ngModel");

				$scope.$watch('model.format', function() {
						if ($scope.model.format) {
							if (formatState) {
								formatState(value);
							} else {
								formatState = $formatterUtils.createFormatState($element, $scope, ngModel, true, $scope.model.format);
							}
						}
					})
					
				$scope.hasLeftButtons = function() {
					return filterButtons('LEFT').length > 0;
				}
					
				$scope.hasRightButtons = function() {
					return filterButtons('RIGHT').length > 0;
				}
				
				function filterButtons(position) {
					if (!$scope.model.addOnButtons) {
						return [];
					}
					function filterButtons(addOnBtn) {
						return addOnBtn.position == position;
					}
					return $scope.model.addOnButtons.filter(filterButtons);
				}

				/**
				 * Request the focus to this text field.
				 * @example %%prefix%%%%elementName%%.requestFocus();
				 */
				$scope.api.requestFocus = function() {
					$element.find('input')[0].focus();
				}
						
			},
			controller: function($scope, $element, $attrs, $window, $parse,$utils) {
				/**
				 * Perform onAction of button
				 */
				$scope.buttonClicked = function(event, btnText, btnIndex) {
					var btn = $scope.model.addOnButtons[btnIndex];
					var jsEvent;
					if (btn && btn.onAction) {
						jsEvent = $utils.createJSEvent(event,'action');
						jsEvent.data = btnText;
						$window.executeInlineScript(btn.onAction.formname, btn.onAction.script, [jsEvent, btn.name, btnText, btnIndex])
					} else if (btn && event.type == 'dblclick' && btn.onDoubleClick) {
						jsEvent = $utils.createJSEvent(event,'doubleclick');
						jsEvent.data = btnText;
						$window.executeInlineScript(btn.onDoubleClick.formname, btn.onDoubleClick.script, [jsEvent, btn.name, btnText, btnIndex])
					} else if (btn && event.type == 'contextmenu' && btn.onRightClick) {
						jsEvent = $utils.createJSEvent(event,'rightclick');
						jsEvent.data = btnText;
						$window.executeInlineScript(btn.onRightClick.formname, btn.onRightClick.script, [jsEvent, btn.name, btnText, btnIndex])
					}
				}
			},
			templateUrl: 'bootstrapextracomponents/inputgroup/inputgroup.html'
		};
	})