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
				$scope.model.imageCss = {};
				
				/** @type {Array<>} */
				$scope.slides = [];
				
				if ($scope.model.imageOptions == "Reduce") {
					$scope.model.imageCss = {
						'max-width': '100%',
						'max-height': '100%',
						'width': $scope.model.divSize ? $scope.model.divSize.width : null || $scope.model.size.width,
						'height': $scope.model.divSize ? $scope.model.divSize.height : null || $scope.model.size.height,
						'object-fit': 'contain'
					}
				} else if ($scope.model.imageOptions == "Reduce/Enlarge") {
					$scope.model.imageCss = {
						'width': $scope.model.divSize ? $scope.model.divSize.width : null || $scope.model.size.width,
						'height': $scope.model.divSize ? $scope.model.divSize.height : null || $scope.model.size.height,
					}
				} else if ($scope.model.imageOptions == "Crop") {
					$scope.model.imageCss = {
						'width': 'auto',
						'height': 'auto'
					}
				} else if ($scope.model.imageOptions == "Scale to fit") {
					$scope.model.imageCss = {
						'max-width': '100%',
						'max-height': '100%',
						'width': $scope.model.divSize ? $scope.model.divSize.width : null || $scope.model.size.width,
						'height': $scope.model.divSize ? $scope.model.divSize.height : null || $scope.model.size.height,
						'object-fit': 'contain'
					}
				}
				
				$scope.$watch('model.divSize', function(newValue, oldValue) {
					if (!angular.equals(newValue, oldValue)) {
						if ($scope.model.imageOptions == "Reduce" || $scope.model.imageOptions == "Reduce/Enlarge" || $scope.model.imageOptions == "Scale to fit") {
							$scope.model.imageCss.width = $scope.model.divSize ? $scope.model.divSize.width : null || $scope.model.size.width;
							$scope.model.imageCss.height = $scope.model.divSize ? $scope.model.divSize.height : null || $scope.model.size.width;
						}
					}
				}, true);
				
				if ($scope.model.slidesFoundset != null) {
					//foundset based
					
					//create slides on %scope.slides
					function createSlidesFromFs() {
						var slides = [];
						for (var i = 0; i < $scope.model.slidesFoundset.viewPort.rows.length; i++) {
							var row = $scope.model.slidesFoundset.viewPort.rows[i];
							var slide = { image: row.image ? row.image : null, caption: row.caption ? row.caption : null, rowId: row._svyRowId }
							slides.push(slide);
						}
						$scope.slides = slides;
					}
					
					//initially, load all slides
					createSlidesFromFs();
					
					//watch for changes of the selected record in the foundset
					$scope.$watch('model.slidesFoundset.selectedRowIndexes', function(newValue, oldValue) {
						if (!angular.equals(oldValue, newValue)) {
							$log.debug('selectedRowIndexes change from ' + (oldValue ? oldValue[0] : '') + ' to ' + (newValue ? newValue[0] : ''));
							$scope.slides[newValue[0]].active = true;
						}
					})
					
					//watch for changes of the foundset's rows
					$scope.$watch('model.slidesFoundset.viewPort.rows', function(rowUpdates, oldValue) {
						if (rowUpdates && rowUpdates.length > 0) {
							//rows were added
							$log.debug('viewPort.rows updated');
							createSlidesFromFs();
						}
					})
					
					//add a listener to get notified of changes of dataproviders or deleted records
					$scope.model.slidesFoundset.addChangeListener(function(rowUpdates, oldStartIndex, oldSize) {
						if (rowUpdates && rowUpdates.length) {
							for (var ru = 0; ru < rowUpdates.length; ru++) {
								var changedRow = rowUpdates[ru];
								if ('type' in changedRow && changedRow.type == 2 && 'startIndex' in changedRow && 'endIndex' in changedRow && changedRow.startIndex == changedRow.endIndex) {
									//row has been deleted
									$log.debug('row deleted');
									$scope.slides.splice(changedRow.startIndex, 1);
								} else if ('startIndex' in changedRow && 'endIndex' in changedRow && changedRow.rows && changedRow.rows.length == 1 && changedRow.startIndex == changedRow.endIndex) {
									//row has been updated
									var slideToChange = $scope.slides[changedRow.startIndex];
									$log.debug('row updated');
									for ( var cp in changedRow.rows[0] ) {
										slideToChange[cp] = changedRow.rows[0][cp];
									}
								}
							}
						}
					});
					
					//watch the slides to find changes of the selected slide and update the foundset accordignly
					$scope.$watch('slides', function(newValue, oldValue) {
						if (newValue && oldValue) {
							var slideIndex = -1;
							for (var i = 0; i < newValue.length; i++) {
								if (newValue[i].active == true) {
									slideIndex = i;
									break;
								}
							}
							if (slideIndex > -1 && (oldValue[slideIndex] && !oldValue[slideIndex].active) && slideIndex != $scope.model.slidesFoundset.selectedRowIndexes[0]) {
								//update selected record when the slide index has changed and is not the selected record on the foundset
								$scope.model.slidesFoundset.requestSelectionUpdate([slideIndex]).then(
									function(serverRows) {
										
									}, 
									function(serverRows) {
										//selection failed, what now
									}
								);
							}
						}
					}, true)
				
				} else {
					//directly provided slides
					
					//create slides on %scope.slides
					function createSlidesFromModel() {
						var slides = [];
						for (var i = 0; i < $scope.model.slides.length; i++) {
							var row = $scope.model.slides[i];
							var slide = { image: row.imageUrl ? {url: row.imageUrl} : null, caption: row.caption ? row.caption : null }
							slides.push(slide);
						}
						$scope.slides = slides;
					}
					
					$scope.$watch('slides', function(newValue, oldValue) {
						if (!angular.equals(newValue, oldValue)) {
							createSlidesFromModel();
						}
					}, true)
				}
			},
			controller: function($scope, $element, $attrs) {
				if ($scope.svyServoyapi.isInDesigner() && !($scope.model.slides || $scope.model.slides.length == 0)) {
					$scope.model.slides = [
						{ image: 'http://lorempixel.com/400/200/' }, 
						{ image: 'http://lorempixel.com/400/200/food' }, 
						{ image: 'http://lorempixel.com/400/200/sports' }, 
						{ image: 'http://lorempixel.com/400/200/people' }];
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
						if (newVal) {
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
					var carouselDiv = element.closest('.bts-extra-carousel');
					if (carouselDiv) {
						scope.model.divSize = {width: carouselDiv.innerWidth(), height: carouselDiv.innerHeight()};
						console.log('height and width of div found as ' + scope.model.divSize.width + 'x' + scope.model.divSize.height);
					}
				}
				
				//first time page load
				scope.getDivSize();
				
				if (scope.model.imageOptions != 'Crop') {
					
					angular.element($window).bind('resize', function() {
						scope.getDivSize();
						scope.$apply();
					});
				}				
			}
		}
	})