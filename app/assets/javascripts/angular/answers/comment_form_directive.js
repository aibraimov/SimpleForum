(function () {
  'use strict';

  angular.module('app.answers').directive('commentForm', commentForm);

  function commentForm() {
    return {
      restrict: 'E',
      controller: 'CommentFormController',
      scope: {
        comment: '=comment'
      },
      templateUrl: 'angular/answers/_comment.html'
    };
  }

})();
