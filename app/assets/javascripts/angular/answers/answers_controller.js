(function () {
  'use strict';

  angular.module('app.answers').controller('AnswersController', AnswersController);

  function AnswersController($scope, $stateParams, answerService) {
    var vm = this;
    var post_id = $stateParams.postId;
  
    var answerResource = answerService.resourceForUser($scope.currentUserService.getCurrentUser());
    vm.answers = answerResource.query();

    vm.rangeDescriptor = 'all';

    vm.new = function () {
      var now = new Date();
      vm.newAnswer = {
      };
    };

    vm.newCancel = function () {
      vm.newAnswer = null;
    };

    vm.answerAttrs = function(answer) {
      return {title: answer.title, id: answer.id, user_id: answer.user_id, post_id: post_id};
    };

    vm.create = function () {
      var answer = answerResource.save({answer: vm.answerAttrs(vm.newAnswer)});
      vm.answers.push(answer);
      vm.newAnswer = null;
    };

    vm.edit = function (answer) {
      vm.clonedAnswer = angular.extend({}, answer);
      vm.editedAnswerMarker = answer;
    };

    vm.editCancel = function () {
      vm.editedAnswerMarker = null;
      vm.clonedAnswer = null;
    };

    vm.update = function () {
      vm.clonedAnswer = answerResource.update({answer: vm.answerAttrs(vm.clonedAnswer), id: vm.clonedAnswer.id });
      vm.answers.splice(vm.answers.indexOf(vm.editedAnswerMarker), 1, vm.clonedAnswer);
      vm.editedAnswerMarker = null;
      vm.clonedAnswer = null;
    };

    vm.destroy = function (answer) {
      answer.user_id = $scope.currentUserService.getCurrentUser().user_id;
      answerResource.delete({id: answer.id, answer: vm.answerAttrs(answer)});
      vm.answers.splice(vm.answers.indexOf(answer), 1);
    };
  }

})();
