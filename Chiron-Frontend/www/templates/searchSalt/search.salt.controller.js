(function () {
    'use strict';

    angular
        .module('Allure')
        .controller('searchSaltController', searchSaltController);

    // LoginController.$inject = ['$location', 'UserService'];
    function searchSaltController($timeout, $state, UserService, $rootScope, SaltService, $scope,  $ionicHistory, $ionicPlatform, $ionicLoading) {
        var vm = this;

        vm.searchSalt = searchSalt;
        vm.error = '';

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


        function searchSalt() {
          $ionicLoading.show({ template: '<div class="loader"><svg class="circular"><circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/></svg></div>' });

          SaltService
              .getSaltSuggestions(vm.searchSaltString)
              .then(function(response) {
                  vm.suggestions = response.data;
                  SaltService.suggestions = makeList(vm.suggestions);
                  $state.go('app.selectSalt');
                  $ionicLoading.hide();
              }, function(error) {
                  console.log(error);
              });
        }

        function makeList(suggestions){
          var suggestionList = [];
          angular.forEach(suggestions, function(value){
              suggestionList.push(value.name);
          });
          return suggestionList;
        }
  }

})();
