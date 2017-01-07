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

				/**
				 * Request the focus to this text field.
				 * @example %%prefix%%%%elementName%%.requestFocus();
				 */
				$scope.api.requestFocus = function() {
					$element.find('input')[0].focus();
				}
				
				/**
				 * Adds an addOn to this input group
				 * 
				 * AddOn has the following properties:
				 * 
				 * text - the text of the item
				 * position - LEFT or RIGHT (defaults to LEFT)
				 * 
				 * @param {AddOn} addOnToAdd - object with text, position (LEFT, RIGHT)
				 */
				$scope.api.addAddOn = function(addOnToAdd) {
					if (!$scope.model.addOns) {
						$scope.model.addOns = [addOnToAdd];
					} else {
						$scope.model.addOns.push(addOnToAdd);
					}
				}
				
				/**
				 * Sets all addOns of this input group
				 * 
				 * AddOn has the following properties:
				 * 
				 * text - the text of the item
				 * position - LEFT or RIGHT (defaults to LEFT)
				 * 
				 * @param {Array<AddOn>} addOns - Array of objects with text, position (LEFT, RIGHT)
				 */
				$scope.api.setAddOns = function(addOns) {
					$scope.model.addOns = addOns;
				}
				
				/**
				 * Removes all addOns from this input group
				 */
				$scope.api.clearAddOns = function() {
					$scope.model.addOns = null;
				}				
				
				/**
				 * Adds an addOnButton to this input group
				 * 
				 * AddOnButton has the following properties:
				 * 
				 * text - the button text
				 * position - LEFT or RIGHT (defaults to RIGHT)
				 * onActionMethodID - function to be called on button click
				 * onDoubleClickMethodID - function to be called on button double click
				 * onRightClickMethodID - function to be called on button right click
				 * styleClass - the style class of the button (e.g. btn-danger)
				 * imageStyleClass - image style class of the button
				 * 
				 * @param {AddOnButton} addButtonOnToAdd
				 */
				$scope.api.addAddOnButton = function(addButtonOnToAdd) {
					if (!$scope.model.addOnButtons) {
						$scope.model.addOnButtons = [addButtonOnToAdd];
					} else {
						$scope.model.addOnButtons.push(addButtonOnToAdd);
					}
				}	
				
				/**
				 * Sets all addOnButtons of this input group
				 * 
				 * AddOnButton has the following properties:
				 * 
				 * text - the button text
				 * position - LEFT or RIGHT (defaults to RIGHT)
				 * onActionMethodID - function to be called on button click
				 * onDoubleClickMethodID - function to be called on button double click
				 * onRightClickMethodID - function to be called on button right click
				 * styleClass - the style class of the button (e.g. btn-danger)
				 * imageStyleClass - image style class of the button
				 * 
				 * @param {Array<AddOnButton>} addOnButtons
				 */
				$scope.api.setAddOnButtons = function(addOnButtons) {
					$scope.model.addOnButtons = addOnButtons;
				}	
				
				/**
				 * Removes all addOnButtons from this input group
				 */
				$scope.api.clearAddOnButtons = function(addOnButtons) {
					$scope.model.addOnButtons = null;
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
					if (btn && btn.onActionMethodID) {
						jsEvent = createJSEvent(event);
						jsEvent.data = btnText;
						$window.executeInlineScript(btn.onActionMethodID.formname, btn.onActionMethodID.script, [jsEvent, btnText])
					} else if (btn && event.type == 'dblclick' && btn.onDoubleClickMethodID) {
						jsEvent = createJSEvent(event);
						jsEvent.data = btnText;
						$window.executeInlineScript(btn.onDoubleClickMethodID.formname, btn.onDoubleClickMethodID.script, [jsEvent, btnText])
					} else if (btn && event.type == 'contextmenu' && btn.onRightClickMethodID) {
						jsEvent = createJSEvent(event);
						jsEvent.data = btnText;
						$window.executeInlineScript(btn.onRightClickMethodID.formname, btn.onRightClickMethodID.script, [jsEvent, btnText])
					}
				}
			},
			templateUrl: 'bootstrapextracomponents/inputgroup/inputgroup.html'
		};
	})