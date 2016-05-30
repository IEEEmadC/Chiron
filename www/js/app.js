// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('Allure', ['ionic', 'ionic-material']);

app.run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)

        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
})

app.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider

    .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
    })


    .state('login', {
        url: '/login',
        templateUrl: 'templates/login/login.view.html',
        controller: 'LoginController as vm'
    })

    .state('register', {
        url: '/register',
        templateUrl: 'templates/register/register.view.html',
        controller: 'RegisterController as vm'
    })

    .state('app.lists', {
        url: '/lists',
        views: {
            'menuContent': {
                templateUrl: 'templates/lists.html',
                controller: 'ListsCtrl'
            }
        }
    })

    .state('app.searchMedicine', {
        url: '/searchMedicine',
        cache: false,
        views: {
            'menuContent': {
                templateUrl: 'templates/searchMedicine/search.medicine.html',
                controller: 'searchMedicineController as vm'
            }
        }
    })

    .state('app.selectMedicine', {
        url: '/selectMedicine',
        cache: false,
        views: {
            'menuContent': {
                templateUrl: 'templates/selectMedicine/select.medicine.html',
                controller: 'selectMedicineController as vm'
            }
        }
    })

    .state('app.saltSelection', {
        url: '/saltSelection',
        cache: false,
        views: {
            'menuContent': {
                templateUrl: 'templates/saltSelection/salt.selection.html',
                controller: 'saltSelectionController as vm'
            }
        }
    })

    .state('app.welcome', {
        url: '/welcome',
        cache: false,
        views: {
            'menuContent': {
                templateUrl: 'templates/welcome/welcomeScreen.html',
                controller: 'welcomeScreenController as vm'
            }
        }
    })

    .state('app.allergicSalts', {
        url: '/allergicSalts',
        cache: false,
        views: {
            'menuContent': {
                templateUrl: 'templates/allergicSalts/allergic.salts.html',
                controller: 'allergicSaltsController as vm'
            }
        }
    })

    .state('app.extensions', {
        url: '/extensions',
        views: {
            'menuContent': {
                templateUrl: 'templates/extensions.html',
                controller: 'ExtensionsCtrl'
            }
        }
    })
    ;

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/login');
});
