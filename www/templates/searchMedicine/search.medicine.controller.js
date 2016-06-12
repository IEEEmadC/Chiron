(function () {
    'use strict';

    angular
        .module('Allure')
        .controller('searchMedicineController', searchMedicineController);

    // LoginController.$inject = ['$location', 'UserService'];
    function searchMedicineController($timeout, $rootScope, $state, UserService, $ionicPlatform, MedicineService, $scope, $ionicLoading, $ionicHistory) {
        var vm = this;

        vm.searchMedicine = searchMedicine;
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

        // override default behaviour
        $rootScope.$ionicGoBack = function() {
            // do something interesting here
            $state.go('app.welcome');
            // uncomment below line to call old function when finished
            // oldSoftBack();
        };
        return;
        function searchMedicine() {
          $ionicLoading.show({ template: '<div class="loader"><svg class="circular"><circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/></svg></div>' });

          MedicineService
              .getMedicineSuggestions(vm.searchMedString)
              .then(function(response) {
                  vm.suggestions = response.data.response.suggestions;
                  MedicineService.suggestions = makeList(vm.suggestions);
                  $state.go('app.selectMedicine');
                  $ionicLoading.hide();
              }, function(error) {
                  console.log(error);
              });
        }

        function makeList(suggestions){
          var suggestionList = [];
          angular.forEach(suggestions, function(value){
              suggestionList.push(value.suggestion);
          });
          return suggestionList;
        }
  }

})();
