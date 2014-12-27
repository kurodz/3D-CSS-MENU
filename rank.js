// Rank Page
function dbShow(){	
	var db = openDatabase('clickblocks', '1.0', 'Block Game', 2 * 1024 * 1024);
	db.transaction(function (tx) {
   	tx.executeSql('SELECT * FROM rank', [], function (tx, results) {
   	var len = results.rows.length;
   	var data = "";
   	for (var i =0;i<len;i++){
   	data += '<tr><td>'+results.rows.item(i).name+'</td>'
   			+ '<td>'+results.rows.item(i).score+'</td></tr>';
   	}
	
   	$('.rankbody').append(data);
   	$("#myTable").tablesorter(); 
	if(len==0){$('div').html('<img src="icon_game.png"><h1>目前沒有資料</h1>');}
    
 }, null);
});
	}
