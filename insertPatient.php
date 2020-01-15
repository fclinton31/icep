<?Php  
     //opening connection
       require_once 'inc.php';

      //decode json object         
    $patientObj=json_decode(file_get_contents("php://input"));


             //assign Variables with json information
            // $custID=mysqli_real_escape_string($connect, $patientObj->pId);
              $idNumber=mysqli_real_escape_string($connect, $patientObj->idNo);
              $FirstName=mysqli_real_escape_string($connect, $patientObj->name);
              $Surname=mysqli_real_escape_string($connect, $patientObj->surname);
              $CellNumber=mysqli_real_escape_string($connect, $patientObj->cellNo);
              $Email=mysqli_real_escape_string($connect, $patientObj->email);
              $Gender=mysqli_real_escape_string($connect, $patientObj->gender);     
              $createDate=mysqli_real_escape_string($connect, $patientObj->createDate); 
              $userState=mysqli_real_escape_string($connect, $patientObj->state);  
              $username=substr($idNumber,0,6);
              $password=substr($idNumber,9,5); 
              $errors = array();

              if($userState=='Create'){
                        //checking if the customer already exist
                        $user_sel= "SELECT * FROM `customer` where idNumber ='$idNumber'";
                        $run_query = mysqli_query($connect,$user_sel);
                        //ccheck/counting number of rows for the same use if the exist from database
                        $check_user = mysqli_num_rows($run_query);
                      
                        if($check_user>0)
                          { 
                              //use for error msg on controlller
                              $data= 0;
                          }else{
                            //insert to DB

                            $sql = "INSERT INTO customer(custID,idNumber,FirstName,Surname,Gender,Email,CellNumber,createDate,password,username)
                                   VALUES('$username','$idNumber','$FirstName','$Surname','$Gender','$Email','$CellNumber','$createDate','$password','$username')";
                      
                          if (!$sql) {
                              die('Invalid query: ' . mysql_error());
                          }

                          if (mysqli_query($connect,$sql)) {
                          
                            $to = $Email;
                             $subject = "Registration Confirmation";
                             $message = "Your Username is". " " . $username . " " ."Password is " . $password ;
                             $headers = "From:Pharmacy System"; 
                             mail($to,$subject,$message,$headers);
                              $data= 1;
                         } else {
                           $data= 10;
                         }
                         
                    }
                
                     
                 

                       
                   }else{
                       
                       $update= "UPDATE `customer` 
                                 SET `FirstName` = '$FirstName',
                                     `Surname` = '$Surname',
                                     `CellNumber`='$CellNumber',
                                     `Email` = '$Email'                                    
                                WHERE `idNumber` = '$idNumber'";
                       $run_query =  mysqli_query($connect,$update);
                        $data= 3;
                   }

                  print  json_encode($data);
 
mysqli_close($connect)
    
?>