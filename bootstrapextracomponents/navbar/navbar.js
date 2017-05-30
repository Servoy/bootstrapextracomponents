angular.module('bootstrapextracomponentsNavbar', ['servoy']).directive('bootstrapextracomponentsNavbar', ["formatFilterFilter", "$http", function(formatFilter, $http) {
		return {
			restrict: 'E',
			scope: {
				model: '=svyModel',
				api: "=svyApi",
				handlers: "=svyHandlers",
				svyServoyapi: "="
			},
			link: function($scope, $element, $attrs) {

				var resolvingDisplayValue = false;

				$scope.formatLabel = function(index) {
					var menuItem = $scope.model.menuItems[index];
					if (!menuItem) {
						return;
					}

					var displayFormat = undefined;
					var type = undefined;
					var displayValue = null;

					var itemValue = menuItem.dataProvider;

					var valueList = menuItem.valuelist;
					if (!valueList) {
						return;
					}
					if (valueList && valueList.length > 0 && valueList[0].displayValue) {
						var found = false;
						var realValue = typeof valueList[0].realValue == "number" && !isNaN(Number(itemValue)) ? Number(itemValue) : itemValue;
						for (var i = 0; i < valueList.length; i++) {
							if (realValue === valueList[i].realValue) {
								displayValue = valueList[i].displayValue;
								found = true;
								break;
							}
						}
						if (!found && typeof realValue === typeof valueList.realValue) {
							if (!resolvingDisplayValue) {
								resolvingDisplayValue = true;
								menuItem.valuelist.getDisplayValue(realValue).then(function(dispValue) {
										menuItem.valuelist.push({ realValue: realValue, displayValue: dispValue });
										resolvingDisplayValue = false;
										$scope.ngModel.$modelValue = null;//needed to force the format to be applied again
									}, function(reason) {
										resolvingDisplayValue = false;
									});
							}
						}
					} else {
						displayValue = itemValue;
					}
					return formatFilter(displayValue, displayFormat, type);
				}

				$scope.doSvyApply = function(event, index) {
					var menuItem = $scope.model.menuItems[index];
					if (!menuItem) {
						return;
					}
					if (angular.element('[typeahead-popup]').attr('aria-hidden') == "true") {
						if (menuItem.valuelist && menuItem.valuelist.length > 0 && menuItem.valuelist[0].displayValue) {
							var hasMatchingDisplayValue = false;
							for (var i = 0; i < menuItem.valuelist.length; i++) {
								if (event.target.value === menuItem.valuelist[i].displayValue) {
									menuItem.dataProvider = menuItem.valuelist[i].realValue;
									hasMatchingDisplayValue = true;
									break;
								}
							}
							if (!hasMatchingDisplayValue) {
								menuItem.dataProvider = null;
								event.target.value = null;
							}
						}
						$scope.svyServoyapi.apply('menuItems[' + index + '].dataProvider');
						$scope.navBarClicked(event, index);
					} else {
						event.target.value = null;
					}
				}

				$scope.onInputChange = function(event, index) {
					$scope.svyServoyapi.apply('menuItems[' + index + '].dataProvider');
				}

				$scope.doBlur = function(event) {
					var target = event.target;
					target.blur();
				}
			},
			controller: function($scope, $element, $attrs, $window) {

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

				function setValueListRealValue(menuItem) {
					if (angular.element('[typeahead-popup]').attr('aria-hidden') == "true") {
						var valueList = menuItem.valuelist;
						var itemValue = menuItem.dataProvider;
						if (!valueList) {
							return itemValue;
						}
						if (valueList && valueList.length > 0 && valueList[0].displayValue) {
							var hasMatchingDisplayValue = false;
							for (var i = 0; i < valueList.length; i++) {
								if (itemValue === valueList[i].displayValue) {
									menuItem.dataProvider = valueList[i].realValue;
									hasMatchingDisplayValue = true;
									break;
								}
							}
							if (!hasMatchingDisplayValue) {
								menuItem.dataProvider = null;
							}
						}
					}
				}

				function getItem(event) {
					try {
						var itemId = event.target.getAttribute('data-menu-item-id');
						var itemClicked;
						if (!itemId) {
							return null;
						} else {
							for (var i = 0; i < $scope.model.menuItems.length; i++) {
								var menuItem = $scope.model.menuItems[i];
								if (menuItem.itemId == itemId) {
									itemClicked = menuItem;
									break;
								}
								if (menuItem.subMenuItems) {
									//dropdown
									for (var s = 0; s < menuItem.subMenuItems.length; s++) {
										if (menuItem.subMenuItems[s].itemId == itemId) {
											itemClicked = menuItem.subMenuItems[s];
											break;
										}
									}
									if (itemClicked) {
										break;
									}
								}
							}
							if (itemClicked && (itemClicked.displayType == 'INPUT' || itemClicked.displayType == 'INPUT_GROUP')) {
								itemClicked.displayValue = event.target.value;
							}
							return itemClicked;
						}
					} catch (e) {
						console.log('Error when trying to figure out navbar itemId: ' + e.message);
					}
					return null;
				}

				function createItemArg(item) {
					var itemText = item.text;
					if (item.displayValue) {
						itemText = item.displayValue;
					}
					if (item.displayType == 'INPUT' || item.displayType == 'INPUT_GROUP') {
						itemText = item.dataProvider + '';
					}
					return { itemId: item.itemId ? item.itemId : null, text: itemText ? itemText : null, userData: item.userData ? item.userData : null };
				}

				function makeItemActive(item) {
					if (!item || !$scope.model.markClickedItemActive) {
						return;
					}
					for (var i = 0; i < $scope.model.menuItems.length; i++) {
						var menuItem = $scope.model.menuItems[i];
						if (menuItem.itemId == item.itemId) {
							menuItem.isActive = true;
						} else if (menuItem.isActive == true) {
							menuItem.isActive = false;
						}
					}
				}

				$scope.navBarClicked = function(event, index) {
					if (event.target.getAttribute('id') == 'navbar-collapse') {
						//click on navbar (background)
						return;
					}
					var li = $(event.target).closest('li');
					if (li && li.hasClass('disabled')) {
						//disabled entry
						return;
					}
					if (event.type == 'click' && event.target.tagName == 'INPUT') {
						//skip simple click in Input
						return;
					}
					
					// adjust fixed position of navbar dropdown when right aligned
					var $target = $(event.target);
					if ($target.hasClass('svy-navbar-dropdown')) {	// if is a dropdown menu
						var parent = $target.parent();				
						var nav = $target.closest('.navbar-nav');	// closest navbar anchestor
						var ul = $(parent.find('ul')[0]);			// first child of type ul
						
						// only if is right aligned
						if (nav && ul && nav.hasClass('navbar-right')) {
							// location relative to viewport
							var boundingRect = event.target.getBoundingClientRect();	
							
							// viewport right corner
							var right = $(window).width() - (boundingRect.left + boundingRect.width);	
							var top = boundingRect.top + boundingRect.height;
							ul.attr('style', 'position: fixed; right: ' + right + 'px; top: ' + top + 'px;')
						}
					}
					
					var itemClicked = getItem(event);
					makeItemActive(itemClicked);
					if (itemClicked && itemClicked.onAction) {
						var jsEvent = createJSEvent(event);
						$window.executeInlineScript(itemClicked.onAction.formname, itemClicked.onAction.script, [jsEvent, createItemArg(itemClicked)]);
					} else if (itemClicked && $scope.handlers.onMenuItemClicked) {
						$scope.handlers.onMenuItemClicked(event, createItemArg(itemClicked));
					}
				}
			},
			templateUrl: 'bootstrapextracomponents/navbar/navbar.html'
		};
	}])