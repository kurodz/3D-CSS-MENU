var i=0
var score=0;
var db = openDatabase('clickblocks', '1.0', 'Block Game', 2 * 1024 * 1024);
function system(){ 
	$("#block").css({"transition": "all 0.8s", "-webkit-transition": "all 0.8s"});
	var color = ["red", "yellow", "green", "blue", "orange", "purple"];
	var x = ++i;
	if (x>5){i=0,x=0;}
	var hex = color[x];
	$('#block').css('background-color', hex);
	setTimeout(function(){ system();}, 3000);
}
/*
function time(){
	var d = new Date();
	var hours = d.getHours();
	var mins = d.getMinutes();
	var secs = d.getSeconds();
	
	if (hours < 10){hours = "0" + hours};
	if (mins < 10){mins = "0" + mins};
	if (secs < 10){secs = "0" + secs};
	
	hours.toString();
	mins.toString();
	secs.toString();
	
	$("#time").text(hours +" : "+ mins +" : "+ secs);
	
	setTimeout(function(){ time();}, 1000);
}*/
	
	
	
function gameover(){
		$(function() {
		$(document).avgrund({
			openOnEvent: false,
			height: 200,
			closeByDocument: false,
			showClose: true,
			showCloseText: 'Close',
			template: '<h1 class="poptitle">遊戲結束！</h1>' +
			'<div id="popup">' +
			'<p>你的分數：'+ score +
			'</p></div>' +
			'<section class="sendfield"><input type="text" id="name" placeholder="輸入您的名稱"><a href="#" onclick="insert();">送出</a></section>'
			
		});
	});

	}	

$( document ).ready(function() {
	
	
$(function() {
		$('.chose').show();
		$(document).avgrund({
			openOnEvent: false,
			height: 200,
			closeByDocument: true,
			showClose: true,
			showCloseText: 'Close',
			template: $('.chose')			
		});
	});	

	



var color = '';
$('div').click(function() {
    var x = $(this).css('backgroundColor');
	var y = $('#block').css('backgroundColor');
    hexc(x);
	hexy(y);
	
    if(color==blockbg){		
		score = score+1;
		$( "#score" ).text( "Score：" + score );
		}


		
})

function hexc(colorval) { //抓取方塊色碼
    var parts = colorval.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    delete(parts[0]);
    for (var i = 1; i <= 3; ++i) {
        parts[i] = parseInt(parts[i]).toString(16);
        if (parts[i].length == 1) parts[i] = '0' + parts[i];
    }
    color = '#' + parts.join('');
}


function hexy(colorval) { //抓取System色碼
    var parts = colorval.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    delete(parts[0]);
    for (var i = 1; i <= 3; ++i) {
        parts[i] = parseInt(parts[i]).toString(16);
        if (parts[i].length == 1) parts[i] = '0' + parts[i];
    }
    blockbg = '#' + parts.join('');
}
});




function easy() {
$('#time').countdown({until: +60,onExpiry: gameover});
$('.avgrund-overlay').trigger('click');}
function normal() {
$('#time').countdown({until: +30,onExpiry: gameover});
$('.avgrund-overlay').trigger('click');}
function hard() {
$('#time').countdown({until: +15,onExpiry: gameover});
$('.avgrund-overlay').trigger('click');}






// Database



db.transaction(function (tx) { 
 
   tx.executeSql('CREATE TABLE IF NOT EXISTS rank (id INTEGER PRIMARY KEY, name VARCHAR(24), score INTEGER)');
});

function insert(){
var name = document.getElementById("name").value;
if (name==""){alert("請輸入名稱");return}
var db = openDatabase('clickblocks', '1.0', 'Block Game', 2 * 1024 * 1024);
db.transaction(function (tx) {  
  tx.executeSql('INSERT INTO rank (name,score) VALUES (?,?)', [name, score],
  function() { alert('資料新增成功!！');
  				$('.content').show();
  				$(document).avgrund({
				width: 640,
				height: 640,
	  			openOnEvent: false,
				showClose: true,
				showCloseText: 'Close',
    			template: $('.content')});
				$('.content').append('<a href="#" onclick="dbDrop();">清除記錄</a>');
				},

  function() { alert("資料新增失敗!"); });;});


	}
	
	
function dbDrop() {  // 刪除資料表
	
	if (confirm("警告！是否確定清除資料？")){
        db.transaction(function(t) {
	        t.executeSql("DROP TABLE rank");
			alert("清除完成");
			window.location.href="main.html";
        });

	}
	else{
		return;
		}
		    }
	
db.transaction(function (tx) {
   	tx.executeSql('SELECT * FROM rank', [], function (tx, results) {
   	var len = results.rows.length;
	if(len==0){$('.content a').remove();}}, null);
});

