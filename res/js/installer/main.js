var Installer =
{
	load:function()
	{},
	loadPage2:function()
	{
		Body.changeBody("webdat/installer/installer2.htz", function(){}, function(){});
	},
	loadPageLicenseAgreement:function()
	{
		Body.changeBody("webdat/installer/installer_agreement.htz", function(){}, function(){});
	},
	loadPageCheckServer:function()
	{
		Body.changeBody("webdat/installer/installer_checkreq.htz", function(){}, function(){});
	},
	performCheck:function()
	{
		var log = document.querySelectorAll("#page_installer #ConsoleOutput #DirectoryWriteTest")[0];
		DevAJAX.GET("backend/db_funcs.php?action=chkrwperm", function(x)
		{
			if(parseInt(x) > 0)
			{
				log.innerHTML = "<p>Directory Permissions Test Successful!</p>";
				document.querySelectorAll("#page_installer #ContinueToInstallation")[0].style.display = "block";
			}
			else
			{
				log.innerHTML = "<p>Directory Permissions Test Failed!</p>";
			}
		});
	},
	loadPageCreateUser:function()
	{
		Body.changeBody("webdat/installer/installer_createusr.htz", function()
		{
			var tm = new Date();
			var d = tm.getFullYear();
			if(document.querySelectorAll("#page_installer #year")[0] != null)
			{ document.querySelectorAll("#page_installer #year")[0].innerHTML = "Year: " + d; }
		}, function(){});
	},
	installUser:function()
	{
		//Request new year to be created!
		var x = "username=" + encodeURI(document.querySelectorAll("#page_installer #username")[0].value);
		x = x + "&password=" + encodeURI(document.querySelectorAll("#page_installer #password")[0].value);
		var d = new Date();
		x = x + "&year=" + encodeURI(d.getFullYear());

		if(document.querySelectorAll("#page_installer #Actions")[0] != null)
		{
			var out = document.querySelectorAll("#page_installer #Actions")[0];
			//Create the user
			DevAJAX.POST("backend/db_write.php?action=addusr", x, function(z)
			{
				//Check to make sure we aren't having mystery execution!
				if(z != "" && z != null)
				{
					//Let the user know that the user has been created (or not)!
					if(parseInt(z) == 1)
						{ out.innerHTML += "<p>Added user successfully!</p>"; }
					else if(parseInt(z) == 0)
						{ out.innerHTML += "<p style=\"color:red;\">Unable to add user! Something's faulty!</p>"; }
					else
						{ out.innerHTML += "<p style=\"color:red\">Unable to interpret server response! Recieved: [" + z + "]!</p>"; }

					//Create a new year!
					DevAJAX.POST("backend/db_write.php?action=addyr", x, function(g)
					{
						//Let the user know that a new yearspace has been created!
					});
				}
			});
		}
	}
}