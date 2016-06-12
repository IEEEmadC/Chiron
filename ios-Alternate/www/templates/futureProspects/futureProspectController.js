(function () {
    'use strict';

    angular
        .module('Allure')
        .controller('futureProspectsController', futureProspectsController);

    // LoginController.$inject = ['$location', 'UserService'];
    function futureProspectsController($state, $scope, $ionicHistory, $rootScope, $ionicPlatform) {
      $ionicHistory.nextViewOptions({
        disableBack: true
      });
      var doCustomBack= function() {
        $state.go('app.welcome');
        // do something interesting here
      };
      // registerBackButtonAction() returns a function which can be used to deregister it
      var deregisterHardBack= $ionicPlatform.registerBackButtonAction(
          doCustomBack, 101
      );

      $scope.$on('$destroy', function() {
          deregisterHardBack();
      });

      load();
      return;

      function load(){
        // $state.go('app.futureProspects');
      }
    }
})();
