(function () {
  'use strict';

  angular.module('app.forums').directive('forumForm', forumForm);

  function forumForm() {
    return {
      restrict: 'E',
      controller: 'ForumFormController',
      scope: {
        forum: '=forum'
      },
      templateUrl: 'angular/forums/_form.html'
    }
  }

})();
