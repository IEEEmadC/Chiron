(function () {


  angular
  .module('Allure')
  .service('UserService', UserService);

  // UserService.$inject = ['$timeout', '$filter', '$q'];
  function UserService($timeout, $filter, $q, MedicineService) {

    var service = this;

    this.getAllUsers = getUsers;
    this.login = login;
    this.register = register;
    this.getPresentUser = getPresentUser;
    this.getUserByUsername = getUserByUsername;
    this.presentUser;
    this.setProbableSaltsOfUser = setProbableSaltsOfUser;
    this.setDefinitiveSaltsOfUser = setDefinitiveSaltsOfUser;
    this.logout = logout;
    this.autoLogin = autoLogin;
    return service;

    function login(username, password){
      var output = {};
      output.success = false;
      if (!localStorage.users){
        output.error = 'User not found!';
      }
      else{
        angular.forEach(getUsers(), function(user){
          if (username === user.username){
            if(password === user.password){
              output.success = true;
              setPresentUser(user);
              MedicineService.probableAllergicSalts = user.probableAllergicSalts;
              MedicineService.definiteAllergicSalts = user.definiteAllergicSalts;
              localStorage.session = true;
              localStorage.sessionPresentUser = user.username;
            }
            else{
              output.error = "Authentication failed. Username and Password doesn't match.";
            }
          }
        })
        if(!output.error){
          output.error = "User not found!"
        }
      }
      console.log(MedicineService.probableAllergicSalts);
      return output;
    }

    function register(user){
      var output = {};
      output.success = false;
      if (!localStorage || !userExists(user.username)){
        var users = getUsers();
        user.probableAllergicSalts = [];
        user.definiteAllergicSalts = [];
        users.push(user);
        setUsers(users);
        output.success = true;
      }
      else{
        output.error = "Account Exists Already!";
      }
      return output;
    }

    function logout(){
      localStorage.session = false;
      localStorage.sessionPresentUser = '';
    }

    function autoLogin(){
      angular.forEach(getUsers(), function(user){
        if (localStorage.sessionPresentUser === user.username){
          setPresentUser(user);
          MedicineService.probableAllergicSalts = user.probableAllergicSalts;
          MedicineService.definiteAllergicSalts = user.definiteAllergicSalts;
        }
      })
    }

    function userExists(username){
      var yes = false;
      angular.forEach(getUsers(), function(user){
        if (user.username === username){
          yes = true;
        }
      })
      return yes;
    }

    function getUserByUsername(username){
      var userReturn;
      angular.forEach(getUsers(), function(user){
        if (user.username === username){
          userReturn = user;
        }
        return userReturn;
      })
    }

    // function getPresentUser(){
    //   return localStorage.presentUser;
    // }

    // private functions

    function getUsers() {
      if(!localStorage.users){
        localStorage.users = JSON.stringify([]);
      }

      return JSON.parse(localStorage.users);
    }

    function setUsers(users) {
      localStorage.users = JSON.stringify(users);
    }

    function setPresentUser(presentUser){
      localStorage.presentUser = JSON.stringify(presentUser);
    }

    function getPresentUser() {
      if(!localStorage.presentUser){
        localStorage.presentUser = JSON.stringify([]);
      }

      return JSON.parse(localStorage.presentUser);
    }

    function setProbableSaltsOfUser(username, saltList){
      var users = getUsers();
      angular.forEach(users, function(user){
        if (user.username === username){
          user.probableAllergicSalts = saltList;
        }
      })
      setUsers(users);
    }

    function setDefinitiveSaltsOfUser(username, saltList){
      var users = getUsers();
      angular.forEach(users, function(user){
        if (user.username === username){
          user.definiteAllergicSalts = saltList;
        }
      })
      setUsers(users);
    }
  }
})();
