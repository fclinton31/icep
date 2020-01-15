<?php

include("inc.php");
include("session.php");

$id = $_GET['id'];

$query = "DELETE FROM `appointment` WHERE `id` = $id";

mysqli_query($connect,$query);

header("location:user.php");



?>