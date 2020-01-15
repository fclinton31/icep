<?php

include("inc.php");
include("session.php");



if(isset($_POST['book']))
{
	
	$custID = '980327';
	$date = mysqli_real_escape_string($connect,$_POST['date']);
	$time = mysqli_real_escape_string($connect,$_POST['time']);
	$docId = '980327';
	
	$patient = "";
	
	$sql = "SELECT `custID` FROM `customer` WHERE `custID` = '$custID'";
	
	$query = mysqli_query($connect,$sql);
	
	while($row = mysqli_fetch_array($query))
	{
		$patient = $row['custID'];
	}
	
	$book = "INSERT INTO `appointment`(`date`, `time`,  `status`, `patientId`, `doctorId`) 
	VALUES('$date','$time','pending',$patient,$docId) ";
	
	if(mysqli_query($connect,$book))
	{
		header("location:user.php");
	}
	
}

?>

<!DOCTYPE html>
<html>
<head>
<title>Make an Appointment - AppointDoctor</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="css/bootstrap.css">
    <link rel="stylesheet" href="css/bootstrap-theme.css">
     <link rel="stylesheet" href="css/font-awesome.min.css">
     <link rel="stylesheet" href="css/angular-toastr.min.css">
    <link rel="stylesheet" href="css/style.css">
<style>
		html{
				background: url('../img/med/stethoscope-1366x768.jpg')no-repeat center center fixed;
				-webkit-background-size:cover;
				-moz-background-size:cover;
				-o-background-size: cover;
				background-size: cover;
				
			}
	</style> 
<!--//web-font-->
<!-- Custom Theme files -->
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

<!-- js -->
<script src="js/jquery.min.js"></script>
<script src="js/modernizr.custom.js"></script>
<!-- //js -->
<!-- start-smoth-scrolling-->
<script type="text/javascript" src="js/move-top.js"></script>
<script type="text/javascript" src="js/easing.js"></script>
<script type="text/javascript" src="js/modernizr.custom.53451.js"></script>
<script type="text/javascript">
	jQuery(document).ready(function($) {
		$(".scroll").click(function(event) {
			event.preventDefault();
			$('html,body').animate({
				scrollTop : $(this.hash).offset().top
			}, 1000);
		});
	});
</script>
<!--//end-smoth-scrolling-->
</head>
<body>

	<!--header-->
	<div class="header">
		<div class="container">
			<div class="top-middle">
				<a href="Home.php">
					<h3>AppointDoctor</h3>
				</a>
			</div>
			<div class="top-nav">
				<span class="menu"><img src="images/menu-icon.png" alt="" /></span>
				<ul class="nav1">
					<li><a href="user.php">Home</a></li>
					<li><a href="MakeAppointment.php" class="active">Make an
							Appointment</a></li>
				</ul>
				<!-- script-for-menu -->
				<script>
					$("span.menu").click(function() {
						$("ul.nav1").slideToggle(300, function() {
							// Animation complete.
						});
					});
				</script>
				<!-- /script-for-menu -->
			</div>
			<div class="clearfix"></div>
		</div>
	</div>
	<!--//header-->
	<!--banner-->
	<div class="content">
		<div class="container">
			<div class="content-grids">
				<div class="work-title humble-title">
					<h3>
						MAKE<span>AN APPOINTMENT</span>
					</h3>
				</div>
				<div class="input-group">
</br>
<form class="form" method="post" action="MakeAppointment.php">

<div class="input-group">
</br>
<label>Appointment Date </label>
<input type="date" name="date" id ="date" maxlength="10">

</div>

<div class="input-group">
</br>
<label>Appointment Time </label>
<input type="time" name="time" id ="time" maxlength="10">

</div>

<div class="button">
<input type="submit" name="book" value="Book Appointment">
</div>


</center>
</form>


</div>
							</table>
						</form>
					</div>
				</div>
				<div class="clearfix"></div>
			</div>
		</div>
	</div>

	
	<!--//content-->