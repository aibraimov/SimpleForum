(function () {
  'use strict';

  angular.module('app.forums').controller('ForumsController', ForumsController);

  function ForumsController($scope, forumService) {
    var vm = this;

    var forumResource = forumService.resourceForUser($scope.currentUserService.getCurrentUser());
    vm.forums = forumResource.query();

    vm.rangeDescriptor = 'all';

    vm.new = function () {
      var now = new Date();
      vm.newForum = {
      };
    };

    vm.newCancel = function () {
      vm.newForum = null;
    };

    vm.create = function () {
      var forum = forumResource.save(vm.newForum);
      vm.forums.push(forum);
      vm.newForum = null;
    };

    vm.edit = function (forum) {
      vm.editedForumMarker = forum;
      vm.clonedForum = angular.extend({}, forum);
    };

    vm.editCancel = function () {
      vm.editedForumMarker = null;
      vm.clonedForum = null;
    };

    vm.update = function () {
      forumResource.update(vm.clonedForum);
      vm.forums.splice(vm.forums.indexOf(vm.editedForumMarker), 1, vm.clonedForum);
      vm.editedForumMarker = null;
      vm.clonedForum = null;
    };

    vm.destroy = function (forum) {
      forumResource.delete(forum);
      vm.forums.splice(vm.forums.indexOf(forum), 1);
    }
  }

})();
