
<?Php      
   //opening connection
     require_once 'inc.php';
                   
    $data=json_decode(file_get_contents("php://input"));
    if (count($data)>0){

               $idNumber=mysqli_real_escape_string($connect, $data->idNumber);
               $Email=mysqli_real_escape_string($connect, $data->Email);
               $password=mysqli_real_escape_string($connect, $data->password);

               $user_sel= "UPDATE `staffmember` SET password ='$password',Email ='$Email' where idNumber ='$idNumber'";
               if($run_query = mysqli_query($connect,$user_sel)){
                   $data=3;
               }; 
     }
          
mysqli_close($connect)
   
?>