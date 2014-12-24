var Installer =
{
	load:function()
	{
		DevAJAX.GET("backend/db_funcs.php?action=chkinst", function(x)
		{
			console.log(x);
			console.log(parseInt(x));
			if(parseInt(x) > 0)
			{
				loadHome();
			}
			else
			{
			}
		});
	},
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
			document.querySelectorAll("#page_installer #year")[0].innerHTML = "Year: " + d;
		}, function(){});
	},
	installUser:function()
	{
		//Request new year to be created!
		var x = "username=" + encodeURI(document.querySelectorAll("#page_installer #username")[0].value);
		x = x + "&password=" + encodeURI(document.querySelectorAll("#page_installer #password")[0].value);
		var d = new Date();
		x = x + "&year=" + encodeURI(d.getFullYear());
		x = x + "&action=addusr";
		DevAJAX.POST("backend/db_write.php", x, function(ret)
		{
		});
	}
}