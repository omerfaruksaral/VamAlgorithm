var TRUE = 1 ;
var FALSE = 0 ;
var N_ROWS = 0 ;
var N_COLS = 0 ;
var supply = [];
var demand = [];
var costs =[];
var row_done = [];
var col_done = [];
var totalSupply = 0;
var totalDemand = 0;
var total = 1;
$( "#hesapla" ).click(function() {	

	table(rows,cols);
	if (total == 1) {
		main();
	}		
	

});

function table(rows,cols) {

	
	N_ROWS=rows;
	N_COLS=cols;
	totalSupply = 0;
	totalDemand = 0;
	row_done = new Array(N_ROWS).fill(FALSE);
	col_done = new Array(N_COLS).fill(FALSE);
	
	var parse;
	for (var i = 0; i < rows; i++) {
		parse= parseInt(document.getElementById('arzdeger'+(i+1)).value);
		supply[i]=parse;
		totalSupply+=parse;
	}
	$("#totalSupply").html(totalSupply);
	for (var i = 0; i < cols; i++) {
		parse=parseInt(document.getElementById('talepdeger'+(i+1)).value); 
		demand[i]=parse;
		totalDemand+=parse;
	}
	$("#totalDemand").html(totalDemand);
	for (var i = 0; i < rows; i++) {
		costs.push([]);
		for (var j = 0; j < cols; j++) {
			parse=parseInt(document.getElementById('maliyet'+(i+1)+(j+1)).value);
			costs[i].push(parse);
		}
	}
	if (totalSupply != totalDemand) {
		if (totalSupply < totalDemand) {
			$("#totalSupply").css('color','red');
			$("#totalDemand").css('color','green');
		}
		else{
			$("#totalDemand").css('color','red');
			$("#totalSupply").css('color','green');
		}
		alert("ARZ-TALEP toplamı birbirine eşit olmalı");
		total=0;
	}
	else{
		$("#totalSupply").css('color','green');
		$("#totalDemand").css('color','green');
		total=1;
	}

}


function diff(j, len, is_row, res) {
	var i, c, min1 = 2147483647, min2 = min1, min_p = -1;
	for (i = 0; i < len; ++i) {
		if ((is_row) ? col_done[i] : row_done[i]) continue;
		c = (is_row) ? costs[j][i] : costs[i][j];
		if (c < min1) {
			min2 = min1;
			min1 = c;
			min_p = i;
		}
		else if (c < min2) min2 = c;
	}
	res[0] = min2 - min1; res[1] = min1; res[2] = min_p;
}

function max_penalty(len1, len2, is_row, res) {
	var i, pc = -1, pm = -1, mc = -1, md = -2147483648;
	var res2 = new Array(3);

	for (i = 0; i < len1; ++i) {
		if ((is_row) ? row_done[i] : col_done[i]) continue;
		diff(i, len2, is_row, res2);
		if (res2[0] > md) {
			md = res2[0];  
			pm = i;        
			mc = res2[1];  
			pc = res2[2];  
		}
	}

	if (is_row) {
		res[0] = pm; res[1] = pc;
	}
	else {
		res[0] = pc; res[1] = pm;
	}
	res[2] = mc; res[3] = md;
}

function next_cell(res) {
	var i, res1 = new Array(4), res2 = new Array(4);
	max_penalty(N_ROWS, N_COLS, TRUE, res1);
	max_penalty(N_COLS, N_ROWS, FALSE, res2);

	if (res1[3] == res2[3]) {
		if (res1[2] < res2[2])
			for (i = 0; i < 4; ++i) res[i] = res1[i];
				else
					for (i = 0; i < 4; ++i) res[i] = res2[i];
						return;
				}
				if (res1[3] > res2[3])
					for (i = 0; i < 4; ++i) res[i] = res2[i];
						else
							for (i = 0; i < 4; ++i) res[i] = res1[i];
						}

					function main() {
						var i, j, r, c, q, supply_left = 0, total_cost = 0, cell = new Array(4);
						var results = new Array(N_ROWS).fill(new Array(N_COLS).fill(0));
						for (i = 0; i < N_ROWS; ++i) supply_left += supply[i];
							while (supply_left > 0) {
								next_cell(cell);
								r = cell[0];
								c = cell[1];
								q = (demand[c] <= supply[r]) ? demand[c] : supply[r];
								demand[c] -= q;
								if (!demand[c]) col_done[c] = TRUE;
								supply[r] -= q;
								if (!supply[r]) row_done[r] = TRUE;
								results[r][c] = q;
								$("#"+(r+1)+""+(c+1)).html(results[r][c]);
								supply_left -= q;
								total_cost += q * costs[r][c];
							}
							$("#totalCost").attr('value', total_cost); 
							console.log("\nTotal cost = %d\n", total_cost);
							return 0;
						}



