$(document).ready(function() {


//	fill_blocks_number();
	//fill_bitcoin_value();
	fill_market_price_ddl();
	//getMarketPrice();

});

/**** Blocks functions ****/

function get_last_info(){
	$.ajax({
			url : "https://api.blockcypher.com/v1/btc/main",
			dataType : "json",
			contentType : "application/json; charset=utf-8",
			type : "GET",
			timeout:"5000",
			async : false,
			success : function(data) {
				$.ajax({
						url : "https://api.blockcypher.com/v1/btc/main/blocks/"+data.height,
						dataType : "json",
						contentType : "application/json; charset=utf-8",
						type : "GET",
						timeout:"5000",
						async : false,
						success : function(result) {
						var display = '<p>Hash: '+data.hash+'<br/>  Height: '+data.height+'<br/>  Time: '+data.time+'<br/>  Fees: '+data.fees+' satoshis</p>';
						var to_empty = document.getElementById('last_result');
						to_empty.innerHTML = '';
							$(display).appendTo('#last_result');
							document.getElementById('result_blocks').style.display = 'block';
						},
						error : function(xhr, status, err) {
							alert(err);
						}
				});
		},
		error : function(xhr, status, err) {
			alert();
		}
 });
}

function get_block_info(){
	var block = $("#block_hash").val()
	if(block == ""){
		alert("Please enter a block height");
	}
	else{
		$.ajax({
				url : "https://api.blockcypher.com/v1/btc/main/blocks/"+block,
				dataType : "json",
				contentType : "application/json; charset=utf-8",
				type : "GET",
				timeout:"5000",
				async : false,
				success : function(data) {
				var display = '<p>Hash: '+data.hash+'<br/>  Height: '+data.height+'<br/>  Time: '+data.time+'<br/>  Fees: '+data.fees+' satoshis</p>';
				var to_empty = document.getElementById('last_result');
				to_empty.innerHTML = '';
					$(display).appendTo('#last_result');
					document.getElementById('result_blocks').style.display = 'block';
				},
				error : function(xhr, status, err) {
					alert(err);
				}
		});
	}
}

function fill_blocks_number(){
	$.ajax({
			url : "https://bitcoin.mubiz.com/blocks",
			dataType : "json",
			contentType : "application/json; charset=utf-8",
			type : "GET",
			timeout:"5000",
			async : false,

			success : function(data) {
				console.log(data)
				$('nb-blocks').append(data);
			},

			error : function(xhr, status, err) {
				$('nb-blocks').append(err+" N/A");
			}
		});
}

/**** Currency functions ****/
function fill_bitcoin_value(){
	$.ajax({
		url:"https://www.bitstamp.net/api/v2/ticker/btcusd/",
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		type:"GET",
		timeout:"5000",
		async:false,
		success: function(data){
			console.log(data.last);
			$('btc-value').append(data.last);
		},
		error : function(xhr, status, err) {
			$('nb-blocks').append(err+" N/A");
		}
	});
}

function fill_market_price_ddl(){
	$.ajax({
		url:"https://blockchain.info/fr/ticker",
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		type:"GET",
		timeout:"5000",
		async:false,
		success: function(data){
			var option = '';
			var name = Object.keys(data);
			$.each(name, function(i, elem){
				option = '<option value="'+elem+'">'+elem+'</option>';
				$(option).appendTo('#select_convert');
			});
		},
		error : function(xhr, status, err) {
			$(err+" N/A").append('#nb-blocks');
		}
	});
}

function getPrice(){
		// Get selected values
		var cur_ddl = document.getElementById('select_convert');
		var currency = cur_ddl.options[cur_ddl.selectedIndex].value;
		var val_inp = document.getElementById('input_convert');
		var value = val_inp.value;

		var msg = "" ;

		if( currency == null || currency == "" || value == null){
			msg =" Please enter a value and a currency to convert";
			alert(msg);
		}else{
			$.ajax({
						url:"https://blockchain.info/tobtc",
						data:{
							'currency':currency,
							'value':value
						},
						dataType: "json",
						contentType: "application/json; charset=utf-8",
						type:"GET",
						timeout:"5000",
						async:false,
						success: function(result){
							console.log(result);
							$(result).append('#convert_result');
						},
						error : function(xhr, status, err) {
							msg = err+"N/A";
							$(msg).append('#convert_result');
						}
					});
			}
}

/**** Transaction functions ****/
function get_transaction_info(){

	var trans = $("#transaction_hash").val()
	if(trans == ""){
		alert("Please enter a transaction hash");
	}else{
		$.ajax({
				url : "https://api.blockcypher.com/v1/btc/main/txs/"+trans,
				dataType : "json",
				contentType : "application/json; charset=utf-8",
				type : "GET",
				timeout:"5000",
				async : false,
				success : function(data) {
				var display = '<p>Block Height: '+data.block_height+'<br/> Confirmations: '+data.confirmations+'<br/> Date of confirmation: '+data.confirmed+'<br/>Fees: '+data.fees+'</p>';
				var to_empty = document.getElementById('transaction_result');
				to_empty.innerHTML = '';
					$(display).appendTo('#transaction_result');
					document.getElementById('transaction').style.display = 'block';
				},
				error : function(xhr, status, err) {
					alert(err);
				}
		});
	}
}

/**** Addresses functions ****/
function get_address_info(){

	var addrs = $("#address_hash").val()
	if(addrs == ""){
		alert("Please enter an address hash");
	}else{
		$.ajax({
				url : "https://api.blockcypher.com/v1/btc/main/addrs/"+addrs,
				dataType : "json",
				contentType : "application/json; charset=utf-8",
				type : "GET",
				timeout:"5000",
				async : false,
				success : function(data) {
				var display = '<p>Address: '+data.address+'<br/>Balance: '+data.balance+' <br/> Number of Transactions: '+data.n_tx+'</p>';
				var to_empty = document.getElementById('address_result');
				to_empty.innerHTML = '';
					$(display).appendTo('#address_result');
					document.getElementById('address').style.display = 'block';
				},
				error : function(xhr, status, err) {
					alert(err);
				}
		});
	}
}
