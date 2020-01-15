
<?Php      
   //opening connection
     require_once 'inc.php';
                   
    $data=json_decode(file_get_contents("php://input"));
    if (count($data)>0){
               $idNumber=mysqli_real_escape_string($connect, $data->idNumber);
               $active=mysqli_real_escape_string($connect, $data->Active);
                         
               $user_sel= " DELETE from `customer` where idNumber ='$idNumber'";
               $run_query = mysqli_query($connect,$user_sel);        
     }
     if (mysqli_query($connect, $user_sel)) {
                  
                    echo "record deleted successfully";
                } else {
                    echo "Error: " . $sql . "<br>" . mysqli_error($connect);
                }
mysqli_close($connect)
   
?>