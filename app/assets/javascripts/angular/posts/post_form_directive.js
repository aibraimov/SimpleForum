(function () {
  'use strict';

  angular.module('app.posts').directive('postForm', postForm);

  function postForm() {
    return {
      restrict: 'E',
      controller: 'PostFormController',
      scope: {
        post: '=post',
        forums: '=forums',
        tags: "=tags",
      },
      templateUrl: 'angular/posts/_form.html'
    };
  }

})();
