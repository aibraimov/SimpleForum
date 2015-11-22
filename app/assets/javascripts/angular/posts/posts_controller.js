(function () {
  'use strict';

  angular.module('app.posts').controller('PostsController', PostsController);

  function PostsController($scope, $stateParams, postService) {
    var vm = this;
    var forum_id = $stateParams.forumId;
    var tag_id = $stateParams.tagId;
  
    var forumResource = postService.resourceForForum($scope.currentUserService.getCurrentUser());
    vm.forums = [];
    forumResource.query({method: 'GET', isArray: false, page: 1 })
    .$promise.then(function(response){
      vm.forums = response.forums;
    });

    var tagResource = postService.resourceForTag($scope.currentUserService.getCurrentUser());
    vm.tags = [];
    tagResource.query({method: 'GET', isArray: false, page: 1 })
    .$promise.then(function(response){
      vm.tags= response.tags;
      angular.forEach(vm.tags, function(value, key) {
        value.bold_title = "<b>" + value.title + "</b><br>";
      });
    });

    var postResource = postService.resourceForUser($scope.currentUserService.getCurrentUser());
    vm.posts = [];
    vm.getPosts = function(page){
      postResource.query({method: 'GET', isArray: false, page: page, forum_id: forum_id, tag_id: tag_id })
      .$promise.then(function(response){
        vm.total_entries = response.total_entries;
        vm.current_page = parseInt(response.current_page);
        vm.to_index = response.to_index;
        vm.from_index = response.from_index;
        vm.posts = response.posts;
      });
    };

    vm.rangeDescriptor = 'all';

    vm.new = function () {
      vm.tagsClear();
      var now = new Date();
      vm.newPost = {
      };
    };

    vm.newCancel = function () {
      vm.newPost = null;
    };

    vm.tagsClear = function() {
      angular.forEach(vm.tags, function(tag, key) {
        tag.ticked = false;
      });
    };

    vm.getTagIds = function(post) {
      var tag_ids = [];
      angular.forEach(post.out_tags, function(tag, key) {
        tag_ids.push(tag.id);
      });
      return tag_ids;
    }

    vm.postAttrs = function(post) {
      return {title: post.title, description: post.description, tag_ids: post.tag_ids, id: post.id, forum_id: post.forum_id, user_id: post.user_id};
    }

    vm.create = function () {
      vm.newPost.tag_ids = vm.getTagIds(vm.newPost);
      vm.newPost.out_tags = null;
      var post = postResource.save({post: vm.postAttrs(vm.newPost)});
      vm.posts.push(post);
      vm.newPost = null;
    };

    vm.edit = function (post) {
      vm.tagsClear();
      vm.clonedPost = angular.extend({}, post);
      vm.editedPostMarker = post;
    };

    vm.editCancel = function () {
      vm.editedPostMarker = null;
      vm.clonedPost = null;
    };

    vm.update = function () {
      vm.clonedPost.tag_ids = vm.getTagIds(vm.clonedPost);
      vm.clonedPost.out_tags = null;
      vm.clonedPost = postResource.update({post: vm.postAttrs(vm.clonedPost), id: vm.clonedPost.id });
      vm.posts.splice(vm.posts.indexOf(vm.editedPostMarker), 1, vm.clonedPost);
      vm.editedPostMarker = null;
      vm.clonedPost = null;
    };

    vm.destroy = function (post) {
      post.user_id = $scope.currentUserService.getCurrentUser().user_id;
      postResource.delete({id: post.id, post: vm.postAttrs(post)});
      vm.posts.splice(vm.posts.indexOf(post), 1);
    };
  }

})();
