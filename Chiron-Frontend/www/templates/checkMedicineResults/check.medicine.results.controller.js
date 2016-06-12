(function () {
  'use strict';

  angular
  .module('Allure')
  .controller('checkMedicineResultsController', checkMedicineResultsController);

  // LoginController.$inject = ['$location', 'UserService'];
  function checkMedicineResultsController($timeout,  $ionicViewService, $state, UserService, MedicineService, $ionicHistory, $ionicLoading, $scope, $ionicPopup, $ionicPlatform) {
    var vm = this;
    vm.allergicProbableSalts = [];
    vm.allergicDefiniteSalts = [];
    vm.checkSaltForYellowColor = checkSaltForYellowColor;
    vm.checkSaltForRedColor = checkSaltForRedColor;
    vm.cehckSaltForGreenColor = checkSaltForGreenColor;
    vm.salts = [];
    vm.goHome = goHome;

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
    // vm.goBack = goBack;
    // vm.notSure = notSure;
    // vm.finalSure = finalSure;
    // vm.checkSingleItemSelected = checkSingleItemSelected;
    // Triggered on a button click, or some other target
    $scope.showPopup = function() {
      $scope.data = {}

      // An elaborate, custom popup
      vm.myPopup = $ionicPopup.show({
        template: '<i class="ion-disc red-text"/> Definitely Allergic <br>  <i class="ion-disc yellow-text"><i> Probably Allergic <br> <i class="ion-disc grey-text"/> Safe <br> <br><center><i class="ion-close" ng-click="vm.closePopUp()"/></center>',
        title: 'Colour Schema',
        scope: $scope
        });


      };
      vm.closePopUp = function(){
        vm.myPopup.close();
      };

      load();
      return vm;

      function goBack(){
        $ionicHistory.goBack();
      }


      function load(){
        $ionicLoading.show({ template: '<div class="loader"><svg class="circular"><circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/></svg></div>' });
        MedicineService
        .getSaltFromMedicine(MedicineService.selectedMedicineForCheck)
        .then(function(response) {
          vm.salts = makeList(response.data.response.constituents);
          vm.allergicProbableSalts = [];
          vm.allergicDefiniteSalts = [];
          checkIfAllergy(vm.salts);
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

      function checkIfAllergy(saltsInMedicine){
        angular.forEach(saltsInMedicine, function(medicineSalt){
          angular.forEach(MedicineService.probableAllergicSalts, function(probableSalt){
            if(probableSalt == medicineSalt){
              vm.isAllergy = 'maybe';
              vm.allergicProbableSalts.push(probableSalt);
            }
          })
        })
        angular.forEach(saltsInMedicine, function(medicineSalt){
          angular.forEach(MedicineService.definiteAllergicSalts, function(definiteSalt){
            if(definiteSalt == medicineSalt){
              vm.isAllergy = 'yes';
              vm.allergicDefiniteSalts.push(definiteSalt);
            }
          })
        })

        if (!vm.isAllergy && vm.isAllergy != 'yes' && vm.isAllergy !='maybe'){
          vm.isAllergy = 'no';
        }
        console.log(vm.salts);
      }

      function checkSaltForYellowColor(salt){
        console.log(salt);
        console.log(vm.allergicProbableSalts.indexOf(salt) > -1);
        return vm.allergicProbableSalts.indexOf(salt) > -1;
      }

      function checkSaltForRedColor(salt){
        return vm.allergicDefiniteSalts.indexOf(salt) > -1;
      }

      function checkSaltForGreenColor(salt){
        return !(vm.allergicDefiniteSalts.indexOf(salt) > -1 || vm.allergicProbableSalts.indexOf(salt) > -1);
      }

      function goHome(){
        $state.go('app.welcome');
      }
    }

  })();
