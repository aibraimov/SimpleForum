(function () {
  'use strict';

  angular.module('app.posts').factory('postService', postService);

  function postService($resource) {

    var resourceForUser = function (user ) {
      return $resource('/api/users/:user_id/posts/:id.json', { id: '@id', user_id: user.user_id }, {
        setLike: {isArray: false, method: 'POST', 
          url: '/api/users/:user_id/posts/:id/like_post.json',
          params: { id: '@id', user_id: user.user_id }
        },
        disLike: {isArray: false, method: 'POST', 
          url: '/api/users/:user_id/posts/:id/dislike_post.json',
          params: { id: '@id', user_id: user.user_id }
        },
        query: {isArray: false},
        update: {
          method: 'PATCH'
        }});
    };

    var resourceForForum = function(user) {
      return $resource('/api/users/:user_id/forums/:id.json', { id: '@id', user_id: user.user_id }, {
      });
    };

    var resourceForTag = function(user) {
      return $resource('/api/users/:user_id/tags/:id.json', { id: '@id', user_id: user.user_id }, {
      });
    };

    return {
      resourceForUser: resourceForUser,
      resourceForForum: resourceForForum,
      resourceForTag: resourceForTag
    };
  }

})();
