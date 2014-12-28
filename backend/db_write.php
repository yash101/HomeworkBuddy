<?php
//Our Database Format:
//********NOTE THAT NOTHING WILL BE HEAVILY ENCRYPTED*********
/*

/									The database root
/userlist							List of all the users
/%username%/						The root for a specific user
/%username%/passwd					The password for a specific user
/%username%/yeardb					The list of the installed years
/%username%/%year%/					Root for a school year
/%username%/%year%/%class%/			Root for a class

*/

// ini_set('display_errors', 'On');
// error_reporting(E_ALL);

require_once("db_funcs.php");

$username = trim($_REQUEST["username"]);
$password = trim($_REQUEST["password"]);

//-----------------------------------------------------//
//-Adds a username to the userlist (/userlist)
function addtoulist($name)
{
	$f = fopen(".db/userlist", "a+");
	fwrite($f, $name . "\n");
}

//----------------------------------------------------//
//-Creates a new user:
//	-checks to ensure user does not exist
//	-creates a database directory (if it doesn't already exist)
//	-creates user home directory
//	-creates user passwd file and fills it with the password for authentication
//	-adds user to userlist
function createusr()
{
	$uname = urlencode(trim($_REQUEST["username"]));
	$pw = trim($_REQUEST["password"]);

	//Check to make sure the user does not already exist!
	if(chkusr($uname)) { return false; }

	//Create the user home directory
	mkdir(".db/" . $uname);
	//Check to see if the directory we made exists. If not, woops! We can't write to the filesystem!
	if(!is_dir(".db/" . $uname)) { return false; }

	//Create the password and write it to the file. It doesn't have to be urlencoded!
	if(!file_exists(".db/" . $uname . "/passwd"))
	{
		$f = fopen(".db/" . $uname . "/passwd", "w");
		fwrite($f, $pw);
		fclose($pw);
	}

	//Update the userlist
	addtoulist($uname);
	return true;
}

//---------------------------------------------------//
//-Authenticates a user
//	-"1" ---> Faulty database
//	-"2" ---> User does not exist
//	-"0" ---> Authentication successful
function chkauth($uname, $pw)
{
	$uname = trim(urlencode($uname));
	$pw = trim($pw);

	if(!is_dir(".db")) { return "1"; }
	if(!chkusr($uname)) { return "2"; }
	$pwt = trim(file_get_contents(".db/" . $uname . "/passwd"));
	if($pwt == trim($pw)) { return "0"; }
	return "-1";
}

//-Authenticates user using the function above, but returns a boolean.
function chkauthb($uname, $pw) { return trim(chkauth($uname, $pw)) == "0"; }
function chkauthbg() { return chkauthb($_REQUEST["username"], $_REQUEST["password"]); }

//--------------------------------------------------//
//-Adds an year to the user's year database.
//	-"1" if authentication unsuccessful
//	-"2" if year already exists
//	-"0" if addition successful
function addyear($year)
{
	$username = trim($_REQUEST["username"]);
	//Authenticate user, or exit this function!
	if(!chkauthbg()) { return "1"; }
	$yrdir = ".db/" . urlencode($username) . "/" . (string) $year;
	//Check if the year directory already exists
	if(is_dir($yrdir)) { return "2"; }
	//Create the new directory!
	mkdir($yrdir);

	//Create/append to the year index
	$f = fopen(".db/" . urlencode($username) . "/yeardb", "a+");
	fwrite($f, (string) $year . "\n");
	fclose($f);
	return "0";
}

function addclass($year, $classname)
{
	//Authenticate!
	if(!chkauthbg()) { return "1"; }
	//To reduce redundancy. The location of the year directory
	$yrdir = ".db/" . urlencode($_REQUEST["username"]) . "/" . (string) $year;
	//Check to make sure year exists!
	if(!is_dir($yrdir)) { return "2"; }
	//Create the class directory
	mkdir($yrdir . "/" . urlencode($classname));
	//Create a class index for the year!
	$f = fopen($yrdir . "/classdb", "a+");
	fwrite($f, urlencode($classname) . "\n");
	fclose($f);
	return "0";
}

//---------------------------------------------------//
//---------------------------------------------------//
//-Web request processing

if(trim($_REQUEST["action"]) == trim("addusr"))
{
	echo((createusr()) ? "1" : "0");
}

if(trim($_REQUEST["action"]) == trim("authusr"))
{
	echo(chkauth($_REQUEST["username"], $_REQUEST["password"]));
}

if(trim($_REQUEST["action"]) == trim("addyr"))
{
	echo(addyear(trim($_REQUEST["year"])));
}

if(trim($_REQUEST["action"]) == trim("addclass"))
{
	echo(addclass($_REQUEST["year"], $_REQUEST["classname"]));
}
?>