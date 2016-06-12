(function () {
    'use strict';

    angular
        .module('Allure')
        .controller('selectSaltController', selectSaltController);

    // LoginController.$inject = ['$location', 'UserService'];
    function selectSaltController($timeout, $state, $scope, UserService, $ionicHistory, SaltService, $ionicPlatform) {
        var vm = this;
        vm.sendBackToSearch = sendBackToSearch;
        vm.suggestions = SaltService.suggestions;
        vm.selectedSuggestion;
        vm.selectedS = selectedS;
        vm.addSaltToDatabase = addSaltToDatabase;
        vm.additionSuccessful = false;
        vm.addedSalt;
        if (SaltService.searchStringSalt){
          vm.saltForDatabase = SaltService.searchStringSalt;
        }

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

        return vm;

        function sendBackToSearch(){
          $state.go('app.searchSalt');
        }

        function selectedS(selectedSuggestion){
          SaltService.selectedSalt = selectedSuggestion;
          $state.go('app.addSalt');
        }

        function addSaltToDatabase(){
          console.log(vm.saltForDatabase);
          vm.addedSalt = vm.saltForDatabase;
          SaltService.addSaltToDatabase(vm.saltForDatabase);
          vm.additionSuccessful = true;
        }
    }

})();
