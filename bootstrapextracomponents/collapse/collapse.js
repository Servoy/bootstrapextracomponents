angular.module('bootstrapextracomponentsCollapse', ['servoy']) //$NON-NLS-1$ //$NON-NLS-2$
	.directive('bootstrapextracomponentsCollapse', ['$sabloApplication', '$sce', function($sabloApplication, $sce) { //$NON-NLS-1$ //$NON-NLS-2$ //$NON-NLS-3$
		return {
			restrict: 'E', //$NON-NLS-1$
			scope: {
				model: '=svyModel',	//$NON-NLS-1$
				svyServoyapi: "=",	//$NON-NLS-1$
				handlers: "=svyHandlers",	//$NON-NLS-1$
				api: "=svyApi"	//$NON-NLS-1$
			},
			controller: function($scope, $element, $attrs) {
				
				$scope.getForm = function(formToGet) {
					if (formToGet) {
						return $scope.svyServoyapi.getFormUrl(formToGet);
					} else {
						return "";
					}
				}

				$scope.getFormStyle = function(formToGet) {
					if (formToGet && $scope.formState && $scope.formState[formToGet]) {
						//form found
						var style;
						/** @type {{absoluteLayout: Boolean, minResponsiveHeight: Number, maxResponsiveHeight: Number, properties: {designSize: {height: Number, width: Number}}}} */
						var formState = $scope.formState[formToGet];
						if (formState.absoluteLayout === true) {
							//absolute layout
							style = {
								height: formState.properties.designSize.height + 'px'  //$NON-NLS-1$
							}
							return style;
						} else if (formState.absoluteLayout !== true) {
							//responsive layout; possibly add min- and/or max-height
							style = {};
							if (formState.minResponsiveHeight != null) {
								style['min-height'] = formState.minResponsiveHeight; //$NON-NLS-1$
							}
							if (formState.maxResponsiveHeight != null) {
								style['max-height'] = formState.maxResponsiveHeight; //$NON-NLS-1$
							}
							return style;
						}
					}
					return null;
				}
				
				$scope.trustAsHtml = function(string) {
					//allow html content
				    return $sce.trustAsHtml(string);
				};
				
				if (!$scope.model.collapsibles) {
					$scope.model.collapsibles = [];
				}
			},
			link: function($scope, $element, $attrs) {

				function collapse(index, state) {
					//set collapse state
					getCollapsibleElement(index).collapse(state);
				}

				function setCollapsedState(index, state) {
					var collapsibleToChange = getCollapsible(index);
					
					if ($scope.model.accordionMode && state === false) {
						//collapsible is being expanded and we are in accordionMode
						for (var i = 0; i < $scope.model.collapsibles.length; i++) {
							var otherCollapse = getCollapsible(i);
							//if another collapsible is open, close that
							if (i != index && !otherCollapse.isCollapsed) {
								otherCollapse.isCollapsed = true;
								collapse(i, 'hide');  //$NON-NLS-1$
								if (otherCollapse.form) {
									//a form needs to be hidden
									$scope.svyServoyapi.hideForm(otherCollapse.form);
								} else if (otherCollapse.cards) {
									//maybe cards have forms to hide
									toggleCardFormVisibility(otherCollapse.cards, true);
								}
							}
						}
					}
					
					//toggle form visibility
					if (collapsibleToChange.form) {
						if (state === false) {
							$scope.svyServoyapi.formWillShow(collapsibleToChange.form);
						} else if (state === true) {
							$scope.svyServoyapi.hideForm(collapsibleToChange.form);
						}
					}
					
					if (collapsibleToChange.cards) {
						//toggle form visibility on cards
						toggleCardFormVisibility(collapsibleToChange.cards, state);
					}
					
					$scope.model.collapsibles[index].isCollapsed = state;
				}
				
				function toggleCardFormVisibility(cardsArray, state) {
					for (var c = 0; c < cardsArray.length; c++) {
						if (cardsArray[c].form && state === false) {
							$scope.svyServoyapi.formWillShow(cardsArray[c].form);								
						} else if (cardsArray[c].form && state === true) {
							$scope.svyServoyapi.hideForm(cardsArray[c].form);
						}
					}
				}
				
				/**
				 * @return {{form: String}}
				 */
				function getCollapsible(index) {
					return $scope.model.collapsibles[index];
				}

				function getCollapsibleElement(index) {
					if (! (index >= 0)) {
						index = 0;
					}
					return $('#' + $scope.model.svyMarkupId + '-' + index + '-collapsible'); //$NON-NLS-1$ //$NON-NLS-2$ //$NON-NLS-3$
				}

				$scope.onClick = function(e) {
					var collapsibleIndex = e.target.closest('.bts-extra-collapse-collapsible').id.split('-')[1] //$NON-NLS-1$ //$NON-NLS-2$
					setCollapsedState(collapsibleIndex, !$scope.model.collapsibles[collapsibleIndex].isCollapsed);
					if ($scope.model.collapsibles[collapsibleIndex].isCollapsed !== true && $scope.handlers.onCollapsibleShown) {
						$scope.handlers.onCollapsibleShown(e, $scope.model.collapsibles[collapsibleIndex], collapsibleIndex);
					} else if ($scope.model.collapsibles[collapsibleIndex].isCollapsed === true && $scope.handlers.onCollapsibleHidden) {
						$scope.handlers.onCollapsibleHidden(e, $scope.model.collapsibles[collapsibleIndex], collapsibleIndex);
					}
				}

				$scope.onCardClick = function(e, cardIndex, collapsibleIndex) {
					if ($scope.handlers.onCardClicked) {
						$scope.handlers.onCardClicked(e, $scope.model.collapsibles[collapsibleIndex].cards[cardIndex], $scope.model.collapsibles[collapsibleIndex], cardIndex, collapsibleIndex);
					}
				}

				/**
				 * Toggles the collapsible at the given index (or the first/only one, if no index is given)
				 * 
				 * @param {Number} index the index of the collapsible to toggle
				 */
				$scope.api.toggle = function(index) {
					var collapsibleElement = getCollapsibleElement(index);
					var collapsible = getCollapsible(index);
					collapsibleElement.collapse('toggle'); //$NON-NLS-1$
					setCollapsedState(index, !collapsible.isCollapsed);
				}

				/**
				 * Shows the collapsible at the given index (or the first/only one, if no index is given)
				 * 
				 * @param {Number} index the index of the collapsible to show
				 */
				$scope.api.show = function(index) {
					var collapsibleElement = getCollapsibleElement(index);
					collapsibleElement.collapse('show'); //$NON-NLS-1$
					setCollapsedState(index, false);
				}

				/**
				 * Hides the collapsible at the given index (or the first/only one, if no index is given)
				 * 
				 * @param {Number} index the index of the collapsible to hide
				 */
				$scope.api.hide = function(index) {
					var collapsibleElement = getCollapsibleElement(index);
					collapsibleElement.collapse('hide'); //$NON-NLS-1$
					setCollapsedState(index, true);
				}
				
				//fix misconfigurations in isCollapsed vs. accordionMode
				$scope.$watch('model.collapsibles', function(newValue, oldValue) { //$NON-NLS-1$
					if (newValue != null) {
						//fix possible accordionMode misconfiguration
						
						var openedCollapseFound = false;
						for (var cc = 0; cc < $scope.model.collapsibles.length; cc++) {
							if ($scope.model.accordionMode) {
								if (!$scope.model.collapsibles[cc].isCollapsed && openedCollapseFound) {
									$scope.model.collapsibles[cc].isCollapsed = true;
								}
								if (!$scope.model.collapsibles[cc].isCollapsed) {
									openedCollapseFound = true;
								}
							}
							if ($scope.model.collapsibles[cc].form) {
								getFormState($scope.model.collapsibles[cc].form, !$scope.model.collapsibles[cc].isCollapsed, $scope.model.collapsibles[cc]);
							}
							if ($scope.model.collapsibles[cc].cards) {
								for (var c = 0; c < $scope.model.collapsibles[cc].cards.length; c++) {
									var card = $scope.model.collapsibles[cc].cards[c];
									if (card.form) {
										getFormState(card.form, !$scope.model.collapsibles[cc].isCollapsed, $scope.model.collapsibles[cc]);
									}
								}
							}
						}
					}
				}, true)

				/**
				 * Loads a form's absoluteLayout property and its properties to be able to obtain the design size
				 */
				function getFormState(form, formWillShow, collapsibleOrCard) {
					$sabloApplication.getFormState(form).then(
						function(formState) {
							if (formState.properties) {
								if (!$scope.formState) {
									$scope.formState = {};
								}
								$scope.formState[form] = {
									properties: formState.properties, 
									absoluteLayout: formState.absoluteLayout,
									maxResponsiveHeight: collapsibleOrCard.maxResponsiveHeight,
									minResponsiveHeight: collapsibleOrCard.minResponsiveHeight
								};
								if (formWillShow) {
									$scope.svyServoyapi.formWillShow(form);
								}
							}
						}
					);
				}
				
				for (var x = 0; x < $scope.model.collapsibles.length; x++) {
					if ($scope.model.collapsibles[x].form) {
						getFormState($scope.model.collapsibles[x].form, !$scope.model.collapsibles[x].isCollapsed, $scope.model.collapsibles[x]);
					}
				}
			},
			templateUrl: 'bootstrapextracomponents/collapse/collapse.html' //$NON-NLS-1$
		};
	}])