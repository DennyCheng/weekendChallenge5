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
    when("/barnyard", {
      templateUrl: "/views/partials/barnyard.html",
      controller: "barnController"
    }).
    when("/home", {
      templateUrl: "/views/partials/home.html",
      controller: "homeController"
    }).
    when("/bird", {
      templateUrl: "/views/partials/bird.html",
      controller: "birdController"
    }).
    when("/horse", {
      templateUrl: "/views/partials/horse.html",
      controller: "horseController"
    }).
    when("/pig", {
      templateUrl: "/views/partials/pig.html",
      controller: "pigController"
    }).
    when("/reptile", {
      templateUrl: "/views/partials/reptile.html",
      controller: "reptileController"
    }).
    otherwise({
      redirectTo: "/home"
    });

}]);

myApp.controller("globalController", ["$scope", "$http","$location", function($scope, $http, $location) {
// $scope.favPetCounter = 0;
//attemtpted to do a global pet counter to track animals in nested pets controllers didn't work :(
$scope.currentPage = 'home';
$scope.go = function go(page) {
  console.log(page);
  $location.path("/"+page);
//This some how works, don't ask questions. Thanks :)
};
}]);


myApp.controller("favoritesController", ["$scope", "$http", function($scope, $http) {
  console.log("working favorites")
  $scope.favPets = []
  $http({
    method: 'GET',
    url: '/pets',
  }).then(function (response) {
    $scope.favPets = response.data;
  })
}]);
myApp.controller("homeController", ["$scope", "$http", function($scope, $http) {
  console.log("home controller")


}]);



myApp.controller("catController", ["$scope", "$http", function($scope, $http) {

  console.log("Cat controller working")
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
    console.log("working")
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
        console.log(response.data);
        $scope.dog = response.data.petfinder.pet;

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

myApp.controller("smallController", ["$scope", "$http", function($scope, $http) {
        console.log("small working")
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
            console.log(response.data);
            $scope.small = response.data.petfinder.pet;

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

myApp.controller("barnController", ["$scope", "$http", function($scope, $http) {
        console.log("small working")
        var key = 'b900e0d5e332753a460a64eaa8de00fd';
        var baseURL = 'http://api.petfinder.com/';


          var query = baseURL + 'pet.getRandom';
          query += '?key=' + key;
          query += '&animal=barnyard';
          query += '&output=basic';
          query += '&format=json';

          console.log('query: ', query);

          var request = encodeURI(query) + '&callback=JSON_CALLBACK';

          $http.jsonp(request).then(function(response) {
            console.log(response.data);
            $scope.barn = response.data.petfinder.pet;

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
              $scope.orders2 = response.data;
              // console.log($scope.orders2);
            });
          };
}]);

myApp.controller("birdController", ["$scope", "$http", function($scope, $http) {
        console.log("bird working")
        var key = 'b900e0d5e332753a460a64eaa8de00fd';
        var baseURL = 'http://api.petfinder.com/';


          var query = baseURL + 'pet.getRandom';
          query += '?key=' + key;
          query += '&animal=bird';
          query += '&output=basic';
          query += '&format=json';

          console.log('query: ', query);

          var request = encodeURI(query) + '&callback=JSON_CALLBACK';

          $http.jsonp(request).then(function(response) {
            console.log(response.data);
            $scope.bird = response.data.petfinder.pet;

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
              $scope.orders2 = response.data;
              // console.log($scope.orders2);
            });
          };
}]);

myApp.controller("horseController", ["$scope", "$http", function($scope, $http) {
        console.log("horse working")
        var key = 'b900e0d5e332753a460a64eaa8de00fd';
        var baseURL = 'http://api.petfinder.com/';


          var query = baseURL + 'pet.getRandom';
          query += '?key=' + key;
          query += '&animal=horse';
          query += '&output=basic';
          query += '&format=json';

          console.log('query: ', query);

          var request = encodeURI(query) + '&callback=JSON_CALLBACK';

          $http.jsonp(request).then(function(response) {
            console.log(response.data);
            $scope.horse = response.data.petfinder.pet;

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
              $scope.orders2 = response.data;
              // console.log($scope.orders2);
            });
          };
}]);

myApp.controller("pigController", ["$scope", "$http", function($scope, $http) {
        console.log("pig working")
        var key = 'b900e0d5e332753a460a64eaa8de00fd';
        var baseURL = 'http://api.petfinder.com/';


          var query = baseURL + 'pet.getRandom';
          query += '?key=' + key;
          query += '&animal=pig';
          query += '&output=basic';
          query += '&format=json';

          console.log('query: ', query);

          var request = encodeURI(query) + '&callback=JSON_CALLBACK';

          $http.jsonp(request).then(function(response) {
            console.log(response.data);
            $scope.pig = response.data.petfinder.pet;

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
              $scope.orders2 = response.data;
              // console.log($scope.orders2);
            });
          };
}]);

myApp.controller("reptileController", ["$scope", "$http", function($scope, $http) {
        console.log("reptile working")
        var key = 'b900e0d5e332753a460a64eaa8de00fd';
        var baseURL = 'http://api.petfinder.com/';


          var query = baseURL + 'pet.getRandom';
          query += '?key=' + key;
          query += '&animal=reptile';
          query += '&output=basic';
          query += '&format=json';

          console.log('query: ', query);

          var request = encodeURI(query) + '&callback=JSON_CALLBACK';

          $http.jsonp(request).then(function(response) {
            console.log(response.data);
            $scope.reptile = response.data.petfinder.pet;

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
              $scope.orders2 = response.data;
              // console.log($scope.orders2);
            });
          };
}]);
