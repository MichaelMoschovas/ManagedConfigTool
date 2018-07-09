var MESSAGE = {
	title : ["ERROR","ERROR","ERROR","ERROR","ERROR","NOTICE","WARNING","WARNING","NOTICE"],
	display : [
		"File Invalid. Please review file for errors.",
		"Filetype Invalid. Please upload a .csv, .xls, or .xlsx file.",
		"Invalid header values found in sheet. Please check that at least one bidder value is defined and headers do not contain any breaks.",
		"Missing the following required input values. {INPUTS}",
		"Failed to build ad unit patterns. Please review file for errors and/or missing bidder information.",
		"Bid Adapter could not be found. Please select the appropriate adapter for the following bidder: {ADAPTER}",
		"Slot pattern(s) {PATTERN} has not been added due to missing bidder information. Bidder {ADAPTER} is missing one or more required parameters. Please check the spreadsheet and fill in the following parameter(s): {PARAMETERS}",
		"Slot pattern(s) {PATTERN} has not been added due to no corresponding bidder information. Please check the spreadsheet and fill in parameter(s) for at least one bidder.",
		"Bidder Information could not be found for {ADAPTER}. Please check spreadsheet for errors. If no errors exist, either update bidder.js to include new bidder mapping or download file as is, and manually input bidder values.",
	],
	id : [
		"file-invalid-{ERRORCODE}",
		"filetype-invalid-{ERRORCODE}",
		"header-invalid-{ERRORCODE}",
		"missing-input-{ERRORCODE}",
		"build-failure-{ERRORCODE}",
		"missing-adapter-{ADAPTER}-{ERRORCODE}",
		"missing-params-{PATTERN}-{ADAPTER}-{ERRORCODE}",
		"no-bidder-{PATTERN}-{ERRORCODE}",
		"bidder-unknown-{ADAPTER}-{ERRORCODE}",
	],
	replaceMessageMacros: function(str,v,err){
		/*-----------------------------------------------------------------------*/
    	/*----- Function called to replace macros in predefined messages --------*/
    	/*-----------------------------------------------------------------------*/
		var a = (Array.isArray(v)) ? true : false, 
			list = function(arr){
				//Convert array into list string
				var b = "";
				for(var i = 0; i < arr.length; i++){
					b += (i+1) + ") " + arr[i];
				}
				return b;
			};
		//Macro mapping
		var map = {
			"{PATTERN}" : (a) ? v[0] : v,
			"{ADAPTER}" : (a) ? v[1] : v,
			"{INPUTS}" : (a) ? list(v) : v,
			"{PARAMETERS}" : (a) ? v[2] : v,
			"{ERRORCODE}" : err
		}
		//Checks existence of each macro and replaces with corresponding value
		for(var key in map){
			var regex = new RegExp(key,"gi");
			if(str.match(regex)) str = str.replace(regex,map[key]);
		}

		return str;
	},
	printMessage : function(err,v){
    	/*-----------------------------------------------------------------------*/
    	/*----------- Function called to display and fill error div -------------*/
    	/*----------------------- based on passed value/s -----------------------*/
    	/*-----------------------------------------------------------------------*/
    	var p = document.createElement("P"), title = document.createElement("SPAN"), contain = document.getElementById("errorlog");
    	if(!document.getElementById(MESSAGE.replaceMessageMacros(MESSAGE.id[err],v,err))){
	    	p.id = MESSAGE.replaceMessageMacros(MESSAGE.id[err],v,err);
	    	title.innerHTML= MESSAGE.title[err].toUpperCase()+":";
	    	p.appendChild(title);
	    	contain.appendChild(p);
	    	p.appendChild(document.createTextNode(MESSAGE.replaceMessageMacros(MESSAGE.display[err],v,err)));
	    	contain.parentNode.style.display="block";
	    }
    	return false;
    },
    reset : function(){
		/*-----------------------------------------------------------------------*/
    	/*------------- Function called to clear and hide error div -------------*/
    	/*-----------------------------------------------------------------------*/
    	var el = document.getElementById("errorlog");
		el.innerHTML="";
    	el.parentNode.style.display="none";
	}
}