(function () {
    'use strict';

    angular
        .module('Allure')
        .controller('saltSelectionController', saltSelectionController);

    // LoginController.$inject = ['$location', 'UserService'];
    function saltSelectionController($timeout, $state, UserService, MedicineService, $ionicHistory, $ionicLoading) {
        var vm = this;
        vm.goBack = goBack;

        load();
        return vm;

        function goBack(){
          $ionicHistory.goBack();
        }

        function load(){
          $ionicLoading.show({ template: '<div class="loader"><svg class="circular"><circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/></svg></div>' });

          MedicineService
              .getSaltFromMedicine(MedicineService.selectedMedicine)
              .then(function(response) {
                  vm.salts = response.data.response.constituents;
                  console.log('old', vm.salts);
                  MedicineService.currentMedicineSalt = makeList(vm.salts);
                  vm.salts = MedicineService.currentMedicineSalt;
                  console.log(vm.salts);
                  $ionicLoading.hide();
              }, function(error) {
                  console.log(error);
              });
        }

        function makeList(saltsData){
          var saltList = [];
          angular.forEach(saltsData, function(value){
              saltList.push(value.name);
          });
          return saltList;
        }

    }

})();
