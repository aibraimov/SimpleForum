(function () {
  'use strict';

  angular.module('app.users').config(config);

  function config($stateProvider, $urlRouterProvider) {
    $stateProvider.state('createUser', {
      url: '/create-user',
      templateUrl: 'angular/users/_form.html'
    })
    .state('users', {
      url: '/users/:userId',
      templateUrl: 'angular/users/_profile.html',
      controller: function($stateParams){
        $stateParams.userId;
      },
      resolve: {
        auth: ["$q", "currentUserService", function ($q, currentUserService) {

          // TODO: this is an exact copy of what's in reports/routes.js
          // Look here for ideas? http://www.sitepoint.com/implementing-authentication-angular-applications/

          var currentUser = currentUserService.getCurrentUser();

          if (currentUser) {
            return $q.when(currentUser);
          } else {
            return $q.reject({ authenticated: false });
          }
        }]
      }
    });
  }

})();
