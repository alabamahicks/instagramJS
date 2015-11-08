angular.module('instagramSearchApp', ['ngAnimate'])
  .controller('InstagramSearchController', function($scope, $q, $http){

    /* Copied 100% From Thinkful*/
    function wait(){
      var defer = $q.defer();
      setTimeout(function(){
        defer.resolve();
      }, 1000);
      return defer.promise;
    }

    /* Taking Care of the Notification Part*/
    function notification(){
      return wait().then(function(){
        $scope.showNotification = "";
      });
    }
    
    /*Get Results*/
    $scope.getInstagramResults = function(){
      $scope.hasError = false;
      $scope.results = null;
      
      if($scope.instaform.$invalid){
        $scope.showNotification = "Please enter a search term";
        $scope.hasError = true;
        return;
      }


      var url = 'https://api.instagram.com/v1/tags/'+ $scope.searchTerm +'/media/recent';
      var request = {
        callback: 'JSON_CALLBACK',
        client_id: '0af385bbcbfd495e901da7aeb427f0f7'
      };

      $http({
        method: 'JSONP',
        url: url,
        params: request
      })
      .success(function(result){
        notification().then(function(){
          $scope.results = result.data;
          var numberOfResults = $scope.results.length;
          $scope.showNotification = "We found " + $scope.results.length + " results";
        });
      })
      .error(function(result){
        notification().then(function(){
          $scope.showNotification = "Error Searching Instagram";
          $scope.hasError = true;
        })
      });
    }; 
  });
