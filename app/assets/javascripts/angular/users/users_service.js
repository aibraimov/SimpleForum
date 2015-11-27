(function () {
  'use strict';

  angular.module('app.users').factory('usersService', usersService);

  function usersService($http, $q, $resource) {

    function create(email, password, password_confirmation) {

      var deferred = $q.defer();

      $http.post("/api/users.json", {
        user: {
          email: email,
          password: password,
          password_confirmation: password_confirmation
        }
      }).then(function (result) {
        deferred.resolve(result);
      }, function (error) {
        deferred.reject(error);
      });

      return deferred.promise;
    }

    function getUser(user) {
      return $resource('/api/users/:user_id.json', { user_id: user.user_id }, {
        query: {isArray: false},
      });
    }

    return {
      create: create,
      getUser: getUser
    };
  }

})();