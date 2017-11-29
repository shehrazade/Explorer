$(document).ready(function() {
	
	fill_blocks_number(); 
	fill_bitcoin_value(); 
});

/**** Blocks functions ****/

function fill_blocks_number(){

$.ajax({
		url : "https://bitcoin.mubiz.com/blocks",
		dataType : "json",
		contentType : "application/json; charset=utf-8",
		type : "GET",
		timeout:"5000",
		async : false,

		success : function(data) {
			$('nb-blocks').append(data.blocks);
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
			$('btc-value').append(data.last); 
		},
		error : function(xhr, status, err) {
			$('nb-blocks').append(err+" N/A");
	})
}

function fill_market_price_ddl{

	$.ajax({
		url:"https://blockchain.info/fr/ticker",
		dataType: "json", 
		contentType: "application/json; charset=utf-8",
		type:"GET",
		timeout:"5000",
		async:false,
		success: function(data){
			var option = ''; 
			$each(data, function(i, elem){
				option = '<option value="'+data+'"></option>'; 
				$('select_convert').append(option); 
			}); 
		},
		error : function(xhr, status, err) {
			$('nb-blocks').append(err+" N/A");
		})
	}); 
}

function getMarketPrice(select){
		// Get selected values 
		var cur = select.options[select.selectedIndex].value; 
		var value = input_convert.value; 
		var msg = "" ; 

		if( cur == null || cur == "" || value = null){
			msg =" Please enter a value and a currency to convert"; 
			// Display notif 
		}else{
			$.ajax({
						url:"https://blockchain.info/tobtc",
						data:{
							'currency': cur,
							'value':value
						},
						dataType: "json", 
						contentType: "application/json; charset=utf-8",
						type:"GET",
						timeout:"5000",
						async:false,
						success: function(result){
							$('convert_result').append(result); 
						},
						error : function(xhr, status, err) {
							$('nb-blocks').append(err+" N/A");
						})
					}); 
			}
}

