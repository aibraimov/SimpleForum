(function () {
  'use strict';

  angular.module('app.forums').controller('ForumsController', ForumsController);

  function ForumsController($scope, forumService) {
    var vm = this;

    var forumResource = forumService.resourceForUser($scope.currentUserService.getCurrentUser());
    vm.forums = []

    vm.getForums = function(page){
      forumResource.query({method: 'GET', isArray: false, page: page })
      .$promise.then(function(response){
        vm.total_entries = response.total_entries
        vm.current_page = parseInt(response.current_page)
        vm.to_index = response.to_index
        vm.from_index = response.from_index
        vm.forums = response.forums
      });
    }

    vm.rangeDescriptor = 'all';

    vm.new = function () {
      var now = new Date();
      vm.newForum = {
      }
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
