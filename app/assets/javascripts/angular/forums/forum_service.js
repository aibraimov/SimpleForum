(function () {
  'use strict';

  angular.module('app.forums').factory('forumService', forumService);

  function forumService($resource) {

    var resourceForUser = function (user ) {
      return $resource('/api/users/:user_id/forums/:id.json', { id: '@id', user_id: user.user_id }, {
        update: {
          method: 'PATCH'
        }});
    };

    return {
      resourceForUser: resourceForUser
    }
  }

})();
