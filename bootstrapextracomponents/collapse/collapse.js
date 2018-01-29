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
				$scope.getForm = function(index) {
					if ($scope.model.collapsibles[index].form) {
						return $scope.svyServoyapi.getFormUrl($scope.model.collapsibles[index].form);
					}
					return "";
				}

				$scope.getFormHeight = function(index) {
					var collapsible = $scope.model.collapsibles[index];
					if (collapsible && collapsible.form) {
						if ($scope.formState && $scope.formState[index] && $scope.formState[index].absoluteLayout === true) {
							return { height: $scope.formState[index].properties.designSize.height + 'px' }; //$NON-NLS-1$
						}
					}
					return { height: 400 + "px" }; //$NON-NLS-1$
				}
				
				$scope.trustAsHtml = function(string) {
				    return $sce.trustAsHtml(string);
				};
				
				if (!$scope.model.collapsibles) {
					$scope.model.collapsibles = [];
				}
			},
			link: function($scope, $element, $attrs) {

				function collapse(index, state) {
					getCollapsible(index).collapse(state);
				}

				function setCollapsedState(index, state) {
					if ($scope.model.accordionMode && state === false) {
						for (var i = 0; i < $scope.model.collapsibles.length; i++) {
							var otherCollapse = getCollapsible(i);
							if (i != index && !$scope.model.collapsibles[i].isCollapsed) {
								$scope.model.collapsibles[i].isCollapsed = true;
								collapse(i, 'hide');  //$NON-NLS-1$
								if ($scope.model.collapsibles[i].form) {
									$scope.svyServoyapi.hideForm($scope.model.collapsibles[i].form);
								}
							}
						}
					}
					if (state === false && $scope.model.collapsibles[index].form) {
						$scope.svyServoyapi.formWillShow($scope.model.collapsibles[index].form);
					} else if (state === true && $scope.model.collapsibles[index].form) {
						$scope.svyServoyapi.hideForm($scope.model.collapsibles[index].form);
					}
					$scope.model.collapsibles[index].isCollapsed = state;
				}

				function getCollapsible(index) {
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
					var collapsible = getCollapsible(index);
					collapsible.collapse('toggle'); //$NON-NLS-1$
					setCollapsedState(index, !$scope.model.collapsibles[index].isCollapsed);
				}

				/**
				 * Shows the collapsible at the given index (or the first/only one, if no index is given)
				 * 
				 * @param {Number} index the index of the collapsible to show
				 */
				$scope.api.show = function(index) {
					var collapsible = getCollapsible(index);
					collapsible.collapse('show'); //$NON-NLS-1$
					setCollapsedState(index, false);
				}

				/**
				 * Hides the collapsible at the given index (or the first/only one, if no index is given)
				 * 
				 * @param {Number} index the index of the collapsible to hide
				 */
				$scope.api.hide = function(index) {
					var collapsible = getCollapsible(index);
					collapsible.collapse('hide'); //$NON-NLS-1$
					setCollapsedState(index, true);
				}
				
				//fix misconfigurations in isCollapsed vs. accordionMode
				$scope.$watch('model.collapsibles', function(newValue, oldValue) {
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
							if ($scope.model.collapsibles[cc].form && (!$scope.formState || !$scope.formState[cc])) {
								getFormState(cc);
							}
						}
					}
				}, true)

				function getFormState(collapsibleIndex) {
					$sabloApplication.getFormState($scope.model.collapsibles[collapsibleIndex].form).then(
						function(formState) {
							if (formState.properties) {
								if (!$scope.formState) {
									$scope.formState = [];
								}
								$scope.formState[collapsibleIndex] = {
									properties: formState.properties, 
									absoluteLayout: formState.absoluteLayout
								};
								if (!$scope.model.collapsibles[collapsibleIndex].isCollapsed) {
									$scope.svyServoyapi.formWillShow($scope.model.collapsibles[collapsibleIndex].form);
								}
							}
						},
						function(e) {
							console.log(e);
						}
					);
				}
				
				for (var x = 0; x < $scope.model.collapsibles.length; x++) {
					if ($scope.model.collapsibles[x].form) {
						getFormState(x);
					}
				}
			},
			templateUrl: 'bootstrapextracomponents/collapse/collapse.html' //$NON-NLS-1$
		};
	}])