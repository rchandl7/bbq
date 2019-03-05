	var url;
	var url_bk;
	function partials() {
	var url = "http://dataint.ncaa.com/4/mml/2019/mobile/video/" + gameId + ".json";
	var xmlhttp = new XMLHttpRequest();
	console.log("trying to fetch urls");
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
	console.log(mobile);
	console.log(desktop);
	console.log(connected1);
	console.log(connected2);
	}};
