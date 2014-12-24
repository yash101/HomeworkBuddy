<?php
//Our Database Format:
//********NOTE THAT NOTHING WILL BE HEAVILY ENCRYPTED*********
/*

/									The database root
/userlist							List of all the users
/%username%/						The root for a specific user
/%username%/passwd					The password for a specific user
/%username%/%year%/					Root for a school year
/%username%/%year%/%class%/			Root for a class

*/
require_once("db_funcs.php");

function createusr()
{
	$uname = trim($_REQUEST["username"]);
}

if(trim(_REQUEST["action"]) == trim("addusr"))
{
	echo((createusr()) ? "1" : "0");
}
?>