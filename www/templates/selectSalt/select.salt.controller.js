(function () {
    'use strict';

    angular
        .module('Allure')
        .controller('selectSaltController', selectSaltController);

    // LoginController.$inject = ['$location', 'UserService'];
    function selectSaltController($timeout, $state, UserService, $ionicHistory, SaltService) {
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

        return vm;

        function sendBackToSearch(){
          $ionicHistory.goBack();
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
