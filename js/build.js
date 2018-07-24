var BUILD = {
    buildArray: function(arg,bool) {
    	/*-----------------------------------------------------------------------*/
	    /*------------- Function called to build array from file data -----------*/
	    /*-----------------------------------------------------------------------*/
        var arr = [];
        arg = arg.replace(/\s/g,"").replace(/^\[/,"").replace(/\]$/g,"");

        if (arg.match(/,/gi)) {
            var argS = arg.split(",");
            for (var i = 0; i < argS.length; i++) {
            	if(argS[i].match(/^\{.+:.+\}/gi)){
            		arr.push(BUILD.buildObject(argS[i]));
            	}else{
	                arr.push(BUILD.buildArray(argS[i],true));
	            }
            }
        } else if (arg.match(/\d+x\d+/g)&&bool) {
        	var argS = arg.split("x");
            for (var i = 0; i < argS.length; i++) {
                arr.push(BUILD.buildArray(argS[i],true));
            }
        } else if (arg.match(/\d+x\d+/g)){
            var inArr = [];
            var argS = arg.split("x");
            for (var i = 0; i < argS.length; i++) {
                inArr.push(BUILD.buildArray(argS[i],true));
            }
            arr.push(inArr);
        }else {
            return (Number(arg)) ? Number(arg) : arg.replace(/['" ]/g,"");
        }
        return arr;
    },
    buildObject: function(arg) {
    	/*-----------------------------------------------------------------------*/
	    /*------------- Function called to build object from file data ----------*/
	    /*-----------------------------------------------------------------------*/
        var obj = {}, o = arg.replace(/^{/,"").replace(/}$/g,"");

        var splitAttributes = function(e){
        	var out = e.match(/([^_,]|_+.)+/g);
        	for(var i = 0; i < out.length; i++){
        		out[i] = out[i].replace(/_,/gi,",");
        	}
        	var ret = out;
        	return ret;
        };

        var splitValues = function(e){
        	var ret = e.split(/:(.+)/);
        	return ret;
        };
        
        if(o.match(/,/gi)) {
        	var a = splitAttributes(o);
        	for(var i = 0; i < a.length; i++){
                try{
            		var t = splitValues(a[i]);
            		if(t[1].match(/^\{.+:.+\}/gi)){
            			obj[t[0]] = BUILD.buildObject(t[1]);
            		}else if(t[1].match(/,/gi)){
            			t[1] = t[1].replace(/_,/gi,",");
            			obj[t[0]] = BUILD.buildArray(t[1]);
            		}else{
    	        		obj[t[0]] = t[1].replace(/['"]/g,"");
    	        	}
                }catch(err){
                    MESSAGE.printMessage(9,null);
                    return "";
                }
        	}
        }else{
        	var s = splitValues(o);
        	if(s[1].match(/\{.+:.+\}/gi)){
        		obj[s[0]] = BUILD.buildObject(s[1]);
        	}else if(s[1].match(/,/gi)){
        		obj[s[0]] = BUILD.buildArray(s[1]);
        	}else{
	        	obj[s[0]] = s[1].replace(/['"]/g,"");
	        }
        }
        return obj;
    },
    buildCSVArray: function(d) {
    	/*-----------------------------------------------------------------------*/
    	/*-------------- Function called to if file is of type .csv -------------*/
    	/*------------------ checks if file values are valid --------------------*/
    	/*------------------- and constructs the data array ---------------------*/
    	/*-----------------------------------------------------------------------*/
        var re_valid = /^\s*(?:'[^'\\]*(?:\\[\S\s][^'\\]*)*'|"[^"\\]*(?:\\[\S\s][^"\\]*)*"|[^,'"\s\\]*(?:\s+[^,'"\s\\]+)*)\s*(?:,\s*(?:'[^'\\]*(?:\\[\S\s][^'\\]*)*'|"[^"\\]*(?:\\[\S\s][^"\\]*)*"|[^,'"\s\\]*(?:\s+[^,'"\s\\]+)*)\s*)*$/;
        var re_value = /(?!\s*$)\s*(?:'([^'\\]*(?:\\[\S\s][^'\\]*)*)'|"([^"\\]*(?:\\[\S\s][^"\\]*)*)"|([^,'"\s\\]*(?:\s+[^,'"\s\\]+)*))\s*(?:,|$)/g;
        
        //Test using regex and return null if fails
        if (!re_valid.test(d)) return null;

        //Split data into rows at all new line characters
        var rows = d.split(/\r\n|\r|\n/), arr = [];

        //Loop through row array
        for(var line in rows){
        	var rArr = [], check = false;

        	//Replace function to push individual cell values into array
	        rows[line].replace(re_value, function(m0, m1, m2, m3) {
	            if (m1 !== undefined) rArr.push(m1.replace(/\\'/g, "'"));
	            else if (m2 !== undefined) rArr.push(m2.replace(/\\"/g, '"'));
	            else if (m3 !== undefined) rArr.push(m3);
	            return '';
	        });
	        //Loop through values in array and check that alphanumeric characters exist
	        //If not replace with empty string
	        for(var cell in rArr){
	        	var alphanum = /([0-9])|([a-z])/gi;
	        	rArr[cell] = rArr[cell].match(alphanum) ? rArr[cell] : "";
	        	if(rArr[cell] !="" && rArr[cell] != null) check = true;
 	        }

	        if(check) {
	        	//If column length is less than the array length, set column length to array length
	        	if (CONTROLLER.columns < rArr.length) CONTROLLER.columns = rArr.length; 
	        	//Push array into array
	        	arr.push(rArr);
	        }
	    }
	    //Loop through final array and check that all arrays have length of column variable
	    //If not fill in missing array indexes
	    for(var r in arr){
	    	if(arr[r].length < CONTROLLER.columns) arr[r].push("");
		    if(r == 0){
		    	for(var c in arr[r]){
		    		if(c!=0&&arr[r][c]=="") arr[r][c]=arr[r][c-1]
		    	}
		    }
	    }
        return arr;
    },
    buildXLSArray: function(d) {
    	/*-----------------------------------------------------------------------*/
    	/*----------- Function called to if file is of type .xls/.xlsx ----------*/
    	/*------------------- and constructs the data array ---------------------*/
    	/*-----------------------------------------------------------------------*/
    	var args = [],argsA = [],argsN = [], a, n, sheet = d.Sheets[Object.keys(d.Sheets)[0]],arr = [], push=function(r,u){for(var e="",h=[],n=0;n<r.length;n++){var p=r[n].replace(u,"");""==e?(h.push(p),e=p):e!=p&&(h.push(p),e=p)}return h};

    	//Loop through keys in first sheet and push each value to two arrays
    	for(var key in sheet){
    		if(key.match(/!./gi)==null){
    			argsA.push(key);
    			argsN.push(key);
    		}
    	}
    	//Sort array alphanumerically
    	argsA.sort(STRINGS.sortArr);
    	//Sort numerically ONLY
    	argsN.sort(STRINGS.sortArrNum);

		//Loop through alphanumeric sort/numeric sort and determine/log ALL column key values
    	var a = push(argsA,new RegExp(/[0-9]/,"gi"));
    	var n = push(argsN,new RegExp(/[a-z]/,"gi"));
    	
    	//Loop through all possible row key values
    	for(var k = 0; k < n.length; k++){
    		var p = [];
    		//For each row key loop through all possible column key values
    		for(var l = 0; l < a.length; l++){
    			//Construct key e.g. if k is 1 and a is B, key = [B1]
    			var str = ""+a[l]+n[k];
    			if(sheet.hasOwnProperty(str)){
    				//If property exists in object, push value to array
    				p.push(String(sheet[str].v));
    			}else if(k==0 && l > 0 && p[p.length-1] != "" && p[p.length-1]){
    				//If first row and not the first column and the previous index 
    				//has a value, set this value to the same. This is to account
    				//for empty bidder cells in the sheet
					str = ""+a[l-1]+n[k];
    				p.push(p[p.length-1]);
    			}else{
    				//If no conditions met, push empty string
    				p.push("");
    			}
    		}
    		//Push constructed array to array
    		arr.push(p);
    	}
    	return arr;
    },
    buildBidObjects: function(a) {
        /*-----------------------------------------------------------------------*/
        /*------------ Function called to create each pattern object ------------*/
        /*------------- for each row in array excluding header rows -------------*/
        /*------------------ and store values in pattern object -----------------*/
        /*-----------------------------------------------------------------------*/
		while(CONTROLLER.bidders.length > 0){
			CONTROLLER.bidders.pop();
		}
        var arr = [],pass = 0;
        //Loop through array starting with third index (first two indexes are header information)
        for (var i = 2; i < a.length; i++) {
            var obj = {};
            //Loop through inner array (cell values from sheet)
            for (var key in a[i]) {
                //Check that index location is not blank and does not equal N/A
                if (a[i][key] != "" && !a[i][key].match(/N\/A/gi)) {
                    //Determine header type from sheet and add data to appropriate location within object
                    if (a[1][key].match(/DFP.Ad.Unit.Name/gi)) {
                        //Add slot pattern value
                        obj = BUILD.getSlotPattern(obj,a,key,i);
                    } else if (a[0][key] != "") {
                        //If value exists and top header for cell is not blank, construct new bidder
                        //object with parameter or add paramter to existing bidder object
                        obj = BUILD.getBidders(obj,a,key,i);
                        CONTROLLER.addBidder(a[0][key]);
                    } else if (a[1][key].match(/Div.ID/gi)) {
                        //Add div id
                        obj = BUILD.getCode(obj,a,key,i);
                    } else if (a[1][key].match(/(Screen.Widths|Size)/gi)) {
                        //Add screen width array
                        obj = BUILD.getSizes(obj,a,key,i);
                    } else if (a[1][key].match(/Media/gi)) {
                        //Add media type value
                        obj = BUILD.getMediaType(obj,a,key,i);
                    }
                }
            }

            var f = BUILD.confirmBidderParams(obj);

            //Convert object to string and push to pattern array
            if (f) {
                CONTROLLER.patterns.push(STRINGS.objToString(obj,3));
                pass++;
            }
        }
        return (CONTROLLER.patterns.length > 0 && pass > 0) ? true : false;
    },
    confirmBidderParams: function(obj){
    	/*-----------------------------------------------------------------------*/
	    /*----- Function called to check required bidder params are defined -----*/
	    /*-----------------------------------------------------------------------*/
    	var fail = 0;
        if (!obj.hasOwnProperty("bids")) {
            fail++;
            MESSAGE.printMessage(7, obj.slotPattern);
        } else if (obj.bids.length > 0) {
            for (var b = 0; b < obj.bids.length; b++) {
                var bt = BUILD.checkBidderPattern(obj.bids[b], obj.slotPattern);
                if (bt != null) {
					 MESSAGE.printMessage(6, bt);
					fail++;
                }
            }
        } else {
			fail++;
			MESSAGE.printMessage(7, obj.slotPattern);
        }
        return (fail > 0) ? false : true;
    },
    checkBidderPattern: function(obj, p) {
        /*-----------------------------------------------------------------------*/
        /*--- Function called to check if required bidder params are included ---*/
        /*-----------------------------------------------------------------------*/
        var b = BIDDERS[obj.bidder];
        var c = b.parameters.length,
            f = "";
        for (var j = 0; j < b.parameters.length; j++) {
            var m = 0;
            for (var key in obj.params) {
                if (key == b.parameters[j]&&obj.params[key]!="") m++;
            }
            if (m == 0 && f.length == 0) {
                f = [p, obj.bidder, [b.parameters[j]]];
            } else if (m == 0) {
                f[2].push(b.parameters[j]);
            }
        }
        return (f.length == 0) ? null : f;
    },
    getBidders: function(obj,a,key,i) {
    	/*-----------------------------------------------------------------------*/
	    /*--------------- Function called to build bidder objects ---------------*/
	    /*------ as well as checking to make sure bidder exists in library ------*/
	    /*-----------------------------------------------------------------------*/
        var b = a[0][key].toLowerCase();
        if (BIDDERS.hasOwnProperty(b)) {
            if (!obj.hasOwnProperty("bids")) obj.bids = [];
            var c = false;
            for (var j = 0; j < obj.bids.length; j++) {
                if (obj.bids[j].hasOwnProperty("bidder") && obj.bids[j].bidder == BIDDERS[b].code) {
                    c = true;
                    obj.bids[j].params[a[1][key]] = a[i][key].match(/\{.+:.+\}/gi) ? BUILD.buildObject(a[i][key]) : (a[i][key].match(/,/gi) ? BUILD.buildArray(a[i][key],true) : BUILD.buildArray(a[i][key],false));
                }
            }
            if (!c) {
                var temp = { bidder: BIDDERS[b].code, params: {} };
                obj.bids.push(temp);
                obj.bids[obj.bids.length - 1].params[a[1][key]] = a[i][key].match(/\{.+:.+\}/gi) ? BUILD.buildObject(a[i][key]) : (a[i][key].match(/,/gi) ? BUILD.buildArray(a[i][key],true) : BUILD.buildArray(a[i][key],false));
                CONTROLLER.preSelectBidder(BIDDERS[b].code);
                if(b.match(/rubicon/i) && a[1][key].match(/accountId/i) && CONTROLLER.account == ""){
                    CONTROLLER.account = a[i][key];
                    Array.from(document.querySelectorAll('.rubicon-account-id')).forEach(function(el) {
                        el.innerHTML=a[i][key];
                    });
                }
            }
        } else {
            MESSAGE.printMessage(8, b);
        }
        return obj;
    },
    getSizes: function(obj,a,key,i) {
    	/*-----------------------------------------------------------------------*/
	    /*---------- Function called to create size array for pattern -----------*/
	    /*-----------------------------------------------------------------------*/
    	var sArr = a[i][key].match(/,/gi) ? BUILD.buildArray(a[i][key],true) : BUILD.buildArray(a[i][key],false), c = false;
        console.log(obj);
		if (a[1][key].match(/1024/gi)) {
			obj.sizes = sArr;
		} else if (!obj.hasOwnProperty("sizes")) {
			obj.sizes = sArr;
		}
		return obj;
    },
    getSlotPattern: function(obj,a,key,i) {
    	/*-----------------------------------------------------------------------*/
	    /*----------------- Function called to set slot pattern -----------------*/
	    /*-----------------------------------------------------------------------*/
    	obj.slotPattern = a[i][key];
    	return obj;
    },
    getMediaType: function() {
    	/*-----------------------------------------------------------------------*/
	    /*------------------ Function called to set media type ------------------*/
	    /*-----------------------------------------------------------------------*/
		obj.mediaType = "" + a[i][key];
		return obj;
    },
    getCode: function(obj,a,key,i) {
    	/*-----------------------------------------------------------------------*/
	    /*--------------------- Function called to set code ---------------------*/
	    /*-----------------------------------------------------------------------*/
    	obj.code = "" + a[i][key];
    	return obj;
    }
}