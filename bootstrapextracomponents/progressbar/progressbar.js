angular.module('bootstrapextracomponentsProgressbar', ['servoy']).directive('bootstrapextracomponentsProgressbar', function() {
		return {
			restrict: 'E',
			scope: {
				model: '=svyModel',
				api: "=svyApi"
			},
			controller: function($scope, $element, $attrs) {
				/**
				 * Do not call this method; this will be removed with Servoy 8.2
				 * @param {Number} value
				 * @param {String} text
				 */
				$scope.api.updateProgressBar = function(value, text) {
					$scope.model.value = value;
					if (text != undefined) {
						$scope.model.valueText = text;
					}
				}
			},
			templateUrl: 'bootstrapextracomponents/progressbar/progressbar.html'
		};
	})