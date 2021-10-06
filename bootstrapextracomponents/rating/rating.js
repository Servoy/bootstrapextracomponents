angular.module('bootstrapextracomponentsRating', ['servoy']).directive('bootstrapextracomponentsRating', function() {
		return {
			restrict: 'E',
			scope: {
				model: '=svyModel',
				api: "=svyApi",
				handlers: "=svyHandlers",
				svyServoyapi: "="
			},
			link: function($scope, $element, $attrs) {
				$scope.percent = $scope.model.dataProviderID / $scope.model.max * 100;
				
				if (!$scope.model.ratingStates) {
					$scope.model.ratingStates = [];
				}	
				
				$scope.$watch('model.dataProviderID', function(newValue, oldValue) {
					if ($scope.model.enabled !== false && newValue !== oldValue) $scope.svyServoyapi.apply('dataProviderID');
				});	
			},
			controller: function($scope, $element, $attrs) {
				
				var elementName = $element[0].getAttribute('name');
				
				//handlers
				$scope.onLeave = function() {
					console.log('leaving ' + $scope.model.dataProviderID)
					$scope.overStar = null;
					var jsEvent = createJSEvent('onLeave');
					if($scope.handlers.onLeave) $scope.handlers.onLeave(jsEvent, $scope.model.dataProviderID);
				}
				
				$scope.onHover = function(value) {
					if ($scope.model.enabled !== false) {
						console.log('hovering over ' + value)
						$scope.percent = value / $scope.model.max * 100;
						$scope.overStar = value;
						var jsEvent = createJSEvent('onHover');
						if($scope.handlers.onHover) $scope.handlers.onHover(jsEvent, value);
					}
				}				
				
				//internal
				
				function createJSEvent(eventType, event) {
					//create JSEvent
					var jsEvent = { svyType: 'JSEvent' };
					
					jsEvent.elementName = elementName;

					//get event type
					jsEvent.eventType = eventType;

					if (event) {
						jsEvent.x = event.pageX;
						jsEvent.y = event.pageY;
					}
					
					jsEvent.data = null;
					return jsEvent;
				}
			},
			templateUrl: 'bootstrapextracomponents/rating/rating.html'
		};
	})