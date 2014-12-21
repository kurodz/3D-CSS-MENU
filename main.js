var i=0
var score=0;
	
function system(){ 
	$("#block").css({"transition": "all 0.8s", "-webkit-transition": "all 0.8s"});
	var color = ["red", "yellow", "green", "blue", "orange", "purple"];
	var x = ++i;
	if (x>5){i=0,x=0;}
	var hex = color[x];
	$('#block').css('background-color', hex);
	setTimeout(function(){ system();}, 3000);
}

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
	}

$( document ).ready(function() {
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

