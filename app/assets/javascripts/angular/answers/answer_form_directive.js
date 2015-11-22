(function () {
  'use strict';

  angular.module('app.answers').directive('answerForm', answerForm);

  function answerForm() {
    return {
      restrict: 'E',
      controller: 'AnswerFormController',
      scope: {
        answer: '=answer'
      },
      templateUrl: 'angular/answers/_form.html'
    };
  }

})();
