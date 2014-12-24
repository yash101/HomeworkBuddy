window.onload = function()
{
	Body.changeBody("webdat/installer/installer.htz", function()
	{
		$.getScript("res/js/installer/main.js", function()
		{
			Installer.load();
		});
	}, function(){});
}

function loadHome()
{
	Body.changeBody("webdat/index.htz", function(){}, function(){});	
}

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