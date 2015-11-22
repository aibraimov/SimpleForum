(function () {
  'use strict';

  angular.module('app.tags').directive('tagForm', tagForm);

  function tagForm() {
    return {
      restrict: 'E',
      controller: 'TagFormController',
      scope: {
        tag: '=tag'
      },
      templateUrl: 'angular/tags/_form.html'
    };
  }

})();
