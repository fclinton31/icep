<?php
      require_once 'inc.php'; 
   /* this is because of angular the if information is in a json format*/
    $data=json_decode(file_get_contents("php://input"));
     
   
               $username = mysqli_real_escape_string($connect, $data->username);
               $password = mysqli_real_escape_string($connect, $data->password);
               $userValue= mysqli_real_escape_string($connect, $data->logValue);
               $errors = array();
               if($userValue=="customer"){
                //check if patient exist
                  $user_pas= "select * from customer where username='$username'";
                  $run_queryP = mysqli_query($connect,$user_pas);
                  $check_pas = mysqli_num_rows($run_queryP);
                  if($check_pas > 0){
                        $rowP=$run_queryP->fetch_assoc();
                      if($password == $rowP['password']){
                          $user_sel= "select * from customer where username='$username' and password='$password'";
                          $run_query = mysqli_query($connect,$user_sel);
                          $row=$run_query->fetch_assoc();
                        //  header('Content-type: application/json');
                          $data=$row;
                      }else{ $data = 1; }
                 }else{ $data=2; } 
               }else{
            //check if staffmember exist
                            $user_pas= "select * from staffmember where username='$username' and role='$userValue'";
                            $run_queryP = mysqli_query($connect,$user_pas);
                            $check_pas = mysqli_num_rows($run_queryP);
                            if($check_pas > 0){
                                    $rowP=$run_queryP->fetch_assoc();
                                if($password == $rowP['password']){
                                    $user_sel= "select * from staffmember where username='$username' and password='$password'and role='$userValue'";
                                    $run_query = mysqli_query($connect,$user_sel);
                                    $row=$run_query->fetch_assoc();
                                   // header('Content-type: application/json');
                                    $data=$row;
                                }else{ $data = 1; }
                            }else{ $data=2; } 
               }   
   
          print  json_encode($data)
?>