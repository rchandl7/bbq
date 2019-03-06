		
//global vars defined
var url, url_bk, mobile, desktop, connected1, connected2, mobile_bk, desktop_bk, connected1_bk, connected2_bk, partial, token, mobile_tokenized, desktop_tokenized, connected1_tokenized, connected2_tokenized, pri, bk;

function videoPath() {
	var txt;
	var gameId = prompt("Please enter game ID:", "");
//	if (gameId == null || gameId == "") 
//	{
//		txt = "Nevermind.";
//	} 
//	else 
//	{ 
		var url = "https://dataint.ncaa.com/4/mml/2019/mobile/video/" + gameId + "_pr.json";
		var url_bk = "https://dataint.ncaa.com/4/mml/2019/mobile/video/" + gameId + "_bksec.json";
		partials(url)
		partials_bk(url_bk)
		//printing video jsons to console
		localStorage.setItem("primary_path",url);
		localStorage.setItem("backup_path",url_bk);
		console.log(url);
		console.log(url_bk);
//	}
};	

// getting the playback urls for primary	

function partials(val) {
	var url = val
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
//	console.log(mobile);
//	console.log(desktop);
//	console.log(connected1);
//	console.log(connected2);
	tokenize(mobile,mobile,desktop,connected1,connected2)
}
	// tokenize the primary playback urls
	function tokenize(val,val1,val2,val3,val4) {
		var partial = val
		var tempslug = partial.slice(37);
		var slug = tempslug.slice(0, -15);
		var tokenUrl = "https://ite.token.ngtv.io/token/internal/token_spe?format=m3u8&path=/" + slug + "/&accessTokenTTL=30000&profile=mml";
		console.log(tokenUrl);
		var xmlhttp = new XMLHttpRequest();
		console.log("Fetching token..");
		xmlhttp.onreadystatechange = function() {
	    	if (this.readyState == 4 && this.status == 200) {
	        	myFunction(this);
	    	}
	    };
		xmlhttp.open("GET", tokenUrl, true);
		xmlhttp.send();
		function myFunction(xml) {
	    	var xmlDoc = xml.responseXML;
			var x = xmlDoc.getElementsByTagName('token')[0];
			var y = x.childNodes[0];
			token = "?hdnts=" + y.nodeValue;
			applyToken(token) 
		}
		var mobile = val1;
		var desktop = val2;
		var connected1 = val3;
		var connected2 = val4;
		function applyToken(val) {
			var token = val
			var mobile_tokenized = mobile.concat(token);
			var desktop_tokenized = desktop.concat(token);
			var connected1_tokenized = connected1.concat(token);
			var connected2_tokenized = connected2.concat(token);
			localStorage.setItem("mo_tokenized",mobile_tokenized);
			localStorage.setItem("de_tokenized",desktop_tokenized);
			localStorage.setItem("connected1_tokenized",connected1_tokenized);
			localStorage.setItem("connected2_tokenized",connected2_tokenized);
			console.log(mobile_tokenized); 
			console.log(desktop_tokenized); 
			console.log(connected1_tokenized); 
			console.log(connected2_tokenized);
		} 
		var pri = document.createElement("BUTTON");        
		var t = document.createTextNode("Load Primary"); 
		pri.appendChild(t);        
		document.body.appendChild(pri);
			pri.onclick = function(){
				$( "#primaryLoad" ).load( 'src/primary.html' );
				$( "#backupLoad" ).load( 'src/backup.html' );
			}
		$("#div").attr("mobile", mobile_tokenized);
		$("#div").attr("desktop", desktop_tokenized);
		$("#div").attr("connected1", connected1_tokenized);
		$("#div").attr("connected2", connected2_tokenized);
	};
};

// getting the playback urls for backup

function partials_bk(val) {
	var url = val
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
		var mobile_bk = arr['mobile'];
		var desktop_bk = arr['desktop'];
		var connected1_bk = arr['connected1'];
		var connected2_bk = arr['connected2'];	
		var bk = document.createElement("BUTTON");        
		var t = document.createTextNode("Load BK"); 
		bk.appendChild(t);        
		document.body.appendChild(bk);
				bk.onclick = function(){
			$( "#backupLoad" ).load( 'src/backup.html' );
		};
		localStorage.setItem("mo_bk",mobile_bk);
		localStorage.setItem("de_bk",desktop_bk);
		localStorage.setItem("connected1_bk",connected1_bk);
		localStorage.setItem("connected2_bk",connected2_bk);
		console.log(mobile_bk);
		console.log(desktop_bk);
		console.log(connected1_bk);
		console.log(connected2_bk);
		$("#div").attr("mobile_bk", mobile_bk);
   		$("#div").attr("desktop_bk", desktop_bk);
		$("#div").attr("connected1_bk", connected1_bk);
		$("#div").attr("connected2_bk", connected2_bk);		 
	};	
};