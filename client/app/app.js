angular.module('app', ['ui.router'])
.config(function($urlRouterProvider, $stateProvider) {
  $stateProvider
    .state("landing", {
        url: "/",
        templateUrl: "app/landing/landingView.html",
        controller: "landingCtrl"
    })
    .state("login", {
        url: "/login",
        templateUrl: "app/login/loginView.html",
        controller: "loginCtrl"
    })
    .state("signup", {
        url: "/signup",
        templateUrl: "app/signup/signupView.html",
        controller: "signupCtrl"
    })
    .state("studentHome", {
        url: "/studentHome",
        templateUrl: "app/studentHome/studentHomeView.html",
        controller: "studentHomeCtrl"
    })
    .state("studentProject", {
        url: "/studentProject",
        templateUrl: "app/studentProject/studentProjectView.html",
        controller: "studentProjectCtrl"
    })
    .state("teacherClass", {
        url: "/teacherClass",
        templateUrl: "app/teacherClass/teacherClassView.html",
        controller: "teacherClassCtrl"
    })
    .state("teacherHome", {
        url: "/teacherHome",
        templateUrl: "app/teacherHome/teacherHomeView.html",
        controller: "teacherHomeCtrl"
    })
    .state("teacherProject", {
        url: "/teacherProject",
        templateUrl: "app/teacherProject/teacherProjectView.html",
        controller: "teacherProjectCtrl"
    });

  $urlRouterProvider.otherwise("/")

  .run(function ($rootScope, $location, Auth) {

    //watching the value of the currentUser variable.
    $rootScope.$watch('currentUser', function(currentUser) {
      // if no currentUser and on a page that requires authorization then try to update it
      // will trigger 401s if user does not have a valid session
      if (!currentUser && (['/', '/login', '/logout', '/signup'].indexOf($location.path()) === -1 )) {
        Auth.currentUser();
      }
    });

    // On catching 401 errors, redirect to the login page.
    $rootScope.$on('event:auth-loginRequired', function() {
      $location.path('/login');
      return false;
    });
});