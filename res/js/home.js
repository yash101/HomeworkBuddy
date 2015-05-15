var jkhgfkjhgkdjhgkd = false;
vsr rlghjdkfjghdkf = false;
var Home =
{
	load:function()
	{
		if(jkhgfkjhgkdjhgkd == false)
		{
			jkhgfkjhgkdjhgkd = true;
			console.log("MUTEX: [" + jkhgfkjhgkdjhgkd + "]");
			console.log("Run By: " + arguments.callee.caller.toString());
			var sb = document.getElementById("additional_sidebar");
			sb.innerHTML += "<div onclick=\"javascript:Home.show();\">Home</div>";
		}
		else
		{
			return;
		}
	},
	show:function()
	{
		Body.changeBody("webdat/home.htz", function()
		{
			fdghjkdfg = true;
			$.getScript("res/js/home.js", function(){});
		}, function(){});
	}
}