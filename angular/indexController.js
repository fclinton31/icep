
app.controller("indexController", function ($scope, $http,$modal,sharedService,loginService,$window) {
    "use strict"

 $scope.openlogInModal = function ( ) {
        var modalInstance = $modal.open({
            backdrop: 'static',
            animation: true,
            templateUrl: 'logInModalContent.html',
            controller: 'adminlogInController',
            size: 'md'
        });
    };

});

app.controller("adminlogInController", function ($scope, $http, $modalInstance, toaster, $dialogs,sharedService,loginService,$window) {
 "use strict"
    $scope.setDirtyForm = function (form) { angular.forEach(form.$error, function (type) { angular.forEach(type, function (field) { field.$setDirty(); }); }); return form; };
 $scope.showError = null;
 $scope.errors=null;
  
    $scope.saveLogIn = function (logInData) {

     if ($scope.logInForm.$valid) {
          if(logInData.forgot=='Y'){
             $http.post(
                "forgotPassword.php", {
                          'username': logInData.username,'logValue': logInData.logValue
                            }
                            
                        ).then(function (response) {
                           if(response.data == 2){
                                 $scope.errors= "No Record For"+" "+ logInData.logValue +" "+ " Was Found";
                                 $scope.showError = 1;
                            }else if(response.data == 1){
                                
                                 toaster.success('PLease Check Your Mail.', ' ',
                                    toaster.options = {
                                        "positionClass": "toast-top-center",
                                        "closeButton": true
                                    });
                            }else{
                                 $scope.errors= "Unknown Errror Occur Please Contact Your Admin ";
                                 $scope.showError = 1;
                            }

                        })              
           }else{
                loginService.logIn(logInData).then(function (response) {
                $modalInstance.close();
             if(response.data ==1){
                  toaster.error('Wrong Password Entered',
                                           '', toaster.options = {
                                "positionClass": "toast-top-right",
                                     "closeButton": true
                              });
            }else if(response.data.password==$scope.data.password && response.data.username==$scope.data.username){
                     $scope.dataToShare = [];                                          
                          $scope.dataToShare = response.data;
                         sharedService.addData($scope.dataToShare);
                         if($scope.dataToShare.role=="Patient"){
                            if($scope.dataToShare.logged_On=="0"){
                                $scope.dataToShare.logged=="1";
                                $http.post(
                                    "updateLoggedIn.php", {               
                                        'logged':"1",'idNumber':$scope.dataToShare.idNumber,'currentUser': $scope.dataToShare.role 
                                                }
                                ).then(function (response) {
                                    window.location.href='user.php';  
                                });
                            }else{
                                 toaster.error('User already signed in',
                                             '', toaster.options = {
                                             "positionClass": "toast-top-right",
                                            "closeButton": true
                                });                               
                            } 
                            
                         }else if($scope.dataToShare.role=="Admin") {
                            if($scope.dataToShare.logged_On=="0"){
                                $scope.dataToShare.logged=="1";
                                $http.post(
                                    "updateLoggedIn.php", {               
                                        'logged':"1",'idNumber':$scope.dataToShare.idNumber,'currentUser': $scope.dataToShare.role 
                                                }
                                ).then(function (response) {
                                 window.location.href='admin.php'; 
                                });
                            }else{
                                 toaster.error('User already signed in',
                                             '', toaster.options = {
                                             "positionClass": "toast-top-right",
                                            "closeButton": true
                                });                               
                            }                             
                         }else if($scope.dataToShare.role=="customer") {
                            if($scope.dataToShare.logged_On=="0"){
                                $scope.dataToShare.logged=="1";
                                $http.post(
                                    "updateLoggedIn.php", {               
                                        'logged':"1",'idNumber':$scope.dataToShare.idNumber,'currentUser': $scope.dataToShare.role 
                                                }
                                ).then(function (response) {
                                  window.location.href='user.php';  
                                });
                            }else{
                                 toaster.error('User already signed in',
                                             '', toaster.options = {
                                             "positionClass": "toast-top-right",
                                            "closeButton": true
                                });                               
                            } 
                            
                        }else if($scope.dataToShare.role=="supplier") {
                            if($scope.dataToShare.logged_On=="0"){
                                $scope.dataToShare.logged=="1";
                                $http.post(
                                    "updateLoggedIn.php", {               
                                        'logged':"1",'idNumber':$scope.dataToShare.idNumber,'currentUser': $scope.dataToShare.role 
                                                }
                                ).then(function (response) {
                                  window.location.href='tankView.php';  
                                });
                            }else{
                                 toaster.error('User already signed in',
                                             '', toaster.options = {
                                             "positionClass": "toast-top-right",
                                            "closeButton": true
                                });                               
                            } 
                            
                        }                                                                    
            }else if(response.data ==2){
                 toaster.error('Wrong Username entered',
                                           '', toaster.options = {
                                "positionClass": "toast-top-right",
                                     "closeButton": true
                              });
            }else{

                 toaster.error('The Username and password entered does not match',
                                           '', toaster.options = {
                                "positionClass": "toast-top-right",
                                     "closeButton": true
                              });
            }

       
            }, function (error) {                    
                toaster.error(' Log In Failed.',
                                            'Failed!', toaster.options = {
                                    "positionClass": "toast-top-center",
                                        "closeButton": true
                                });
                console.error(error);
            });
        } 
    };
  }
  
    $scope.close = function () {
        if ($scope.logInForm.$dirty) {
            var dlg = null;
            dlg = $dialogs.confirm("unsaved data might be lost. Continue?", "");
            dlg.result.then(function (btn) {
                $modalInstance.dismiss('cancel');
            }, function (btn) { });
        } else { $modalInstance.dismiss('cancel'); }
    }

  
});