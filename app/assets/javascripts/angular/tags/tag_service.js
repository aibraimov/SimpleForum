(function () {
  'use strict';

  angular.module('app.tags').factory('tagService', tagService);

  function tagService($resource) {

    var resourceForUser = function (user) {
      return $resource('/api/users/:user_id/tags/:id.json', { id: '@id', user_id: user.user_id }, {
        update: {
          method: 'PATCH'
        }});
    };

    return {
      resourceForUser: resourceForUser
    };
  }

})();
