angular.module('bootstrapextracomponentsBadge',['servoy']).directive('bootstrapextracomponentsBadge', function() {  
    return {
      restrict: 'E',
      scope: {
    	  model: "=svyModel",
    	  api: "=svyApi",
    	  svyServoyapi: "=",
    	  handlers: "=svyHandlers"
      },
      controller: function($scope, $element, $attrs) {
      },
      templateUrl: 'bootstrapextracomponents/badge/badge.html'
    };
  })