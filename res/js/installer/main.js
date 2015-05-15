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
			var success = 0;
			//Create the user
			DevAJAX.POST("backend/db_write.php?action=addusr", x, function(z)
			{
				//Check to make sure we aren't having mystery execution!
				if(z != "" && z != null)
				{
					//Let the user know that the user has been created (or not)!
					if(parseInt(z) == 1)
					{
						out.innerHTML += "<p>Added user successfully!</p>";
						success++;
					}
					else if(parseInt(z) == 0)
					{
						out.innerHTML += "<p style=\"color:red;\">Unable to add user! Something's faulty!</p>";
					}
					else
					{
						out.innerHTML += "<p style=\"color:red\">Unable to interpret server response! Recieved: [" + z + "]!</p>";
					}

					//Create a new year!
					DevAJAX.POST("backend/db_write.php?action=addyr", x, function(g)
					{
						if(parseInt(g) == 0)
						{
							out.innerHTML += "<p>Added first year successfully!</p>";
							success++;
						}
						else if(parseInt(g) == 1)
						{
							out.innerHTML += "<p>Authentication Failure. Perhaps user creation failed?</p>";
						}
						else if(parseInt(g) == 2)
						{
							out.innerHTML += "<p>Year already exists! :(. Wierd because this is the installer client!</p>";
						}


						if(success >= 2)
						{
							document.getElementById("username").value = document.querySelectorAll("#page_installer #username")[0].value;
							document.getElementById("password").value = document.querySelectorAll("#page_installer #password")[0].value;
							document.querySelectorAll("#page_installer #ContinueInstallation")[0].innerHTML = "Continue! We shall add our classes!";
							document.querySelectorAll("#page_installer #ContinueInstallation")[0].onclick = function()
							{
								Body.changeBody("webdat/installer/installer_addclasses.htz", function()
								{
									Installer.addClassField();
								}, function(){});
							};
						}
					});
				}
			});
		}
	},
	addClassField:function()
	{
		var tbl = document.querySelectorAll("#page_installer #maintbl")[0];
		var row = tbl.insertRow(-1);
		var cell = row.insertCell(0);
		cell.innerHTML = "<input type=\"text\" class=\"ClassNameInput\" placeholder=\"Class Name Here!\" onkeyup=\"javascript:Installer.checkClassFields();\">";
	},
	checkClassFields:function()
	{
		var fields = document.querySelectorAll("#page_installer .ClassNameInput");
		if(fields.length != 0)
		{
			if(fields[fields.length - 1].value != "") { Installer.addClassField(); }
		}
	},
	installClasses:function()
	{
		//All the fields the user must've filled out
		var fields = document.querySelectorAll("#page_installer .ClassNameInput");
		var log = document.querySelectorAll("#page_installer #Actions2")[0];
		var fail = false;
		for(var i = 0; i < fields.length - 1; i++)
		{
			var f = fields[i];
			if(fields[i].value != "")
			{
				var k = "username=" + encodeURI(document.getElementById("username").value) + "&password=" + encodeURI(document.getElementById("password").value);
				k = k + "&year=" + encodeURI(new Date().getFullYear()) + "&classname=" + encodeURI(f.value);
				DevAJAX.POST("backend/db_write.php?action=addclass", k, function(z)
				{
					if(z != "")
					{
						if(parseInt(z) == 0)
						{
							log.innerHTML += "<p style=\"color: green\">Succesfully added class!</p>";
						}
						else if(parseInt(z) == 1)
						{
							log.innerHTML += "<p style=\"color: red\">Authentication failure while adding class!</p>";
							fail = true;
						}
						else if(parseInt(z) == 2)
						{
							log.innerHTML += "<p style=\"color: red\">Year does not exist!</p>";
							fail = true;
						}
						else if(parseInt(z) == 3)
						{
							log.innerHTML += "<p style=\"color: red\">Class Already Exists!</p>";
							fail = true;
						}
						else
						{
							log.innerHTML += "<p style=\"color: red\">Unable to parse server response! [" + z + "]!</p>";
							fail = true;
						}
					}
				});
			}
		}

		Installer.ghz = setInterval(function()
		{
			if(fail)
			{
				log += "<p>An error occured while processing the request! Please check to see that the server is working and try again!</p>";
			}
			else
			{
				var cnt = document.querySelectorAll("#page_installer #ContinueToTest")[0];
				cnt.innerHTML = "Continue! Let's Enter This World of Magic!";
				cnt.onclick = function()
				{
					loadHome();
					Installer.intx = setInterval(function()
					{
						document.querySelectorAll("#page_index #username")[0].value = document.getElementById("username").value;
						document.querySelectorAll("#page_index #password")[0].value = document.getElementById("password").value;
						clearInterval(Installer.intx);
					}, 1000);
				}
			}
			Installer.clearInterval(ghz);
		}, 200);
	},
	intx:null,
	ghz:null
}