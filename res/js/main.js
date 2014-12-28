$(function()
{
	DevAJAX.GET("backend/db_funcs.php?action=chkinst", function(x)
	{
		console.log("Recieved " + x + " from server!");
		x = "0";
		if(x.length < 1 || x == null || x == undefined) { return; }
		if(parseInt(x) > 0)
		{
			Body.changeBody("webdat/index.htz", function(){}, function(){});
		}
		else
		{
			Body.changeBody("webdat/installer/installer.htz", function()
			{
				$.getScript("res/js/installer/main.js", function()
				{
					Installer.load();
				});
			});
		}
	});
});

function loadStyle(location)
{
	var link = document.createElement("link");
	link.href = location;
	link.type = "text/css";
	link.rel = "stylesheet";
}

var Body =
{
	CurDestructor:function(){},
	changeBody:function(location, constructor, destructor)
	{
		DevAJAX.GET(location, function(x)
		{
			document.getElementById("Body").innerHTML = x;
			if(this.CurDestructor != null)
			{
				this.CurDestructor();
			}
			if(constructor != undefined)
			{
				constructor();
			}
			CurDestructor = destructor;
		});
	}
}