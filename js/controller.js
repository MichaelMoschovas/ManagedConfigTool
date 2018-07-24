var CONTROLLER = {
	file : "",
	filetype :  "",
	columns : 0,
	patterns : [],
	bids : [],
    bidders : [],
	analytics : [],
	modules : [],
	precision : {value:"medium"},
    other : [],
	passQA : false,
    valid: false,
	event : {},
    account : "",
	url:{link:"",name:""},
    prebidserver: false,
    currency: false,
    analyticInput : [],
    begin: function(d,t) {
    	/*-----------------------------------------------------------------------*/
    	/*------------ Function called to begin file parsing process ------------*/
    	/*-----------------------------------------------------------------------*/
    	CONTROLLER.filetype = t;
    	var a = (CONTROLLER.filetype == "csv" )? BUILD.buildCSVArray(d) : BUILD.buildXLSArray(d);
    	CONTROLLER.passQA = a != null ? CONTROLLER.checkArray(a) : MESSAGE.printMessage(0,null);
    	var c = CONTROLLER.passQA ? BUILD.buildBidObjects(a) : MESSAGE.printMessage(2,null);
    	if(c){ 
    		CONTROLLER.formCheck(); 
	    	SETUP.setFormToggle("custom");
	    	CONTROLLER.displayFileName();
	    }else{
            CONTROLLER.resetValues();
            MESSAGE.printMessage(4,null);
	    }
        CONTROLLER.setLoader();
    },
    reset: function(){
    	/*-----------------------------------------------------------------------*/
    	/*-------- Function called to reset all object values to default --------*/
    	/*-----------------------------------------------------------------------*/
    	CONTROLLER.file =  "";
        CONTROLLER.filetype =  "";
		CONTROLLER.columns = 0;
		CONTROLLER.patterns = [];
		CONTROLLER.passQA = false;
		CONTROLLER.bids = [];
        CONTROLLER.bidders = [];
		CONTROLLER.modules = [];
		CONTROLLER.analytics = [];
		CONTROLLER.precision = [];
        CONTROLLER.other = [];
		CONTROLLER.passQA = false;
		CONTROLLER.valid = false;
        CONTROLLER.prebidserver= false;
        CONTROLLER.currency= false;
		MESSAGE.reset();
    },
    readFile: function(e){
    	/*-----------------------------------------------------------------------*/
    	/*------------ Function called to instantiate new FileReader, -----------*/
    	/*-------------- accept user uploaded file as input, and ----------------*/
    	/*------------ pass data to corresponding parser function ---------------*/
    	/*-----------------------------------------------------------------------*/
    	MESSAGE.reset();
        CONTROLLER.setLoader(); 
    	//Set file to target file
    	if(CONTROLLER.file=="") CONTROLLER.file = e;
    	var f = CONTROLLER.file;
    	//Regex matching for .xls/.xlsx vs .csv
    	var regexXLS = /^(.*)+(\.xlsx|\.xls)$/gi, regexXLSX = /^(.*)+(\.xlsx)$/gi, regexCSV = /^(.*)+(\.csv)$/gi; 
	    if(f[0].name.match(regexXLS)||f[0].name.match(regexCSV)){
	    	//Check for FileReader type
		    if (typeof (FileReader) != "undefined") {  
		    	var x = f[0].name.match(regexXLS) ? true : false;
		    	//Setup new FileReader and read file as binary string
	            var reader = new FileReader();  
	            reader.onload = function (e) { 
		            var d = e.target.result;  
		            //If file is excel type, then use XLSX to read data
		            var w = x ? XLSX.read(d, { type: 'binary' }) : d; 
		            x ? (f[0].name.match(regexXLSX) ? CONTROLLER.begin(w,"xlsx") : CONTROLLER.begin(w,"xls")) : CONTROLLER.begin(w,"csv");
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
    	var s = e.target.value;
    	var regex = new RegExp(s,"gi");

    	//Loop through all bid input elements
        Array.from(document.querySelectorAll('.menu_item_select_bid-check')).forEach(function(el) {
            var m1 = el.childNodes[0].nodeValue, m2 = el.childNodes[1].id;
            if(s==null||s==""||s.length<2){
                //If the passed string length is less than 2, remove all instances of hidden class
                if(el.className.match(/hidden/gi)) el.className = el.className.replace(/ hidden/g, "");
            }else if(m1.match(regex)==null&&m2.match(regex)==null&&s.length>=2){
                //If the passed string length is greater than 2 and no match can be made, add class hidden
                if(el.className.match(/hidden/gi)==null){
                    el.className += " hidden";
                }
            }else if((m1.match(regex)||m2.match(regex))&&s.length>=2){
                //If the passed string length is greater than 2 and match can be made
                //Check if class hidden exists and remove it
                if(el.className.match(/hidden/gi)) el.className = el.className.replace(/ hidden/g, "");
            }
        });
        SETUP.setCustomScrolls();
    },
    addBidder: function(name){
        if(CONTROLLER.bidders.length > 0){
            var c = false;
            for(var i = 0; i < CONTROLLER.bidders.length; i++){
                if(CONTROLLER.bidders[i]==name) c = true;
            }
            if(!c) CONTROLLER.bidders.push(name);
        }else{
            CONTROLLER.bidders.push(name);
        }
    },
    displayBidsPreview: function(el,t){
    	/*-----------------------------------------------------------------------*/
    	/*------ Function called to display preview of selected checkboxes ------*/
    	/*-----------------------------------------------------------------------*/
    	var id = el.id.split("_")[1].replace(/BIDADAPTER/i,"").replace(/ANALYTICSADAPTER/i,"");
    	var div = document.createElement("DIV"), span = document.createElement("SPAN"), text = document.createTextNode(id.toUpperCase()),target = document.getElementById(t+"_preview");
    	div.id= id+"-preview-"+t;
    	span.innerHTML = "x";
    	span.addEventListener("click", function(e) {
            if(t == "bid"){
                document.getElementById(t+"_"+id+"BidAdapter").checked=false;
                CONTROLLER.logBids(document.getElementById(t+"_"+id+"BidAdapter"),id+"BidAdapter");
            }else{
                if(t=="analytics"){
                    document.getElementById(t+"_"+id+"AnalyticsAdapter").checked=false;
                    CONTROLLER.logAnalytics(document.getElementById(t+"_"+id+"AnalyticsAdapter"),id+"AnalyticsAdapter");
                }else{
                    document.getElementById(t+"_"+id).checked=false;
                    CONTROLLER.logModules(document.getElementById(t+"_"+id),id);
                }

            }
		});
    	div.appendChild(text);
    	div.appendChild(span);
    	target.appendChild(div);
    	if(target.className.indexOf("display")==-1) target.className += " display";
    	SETUP.setCustomScrolls();
    },
    removeBidsPreview: function(id,t){
    	/*-----------------------------------------------------------------------*/
    	/*------- Function called to remove preview of passed checkbox id -------*/
    	/*-----------------------------------------------------------------------*/
    	var el = document.getElementById(id.replace(/BIDADAPTER/i,"").replace(/ANALYTICSADAPTER/i,"")+"-preview-"+t),input = document.getElementById(t+"_"+id);
    	var p = el.parentNode;
    	el.parentNode.removeChild(el);
    	input.checked = false;
    	if(!p.hasChildNodes()){ 
    		p.className = p.className.replace(/ display/gi,"");
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
        CONTROLLER.serverInput(el,el.checked);
    	CONTROLLER.formCheck();
    },
    serverInput: function(e,bool){
        if(e.id.match(/prebidserver/gi)){
            var el = document.getElementById("s2sConfig");
            if(bool){
                document.getElementById("s2sConfig").className = document.getElementById("s2sConfig").className.replace(/ hidden/i,"");
                CONTROLLER.prebidserver = true;
                SETUP.setCustomToggle("other");
            }else{
                document.getElementById("s2sConfig").className += " hidden";
                CONTROLLER.prebidserver = false;
            }
        }
    },
    currencyInput: function(e,bool){
        if(e.id.match(/currency/gi)){
            var el = document.getElementById("currency");
            if(bool){
                document.getElementById("currency").className = document.getElementById("currency").className.replace(/ hidden/i,"");
                CONTROLLER.currency = true;
                SETUP.setCustomToggle("other");
            }else{
                document.getElementById("currency").className += " hidden";
                CONTROLLER.currency = false;
            }
        }
    },
    logAnalytics: function(el,t){
    	/*-----------------------------------------------------------------------*/
    	/*-------- Function called on input change to log if an analytics -------*/
    	/*--------- value should be added or removed from the bids array --------*/
    	/*-----------------------------------------------------------------------*/
    	var input = document.getElementById(el.id.replace(/analytics_/i,"").replace(/analyticsadapter/i,""));
        if(el.checked){
    		CONTROLLER.analytics.push(t);
    		CONTROLLER.displayBidsPreview(el,"analytics");
            input.className = input.className.replace(/ hidden/i,"");
            var obj = {}, k = t.replace(/analyticsadapter/i,"");
            obj[k] = {};
            obj[k]["options"] = {};
            for(var input in ANALYTICINPUTS[k]){
                if(ANALYTICINPUTS[k][input].required){ 
                    if(input.match(/provider/i)){
                        obj[k][input] = ANALYTICINPUTS[k].title;
                    }else{
                        obj[k]["options"][input] = "";
                    }
                }
            }
            CONTROLLER.analyticInput.push(obj);
            SETUP.setCustomToggle("other");
    	}
    	else{
    		for(var i = 0; i < CONTROLLER.analytics.length; i++){
    			if(CONTROLLER.analytics[i] == t) CONTROLLER.analytics.splice(i,1);
                if(CONTROLLER.analyticInput[i].hasOwnProperty(t.replace(/analyticsadapter/i,""))) CONTROLLER.analyticInput.splice(i,1);
    		}
    		CONTROLLER.removeBidsPreview(el.id.replace(/analytics_/i,""),"analytics");
            input.className += " hidden";
    	}
    	CONTROLLER.formCheck();
    },
    logAnalyticElement: function(e,k){
        /*-----------------------------------------------------------------------*/
        /*-------- Function called each time analytics adapter is selected ------*/
        /*------- and created a secondary related object in order to track ------*/
        /*---------------- input values for apater to be enabled ----------------*/
        /*-----------------------------------------------------------------------*/
        var id = e.target.id.replace(k+"-",""),f=false;
        for(var i = 0; i < CONTROLLER.analyticInput.length; i++){
            if(Object.keys(CONTROLLER.analyticInput[i])[0] == k&&CONTROLLER.analyticInput[i][Object.keys(CONTROLLER.analyticInput[i])[0]]["options"].hasOwnProperty(id)){
                for(var input in CONTROLLER.analyticInput[i][Object.keys(CONTROLLER.analyticInput[i])[0]]["options"]){
                    if(ANALYTICINPUTS[k][input].required&&input==id){
                        CONTROLLER.analyticInput[i][Object.keys(CONTROLLER.analyticInput[i])[0]]["options"][input] = event.target.value;
                    }else if(!ANALYTICINPUTS[k][input].required&&input==id){
                        if(event.target.value&&event.target.value!=""){
                            CONTROLLER.analyticInput[i][Object.keys(CONTROLLER.analyticInput[i])[0]]["options"][input] = event.target.value;
                        }else{
                            delete CONTROLLER.analyticInput[i][Object.keys(CONTROLLER.analyticInput[i])[0]]["options"][input];
                        }
                    }
                }
            }else if(Object.keys(CONTROLLER.analyticInput[i])[0] == k&&event.target.value&&event.target.value!=""){
                 CONTROLLER.analyticInput[i][Object.keys(CONTROLLER.analyticInput[i])[0]]["options"][id] = event.target.value;
            }
        }
        console.log(CONTROLLER.analyticInput);
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
        CONTROLLER.currencyInput(el,el.checked);
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
    logCustom: function(e,v){
        /*-----------------------------------------------------------------------*/
        /*--- Function called on input change to update prebid server params ----*/
        /*-----------------------------------------------------------------------*/
        var c = true, o = {};
        Array.from(document.querySelectorAll('.'+v+'_required')).forEach(function(el) {
            var val;
            if(!el.value){
                c = false;
            }else if(el.type=="checkbox"){
                o.hasOwnProperty(v) ? o[v][el.id.replace(v+"-","")] = el.checked : o[v] = {[el.id.replace(v+"-","")]:el.checked};
            }else{
                if(el.className.match(/array/gi)){
                    val = (el.value.match(/,/gi)) ? el.value.split(/,/gi) : [el.value];
                    for(var l = 0; l < val.length; l++){
                        val[l] = val[l].replace(/\s/g,"");
                        if(val[l].length == 0){
                            val.splice(l,1);
                        }
                    }
                }else{
                    val = el.value.replace(/\s/g,"");
                }
                o.hasOwnProperty(v) ? o[v][el.id.replace(v+"-","")] = val : o[v] = {[el.id.replace(v+"-","")]:val};
            }
        });
        for(var j = 0; j < CONTROLLER.other.length; j++){
            if(CONTROLLER.other[j].hasOwnProperty(v)){
                CONTROLLER.other.splice(j,1);
            }
        }
        if(c){
             Array.from(document.querySelectorAll('.'+v+'_optional')).forEach(function(el) {
                var val;
                if(el.type=="checkbox"){
                    o.hasOwnProperty(v) ? o[v][el.id.replace(v+"-","")] = el.checked : o[v] = {[el.id.replace(v+"-","")]:el.checked};
                }else if(el.value){
                    if(el.className.match(/array/gi)){
                        val = (el.value.match(/,/gi)) ? el.value.split(/,/gi) : [el.value];
                        for(var l = 0; l < val.length; l++){
                            val[l] = val[l].replace(/\s/g,"");
                            if(val[l].length == 0){
                                val.splice(l,1);
                            }
                        }
                    }
                    else{
                        val = el.value.replace(/\s/g,"");
                    }
                    o.hasOwnProperty(v) ? o[v][el.id.replace(v+"-","")] = val : o[v] = {[el.id.replace(v+"-","")]:val};
                }
            });
            if(Object.keys(o).length > 0) CONTROLLER.other.push(o);
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
    	Array.from(document.querySelectorAll('.granularity_check')).forEach(function(el) {
            el.checked = false;
            if(el.id.toLowerCase() == "gran-"+t && t != "custom"){
                el.checked = true;
                CONTROLLER.resetBuckets();
                Array.from(document.querySelectorAll('.module_precision_container')).forEach(function(c) {
                    c.style.display = "none";
                });
            }
            else if(el.id.toLowerCase() == "gran-"+t && t=="custom"){
                el.checked = true;
                Array.from(document.querySelectorAll('.module_precision_container')).forEach(function(c) {
                    c.style.display = "block";
                });
            }
        });

    	CONTROLLER.formCheck();
    	CONTROLLER.logPrecision(t);
    	SETUP.setCustomScrolls();
    },
   	formCheck: function(){
   		/*-----------------------------------------------------------------------*/
    	/*------- Function called to determine if download button should --------*/
    	/*------------------- be available for user to click --------------------*/
    	/*-----------------------------------------------------------------------*/
   		var el = document.getElementById("download_button"), c = document.querySelectorAll('.display_required').length, u;

        var err = VALIDATOR.init();
        CONTROLLER.removeRequireDisplay();

        CONTROLLER.valid = (err=="VALIDATED") ? true : false;

   		if(CONTROLLER.valid){
   			el.className = el.className.replace(/ unavailable/g, "");
   			document.getElementById("download_image").src = "images/download.png";
   			if(!document.getElementById("errorlog").innerHTML.match(/(NOTICE:)|(WARNING:)/g)) MESSAGE.reset();
   		}else{
   			if(el.className.indexOf("unavailable")==-1) el.className += " unavailable";
   			document.getElementById("download_image").src = "images/download-unavailable.png";
   			if(document.getElementById("errorlog").parentNode.style.display=="block"){
                //CONTROLLER.setFocus(err[1],false);
	   			MESSAGE.reset();
			}
   		}
   	},
    setFocus: function(e,bool,c){
        /*-----------------------------------------------------------------------*/
        /*------ Function called to toggle forms and set focus to elements ------*/
        /*-----------------------------------------------------------------------*/
        var f = document.getElementById("toogle_file"), c = document.getElementById("toogle_custom");
        for(var i = 0; i < e.length; i++){
            if(e[i][0]==0){
                if(!f.className.match(/display_required/i)) f.className += " display_required";
            }else if(e[i][0]==1){
                var el = document.getElementById("sidebar_"+e[i][3]);
                if(!e[i][1].className.match(/display_required/i)) e[i][1].className += " display_required";
                if(!c.className.match(/display_required/i)) c.className += " display_required";
                if(!el.className.match(/display_required/i)) el.className += " display_required";
            }else{
                var el = document.getElementById("sidebar_"+e[i][3]);
                if(!c.className.match(/display_required/i)) c.className += " display_required";
                if(!el.className.match(/display_required/i)) el.className += " display_required";
                for(var el in e[i][1]){
                    if(e[i][1][el].childNodes){
                        if(e[i][1][el].childNodes[1].childNodes[0].className.match(/required/i)&&!e[i][1][el].childNodes[1].childNodes[0].className.match(/display_required/i)&&e[i][1][el].childNodes[1].childNodes[0].value=="") e[i][1][el].childNodes[1].childNodes[0].className += " display_required";
                    }
                }
            }
        }
        if(bool){
            if(e[0][0]==0){
                SETUP.setFormToggle(e[0][2]);
                e[0][1].focus();
            }else if(e[0][0]==1){
                SETUP.setFormToggle(e[0][2]);
                SETUP.setCustomToggle(e[0][3]);
                e[0][1].focus();
            }else{
                SETUP.setFormToggle(e[0][2]);
                SETUP.setCustomToggle(e[0][3]);
            }
        }
    },
    removeRequireDisplay: function(){
        /*-----------------------------------------------------------------------*/
        /*--------------- Function called to remove required class --------------*/
        /*-----------------------------------------------------------------------*/
        Array.from(document.querySelectorAll('.display_required')).forEach(function(el) {
            el.className = el.className.replace(/ display_required/i,"");
        });
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
            if(i==0){
                input[i].addEventListener("keypress", function(event) {
                    if(event.charCode < 48 || event.charCode > 57) event.preventDefault();
                });
            }
			switch(i){
				case 0:
					input[i].step = "1";
					label[i].appendChild(document.createTextNode("Enter precision: "));
                    label[i].className += " text_space6";
					break;
				case 1:
					input[i].step = ".1";
					label[i].appendChild(document.createTextNode("Enter minimum: "));
                    label[i].className += " text_space4";
					break;
				case 2:
					input[i].step = ".1";
					label[i].appendChild(document.createTextNode("Enter maximum: "));
                    label[i].className += " text_space1";
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
    resetBuckets: function(){
    	/*-----------------------------------------------------------------------*/
    	/*---------- Function called to remove all granularity buckets ----------*/
    	/*-------------------------- excluding default --------------------------*/
    	/*-----------------------------------------------------------------------*/
        Array.from(document.querySelectorAll('.module_precision_bucket')).forEach(function(el) {
            if(el.id != "bucket_1") el.parentNode.removeChild(el);
        });

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
        var elDrop = document.getElementById("fileinput"), elDisplay = document.getElementById("filedisplay");
        elDisplay.className+=" hidden";
        elDrop.className = elDrop.className.replace(/ hidden/g, "");
        
        CONTROLLER.file="";
        CONTROLLER.patterns = [];
        CONTROLLER.bidders = [];
        CONTROLLER.valid=false;
        CONTROLLER.columns = 0;

        Array.from(document.querySelectorAll('.menu_item_select_bid-check')).forEach(function(el) {
            if(el.childNodes[1].checked) {
                el.childNodes[1].checked = false;
                el.childNodes[1].dispatchEvent(CONTROLLER.event["change"]);
            }
        });
        
        document.getElementById("file").value = "";

        CONTROLLER.formCheck();
    },
    resetUpload: function(){
    	/*-----------------------------------------------------------------------*/
    	/*-------------------- Function called to reset file  -------------------*/
    	/*-----------------------------------------------------------------------*/
    	CONTROLLER.resetValues();
    	MESSAGE.reset();
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
    		var regex = /(Sizes)|(DFP.Ad.Unit.Name)|(Div.ID)/gi;
    		if(a[1][i].match(regex)) c++;
    	}
    	return (c >= 3) ?  true : false;
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
    	 CONTROLLER.removeRequireDisplay();
        //Determine if form checks have been met
    	if(CONTROLLER.valid){
    		//Call JS constructer to return output as string
	    	var str = CONTROLLER.constructJS();
	    	//Pass returned string to be converted to character code array for blob output
			var data = CONTROLLER.encode(str);
			//Create blob
		    blob = new Blob( [ data ], {
		        type: 'application/octet-stream'
		    });
			MESSAGE.reset();
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
            MESSAGE.reset();
            var err = VALIDATOR.init();
			MESSAGE.printMessage(3,err[0]);
            CONTROLLER.setFocus(err[1],true);
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









