
app.controller("staffController", function ($scope, $http,$modal,sharedService,loginService,$window,$dialogs) {
     "use strict"  

       //here logging in assigning object with the information from DB
       $scope.sharedData = sharedService.getData();
       $scope.details=$scope.sharedData[0];
        if( $scope.details==undefined){
          window.location.href='index.php'; 
         }
       $scope.username=$scope.sharedData[0].username ;
       $scope.password = $scope.sharedData[0].password;

       if($scope.sharedData[0].hospital_Id=="1"){
           $scope.adminHospital="Chris Hani Baragwana Hospital";
        }else if($scope.sharedData[0].hospital_Id=="2"){
           $scope.adminHospital="Steve Biko Academic Hospital";
        }else if($scope.sharedData[0].hospital_Id=="3"){
           $scope.adminHospital="Tshwane District Hospital";
        }else if($scope.sharedData[0].hospital_Id=="4"){
           $scope.adminHospital="DR Goerge Mukhari Hospital";
        }
      var currentId=$scope.sharedData[0].hospital_Id;
     //get staff information
        $scope.staffList=function(currentId){
            $http.post(
                "getAllStaff.php", {
                            'currentId': currentId
                        }
              ).then(function (results) {
                $scope.staffData= results.data;                
            });
        }
        $scope.staffList(currentId);

      //patient edit
          $scope.openstaffModal = function (staffData) {
              var modalInstance = $modal.open({
                  backdrop: 'static',
                  animation: true,
                  templateUrl: 'staffModalContent.html',
                  controller: 'staffModalController',
                  size: 'lg',
                  resolve: {
                    staffData: function () {
                              return staffData;
                          }
                        }
              });
              modalInstance.result.then(function (selectedItem) {
                              $scope.selected = selectedItem;
                              $scope.staffList();   
                          }, function () {
              });
          };
                  
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

app.controller("staffModalController", function ($scope, $http,sharedService, $modalInstance, toaster, $dialogs,staffData,loginService,$window) {
 
    $scope.sharedData = sharedService.getData();
       //set form dirty angular validation
  $scope.setDirtyForm = function (form) { angular.forEach(form.$error, function (type) { angular.forEach(type, function (field) { field.$setDirty(); }); }); return form; };
$scope.updateStatus = staffData != undefined ? 'Update' : 'Create';
//for readonly on update
if ($scope.updateStatus == 'Update')
    { $scope.truefalse = "true"; }
//assigning selected patient from modal
$scope.staffData=staffData;
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
//saving staff
    $scope.save =function() {

      if ($scope.registerForm.$valid) {
        //extract gender from IDnumber
            var saIds =$scope.staffData.idNumber;
            var saId=(saIds.substr ( 6  , 4));
            if ((saId > 4999) & (saId < 10000)){
				 $scope.staffData.gender='Male';
			}else
            {
                $scope.staffData.gender='Female'; 
            }
            //get current date 
            var todayDate =new Date();
            var selDate = todayDate.toISOString();
            $scope.staffData.createDate=selDate.substring(0,10);
           if($scope.staffData.role=="Doctor"){
              var roleVal="DR";
           }else{
              var roleVal="Pham";
           }

            var reT=saIds.substring(5,12);
            $scope.staffData.pID=roleVal + reT;
          //hospital created
             $scope.staffData.createdHospital=$scope.sharedData[0].hospital_Id;
            //send data to php file via ajax
            $http.post(
                "staffMemberInsert.php", {
                    'idNo': $scope.staffData.idNumber,'hospital_Id':  $scope.staffData.createdHospital,'pId':$scope.staffData.pID,'name': $scope.staffData.Firstname, 'surname': $scope.staffData.Surname, 'email': $scope.staffData.Email, 'gender':$scope.staffData.gender,'role':$scope.staffData.role,'state':$scope.updateStatus
                            }
            ).then(function (response) {
                if(response.data== 1){
                         toaster.success($scope.staffData.Firstname,'Registered.', ' ',
                                    toaster.options = {
                                        "positionClass": "toast-top-center",
                                        "closeButton": true
                                    });
                        $modalInstance.close();
                 }else if((response.data== 3)){
                     $modalInstance.close();
                     toaster.success('Staff Updated.', ' ',
                                    toaster.options = {
                                        "positionClass": "toast-top-center",
                                        "closeButton": true
                                    });
                        
               }else{
                     toaster.error('Staff Member Already Exist.', ' ',
                                    toaster.options = {
                                        "positionClass": "toast-top-center",
                                        "closeButton": true
                                    });
                        $modalInstance.close();
               };
             }); 
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
            dlg = $dialogs.confirm("Unsaved changes will be lost. Continue?", "");
            dlg.result.then(function (btn) {
                $modalInstance.dismiss('cancel');
            }, function (btn) { });
        } else { $modalInstance.dismiss('cancel'); }
    }

});
