
app.controller("adminController", function ($scope, $http,$modal,sharedService,loginService,$window,$dialogs) {
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
         
        //opening sign in modal
 $scope.openSignModal = function (patients) {
        var modalInstance = $modal.open({
            backdrop: 'static',
            animation: true,
            templateUrl: 'patientSignModalContent.html',
            controller: 'patientRegController',
            size: 'lg',
             resolve: {
                     patients: function () {
                         return patients;
                     }
                  }
        });
         modalInstance.result.then(function (selectedItem) {
                        $scope.selected = selectedItem;
                        $scope.patientsList();             
                    }, function () {
         });
    };
    //get patients list
    $scope.patientsList=function(){
                    $http({
                        url: "getPatientInfo.php",
                        method: "GET"
                        }).then(function (results) {
                        $scope.patients= results.data;                
                    });
        }
    $scope.patientsList();

        //get shopping list
        $scope.shoppingList=function(){
            $http({
                url: "highestReport.php",
                method: "GET"
                }).then(function (results) {
                $scope.getShoppingReport= results.data;                
            });
        }
        $scope.shoppingList();

        //get tank list
        $scope.tankList=function(){
            $http({
                url: "highestUsedTank.php",
                method: "GET"
                }).then(function (results) {
                $scope.getTanksReport= results.data;                
            });
        }
        $scope.tankList();


     //delete user
     $scope.delete =function(patient){
           var dlg = null;
                dlg = $dialogs.confirm("Are you sure you want make changes. Continue?", "");
                dlg.result.then(function (btn) {              
           $http.post(
                         "deleteUser.php", {
                                'idNumber': patient.idNumber,'Active': patient.state
                            }
                        ).then(function (response) {
                            $scope.deletApp = response.data; 
                              $scope.patientsList();                  
                        });
                });
     }

     $scope.exportAction = function(export_action){ 
        switch(export_action){ 
            case 'pdf': $scope.$broadcast('export-pdf', {}); 
                        break; 
            case 'excel': $scope.$broadcast('export-excel', {}); 
                        break; 
            case 'doc': $scope.$broadcast('export-doc', {});
                        break; 
            default: console.log('no event caught'); 
         }
  }
  $scope.exportAction('excel');
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

          //assign doctor
          $scope.assign=function(docData){
               $scope.selectedDoc=docData.selectedDoc.staffID;
               $http.post(
                "assignDoctor.php", {
                       'idNumber': docData.idNumber,'doID':$scope.selectedDoc
                   }
               ).then(function (response) {
                  $window.location.reload();                  
               });

          }

   
});
app.controller("patientRegController", function ($scope, $http, $modalInstance,sharedService, toaster, $dialogs,patients,loginService,$window) {

    $scope.sharedData = sharedService.getData();
    //set form dirty angular validation
  $scope.setDirtyForm = function (form) { angular.forEach(form.$error, function (type) { angular.forEach(type, function (field) { field.$setDirty(); }); }); return form; };
$scope.updateStatus = patients != undefined ? 'Update' : 'Create';
//for readonly on update
if ($scope.updateStatus == 'Update')
    { $scope.truefalse = "true"; }
//assigning selected patient from modal
$scope.patientData=patients;
//ID validation
   $scope.ValidateIdnumber = function(){
       var resultArray =  ValidateID($('#id_number').val());
       if(resultArray[0] === 0){
            var msg ="";
           $.each(resultArray[2], function(index,row){
            msg = row +"<br/>";
           })
          $("#errors").html(msg);
       }
       else{
             $("#errors").html('');
       }
    }

//saving patient file
    $scope.save =function() {

      if ($scope.registerForm.$valid) {
        //extract gender from IDnumber
            var saIds =$scope.patientData.idNumber;
            var saId=(saIds.substr ( 6  , 4));
            if ((saId > 4999) & (saId < 10000)){
				 $scope.patientData.gender='Male';
			}else
            {
                $scope.patientData.gender='Female'; 
            }
            //get current date 
            var todayDate =new Date();
           var selDate = todayDate.toISOString();
            $scope.patientData.createDate=selDate.substring(0,10);
            $scope.patientData.pID=saIds.substring(7,13);
          
        //send data to php file via ajax
        if($scope.patientData.logValue=='customer'){
            $http.post(
                "insertPatient.php", {
                    'idNo': $scope.patientData.idNumber,'pId':$scope.patientData.pID,'name': $scope.patientData.FirstName, 'surname': $scope.patientData.Surname,'cellNo': $scope.patientData.CellNumber, 'email': $scope.patientData.Email, 'address': $scope.patientData.HomeAddress,'gender':$scope.patientData.gender,'createDate':$scope.patientData.createDate,'state':$scope.updateStatus
                            }
            ) .then(function (response) {
                if(response.data== 1){
                         toaster.success($scope.patientData.FirstName,'patient Registered.', ' ',
                                    toaster.options = {
                                        "positionClass": "toast-top-center",
                                        "closeButton": true
                                    });
                        $modalInstance.close();
                 }else if((response.data== 3)){
                     $modalInstance.close();
                     toaster.success('patient Updated.', ' ',
                                    toaster.options = {
                                        "positionClass": "toast-top-center",
                                        "closeButton": true
                                    });
                        
               }else{
                     toaster.error('patient Already Exist.', ' ',
                                    toaster.options = {
                                        "positionClass": "toast-top-center",
                                        "closeButton": true
                                    });
                        $modalInstance.close();
               };
             });
        }else{

     
            $http.post(
                "insertAdmin.php", {
                    'idNo': $scope.patientData.idNumber,'pId':$scope.patientData.pID,'name': $scope.patientData.FirstName, 'surname': $scope.patientData.Surname,'cellNo': $scope.patientData.CellNumber, 'email': $scope.patientData.Email, 'address': $scope.patientData.HomeAddress,'gender':$scope.patientData.gender,'createDate':$scope.patientData.createDate,'state':$scope.updateStatus,'role':$scope.patientData.logValue
                            }
            ) .then(function (response) {
                if(response.data== 1){
                         toaster.success($scope.patientData.FirstName,'staff Registered.', ' ',
                                    toaster.options = {
                                        "positionClass": "toast-top-center",
                                        "closeButton": true
                                    });
                        $modalInstance.close();
                 }else if((response.data== 3)){
                     $modalInstance.close();
                     toaster.success('staff Updated.', ' ',
                                    toaster.options = {
                                        "positionClass": "toast-top-center",
                                        "closeButton": true
                                    });
                        
               }else{
                     toaster.error('staff Already Exist.', ' ',
                                    toaster.options = {
                                        "positionClass": "toast-top-center",
                                        "closeButton": true
                                    });
                        $modalInstance.close();
               };
             }); 
            }
           } else {
                    toaster.error(' Please complete all required fields.',
                                                ' ', toaster.options = {
                                                        "positionClass": "toast-top-left",
                                                        "closeButton": true
                                                    });
                        $scope.setDirtyForm($scope.registerForm);
                        $('input.ng-invalid').first().focus();
                    };              
    }     
    $scope.close = function () {
    //
         if ($scope.registerForm.$dirty) {
            var dlg = null;
            dlg = $dialogs.confirm("unsaved data might be lost. Continue?", "");
            dlg.result.then(function (btn) {
                $modalInstance.dismiss('cancel');
            }, function (btn) { });
        } else { $modalInstance.dismiss('cancel'); }
    }

});


