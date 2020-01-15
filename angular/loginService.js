app.factory('loginService', ['$http', function ($http) {
    'use strict';
    
     var serviceFactory = {};   
      var selectUser = [];

     var _logIn = function (data) {
        return $http({
            url: "login.php",
            method: "POST",
            data: data
        }).then(function (results) {
            return results;
        });
    };
    serviceFactory.logIn = _logIn;
  
    return serviceFactory;
}]);
