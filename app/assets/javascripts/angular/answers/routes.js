(function () {
  'use strict';

  angular.module('app.answers').config(config);

  function config($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('answers');

    $stateProvider.state('answers', {
      url: '/answers/:postId',
      templateUrl: 'angular/answers/_answers.html',
      controller: function($stateParams){
        $stateParams.postId;
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
    $urlRouterProvider.otherwise('/posts');
  }

})();
