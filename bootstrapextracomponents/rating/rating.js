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
				if (!$scope.model.ratingStates) {
					$scope.model.ratingStates = [];
				}
				
				$scope.onLeave = function() {
					console.log($scope.model.dataProviderID)
				}
				
				$scope.$watch('model.dataProviderID', function(newValue, oldValue) {
					console.log(newValue);
					$scope.svyServoyapi.apply('dataProviderID');
				});
			},
			controller: function($scope, $element, $attrs) {
				
			},
			templateUrl: 'bootstrapextracomponents/rating/rating.html'
		};
	})