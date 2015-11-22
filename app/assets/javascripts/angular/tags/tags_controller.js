(function () {
  'use strict';

  angular.module('app.tags').controller('TagsController', TagsController);

  function TagsController($scope, tagService) {
    var vm = this;

    var tagResource = tagService.resourceForUser($scope.currentUserService.getCurrentUser());

    vm.tags = [];

    vm.getTags = function(page){
      tagResource.query({method: 'GET', isArray: false, page: page })
      .$promise.then(function(response){
        vm.total_entries = response.total_entries;
        vm.current_page = parseInt(response.current_page);
        vm.to_index = response.to_index;
        vm.from_index = response.from_index;
        vm.tags = response.tags;
      });
    };

    vm.rangeDescriptor = 'all';

    vm.new = function () {
      var now = new Date();
      vm.newTag = {
      };
    };

    vm.newCancel = function () {
      vm.newTag = null;
    };

    vm.create = function () {
      var tag = tagResource.save(vm.newTag);
      vm.tags.push(tag);
      vm.newTag = null;
    };

    vm.edit = function (tag) {
      vm.editedTagMarker = tag;
      vm.clonedTag = angular.extend({}, tag);
    };

    vm.editCancel = function () {
      vm.editedTagMarker = null;
      vm.clonedTag = null;
    };

    vm.update = function () {
      tagResource.update(vm.clonedTag);
      vm.tags.splice(vm.tags.indexOf(vm.editedTagMarker), 1, vm.clonedTag);
      vm.editedTagMarker = null;
      vm.clonedTag = null;
    };

    vm.destroy = function (tag) {
      tag.user_id = $scope.currentUserService.getCurrentUser().user_id;
      tagResource.delete(tag);
      vm.tags.splice(vm.tags.indexOf(tag), 1);
    };
  }

})();
