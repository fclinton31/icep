<?php
include("inc.php");
include("session.php");

   $id = $_GET['id'];
   $update = "UPDATE `appointment` SET `status`='Approved' WHERE `id`= $id";
   
   $query = mysqli_query($connect,$update);
   
   header("location:appointment.php");

?>