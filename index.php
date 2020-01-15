<!DOCTYPE html>
<html lang="en"  data-ng-app="HealthApp">
<head>
    <title>Pharmacy System Home</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="css/bootstrap.css">
   <link rel="stylesheet" href="css/bootstrap-theme.css">
    <link rel="stylesheet" href="css/angular-toastr.min.css">
    <link rel="stylesheet" href="css/style2.css"> 
     <style>
		html{
				background: url('../img/med/k4oimz-2000x1114.jpg')no-repeat center center fixed;
				-webkit-background-size:cover;
				-moz-background-size:cover;
				-o-background-size: cover;
				background-size: cover;
				
			}
	</style> 
</head>
<body ng-controller="indexController">
        <div class="col-md-12 header">
        <div class="logo"><h3 style="color:white;font-size:1.8em;text-align:left;">Pharmacy Systems</h3></div> 
        </div>
           <br>
        <div class="col-md-12 center-block">
                <button id="singlebutton"  style="margin-top:200px" name="singlebutton" class="btn btn-success center-block" ng-click="openlogInModal()">Log In</button>
           </div>
<script type="text/ng-template" id="logInModalContent.html">
        <!-- log in Modal-->
        <form class="form-horizontal" name="logInForm">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" ng-click="close()">&times;</button>
                <h4 class="modal-title">Log In to Pharmacy</h4>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-md-12">
                        <div class="form-group" >
                            <label class="control-label col-sm-2">username:</label>
                            <div class="col-sm-10" ng-class="{'has-error' : logInForm.username.$invalid && !logInForm.username.$pristine }">
                                <input type="text" class="form-control" id="username" name="username" placeholder="Enter username" ng-model="data.username"   required>
                                <span style="color:red" ng-show="logInForm.username.$pristine && logInForm.username.$invalid"> username is required.</span>
                            </div>
                        </div>
                        <div ng-if="data.forgot !=='Y'">
                        <div class="form-group" >
                            <label class="control-label col-sm-2" for="pwd">Password:</label>
                            <div class="col-sm-10" ng-class="{'has-error' : logInForm.password.$invalid && !logInForm.password.$pristine }">
                                <input type="password" class="form-control" id="pwd" name="password" ng-model="data.password" placeholder="Enter password" required>
                                <span style="color:red" ng-show="logInForm.password.$pristine && logInForm.password.$invalid"> password is required.</span>
                            </div>
                          </div>
                        </div>
                        <div class="form-group" >
                           
                                 <div class="col-md-2">
                                        <label class="radioBtnLabel" style="padding:3px" >Admin</label><input  type="radio" data-ng-model="data.logValue" value="Admin">
                                    </div>
                                    <div class="col-md-3">
                                    <label class="radioBtnLabel" style="padding:3px">Patient</label><input  type="radio" data-ng-model="data.logValue" value="customer">
                                    </div>
                                                                 
                             </div>    
                             <br>
                             </div>
                             <div class="form-group" style="padding:20px">
                            <label class="control-label col-md-4" for="pwd">forgot Password ?</label>
                            <div class="col-sm-1" >
                                <input type="checkbox" class="form-control"  ng-model="data.forgot" ng-true-value="'Y'" >
                          
                            </div>
                        </div>
                         <div class="col-md-12">
                                 <div class="alert alert-danger alert-dismissible" style="background-color:lightcoral ; color:black" role="alert" ng-if="showError==1">  
                                 <strong><span class="glyphicon glyphicon-thumbs-down"></span></strong> {{errors}}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" value="submit" class="btn btn-success" ng-click="saveLogIn(data)">Submit</button>
                <button type="button" class="btn btn-default" ng-click="close()">Close</button>
            </div>
        </form>
    </script>
     <div data-ng-view="" ng-cloak> </div>
      <script src="js/jquery.js" type="text/javascript"></script>
      <script src="js/bootstrap.js" type="text/javascript"></script>
        <!-- angular extentions-->
      <script src="js/angular.js" type="text/javascript"></script> 
      <script src="app.js" type="text/javascript"></script>
      <script src="js/toaster.min.js" type="text/javascript"></script>
      <script src="js/angular-moment.min.js" type="text/javascript"></script>
      <script src="js/angular-route.min.js" type="text/javascript"></script>
      <script src="js/angular-ui-router.js" type="text/javascript"></script>
      <script src="js/ui-bootstrap-tpls.min.js" type="text/javascript"></script>
      <script src="js/dialogs.min.js" type="text/javascript"></script> 
      <script src="js/idvalidator.js" type="text/javascript"></script> 
      <script src="js/slide.js" type="text/javascript"></script> 
        <!-- Load controllers -->
     <script src="angular/indexController.js" type="text/javascript"></script>  
     <script src="angular/sharedService.js" type="text/javascript"></script>  
     <script src="angular/loginService.js" type="text/javascript"></script>
     <script src="angular/userController.js" type="text/javascript"></script>
               
</body>
</html>
<toaster-container></toaster-container>