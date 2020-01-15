<?php

     require_once 'inc.php';
    
   /* this is because of angular the if information is in a json format*/
    $data=json_decode(file_get_contents("php://input"));

     if (count($data)>0){
    
               $idNumber = mysqli_real_escape_string($connect, $data->idNumber);  
               $errors = array();
               
               $user_sel= "select *
                           From 
                               customer a
                           where 
                           
                              a.idNumber='$idNumber'"; 

               $run_query = mysqli_query($connect,$user_sel);
               $check_user = mysqli_num_rows($run_query);

              if($check_user>0)
                {                                
                   //  header('Content-type: application/json');
                      $row=$run_query->fetch_assoc();
                      $data=$row;

                }else{

                 echo "username or password is incorrect";
                }
           
           }

   print  json_encode($data);
  
?>