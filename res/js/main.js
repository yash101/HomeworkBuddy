$(function()
{
	DevAJAX.GET("backend/db_funcs.php?action=chkinst", function(x)
	{
		if(x.length < 1 || x == null || x == undefined) { return; }
		if(parseInt(x) > 0)
		{
			loadHome();
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

function loadHome()
{
	Body.changeBody("webdat/index.htz", Index.load, function(){});
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

var fdghjkdfg = false;
var Index =
{
	load:function()
	{
		document.querySelectorAll("#page_index #signin-form")[0].action = "javascript:Index.signinInit();";
	},
	signinInit:function()
	{
		DevAJAX.POST("backend/db_write.php?action=authusr", "username=" + encodeURI(document.querySelectorAll("#page_index #username")[0].value) + "&password=" + encodeURI(document.querySelectorAll("#page_index #password")[0].value), function(x)
		{
			if(parseInt(x) == 0)
			{
				document.getElementById("username").value = document.querySelectorAll("#page_index #username")[0].value;
				document.getElementById("password").value = document.querySelectorAll("#page_index #password")[0].value;
				Body.changeBody("webdat/home.htz", function()
				{
					if(!fdghjkdfg)
					{
						fdghjkdfg = true;
						$.getScript("res/js/home.js", function()
						{
							Home.load();
						});
					}
				}, function(){});
			}
			else
			{
				document.querySelectorAll("#page_index #username")[0].value = "";
				document.querySelectorAll("#page_index #password")[0].value = "";
			}
		});
	}
}