<html>
<head>
</head>
<body>
<p>testing..</p>
<script>
function partials() {
	var url = 'https://dataint.ncaa.com/4/mml/2019/mobile/video/601.json';
	var xmlhttp = new XMLHttpRequest();
	console.log("trying to fetch backup urls");
	xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var myArr = JSON.parse(this.responseText);
        myFunction(myArr);
    }};
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
	function myFunction(arr) {
	var mobile = arr['mobile'];
	var desktop = arr['desktop'];
	var connected1 = arr['connected1'];
	var connected2 = arr['connected2'];
//    document.getElementById("bk").innerHTML = arr;
	console.log(mobile);
	console.log(desktop);
	console.log(connected1);
	console.log(connected2);
	}};
</script>
</body>
</html>
