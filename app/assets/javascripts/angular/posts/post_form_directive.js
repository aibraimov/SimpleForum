(function () {
  'use strict';

  angular.module('app.posts').directive('postForm', postForm);

  function postForm() {
    return {
      restrict: 'E',
      controller: 'PostFormController',
      scope: {
        post: '=post',
        forums: '=forums'
      },
      templateUrl: 'angular/posts/_form.html'
    }
  }

})();
