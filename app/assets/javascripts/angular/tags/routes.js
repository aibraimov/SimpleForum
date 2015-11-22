(function () {
  'use strict';

  angular.module('app.tags').config(config);

  function config($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('tags');

    $stateProvider.state('tags', {
      url: '/tags',
      templateUrl: 'angular/tags/_tags.html',
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
