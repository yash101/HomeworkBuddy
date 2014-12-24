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
function chkusr($name)
{
	if(!is_dir(".db"))
	{
		mkdir(".db");
	}
	if(!file_exists(".db/userlist"))
	{
		$file = fopen(".db/userlist", "x+");
		fclose($file);
		return false;
	}
	else
	{
		$file = fopen(".db/userlist", "r");
		while(!feof($file))
		{
			$x = trim(fgets($file));
			if($x == $name)
			{
				fclose($file);
				return true;
			}
		}
		fclose($file);
		return false;
	}
}

function chkpwd($name, $password)
{
	if(chkusr($name))
	{
		if(is_dir(".db/" . $name))
		{
			if(strcmp(trim(file_get_contents(".db/" . $name . "/passwd")), trim($password)) == 0)
			{
				return true;
			}
		}
	}
	return false;
}

function chkrwperm()
{
	if(file_exists(".chkrwperm"))
	{
		unlink(".chkrwperm");
	}
	$file = fopen(".chkrwperm", "x+");
	fclose($file);
	return file_exists(".chkrwperm");
}

function chkinst()
{
	return is_dir(".db");
}

if(trim($_REQUEST["action"]) == trim("chkinst"))
{
	echo((chkinst()) ? "1" : "0");
}

if(trim($_REQUEST["action"]) == trim("chkrwperm"))
{
	echo((chkrwperm()) ? "1" : "0");
}
?>
