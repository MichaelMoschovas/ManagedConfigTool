var VALIDATOR = {
	err : [],
	els : [],
    init: function() {
        if (VALIDATOR.file() && VALIDATOR.bids() && VALIDATOR.matchBids() && VALIDATOR.precision() && VALIDATOR.server(0)) {
        	VALIDATOR.reset();
            return "VALIDATED";
        } else {
        	VALIDATOR.reset();
            if (!VALIDATOR.file()) {VALIDATOR.err.push("File has not been uploaded");VALIDATOR.els.push([0,document.getElementById("toogle_file"),"file"]);}
            if (!VALIDATOR.bids()) {VALIDATOR.err.push("No BID Adapters have been included");VALIDATOR.els.push([1,document.getElementById("sidebar_bid"),"custom","bid"]);}
            if (!VALIDATOR.matchBids()) {VALIDATOR.els.push([1,document.getElementById("sidebar_bid"),"custom","bid"]);}
            if (!VALIDATOR.precision()) {VALIDATOR.err.push("Granularity values MUST be inputted into bucket fields. *NOTE: Increment and Maximum values MUST be greater than 0, and Maximum value MUST be greater than Minimum");VALIDATOR.els.push([1,document.getElementById("sidebar_precision"),"custom","precision"]);}
            if (!VALIDATOR.server(0)) VALIDATOR.server(1);
            return ([VALIDATOR.err,VALIDATOR.els]);
        }
    },
    reset:function(){
    	while(VALIDATOR.err.length>0){
	    	VALIDATOR.err.pop();
	    }
	    while(VALIDATOR.els.length>0){
	    	VALIDATOR.els.pop();
	    }
    },
    file: function() {
        return (CONTROLLER.file && CONTROLLER.file != "" && CONTROLLER.passQA && CONTROLLER.patterns.length > 0) ? true : false;
    },
    bids: function() {
        return (CONTROLLER.bids.length > 0) ? true : false;
    },
    matchBids: function() {
    	var r = true;
        for(var i = 0; i < CONTROLLER.bidders.length; i++){
        	var bid = CONTROLLER.bidders[i];
        	var a = BIDDERS[bid.toLowerCase()].adapter + "BidAdapter", c = false;

        	for(var j = 0; j < CONTROLLER.bids.length; j++){
        		if(a == CONTROLLER.bids[j]) c = true;
        	}
        	if(!c) {
        		VALIDATOR.err.push("Adapter missing for the following bidder defined in the spreadsheet: " + CONTROLLER.bidders[i] + ". Please include the "+a.replace(/BidAdapter/i,"").toUpperCase()+" Bid Adapter.");
        		r = false;
        	}
        }
        return (r) ? true : false;
    },
    precision: function() {
        if (typeof CONTROLLER.precision.value == "object") {
            if (CONTROLLER.precision.value.hasOwnProperty("buckets") && VALIDATOR.buckets()) {
                return true;
            } else {
                return false;
            }
        } else {
            return true;
        }
    },
    buckets: function() {
        /*-----------------------------------------------------------------------*/
        /*--------- Function called to determine if custom granularity ----------*/
        /*--------------------- fields have been completed ----------------------*/
        /*-----------------------------------------------------------------------*/
        var c = true;

        if (CONTROLLER.precision.value.buckets.length == 0) return false;

        for (var i = 0; i < CONTROLLER.precision.value.buckets.length; i++) {
            for (var key in CONTROLLER.precision.value.buckets[i]) {
                if (CONTROLLER.precision.value.buckets[i][key][0].length == 0) return false;
                for (var j = 0; j < CONTROLLER.precision.value.buckets[i][key][0].length; j++) {
                    if (CONTROLLER.precision.value.buckets[i][key][0][j] == "" || CONTROLLER.precision.value.buckets[i][key][0][j] == null) c = false
                }
                if (CONTROLLER.precision.value.buckets[i][key][0][2] <= 0 || CONTROLLER.precision.value.buckets[i][key][0][3] <= 0 || CONTROLLER.precision.value.buckets[i][key][0][2] <= CONTROLLER.precision.value.buckets[i][key][0][1]) c = false
            }
        }
        return c;
    },
    server: function(v) {
    	var c = true;

        if (!CONTROLLER.prebidserver) {
            return true;
        } else if(CONTROLLER.other.length == 0){
        	if(v==1) {
        		VALIDATOR.err.push("Prebid Server was selected but required fields have not been completed");
        		VALIDATOR.els.push([2,document.getElementsByClassName("s2sConfig"),"custom","other"]);
        	}
        	return false;
        }else {
            for (var i = 0; i < CONTROLLER.other.length; i++) {

                if (CONTROLLER.other[i].hasOwnProperty("s2sConfig")) {
                    for (var j = 0; j < CONTROLLER.other[i]["s2sConfig"].bidders.length; j++) {
                        if (!BIDDERS.hasOwnProperty(CONTROLLER.other[i]["s2sConfig"].bidders[j].toLowerCase())) {
                        	if(v==1) VALIDATOR.err.push("Prebid Server defined Bidder " + CONTROLLER.other[i]["s2sConfig"].bidders[j] + " does not exist in spreadsheet. Please check the input field for errors.");
                        	c = false;
                        	VALIDATOR.els.push([1,document.getElementById("s2sConfig-bidders"),"custom","other"]);
                        }
                    }
                    if(!c) return false;
                }else{
                	if(v==1) {
                		VALIDATOR.err.push("Prebid Server was selected but required fields have not been completed");
                		VALIDATOR.els.push([2,document.getElementsByClassName("s2sConfig"),"custom","other"]);
                	}
                    return false;
                }
            }
            return true;
        }
    }
}