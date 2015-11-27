(function () {
  'use strict';

  angular.module('app.answers').factory('answerService', answerService);

  function answerService($resource) {

    var resourceForUser = function (user ) {
      return $resource('/api/users/:user_id/answers/:id.json', { id: '@id', user_id: user.user_id }, {
        setLike: {isArray: false, method: 'POST', 
          url: '/api/users/:user_id/answers/:id/like_answer.json',
          params: { id: '@id', user_id: user.user_id }
        },
        disLike: {isArray: false, method: 'POST', 
          url: '/api/users/:user_id/answers/:id/dislike_answer.json',
          params: { id: '@id', user_id: user.user_id }
        },
        setTrue: {isArray: false, method: 'POST', 
          url: '/api/users/:user_id/answers/:id/set_true.json',
          params: { id: '@id', user_id: user.user_id }
        },
        query: {isArray: false},
        update: {
          method: 'PATCH'
        }});
    };

    var resourceForComment = function (user ) {
      return $resource('/api/users/:user_id/comments/:id.json', { id: '@id', user_id: user.user_id }, {
        query: {isArray: false},
        update: {
          method: 'PATCH'
        }});
    };

    return {
      resourceForUser: resourceForUser,
      resourceForComment: resourceForComment,
    };
  }

})();