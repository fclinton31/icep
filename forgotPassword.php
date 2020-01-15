<?php

     require_once 'inc.php'; 
   /* this is because of angular the if information is in a json format*/
    $data=json_decode(file_get_contents("php://input"));
     
     if (count($data)>0){

            $username = mysqli_real_escape_string($connect, $data->username); 
            $userValue= mysqli_real_escape_string($connect, $data->logValue);     
            $errors = array();
            if($userValue=="customer"){
                  $user_sel= "select password,Email from customer where username='$username'"; 
                  echo $user_sel->password;
            }else{
                   $user_sel= "select password,Email from staffmember where username='$username' and role='$userValue'";
            }   
                     
              $run_query = mysqli_query($connect,$user_sel);
              $check_user = mysqli_num_rows($run_query);

              if($check_user>0)
                {    
                      $select = mysqli_fetch_assoc($run_query);
                     
                     // $to =  $select["Email"];
                      ///$subject = "Forgot Password";
                     // $message = "Your password is "." ".$select["password"];
                    //  $headers = "From: eTank System"; 
                     //  mail($to,$subject,$message,$headers);

                   $data=1;
                }else{
                  $data=2;
                    
                }    
            } 
            
            print  json_encode($data);
    
?>