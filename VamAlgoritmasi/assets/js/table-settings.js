





$("#talepekle").click(function(e){

	tbl = document.getElementsByTagName("body")[0];		
	tr = tbl.getElementsByTagName("tr");

	for (i = 0; i < tr.length; i++) {

		if (i==0) {
			var th = document.createElement('th');
			th.scope = "col";
			cols++;
			th.id = "talepsayisi"+cols;
			tr[i].appendChild(th);				
			$("#"+th.id).text(cols);
		}

		else if(i==tr.length-1){
			var td = document.createElement('td');
			var input = document.createElement('INPUT');
			input.type = 'text';
			input.id="talepdeger"+cols;
			td.align = 'center';
			td.id="talep"+cols;
			td.appendChild(input);
			tr[i].appendChild(td);
		}

		else{	
			var td = document.createElement('td');
			var div1 = document.createElement('div');				
				div1.id= "div1"+i+""+cols;// 1. div				
				div1.style = "margin-right: 0px;margin-left: 0px;";

				var div2 = document.createElement('div');//1. div in içindeki 1. div açılış
				div2.id= "div2"+i+""+cols;// 1. div			

				var b = document.createElement('b');
				b.id= i+""+cols;	
				div2.appendChild(b);
				div1.appendChild(div2);//1. div in içindeki 1. div kapanış

				var div3 = document.createElement('div');//1. div in içindeki 2. div açılış
				div3.id= "div3"+i+""+cols;// 1. div		

				var input = document.createElement('INPUT');
				input.type = 'text';
				input.id = "maliyet"+i+""+cols;
				div3.appendChild(input);
				div1.appendChild(div3);//1. div in içindeki 2. div kapanış
				td.appendChild(div1);
				tr[i].appendChild(td);
				$("#"+div1.id).addClass("row");
				$("#"+div2.id).addClass("m-top");
				$("#"+div3.id).addClass("ml-auto mb-4");
				$("#"+b.id).text("0");
			}


		}

		jQuery.moveColumn = function (table, from, to) {
			var rows = jQuery('tr', table);
			var cols;
			rows.each(function() {
				cols = jQuery(this).children('th, td');
				cols.eq(from).detach().insertBefore(cols.eq(to));
			});
		}
		var tbl = jQuery('table');
		jQuery.moveColumn(tbl, cols+1, cols);


		
	});
$("#talepsil").click(function(e){

	var allRows = document.getElementById('vamAlgorithm').rows;
	for (var i=0; i< allRows.length; i++) {
		
		if (allRows[i].cells.length > 2 && cols > 0) {			
   			allRows[i].deleteCell(cols); //delete the cell   			

   		} else {
   			alert("You can't delete more columns.");   			
   			return;
   		}
   	}
   	cols--;
   	
   });

$("#arzsil").click(function(e){
	if (rows != 0) {
		$( "#row"+rows ).remove();
		rows--;
	}
	
});

$("#arzekle").click(function(e){

	tbl = document.getElementsByTagName("body")[0];

	tbody = tbl.getElementsByTagName("tbody");
	var tr = document.createElement('tr');

	for (i = 0; i < cols+2; i++) {

		if (i==0) {
			var th = document.createElement('th');
			th.scope = "row";
			rows++;
			th.id = "arzsayisi"+rows;
			tr.appendChild(th);
		}

		else if(i==cols+2-1){
			var td = document.createElement('td');
			var input = document.createElement('INPUT');
			input.type = 'text';
			input.id = "arzdeger"+rows;
			td.align = 'center';
			td.id="arz"+rows;
			td.appendChild(input);				
			tr.appendChild(td);
			$("#"+input.id).addClass("mt-3");
		}

		else{	
			var td = document.createElement('td');
			var div1 = document.createElement('div');				
				div1.id= "div1"+rows+""+i;// 1. div				
				div1.style = "margin-right: 0px;margin-left: 0px;";

				var div2 = document.createElement('div');//1. div in içindeki 1. div açılış
				div2.id= "div2"+rows+""+i;// 1. div			

				var b = document.createElement('b');
				b.id= rows+""+i;	
				div2.appendChild(b);
				div1.appendChild(div2);//1. div in içindeki 1. div kapanış

				var div3 = document.createElement('div');//1. div in içindeki 2. div açılış
				div3.id= "div3"+rows+""+i;// 1. div		

				var input = document.createElement('INPUT');
				input.type = 'text';
				input.id = "maliyet"+rows+""+i;
				div3.appendChild(input);
				div1.appendChild(div3);//1. div in içindeki 2. div kapanış
				td.appendChild(div1);
				tr.appendChild(td);
				div1.class="row";
				$("#"+div1.id).addClass("row");
				$("#"+div2.id).addClass("m-top");
				$("#"+div3.id).addClass("ml-auto mb-4");
				$("#"+b.id).text("0");
			}


		}
		tr.id = "row"+rows;
		tbody[0].appendChild(tr);
		$("#"+th.id).text(rows);
		$("#arzdeger"+rows).addClass("mt-3");
		for (var i = 0; i < cols+2; i++) {
			$("#div1"+rows+""+i).addClass("row");
			$("#div2"+rows+""+i).addClass("m-top");
			$("#div3"+rows+""+i).addClass("ml-auto mb-4");
			$("#"+rows+""+i).text("0");
		}
		$("#"+tr.id).after($("#talep"));

		
	});	
