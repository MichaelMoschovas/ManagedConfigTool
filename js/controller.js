var CONTROLLER = {
	file : "",
	filetype :  "",
	columns : 0,
	patterns : [],
	bids : [],
	analytics : [],
	modules : [],
	precision : {value:"med"},
    other : [],
	passQA : false,
	view : 0,
	fC : false,
	cC: false,
	event : {},
	url:{link:"",name:""},
    beginParse: function(data,t) {
    	/*-----------------------------------------------------------------------*/
    	/*------------ Function called to begin file parsing process ------------*/
    	/*-----------------------------------------------------------------------*/
    	CONTROLLER.filetype = t;
    	var arr = (CONTROLLER.filetype == "csv" )? BUILD.buildCSVArray(data) : BUILD.buildXLSArray(data);
    	CONTROLLER.passQA = arr != null ? CONTROLLER.checkArray(arr) : MESSAGE.printMessage(0,null);
    	var c = CONTROLLER.passQA ? BUILD.buildBidObjects(arr) : MESSAGE.printMessage(2,null);
    	if(c){ 
    		CONTROLLER.formCheck(); 
	    	SETUP.setFormToggle("custom");
	    	CONTROLLER.displayFileName();
	    }else{
            MESSAGE.printMessage(4,null);
            CONTROLLER.resetValues();
	    }
        CONTROLLER.setLoader();
    },
    reset: function(){
    	/*-----------------------------------------------------------------------*/
    	/*-------- Function called to reset all object values to default --------*/
    	/*-----------------------------------------------------------------------*/
    	CONTROLLER.filetype =  "";
		CONTROLLER.columns = 0;
		CONTROLLER.patterns = [];
		CONTROLLER.passQA = false;
		CONTROLLER.bids = [];
		CONTROLLER.modules = [];
		CONTROLLER.analytics = [];
		CONTROLLER.precision = [];
		CONTROLLER.precisionConfig = [];
		CONTROLLER.view = 0;
		CONTROLLER.fC = false;
		CONTROLLER.cC = false;
		MESSAGE.resetMessage();
    },
    readFile: function(e){
    	/*-----------------------------------------------------------------------*/
    	/*------------ Function called to instantiate new FileReader, -----------*/
    	/*-------------- accept user uploaded file as input, and ----------------*/
    	/*------------ pass data to corresponding parser function ---------------*/
    	/*-----------------------------------------------------------------------*/
    	MESSAGE.resetMessage();
        CONTROLLER.setLoader(); 
    	//Set file to target file
    	if(CONTROLLER.file=="") CONTROLLER.file = e;
    	var f = CONTROLLER.file;
    	//Regex matching for .xls/.xlsx vs .csv
    	var regexXLS = /^(.*)+(\.xlsx|\.xls)$/gi, regexXLSX = /^(.*)+(\.xlsx)$/gi, regexCSV = /^(.*)+(\.csv)$/gi; 
	    if(f[0].name.match(regexXLS)||f[0].name.match(regexCSV)){
	    	//Check for FileReader type
		    if (typeof (FileReader) != "undefined") {  
		    	var xls = f[0].name.match(regexXLS) ? true : false;
		    	//Setup new FileReader and read file as binary string
	            var reader = new FileReader();  
	            reader.onload = function (e) { 
		            var data = e.target.result;  
		            //If file is excel type, then use XLSX to read data
		            var workbook = xls ? XLSX.read(data, { type: 'binary' }) : data; 
		            xls ? (f[0].name.match(regexXLSX) ? CONTROLLER.beginParse(workbook,"xlsx") : CONTROLLER.beginParse(workbook,"xls")) : CONTROLLER.beginParse(workbook,"csv");
	            };
	            reader.readAsBinaryString(f[0]); 
	         }
		}
		else{
			MESSAGE.printMessage(1,null);
		}
    },
    setLoader: function(){
        var el = document.getElementById("loading-image");
        if(el.className.match(/hidden/gi)){
            el.className = el.className.replace(/ hidden/gi,"");
        }else{
            el.className += " hidden";
        }
    },
    searchBids: function(e){
    	/*-----------------------------------------------------------------------*/
    	/*-- Function called to hide elements that do not match search string ---*/
    	/*-----------------------------------------------------------------------*/
    	var str = e.target.value;
    	var regex = new RegExp(str,"gi"), els=document.getElementsByClassName("menu_item_select_bid-check");

    	//Loop through all bid input elements
	    for(var i = 0; i < els.length; i++){
	    	var m1 = els[i].childNodes[0].nodeValue, m2 = els[i].childNodes[1].id;
	    	if(str==null||str==""||str.length<2){
    			//If the passed string length is less than 2, remove all instances of hidden class
	    		if(els[i].className.match(/hidden/gi)) els[i].className = els[i].className.replace(/ hidden/g, "");
	    	}else if(m1.match(regex)==null&&m2.match(regex)==null&&str.length>=2){
	    		//If the passed string length is greater than 2 and no match can be made, add class hidden
	    		if(els[i].className.match(/hidden/gi)==null){
	    			els[i].className += " hidden";
	    		}
	    	}else if((m1.match(regex)||m2.match(regex))&&str.length>=2){
	    		//If the passed string length is greater than 2 and match can be made
	    		//Check if class hidden exists and remove it
	    		if(els[i].className.match(/hidden/gi)) els[i].className = els[i].className.replace(/ hidden/g, "");
	    	}
	    }
    },
    displayBidsPreview: function(el,t){
    	/*-----------------------------------------------------------------------*/
    	/*------ Function called to display preview of selected checkboxes ------*/
    	/*-----------------------------------------------------------------------*/
    	var id = el.id.split("_")[1].replace(/BIDADAPTER/i,"");
    	var div = document.createElement("DIV"), span = document.createElement("SPAN"), text = document.createTextNode(id.toUpperCase()),target = document.getElementById(t+"_preview");
    	div.id= id+"-preview-"+t;
    	span.innerHTML = "x";
    	span.addEventListener("click", function(e) {
			t == "bid" ? CONTROLLER.removeBidsPreview(id+"BidAdapter",t) : CONTROLLER.removeBidsPreview(id,t);
		});
    	div.appendChild(text);
    	div.appendChild(span);
    	target.appendChild(div);
    	if(target.className.indexOf("display")==-1) target.className += " display";
    	t == "bid" ? document.getElementById(t+"_contain").style.height = "280px" : document.getElementById(t+"_contain").style.height = "300px";
    	SETUP.setCustomScrolls();
    },
    removeBidsPreview: function(id,t){
    	/*-----------------------------------------------------------------------*/
    	/*------- Function called to remove preview of passed checkbox id -------*/
    	/*-----------------------------------------------------------------------*/
    	var el = document.getElementById(id.replace(/BIDADAPTER/i,"")+"-preview-"+t),input = document.getElementById(t+"_"+id);
    	var parent = el.parentNode;
    	el.parentNode.removeChild(el);
    	input.checked = false;
    	if(!parent.hasChildNodes()){ 
    		parent.className = parent.className.replace(/ display/gi,"");
    		t == "bid" ? document.getElementById(t+"_contain").style.height = "340px" : document.getElementById(t+"_contain").style.height = "360px";
    		SETUP.setCustomScrolls();
    	}
    	if(t == "bid" && !document.getElementById(t+"_preview").hasChildNodes()) CONTROLLER.bids = [];
    	CONTROLLER.formCheck();
    },
    logBids: function(el,n){
    	/*-----------------------------------------------------------------------*/
    	/*-- Function called on input change to log whether or not a bid value --*/
    	/*------------ should be added or removed from the bids array -----------*/
    	/*-----------------------------------------------------------------------*/
    	if(el.checked){
    		CONTROLLER.bids.push(n);
    		CONTROLLER.displayBidsPreview(el,"bid");
    	}else{
    		for(var i = 0; i < CONTROLLER.bids.length; i++){
	    		if(CONTROLLER.bids[i] == n) CONTROLLER.bids.splice(i,1);
	    	}
	    	CONTROLLER.removeBidsPreview(el.id.replace(/bid_/i,""),"bid");
    	}
    	CONTROLLER.formCheck();
    },
    logAnalytics: function(el,t){
    	/*-----------------------------------------------------------------------*/
    	/*-- Function called on input change to log whether or not a analytics --*/
    	/*--------- value should be added or removed from the bids array --------*/
    	/*-----------------------------------------------------------------------*/
    	if(el.checked){
    		CONTROLLER.analytics.push(t);
    		CONTROLLER.displayBidsPreview(el,"analytics");
    	}
    	else{
    		for(var i = 0; i < CONTROLLER.analytics.length; i++){
    			if(CONTROLLER.analytics[i] == t) CONTROLLER.analytics.splice(i,1);
    		}
    		CONTROLLER.removeBidsPreview(el.id.replace(/analytics_/i,""),"analytics");
    	}
    	CONTROLLER.formCheck();
    },
    logModules: function(el,t){
    	/*-----------------------------------------------------------------------*/
    	/*--- Function called on input change to log whether or not a modules ---*/
    	/*--------- value should be added or removed from the bids array --------*/
    	/*-----------------------------------------------------------------------*/
    	if(el.checked){
    		CONTROLLER.modules.push(t);
    		CONTROLLER.displayBidsPreview(el,"modules");
    	}
    	else{
    		for(var i = 0; i < CONTROLLER.modules.length; i++){
    			if(CONTROLLER.modules[i] == t) CONTROLLER.modules.splice(i,1);
    		}
    		CONTROLLER.removeBidsPreview(el.id.replace(/modules_/i,""),"modules");
    	}
    	CONTROLLER.formCheck();
    },
    logPrecision: function(t){
    	/*-----------------------------------------------------------------------*/
    	/*-------- Function called on input change to update granularity --------*/
    	/*------------- value to either text value or bucket array --------------*/
    	/*-----------------------------------------------------------------------*/
    	if(t == "custom"){
    		CONTROLLER.precision.value = {"buckets":[]};
    	}else{
    		if(CONTROLLER.precision.value != t) CONTROLLER.precision.value = t;
    	}
    	CONTROLLER.formCheck();
    },
    preSelectBidder: function(n){
    	/*-----------------------------------------------------------------------*/
    	/*----- Function called to preselect bid adapters from spreadsheet ------*/
    	/*-----------------------------------------------------------------------*/
    	var els = document.getElementsByClassName("menu_item_select_bid-check"),regex = new RegExp((BIDDERS[n].code+'BidAdapter'),"gi"),found = false;

    	for(var i = 0; i < els.length; i++){
    		if(els[i].childNodes[1].id.match(regex)){
    			if(els[i].childNodes[1].checked != true){ 
    				//Set input to checked and dispatch on change event
    				els[i].childNodes[1].checked = true;
		    		els[i].childNodes[1].dispatchEvent(CONTROLLER.event["change"]);
	    			found =true;
	    		}else{
	    			found =true;
	    		}
    			break;
    		} 
    	}
    	if(!found){
    		MESSAGE.printMessage(5,n);
    	}
    },
    updatePrecision: function(t){
    	/*-----------------------------------------------------------------------*/
    	/*----- Function called to preselect bid adapters from spreadsheet ------*/
    	/*-----------------------------------------------------------------------*/
    	var elsGran = document.getElementsByClassName("granularity_check"),elsGranC = document.getElementsByClassName("module_precision_container");

    	for(var i = 0; i < elsGran.length; i++){
    		elsGran[i].checked = false;
	    	if(elsGran[i].id.toLowerCase() == "gran-"+t && t != "custom"){
				elsGran[i].checked = true;
				CONTROLLER.resetBuckets();
	    	}
	    	else if(elsGran[i].id.toLowerCase() == "gran-"+t && t=="custom"){
	    		elsGran[i].checked = true;
	    		for(var j = 0; j < elsGranC.length; j++){
	    			elsGranC[j].style.display = "block";
	    		}
	    	}
    	}
    	CONTROLLER.formCheck();
    	CONTROLLER.logPrecision(t);
    	SETUP.setCustomScrolls();
    },
    enableSendAll : function(e){
        if(e.target.checked){
            CONTROLLER.other.push(["enableSendAllBids",true]);
        }else{
            if(CONTROLLER.other.length > 0){
                for(var i = 0; i < CONTROLLER.other.length; i++){
                    if(CONTROLLER.other[i][0]=="enableSendAllBids") CONTROLLER.other.splice(i,1)
                }
            }   
        }
    },
    logTimeout : function(e){
        if(CONTROLLER.other.length > 0){
            for(var i = 0; i < CONTROLLER.other.length; i++){
                if(CONTROLLER.other[i][0]=="bidderTimeout") CONTROLLER.other.splice(i,1)
            }
        }
        if(e.target.value!=""&&e.target.value>0){
            CONTROLLER.other.push(["bidderTimeout",e.target.value]);
        }
    },
   	formCheck: function(){
   		/*-----------------------------------------------------------------------*/
    	/*------- Function called to determine if download button should --------*/
    	/*------------------- be available for user to click --------------------*/
    	/*-----------------------------------------------------------------------*/
   		var el = document.getElementById("download_button");
   		(CONTROLLER.file && CONTROLLER.file!="" && CONTROLLER.passQA && CONTROLLER.patterns.length > 0) ? CONTROLLER.fC = true : CONTROLLER.fC = false;

   		if(typeof CONTROLLER.precision.value == "object" && CONTROLLER.precision.value.hasOwnProperty("buckets") && CONTROLLER.checkBuckets() && CONTROLLER.bids.length > 0){
   			CONTROLLER.cC = true;
   		}else if(typeof CONTROLLER.precision.value != "object" && CONTROLLER.bids.length && CONTROLLER.bids.length > 0){
   			CONTROLLER.cC = true;
   		}else{
   			CONTROLLER.cC = false;
   		}

   		if(CONTROLLER.fC && CONTROLLER.cC){
   			el.className = el.className.replace(/ unavailable/g, "");
   			document.getElementById("download_image").src = "images/download.png";
   			if(document.getElementById("errorlog").innerHTML.match(/(NOTICE:)|(WARNING:)/g)==null) MESSAGE.resetMessage();
   		}else{
   			if(el.className.indexOf("unavailable")==-1) el.className += " unavailable";
   			document.getElementById("download_image").src = "images/download-unavailable.png";
   			if(document.getElementById("errorlog").style.display=="block"){
	   			MESSAGE.resetMessage();
	    		var errors=[];
	    		if(!CONTROLLER.fC){ 
					errors.push("File has not been uploaded");
				}
				if(!CONTROLLER.cC){
					if(CONTROLLER.bids.length == 0) errors.push("No BID Adapters have been included");
					if(typeof CONTROLLER.precision.value == "object" && CONTROLLER.precision.value.hasOwnProperty("buckets") && !CONTROLLER.checkBuckets()) errors.push("Granularity values MUST be inputed into bucket fields");
				}
				MESSAGE.printMessage(3,errors);
			}
   		}
   	},
   	checkBuckets:function(){
   		/*-----------------------------------------------------------------------*/
    	/*--------- Function called to determine if custom granularity ----------*/
    	/*--------------------- fields have been completed ----------------------*/
    	/*-----------------------------------------------------------------------*/
   		var c = true;

   		if(CONTROLLER.precision.value.buckets.length == 0) return false;

    	for(var i =0; i < CONTROLLER.precision.value.buckets.length; i++){
    		for(var key in CONTROLLER.precision.value.buckets[i]){
    			if(CONTROLLER.precision.value.buckets[i][key][0].length == 0) return false;
	    		for(var j =0; j < CONTROLLER.precision.value.buckets[i][key][0].length; j++){
		    		if(CONTROLLER.precision.value.buckets[i][key][0][j]==""||CONTROLLER.precision.value.buckets[i][key][0][j]==null) c = false
		    	}
                if(CONTROLLER.precision.value.buckets[i][key][0][3]<=0||CONTROLLER.precision.value.buckets[i][key][0][2]<=0) c = false
		    }
    	}
    	return c;
   	},
    appendBucket: function(){
    	/*-----------------------------------------------------------------------*/
    	/*--------- Function called to append a new granularity bucket ----------*/
    	/*-----------------------------------------------------------------------*/
    	var l = document.getElementsByClassName("module_precision_bucket").length+1, mpb = document.createElement("DIV"), rem = document.createElement("DIV"), label = new Array(), input = new Array();
    	//Create all necessary elements to build bucket input
    	//Matches default html
    	mpb.className = "module_precision_bucket";
    	mpb.id = "bucket_"+l;
    	rem.innerHTML = "-";
    	rem.className = "module_precision_bucket-remove";
    	rem.addEventListener("click", function(){
		    var id = "bucket_"+l;
		    CONTROLLER.removeBucket(id);
		});
    	for(var i = 0; i < 4; i++){
			label.push(document.createElement("LABEL"));
			input.push(document.createElement("INPUT"));
			label[i].className = "module_precision_bucket-text";
			input[i].type = "number";
			input[i].value = (i==0) ? "2" : "0";
			input[i].min = "0";
			//Setup input onchange/keyup event listeners
			input[i].addEventListener("change", function(e) {
			    CONTROLLER.precBool(e.target.parentNode.parentNode,true);
			});
			input[i].addEventListener("keyup", function(e) {
			    CONTROLLER.precBool(e.target.parentNode.parentNode,true);
			});;
			switch(i){
				case 0:
					input[i].step = "1";
					label[i].appendChild(document.createTextNode("Enter precision: "));
					break;
				case 1:
					input[i].step = ".1";
					label[i].appendChild(document.createTextNode("Enter minimum: "));
					break;
				case 2:
					input[i].step = ".1";
					label[i].appendChild(document.createTextNode("Enter maximum: "));
					break;
				case 3:
					input[i].step = ".1";
					label[i].appendChild(document.createTextNode("Enter increment: "));
					break;
				default:
					break;
			}
			label[i].appendChild(input[i]);
			mpb.appendChild(label[i]);
		}
    	
    	label[0].className += " text_space6";
    	label[1].className += " text_space4";
    	label[2].className += " text_space1";
    	mpb.appendChild(rem);
    	document.getElementById("bucket_contain").insertBefore(mpb,document.getElementById("mp_addbucket"));
    	CONTROLLER.precBool(mpb,true);
    	SETUP.setCustomScrolls();
    },
    precBool: function(e,s){
    	/*-----------------------------------------------------------------------*/
    	/*----------- Function called on input change/keyup to check ------------*/
    	/*------- whether all fields in current bucket have been filled ---------*/
    	/*----------- or not, and add/remove/update precision object ------------*/
    	/*-----------------------------------------------------------------------*/
    	var check = 0, c = e.childNodes, vals = [], exists=null;
    	
    	if(s){
	    	//Loop through container children
	    	for(var i =0; i < c.length; i++){
	    		if(c[i].nodeName.toLowerCase()=="label"){
		    		if(c[i].childNodes[1].value != "" && c[i].childNodes[1].value != null){
		    			//If child input has value, increase check and push value into array
		    			check++;
		    			vals.push(c[i].childNodes[1].value);
		    		}
		    	}
	    	}
	    	
	    	//Loop through bucket array and check for object property name match
	    	for(var j = 0; j < CONTROLLER.precision.value.buckets.length; j++){
	    		if(CONTROLLER.precision.value.buckets[j].hasOwnProperty(e.id)) exists = j;
	    	}

	    	if(check==4 && exists==null){
	    		//If all four input fields exist and name does not already exist in buckets
	    		//then push object into bucket
	    		CONTROLLER.precision.value.buckets.push({[e.id]:[vals]});
	    	}else if(check==4){
	    		//If all four input fields exist and name does exist in buckets
	    		//update values
	    		CONTROLLER.precision.value.buckets[exists][e.id]=[vals];
	    	}else if(exists!=null){
	    		//If all four input fields do not exist and name does exist in buckets
	    		//remove corresponding bucket object
	    		CONTROLLER.precision.value.buckets.splice(exists,1);
	    	}
	    }else{
	    	//Loop through bucket array checking if name already exist in buckets 
	    	for(var j = 0; j < CONTROLLER.precision.value.buckets.length; j++){
	    		if(CONTROLLER.precision.value.buckets[j].hasOwnProperty(e.id)) exists = j;
	    	}
	    	if(exists!=null){
	    		//If name does exist in buckets, remove corresponding bucket object
	    		CONTROLLER.precision.value.buckets.splice(exists,1);
	    	}
	    }
	    CONTROLLER.formCheck();
    	
    },
    removeBucket: function(id){
    	/*-----------------------------------------------------------------------*/
    	/*----------- Function called to remove a granularity bucket ------------*/
    	/*--------------------- using the passed element id ---------------------*/
    	/*-----------------------------------------------------------------------*/
    	var el = document.getElementById(id);
    	CONTROLLER.precBool(el,false);
    	el.parentNode.removeChild(el);
    	SETUP.setCustomScrolls();
    },
    resetBuckets: function(e){
    	/*-----------------------------------------------------------------------*/
    	/*---------- Function called to remove all granularity buckets ----------*/
    	/*-------------------------- excluding default --------------------------*/
    	/*-----------------------------------------------------------------------*/
    	var elsGranC = document.getElementsByClassName("module_precision_bucket"),elsGranP = document.getElementsByClassName("module_precision_container");
    	elsGranP[0].style.display = "none";

    	if(elsGranC.length>1){
	    	for(var i = 1; i < elsGranC.length; i++){
		    	elsGranC[i].parentNode.removeChild(elsGranC[i]);
		    }
		}
		SETUP.setCustomScrolls();
    },
    displayFileName: function(){
    	/*-----------------------------------------------------------------------*/
    	/*------------ Function called to display user uploaded file ------------*/
    	/*------------------- name with icon based on type ----------------------*/
    	/*-----------------------------------------------------------------------*/
    	var elDrop = document.getElementById("fileinput"), elDisplay = document.getElementById("filedisplay");
    	elDrop.className+=" hidden";
    	elDisplay.className = elDisplay.className.replace(/ hidden/g, "");

    	document.getElementById("displayFile").innerHTML= "FILENAME: "+CONTROLLER.file[0].name;
    	
    	if(CONTROLLER.filetype == "csv"){
    		document.getElementById("uploaded-file").src = "images/csv_file.png";
    	}else if(CONTROLLER.filetype == "xlsx"){
    		document.getElementById("uploaded-file").src = "images/xlsx_file.png";
    	}else{
    		document.getElementById("uploaded-file").src = "images/xls_file.png";
    	}
    },
    resetValues: function(){
        /*-----------------------------------------------------------------------*/
        /*------------ Function called to reset pattern object values -----------*/
        /*-----------------------------------------------------------------------*/
        var elDrop = document.getElementById("fileinput"), elDisplay = document.getElementById("filedisplay"), bidEl = document.getElementsByClassName("menu_item_select_bid-check");
        elDisplay.className+=" hidden";
        elDrop.className = elDrop.className.replace(/ hidden/g, "");
        
        CONTROLLER.file="";
        CONTROLLER.patterns = [];
        CONTROLLER.fC=false;
        CONTROLLER.columns = 0;

        for(var i = 0; i < bidEl.length; i++){
            if(bidEl[i].childNodes[1].checked) {
                bidEl[i].childNodes[1].checked = false;
                bidEl[i].childNodes[1].dispatchEvent(CONTROLLER.event["change"]);
            }
        }
        
        document.getElementById("file").value = "";

        CONTROLLER.formCheck();
    },
    resetUpload: function(){
    	/*-----------------------------------------------------------------------*/
    	/*-------------------- Function called to reset file  -------------------*/
    	/*-----------------------------------------------------------------------*/
    	CONTROLLER.resetValues();
    	MESSAGE.resetMessage();
    },
    checkArray: function(a){
    	/*-----------------------------------------------------------------------*/
    	/*------- Function called to check passed array for header values -------*/
    	/*-----------------------------------------------------------------------*/
    	//Check that array is at least length 3
    	if(a.length < 3) return false;
    	var c = 0;
    	//Loop through array and match header values
    	//Must equal at least 5 matches to pass
    	for(var i = 0; i < a[1].length; i++){
    		var regex = /(Sizes.for.Screen.Widths.*\d+px.+)|(DFP.Ad.Unit.Name)|(Div.ID)/gi;
    		if(a[1][i].match(regex)) c++;
    	}
    	return (c >= 5) ?  true : false;
    },
    constructJS : function(){
    	return (OUTPUT.init());
    },
	encode: function(s){
		/*-----------------------------------------------------------------------*/
    	/*---------- Function called to create array of character codes ---------*/
    	/*-------------- and return Uint8Array array for blob ouput -------------*/
    	/*-----------------------------------------------------------------------*/
	    var ret = [];
	    //Loop through string characters and create/return character code array
	    for ( var i = 0; i < s.length; i++ ) {
	        ret[i] = s.charCodeAt(i);
	    }
	    return new Uint8Array(ret);
	},
    downloadFile: function(){
    	/*-----------------------------------------------------------------------*/
    	/*---- Function called to call JS string contructor and download file ---*/
    	/*------- if form checks have been set to true, else error displays -----*/
    	/*------------ indicating what fields are currently missing -------------*/
    	/*-----------------------------------------------------------------------*/
    	//Determine if form checks have been met
    	if(CONTROLLER.fC&&CONTROLLER.cC){
    		//Call JS constructer to return output as string
	    	var str = CONTROLLER.constructJS();
	    	//Pass returned string to be converted to character code array for blob output
			var data = CONTROLLER.encode(str);
			//Create blob
		    blob = new Blob( [ data ], {
		        type: 'application/octet-stream'
		    });
			MESSAGE.resetMessage();
			CONTROLLER.url.link = URL.createObjectURL(blob);
			CONTROLLER.url.name = CONTROLLER.file[0].name.replace(/(.csv)|(.xls)|(.xlsx)/i,"");
			document.getElementById("download-link").setAttribute('href', CONTROLLER.url.link);
			document.getElementById("download-link").setAttribute('download', CONTROLLER.url.name +".js");

		    //Open custom dialogue box to request user to confirm or change file name to be saved
		    var curr = CONTROLLER.file[0].name.replace(/(.csv)|(.xlsx)|(.xls)/gi,""); 
		    document.getElementById("save-name").value = curr;
		    document.getElementById("save-box").parentNode.style.display = "block";
		    document.getElementById("save-box").className+=" in";
		    document.getElementById("save-name").focus();
		}else{
			//Output errors for missing information/incomplete data
			var errors = [];
			if(!CONTROLLER.fC){ 
				errors.push("A file has not been uploaded. Please upload either a .csv, .xls, or .xlsx file to proceed. ");
				SETUP.setFormToggle("file");
			}
			if(!CONTROLLER.cC){
				if(CONTROLLER.bids.length == 0) errors.push("No Bid Adapters have been included. At least one Bid Adapter must be selected. ");
				if(typeof CONTROLLER.precision.value == "object" && CONTROLLER.precision.value.hasOwnProperty("buckets") && !CONTROLLER.checkBuckets()) errors.push("Custom granularity has been selected, but no values have been inputted. Granularity values MUST be added into bucket fields. ");
				if(CONTROLLER.fC) SETUP.setFormToggle("custom");
			}
			MESSAGE.printMessage(3,errors);
		}
	},
	confirmDownload:function(){
		/*-----------------------------------------------------------------------*/
    	/*------ Function called to either display error or trigger close  ------*/
    	/*-----------------------------------------------------------------------*/
		var el = document.getElementById("save-name"), err = document.getElementById("save-error");

		if(el.value.length > 0){
			var filename = el.value;
			if(filename!=null){
				err.style.display = "none";
				CONTROLLER.closeDownload();
			}
			else{
				err.style.display = "block";
			}
		}
		else{
			err.style.display = "block";
		}
	},
	closeDownload:function(){
		/*-----------------------------------------------------------------------*/
    	/*---------------- Function called to close dialogue box ----------------*/
    	/*-----------------------------------------------------------------------*/
		var el = document.getElementById("save-box"),err = document.getElementById("save-error");
		CONTROLLER.blob = ""; 
		err.style.display = "none";
		
		el.className = el.className.replace(/ in/i,"")+" out";
		setTimeout(function(){
			el.parentNode.style.display = "none";
			el.className = el.className.replace(/ out/i,"");
		},500);
	},
	downloadKeyCheck: function(e){
		/*-----------------------------------------------------------------------*/
    	/*---------- Function called on dialogue box input key change -----------*/
    	/*-----------------------------------------------------------------------*/
		var el = e.target, elD = document.getElementById("download-link");
		CONTROLLER.url.name = el.value+".js";
		//Check that input value length
		if(el.value.length == 0){
			//If value length equals 0, set href to void and remove download name
			elD.setAttribute('href', 'javascript:void(0);');
			elD.setAttribute('download', '');
			if(e.keyCode == 13 || e.key == "Enter"){ 
				//If enter key was pressed, run confirmDownload to display empty input error
				CONTROLLER.confirmDownload();
			}
		}else{
			//If value length greater than 0, set href url blob and name to input value
			elD.setAttribute('href', CONTROLLER.url.link);
			elD.setAttribute('download', el.value+".js" );
			if(e.keyCode == 13 || e.key == "Enter"){ 
				//If enter key was pressed, trigger link click
				CONTROLLER.confirmDownload();
				CONTROLLER.event["click"] = document.createEvent('MouseEvents');
				CONTROLLER.event["click"].initMouseEvent('click',true,true,window, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
				elD.dispatchEvent(CONTROLLER.event["click"]);
			}
		}
	}
}









