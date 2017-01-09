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
			controller: function($scope, $element, $attrs, $window, $parse) {
				/**
				 * Create a JSEvent from the event given
				 */
				function createJSEvent(event) {
					var targetEl;
	 			      if (event.target) targetEl = event.target;
	 			      else if (event.srcElement) targetEl = event.srcElement;

	 			      var form;
	 			      var parent = targetEl;
	 			      var targetElNameChain = new Array();
	 			      while (parent) {
		 			       form = parent.getAttribute("ng-controller");
			 			       if (form) {
			 			        	break;
			 			       }
			 			       if (parent.getAttribute("name")) targetElNameChain.push(parent.getAttribute("name"));
			 			       parent = parent.parentNode;
	 			      }
	 			      
	 			      //create JSEvent
	 			      var jsEvent = { svyType: 'JSEvent'};
	 			      
	 			      //get event type
	 			      var eventType = 'action';
	 			      if (event.type == 'contextmenu') eventType = 'rightClick';
	 			      else if (event.type == 'dblclick') eventType = 'doubleClick';
	 			      jsEvent.eventType = eventType; 
	 			      
	 			      //get modifiers
	 			      var modifiers = (event.altKey ? 8 : 0) | (event.shiftKey ? 1 : 0) | (event.ctrlKey ? 2 : 0) | (event.metaKey ? 4 : 0);
	 			      jsEvent.modifiers = modifiers;
	 			      
	 			      //TODO: are these the coordinates we need? https://support.servoy.com/browse/SVY-9010
	 			      jsEvent.x = event.pageX;
	 			      jsEvent.y = event.pageY;
	 			      
	 			      jsEvent.data = null;    
	 			      
	 			      var formScope = angular.element(parent).scope();
	 			      for (var i = 0; i < targetElNameChain.length; i++) {
		 			       if (formScope.model[targetElNameChain[i]]) {
			 			        jsEvent.elementName = targetElNameChain[i];
			 			        break;
		 			       }
	 			      }
	 			      return jsEvent;
				}
				
				/**
				 * Perform onAction of button
				 */
				$scope.buttonClicked = function(event, btnText, btnIndex) {
					var btn = $scope.model.addOnButtons[btnIndex];
					var jsEvent;
					if (btn && btn.onAction) {
						jsEvent = createJSEvent(event);
						jsEvent.data = btnText;
						$window.executeInlineScript(btn.onAction.formname, btn.onAction.script, [jsEvent, btn.name, btnText, btnIndex])
					} else if (btn && event.type == 'dblclick' && btn.onDoubleClick) {
						jsEvent = createJSEvent(event);
						jsEvent.data = btnText;
						$window.executeInlineScript(btn.onDoubleClick.formname, btn.onDoubleClick.script, [jsEvent, btn.name, btnText, btnIndex])
					} else if (btn && event.type == 'contextmenu' && btn.onRightClick) {
						jsEvent = createJSEvent(event);
						jsEvent.data = btnText;
						$window.executeInlineScript(btn.onRightClick.formname, btn.onRightClick.script, [jsEvent, btn.name, btnText, btnIndex])
					}
				}
			},
			templateUrl: 'bootstrapextracomponents/inputgroup/inputgroup.html'
		};
	})