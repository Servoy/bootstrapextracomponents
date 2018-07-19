angular.module('bootstrapextracomponentsCarousel', ['servoy']).directive('bootstrapextracomponentsCarousel', ['$log', function($log) {
		return {
			restrict: 'E',
			scope: {
				model: "=svyModel",
				api: "=svyApi",
				svyServoyapi: "=",
				handlers: "=svyHandlers"
			},
			link: function link($scope, $element) {
				$scope.model.imageCssInternal = {};
				
				$scope.active = null;
				
				if ($scope.model.imageCss) {
					for (var c = 0; c < $scope.model.imageCss.length; c++) {
						var cssEntry = $scope.model.imageCss[c];
						$scope.model.imageCssInternal[cssEntry.propertyName] = cssEntry.propertyValue;
					}
				}
				
				/** @type {Array<>} */
				$scope.slides = [];
				
				if (!$scope.model.imageCss && $scope.model.imageOptions == "Reduce") {
					$scope.model.imageCssInternal = {
						'max-width': '100%',
						'max-height': '100%',
						'width': $scope.model.divSize ? $scope.model.divSize.width : null || $scope.model.size.width,
						'height': $scope.model.divSize ? $scope.model.divSize.height : null || $scope.model.size.height,
						'object-fit': 'contain'
					}
				} else if (!$scope.model.imageCss && $scope.model.imageOptions == "Reduce/Enlarge") {
					$scope.model.imageCssInternal = {
						'width': $scope.model.divSize ? $scope.model.divSize.width : null || $scope.model.size.width,
						'height': $scope.model.divSize ? $scope.model.divSize.height : null || $scope.model.size.height,
					}
				} else if (!$scope.model.imageCss && $scope.model.imageOptions == "Crop") {
					$scope.model.imageCssInternal = {
						'width': 'auto',
						'height': 'auto'
					}
				} else if (!$scope.model.imageCss && $scope.model.imageOptions == "Scale to fit") {
					$scope.model.imageCssInternal = {
						'max-width': '100%',
						'max-height': '100%',
						'width': $scope.model.divSize ? $scope.model.divSize.width : null || ($scope.$parent.absoluteLayout ? $scope.model.size.width + "px" : "100%"),
						'height': $scope.model.divSize ? $scope.model.divSize.height : null || ($scope.$parent.absoluteLayout ? $scope.model.size.height : $scope.model.responsiveHeight) + "px",
						'object-fit': 'contain'
					}
				}
				
				/**
				 * Returns the index of the currently selected slide (0 based)
				 * 
				 * @return {Number} index
				 */
				$scope.api.getSelectedIndex = function() {
					return $scope.active;
				}
				
				/**
				 * Sets the selected slide to the given index (0 based)
				 * 
				 * @param {Number} index
				 */
				$scope.api.setSelectedIndex = function(index) {
					$scope.active = index;
				}
				
				if ($scope.model.slidesFoundset != null) {
					//foundset based
					
					//create slides on %scope.slides
					function createSlidesFromFs() {
						var slides = [];
						for (var i = 0; i < $scope.model.slidesFoundset.viewPort.rows.length; i++) {
							var row = $scope.model.slidesFoundset.viewPort.rows[i];
							var slide = { id: i, active: i === 0, image: row.image ? row.image : null, caption: row.caption ? row.caption : null, rowId: row._svyRowId }
							slides.push(slide);
						}
						$scope.slides = slides;
						$scope.active = $scope.model.slidesFoundset.selectedRowIndexes[0];
					}
					
					//initially, load all slides
					createSlidesFromFs();
					
					//add a listener to get notified of changes of dataproviders or added and deleted records
					$scope.model.slidesFoundset.addChangeListener(function(changes) {
						if (!changes.viewportRowsUpdated && changes.viewPortSizeChanged) {
							createSlidesFromFs();
						} else if (changes.viewportRowsUpdated && changes.viewportRowsUpdated.updates && changes.viewportRowsUpdated.updates.length > 0) {
							for (var ru = 0; ru < changes.viewportRowsUpdated.updates.length; ru++) {
								var changedRow = changes.viewportRowsUpdated.updates[ru];
								if ('type' in changedRow && changedRow.type == 2 && 'startIndex' in changedRow && 'endIndex' in changedRow && changedRow.startIndex == changedRow.endIndex) {
									//row has been deleted
									$log.debug('row deleted');
									createSlidesFromFs();
								} else if ('startIndex' in changedRow && 'endIndex' in changedRow && changedRow.type == 0) {
									//row has been updated
									var updatedRecord = $scope.model.slidesFoundset.viewPort.rows[changedRow.startIndex]
									$scope.slides[changedRow.startIndex].caption = updatedRecord.caption;
									$scope.slides[changedRow.startIndex].image = updatedRecord.image;
								}
							}
						} else if (changes.selectedRowIndexesChanged) {
							$scope.active = changes.selectedRowIndexesChanged.newValue[0];
						}
					});
					
					//watch the slides to find changes of the selected slide and update the foundset accordignly
					$scope.$watch('active', function(newValue, oldValue) {
						if (newValue != null && oldValue != null) {
							if (newValue > -1 && newValue !== $scope.model.slidesFoundset.selectedRowIndexes[0]) {
								//update selected record when the slide index has changed and is not the selected record on the foundset
								$scope.model.slidesFoundset.requestSelectionUpdate([newValue]).then(
									function(serverRows) {
										
									}, 
									function(serverRows) {
										//selection failed, what now
									}
								);
							}
						}
					})
				
				} else {
					//directly provided slides
					
					//create slides on %scope.slides
					function createSlidesFromModel() {
						var slides = [];
						for (var i = 0; i < $scope.model.slides.length; i++) {
							var row = $scope.model.slides[i];
							var slide = { id: i, active: i === 0, image: row.imageUrl ? {url: row.imageUrl} : null, caption: row.caption ? row.caption : null }
							slides.push(slide);
						}
						$scope.slides = slides;
					}
					
					if ($scope.model.slides) {
						createSlidesFromModel();
					}
					
					$scope.$watch('model.slides', function(newValue, oldValue) {
						if (!angular.equals(newValue, oldValue)) {
							createSlidesFromModel();
						}
					}, true)
				}
				
				//size watcher to update image css
				$scope.$watch('model.divSize', function(newValue, oldValue) {
					if (!$scope.model.imageCss) {
						if (!angular.equals(newValue, oldValue) || newValue.width !== $scope.model.imageCssInternal.width || newValue.height !== $scope.model.imageCssInternal.height) {
							if ($scope.model.imageOptions == "Reduce" || $scope.model.imageOptions == "Reduce/Enlarge" || $scope.model.imageOptions == "Scale to fit") {
								//$scope.model.imageCssInternal.width = $scope.model.divSize ? $scope.model.divSize.width : null || $scope.model.size.width;
								//$scope.model.imageCssInternal.height = $scope.model.divSize ? $scope.model.divSize.height : null || $scope.model.size.height;
								
								$scope.model.imageCssInternal.width = $scope.model.divSize ? $scope.model.divSize.width : null || ($scope.$parent.absoluteLayout ? $scope.model.size.width + "px" : "100%");
								$scope.model.imageCssInternal.height = $scope.model.divSize ? $scope.model.divSize.height : null || ($scope.$parent.absoluteLayout ? $scope.model.size.height : $scope.model.responsiveHeight) + "px";
									
							}
							console.log($scope.model.imageOptions)
						}
					}
				}, true);
				
				$scope.$watch('active', function(newValue, oldValue) {
					if (newValue != null) {
						$scope.slides[newValue].active = true;
					}
					if (oldValue != null) {
						$scope.slides[oldValue].active = true;						
					}
				});
				
				console.log($scope.model.imageCssInternal)

				
			},
			controller: function($scope, $element, $attrs, $utils) {
				if ($scope.svyServoyapi.isInDesigner() && !($scope.model.slides || $scope.model.slides.length == 0)) {
					$scope.model.slides = [
						{ image: 'http://lorempixel.com/400/200/' }, 
						{ image: 'http://lorempixel.com/400/200/food' }, 
						{ image: 'http://lorempixel.com/400/200/sports' }, 
						{ image: 'http://lorempixel.com/400/200/people' }];
				}
				
				function getSlide(slide) {
					var result = {imageUrl: null, caption: null};
					if (slide.image && slide.image.url) {
						result.imageUrl = slide.image.url;
					}
					if (slide.caption) {
						result.caption = slide.caption;
					}
					return result;
				}
				
				$scope.onClick = function(event, slide) {
					if ($scope.handlers.onSlideClicked) {
						var jsEvent = $utils.createJSEvent(event, 'action');
						$scope.handlers.onSlideClicked(jsEvent, getSlide(slide));
					}
				}
				
				$scope.getStyle = function () {
					var layoutStyle = { };
					if (!$scope.$parent.absoluteLayout) {
						layoutStyle.height = $scope.model.responsiveHeight;
					}
					return layoutStyle;
				}
			},
			templateUrl: 'bootstrapextracomponents/carousel/carousel.html'
		};
	}]).directive('btseCarouselSmartSrc', function() {
		return {
			restrict: 'A',
			scope: {
				btseCarouselSmartSrc: '@',
				btseCarouselSmartSrcWatch: '&'
			},
			link: function link(scope, element) {
				//directive to lazy load images when set
				var unwatcher = scope.$watch(scope.btseCarouselSmartSrcWatch, function(newVal) {
					if (newVal == true) {
							element.attr('src', scope.btseCarouselSmartSrc);
							unwatcher();
					}
				});
			}
		}
	}).directive('btsExtraCarouselCalcSize', function($window) {
		return {
			restrict: 'A',
			link: function(scope, element, attrs) {
				//directive to set either the max-height or height of images when requested
				//listens for window resizing and adjusts the height accordingly
				scope.getDivSize = function() {
					//get height of component div
					var carouselDiv = element;
					if (carouselDiv) {
						var size = {
							width: scope.$parent.absoluteLayout ? (scope.model.divSize && scope.model.divSize.width ? scope.model.divSize.width : 0) : "100%", 
							height: scope.$parent.absoluteLayout ? (scope.model.divSize && scope.model.divSize.height ? scope.model.divSize.height : 0) : scope.model.responsiveHeight };
						if (carouselDiv.innerWidth()) {
							size.width = carouselDiv.innerWidth();
						}
						if (carouselDiv.innerHeight()) {
							size.height = carouselDiv.innerHeight();
						}
						scope.model.divSize = size;
					}
				}
				
				//first time page load
				if (!scope.model.divSize) {
					scope.getDivSize();
				}
				
				if (scope.model.imageOptions != 'Crop') {
					angular.element($window).bind('resize', function() {
						scope.getDivSize();
						scope.$apply();
					});
				}				
			}
		}
	})