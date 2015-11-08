(function (angular) {
  'use strict';
  angular.module('app').directive('myForumPagination', myForumPagination);
  function myForumPagination() {
	  return {
	      restrict: 'E',
	      scope: {
	      from: '=',
	      to: '=',
	      total: '=',
	      currentPage: '=',
	      action: '&'
	      },
	      controller: ["$scope", function($scope){
	      $scope.previousPage = function(){
	          $scope.currentPage -= 1
	          $scope.action({page: $scope.currentPage})
	      }
	      $scope.nextPage = function(){
	          $scope.currentPage += 1
	          $scope.action({page: $scope.currentPage})
	      }
	      }],
	      templateUrl: "angular/templates/paginationElements.html"
	  }
    }
})(angular);