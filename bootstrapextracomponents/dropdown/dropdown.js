angular.module('bootstrapextracomponentsDropdown', ['servoy']).directive('bootstrapextracomponentsDropdown', function() {
		return {
			restrict: 'E',
			scope: {
				model: '=svyModel',
				api: "=svyApi",
				handlers: "=svyHandlers",
				svyServoyapi: "="
			},
			controller: function($scope, $element, $attrs, $window) {
				$scope.status = {
					isopen: false
				};
				
				if (!$scope.model.menuItems) {
					$scope.model.menuItems = [];
				}
				
				function getItem(event) {
					try {
						var itemId = event.target.getAttribute('data-menu-item-id');
						var itemClicked;
						if (!itemId) {
							console.log('dropdown item "' + event.target.text + '" has no itemId');
						} else {
							for (var i = 0; i < $scope.model.menuItems.length; i++) {
								var menuItem = $scope.model.menuItems[i];
								if (menuItem.itemId == itemId || menuItem.text == itemId) {
									itemClicked = menuItem;
									break;
								}
							}
							if (itemClicked) {
								itemClicked.displayValue = event.target.value;
							}
							return itemClicked;
						}
					} catch (e) {
						console.log('Error when trying to figure out dropdown itemId: ' + e.message);
					}
					return null;
				}
				
				function createItemArg(item) {
					var itemText = item.text;
					if (item.displayValue) {
						itemText = item.displayValue;
					}
					return { itemId: item.itemId ? item.itemId : null, text: itemText ? itemText : null, userData: item.userData ? item.userData : null };
				}
				
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
					var jsEvent = { svyType: 'JSEvent' };

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

				$scope.dropDownClicked = function(event) {
					var element = event.currentTarget;
					var ul = $('#button-dropdown-ul-' + $scope.model.svyMarkupId);
					if (element && ul) {
						var boundingRect = element.getBoundingClientRect();
						ul.attr('style', 'position: fixed; left: ' + boundingRect.left + 'px; top: ' + (boundingRect.top + boundingRect.height + 2) + 'px;')
					}
					if (event.target.id === 'button-dropdown-' + $scope.model.svyMarkupId) {
						//click on the menu caret on a split button or on a non split button
						return;
					}
					if (event.target.id === 'button-' + $scope.model.svyMarkupId) {
						//click on the button (not the menu caret) of a split button
						if ($scope.handlers.onAction){
							$scope.handlers.onAction(event);
						}
						return;
					}
					var li = $(event.target).closest('li');
					if (li && li.hasClass('disabled')) {
						//disabled entry
						return;
					}
					var itemClicked = getItem(event);
					if (itemClicked && itemClicked.onAction) {
						var jsEvent = createJSEvent(event);
						$window.executeInlineScript(itemClicked.onAction.formname, itemClicked.onAction.script, [jsEvent, createItemArg(itemClicked)]);
					} else if (itemClicked && $scope.handlers.onMenuItemSelected) {
						$scope.handlers.onMenuItemSelected(event, createItemArg(itemClicked));
					}
				}
			},
			templateUrl: 'bootstrapextracomponents/dropdown/dropdown.html'
		};
	})