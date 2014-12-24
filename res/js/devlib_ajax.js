var DevAJAX =
{
	POST:function(location, data, callback)
	{
		var request = new XMLHttpRequest();
		request.onreadystatechange = function() { callback(request.responseText); };
		request.open("POST", location, true);
		request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		request.timeout = 4000;
		request.send(data);
	},
	GET:function(location, callback)
	{
		var request = new XMLHttpRequest();
		request.onreadystatechange = function() { callback(request.responseText); };
		request.open("GET", location, true);
		request.timeout = 4000;
		request.send();
	}
}