(function () {
  'use strict';

  angular.module('app.answers').factory('answerService', answerService);

  function answerService($resource) {

    var resourceForUser = function (user ) {
      return $resource('/api/users/:user_id/answers/:id.json', { id: '@id', user_id: user.user_id }, {
        query: {isArray: false},
        update: {
          method: 'PATCH'
        }});
    };

    return {
      resourceForUser: resourceForUser,
    };
  }

})();
