angular.module('bootstrapextracomponentsBreadcrumbs',['servoy']).directive('bootstrapextracomponentsBreadcrumbs', function() {  
    return {
      restrict: 'E',
      scope: {
    	  model: "=svyModel",
    	  api: "=svyApi",
    	  svyServoyapi: "=",
    	  handlers: "=svyHandlers"
      },
	  link: function($scope, $element, $attrs) {
		  
		  //add dummy content in designer
		  if ($scope.svyServoyapi.isInDesigner() && !$scope.model.breadcrumbs) {
    		  $element.html('<ol class="breadcrumb"><li><a href="#">Home</a></li><li><a href="#">Library</a></li><li class="active">Data</li></ol>');
    	  }
		  
    	  $scope.crumbClicked = function(event, crumb, index) {
    		  if ($scope.model.autoRemoveWhenClicked == true) {
					if ($scope.model.breadcrumbs) {
						$scope.model.breadcrumbs.splice(index + 1, $scope.model.breadcrumbs.length - index - 1);
						$scope.svyServoyapi.apply('breadcrumbs');
					}
    		  }
    		  $scope.handlers.onCrumbClicked(event, crumb, index);
    	  }
    	  
	  },
      controller: function($scope, $element, $attrs) {
      },
      templateUrl: 'bootstrapextracomponents/breadcrumbs/breadcrumbs.html'
    };
  })