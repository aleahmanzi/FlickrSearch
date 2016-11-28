var demo = angular.module('demo', []);
  demo.controller('ctrl', function ($scope, $http, $sce, $filter){

  $scope.photoUrl = function(photo) {
    var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server +"/" + photo.id + "_" + photo.secret + "_q.jpg";
    return $sce.trustAsResourceUrl(url);
  };

    $scope.tag_input = "";
    $scope.results = false;
    $scope.error = false;
    $scope.searching = false;
    $scope.showPhotos = false;
    $scope.showNext = false;
    $scope.searchTag = "";
    $scope.currentPage = 0;
    $scope.pageSize = 25;
    $scope.data = [];
    $scope.q = '';

  $scope.searchPhotos = function(searchTag){
    $scope.searching = true;
    $scope.searchTag = searchTag;

    var request = {       
    method: 'flickr.photos.search',
    api_key: 'd3061901c2e39da3584815af74b47e67',
    tags: searchTag,
    format: 'json',
    nojsoncallback: 1
    }
    $http({
    url: 'https://api.flickr.com/services/rest',
    method: 'GET',
    params: request,
  })
    .then(function(data){
      $scope.searching = false;
      $scope.searchTag = "";
      $scope.results = true;
      $scope.showPhotos = true;
      $scope.showNext = true;
      $scope.totalResults = data.data.photos.total;
      $scope.photos = data.data.photos.photo;
    }),
      function(data){
      console.log("error", data);
      $scope.error = true;
      };
    }

    $scope.getData = function () {
      return $filter('filter')($scope.data, $scope.q)
    }
    
    $scope.numberOfPages=function(){
        return Math.ceil($scope.totalResults/$scope.pageSize);                
    }
  }); /// - ctrl  
    
demo.filter('startFrom', function() {
   console.log("test")
    return function(input, start) {
        start = +start; //parse to int
        return input.slice(start);
    }
  });
  