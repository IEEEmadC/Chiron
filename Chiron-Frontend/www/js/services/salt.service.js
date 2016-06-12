(function () {


  angular
  .module('Allure')
  .service('SaltService', SaltService);

  // UserService.$inject = ['$timeout', '$filter', '$q'];
  function SaltService($timeout, $filter, $q, $http) {

    var service = this;
    this.getSaltSuggestions = getSaltSuggestions;
    this.suggestions = [];

    this.previousView = '';
    this.selectedSalt = '';
    this.addSaltToDatabase = addSaltToDatabase;
    this.searchStringSalt = '';

    return service;
    //
    // function getSaltSuggestions(searchString){
    //   this.searchStringSalt = searchString;
    //   return $http.get('/apiSalt/' + searchString);
    // }
    //
    // function addSaltToDatabase(salt){
    //   return $http.post('/apiSalt', {'name': salt});
    // }

    function getSaltSuggestions(searchString){
      this.searchStringSalt = searchString;
      return $http.get('https://chiron-backend.herokuapp.com/api/salt/' + searchString);
    }

    function addSaltToDatabase(salt){
      return $http.post('https://chiron-backend.herokuapp.com/api/salt', {'name': salt});
    }
  }
})();
