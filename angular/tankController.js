
app.controller("tankController", function ($scope, $http,$modal,sharedService,loginService,$window,$dialogs) {
    "use strict"
    //here logging in assigning object with the information from DB
       $scope.sharedData = sharedService.getData();
        $scope.details=$scope.sharedData[0];
         if( $scope.details==undefined){
           window.location.href='index.php'; 
          }
        $scope.username=$scope.sharedData[0].username;
        $scope.password = $scope.sharedData[0].password;

         var currentId=$scope.sharedData[0].hospital_Id;
         
        $scope.unl95=0;
        $scope.unl93=0;
        $scope.diseal=0;

        $scope.messager= [];


        //opening sign in modal
    $scope.openTankModal = function (patients) {
        patients.tankInfo=$scope.tankInfo;
        var modalInstance = $modal.open({
            backdrop: 'static',
            animation: true,
            templateUrl: 'tankModalContent.html',
            controller: 'tankModalController',
            size: 'md',
             resolve: {
                     patients: function () {
                         return patients;
                     }
                  }
        });
         modalInstance.result.then(function (selectedItem) {
                        $scope.selected = selectedItem;
                        $scope.tankList();          
                    }, function () {
         });
    };

    //get tank
    $scope.tankList=function(){
                    $http({
                        url: "getTankView.php",
                        method: "GET"
                        }).then(function (results) {
                        $scope.tankInfo= results.data;
                        var ff=$scope.tankInfo; 
                        $scope.CalculateFuel($scope.tankInfo);               
                    });
        }
    $scope.tankList();

    $scope.CalculateFuel=(tankInfo)=>{
      $scope.unl95=tankInfo[0].Liters /1000 * 100;
      $scope.unl93=tankInfo[1].Liters /1000 * 100;
      $scope.diseal=tankInfo[2].Liters /1000 * 100;
    
       if($scope.unl95 < 10){
         $scope.messager.push(tankInfo[0].Name);
       }

       if($scope.unl93 < 10){
         $scope.messager.push(tankInfo[1].Name);
       }

       if($scope.diseal < 10){
           $scope.messager.push(tankInfo[2].Name);
       }

    }
    
     //log out and update logged on as xero
      $scope.logout=function(){               
               $http.post(
                "updateLoggedIn.php", {               
                    'logged':"0",'idNumber':$scope.details.idNumber,'currentUser': $scope.details.role 
        }).then(function (response) {
                $window.sessionStorage.clear();
                window.location.href='index.php';
            });              
          }

         
   
});
app.controller("tankModalController", function ($scope, $http, $modalInstance,sharedService, toaster, $dialogs,patients,loginService,$window) {

 $scope.sharedData = sharedService.getData();
    //set form dirty angular validation
  $scope.setDirtyForm = function (form) { angular.forEach(form.$error, function (type) { angular.forEach(type, function (field) { field.$setDirty(); }); }); return form; };
$scope.updateStatus = patients != undefined ? 'Update' : 'Create';
//for readonly on update
if ($scope.updateStatus == 'Update')
    { $scope.truefalse = "true"; }
//assigning selected patient from modal
$scope.patientData=patients;

//$scope.yy=ff;

//saving patient file
    $scope.save = () =>{

      if ($scope.tankForm.$valid) {
                  
            $http.post(
                "insertTank.php", {
                    'Name': $scope.patientData.Name,'Liters':$scope.patientData.Liters,'AmountPerLiter': $scope.patientData.AmountPerLiter
                            }
            ) .then(function (response) {
                 if((response.data== 3)){
                     $modalInstance.close();
                     toaster.success('tank Updated.', ' ',
                                    toaster.options = {
                                        "positionClass": "toast-top-center",
                                        "closeButton": true
                                    });

                      $modalInstance.close();
                        
               }else{

                    toaster.success('Tank Updated.', ' ',
                        toaster.options = {
                            "positionClass": "toast-top-center",
                            "closeButton": true
                        });
                            $modalInstance.close();
                };
             }); 
           } else {
                    toaster.error('Please complete all required fields.',
                                                ' ', toaster.options = {
                                                        "positionClass": "toast-top-left",
                                                        "closeButton": true
                                                    });
                        $scope.setDirtyForm($scope.registerForm);
                        $('input.ng-invalid').first().focus();
                    };              
    }     
  
    $scope.CheckIfAboveFity=(patientData)=>
    {
        //check if greater


    }

    $scope.close = function () {
    //
         if ($scope.tankForm.$dirty) {
            var dlg = null;
            dlg = $dialogs.confirm("You have unsaved data that might be lost. Continue?", "");
            dlg.result.then(function (btn) {
                $modalInstance.dismiss('cancel');
            }, function (btn) { });
        } else { $modalInstance.dismiss('cancel'); }
    }

});


