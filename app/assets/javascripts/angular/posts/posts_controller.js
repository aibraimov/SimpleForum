(function () {
  'use strict';

  angular.module('app.posts').controller('PostsController', PostsController);

  function PostsController($scope, postService) {
    var vm = this;

    var forumResource = postService.resourceForForum($scope.currentUserService.getCurrentUser());
    vm.forums = []
    forumResource.query({method: 'GET', isArray: false, page: 1 })
    .$promise.then(function(response){
      vm.forums = response.forums
    });

    var postResource = postService.resourceForUser($scope.currentUserService.getCurrentUser());
    vm.posts = []
    vm.getPosts = function(page){
      postResource.query({method: 'GET', isArray: false, page: page })
      .$promise.then(function(response){
        vm.total_entries = response.total_entries
        vm.current_page = parseInt(response.current_page)
        vm.to_index = response.to_index
        vm.from_index = response.from_index
        vm.posts = response.posts
      });
    }

    vm.rangeDescriptor = 'all';

    vm.new = function () {
      var now = new Date();
      vm.newPost = {
      }
    };

    vm.newCancel = function () {
      vm.newPost = null;
    };

    vm.create = function () {
      var post = postResource.save(vm.newPost);
      vm.posts.push(post);
      vm.newPost = null;
    };

    vm.edit = function (post) {
      vm.editedPostMarker = post;
      vm.clonedPost = angular.extend({}, post);
    };

    vm.editCancel = function () {
      vm.editedPostMarker = null;
      vm.clonedPost = null;
    };

    vm.update = function () {
      postResource.update(vm.clonedPost);
      vm.posts.splice(vm.posts.indexOf(vm.editedPostMarker), 1, vm.clonedPost);
      vm.editedPostMarker = null;
      vm.clonedPost = null;
    };

    vm.destroy = function (post) {
      post.user_id = $scope.currentUserService.getCurrentUser().user_id
      postResource.delete(post);
      vm.posts.splice(vm.posts.indexOf(post), 1);
    }
  }

})();
