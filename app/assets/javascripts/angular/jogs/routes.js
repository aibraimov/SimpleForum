(function () {
  'use strict';

  angular.module('app.jogs').config(config);

  function config($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('jogs');

    $stateProvider.state('jogs', {
      url: '/jogs',
      templateUrl: 'angular/jogs/_jogs.html',
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
    })
  }

})();
