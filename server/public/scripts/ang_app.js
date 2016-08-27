var myApp = angular.module('myApp', ["ngRoute"]);

myApp.config(["$routeProvider", function($routeProvider){
  $routeProvider.
    when("/cats", {
      templateUrl: "/views/partials/cats.html",
      controller: "catController"
    }).
    when("/dogs", {
      templateUrl: "/views/partials/dogs.html",
      controller: "dogController"
    }).
    when("/smallfurry", {
      templateUrl: "/views/partials/smallfurry.html",
      controller: "smallController"
    }).
    when("/favorites", {
      templateUrl: "/views/partials/favorites.html",
      controller: "favoritesController"
    }).
    when("/home", {
      templateUrl: "/views/partials/home.html",
      controller: "homeController"
    }).
    otherwise({
      redirectTo: "/cats"
    });

}]);

myApp.controller("globalController", ["$scope", "$http", function($scope, $http) {
$scope.favPetCounter = 0;
}]);

myApp.controller("catController", ["$scope", "$http", function($scope, $http) {
  console.log("working")
  var key = 'b900e0d5e332753a460a64eaa8de00fd';
  var baseURL = 'http://api.petfinder.com/';


    var query = baseURL + 'pet.getRandom';
    query += '?key=' + key;
    query += '&animal=cat';
    query += '&output=basic';
    query += '&format=json';

    console.log('query: ', query);

    var request = encodeURI(query) + '&callback=JSON_CALLBACK';

    $http.jsonp(request).then(function(response) {
      console.log(response.data);
      $scope.cat = response.data.petfinder.pet;

    });
    $scope.petFavorite = function(name,description,photo){
      console.log("name",name)
      console.log("description",description)
      console.log("photo",photo)
      if (name == undefined){
        name = "unknown"
      }
      if(description == undefined){
        description = "No description"
      }
      if(photo == undefined){
        photo ="No photo"
      }
      var pet = {
        name: name,
        description:description.substring(0,100),
        photo:photo,
      };
      console.log(pet)
      $http({
        method: 'POST',
        url: '/pets',
        data:pet,
      }).then(function (response) {
        $scope.favPetCounter + 1;
        $scope.orders2 = response.data;
        // console.log($scope.orders2);
      });
    };

}]);



  myApp.controller("dogController", ["$scope", "$http", function($scope, $http) {
    var key = 'b900e0d5e332753a460a64eaa8de00fd';
    var baseURL = 'http://api.petfinder.com/';

      var query = baseURL + 'pet.getRandom';
      query += '?key=' + key;
      query += '&animal=dog';
      query += '&output=basic';
      query += '&format=json';

      console.log('query: ', query);

      var request = encodeURI(query) + '&callback=JSON_CALLBACK';

      $http.jsonp(request).then(function(response) {
        $scope.dog = response.data.petfinder.pet;

      });

  }]);

    myApp.controller("smallController", ["$scope", "$http", function($scope, $http) {
      var key = 'b900e0d5e332753a460a64eaa8de00fd';
      var baseURL = 'http://api.petfinder.com/';


        var query = baseURL + 'pet.getRandom';
        query += '?key=' + key;
        query += '&animal=smallfurry';
        query += '&output=basic';
        query += '&format=json';

        console.log('query: ', query);

        var request = encodeURI(query) + '&callback=JSON_CALLBACK';

        $http.jsonp(request).then(function(response) {
          $scope.small = response.data.petfinder.pet;

        });


}]);

myApp.controller("favoritesController", ["$scope", "$http", function($scope, $http) {
  console.log("working favorites")
  $scope.favPets = []
  $http({
    method: 'GET',
    url: '/pets',
  }).then(function (response) {
    $scope.favPets = response.data;
  });

}]);
myApp.controller("homeController", ["$scope", "$http", function($scope, $http) {
  console.log("home controller")


}]);
