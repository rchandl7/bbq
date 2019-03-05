
//global vars defined
var url, url_bk, mobile, desktop, connected1, connected2, mobile_bk, desktop_bk, connected1_bk, connected2_bk, partial, token, mobile_tokenized, desktop_tokenized, connected1_tokenized, connected2_tokenized, pri, bk;

function bbq() {
	var txt;
	var gameId = prompt("Please enter game ID:", "210");
//	if (gameId == null || gameId == "") 
//	{
//		txt = "Nevermind.";
//	} 
//	else 
//	{ 
		var url = "http://dataint.ncaa.com/4/mml/2019/mobile/video/" + gameId + ".json";
		var url_bk = "http://dataint.ncaa.com/4/mml/2019/mobile/video/" + gameId + "_bk.json";
		partials(url)
		partials_bk(url_bk)
		//printing video jsons to console
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
	};
	$("#mob_bk").attr("mobile", mobile_bk);
	$("#des_bk").attr("desktop", desktop_bk);
	$("#conn1_bk").attr("connected1", connected1_bk);
	$("#conn2_bk").attr("connected2", connected2_bk);
//	console.log(mobile_bk);
//	console.log(desktop_bk);
//	console.log(connected1_bk);
//	console.log(connected2_bk);
	
};

// tokenize the primary playback urls

function tokenize(val,val1,val2,val3,val4) {
	var partial = val
	var tempslug = partial.slice(36);
	var slug = tempslug.slice(0, -15);
	var tokenUrl = "http://ite.token.ngtv.io/token/internal/token_spe?format=m3u8&path=/" + slug + "/&accessTokenTTL=30000&profile=mml";
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
	}
	var mobile = val1;
	var desktop = val2;
	var connected1 = val3;
	var connected2 = val4;
	var mobile_tokenized = mobile.concat(token);
	var desktop_tokenized = desktop.concat(token);
	var connected1_tokenized = connected1.concat(token);
	var connected2_tokenized = connected2.concat(token);
	console.log(mobile_tokenized); 
	var pri = document.createElement("BUTTON");        
	var t = document.createTextNode("Load Primary"); 
	pri.appendChild(t);        
	document.body.appendChild(pri);
		pri.onclick = function(){
			$( "#primaryLoad" ).load( 'src/primary.html' );
		}
	$("#mob").attr("mobile", mobile_tokenized);
	$("#des").attr("desktop", desktop_tokenized);
	$("#conn1").attr("connected1", connected1_tokenized);
	$("#conn2").attr("connected2", connected2_tokenized);
};
	
