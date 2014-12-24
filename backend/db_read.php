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
?>
<?php
require_once("db_funcs.php");
$user = trim($_REQUEST["username"]);
$password = trim($_REQUEST["password"]);
$action = trim($_REQUEST["action"]);
if(strcmp($action, trim("chkusr")) == 0)
{
	echo((chkusr($user)) ? "1" : "0");
}
if(strcmp($action, trim("chkpwd")) == 0)
{
	echo((chkpwd($user, $password)) ? "1" : "0");
}
?>