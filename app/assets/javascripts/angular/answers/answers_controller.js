(function () {
  'use strict';

  angular.module('app.answers').controller('AnswersController', AnswersController);

  function AnswersController($scope, $stateParams, answerService) {
    var vm = this;
    var post_id = $stateParams.postId;
    var user_id = $scope.currentUserService.getCurrentUser().user_id;
    vm.user_id = user_id;

    var answerResource = answerService.resourceForUser($scope.currentUserService.getCurrentUser());
    var commentResource = answerService.resourceForComment($scope.currentUserService.getCurrentUser());
    vm.answers = [];
    vm.getAnswers = function(page){
      answerResource.query({method: 'GET', isArray: false, post_id: post_id })
      .$promise.then(function(response){
        vm.answers = response.answers;
      });
    };

    vm.rangeDescriptor = 'all';

//  answer functions
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
      answer.user_id = user_id;
      answerResource.delete({id: answer.id, answer: vm.answerAttrs(answer)});
      vm.answers.splice(vm.answers.indexOf(answer), 1);
    };

//like Answer
    vm.likeAnswer = function(answer) {
      answerResource.setLike({id: answer.id})
      .$promise.then(function(response){
        if (response.status == "success") {
          answer.user_dislikes.splice(answer.user_dislikes.indexOf(user_id));
          answer.user_likes.push(user_id);
        }
      });
    };

    vm.dislikeAnswer = function(answer) {
      answerResource.disLike({id: answer.id})
      .$promise.then(function(response){
        if (response.status == "success") {
          answer.user_likes.splice(answer.user_likes.indexOf(user_id));
          answer.user_dislikes.push(user_id);
        }
      });
    };

    vm.setTrue = function(answer) {
      answerResource.setTrue({id: answer.id})
      .$promise.then(function(response){
        if (response.status == "success") {
          angular.forEach(vm.answers, function(tag, key) {
            tag.is_true = false;
          });
          answer.is_true = true;
        }
      });
    };


//  comment functions
    vm.newCommentCreate = function (answer) {
      var now = new Date();
      vm.newComment = {
        answer_id: answer.id
      };
    };

    vm.newCommentCancel = function () {
      vm.newComment = null;
    };

    vm.commentAttrs = function (comment) {
      return {title: comment.title, id: comment.id, user_id: comment.user_id, answer_id: comment.answer_id};
    };

    vm.createComment = function (answer) {
      console.log(answer);
      var comment = commentResource.save({comment: vm.commentAttrs(vm.newComment)});
      answer.comments.push(comment);
      vm.newComment = null;
    };

    vm.editComment = function (comment) {
      vm.clonedComment = angular.extend({}, comment);
      vm.editedCommentMarker = comment;
    };

    vm.editCommentCancel = function () {
      vm.editedCommentMarker = null;
      vm.clonedComment = null;
    };

    vm.updateComment = function (answer) {
      vm.clonedComment = commentResource.update({comment: vm.commentAttrs(vm.clonedComment), id: vm.clonedComment.id });
      answer.comments.splice(answer.comments.indexOf(vm.editedCommentMarker), 1, vm.clonedComment);
      vm.editedCommentMarker = null;
      vm.clonedComment = null;
    };

    vm.destroyComment = function (answer, comment) {
      comment.user_id = user_id;
      commentResource.delete({id: comment.id, comment: vm.commentAttrs(comment)});
      answer.comments.splice(answer.comments.indexOf(comment), 1);
    };
  }
})();
