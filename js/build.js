var BUILD = {
    buildArray: function(arg) {
        var arr = [];

        if (arg.match(/,/gi)) {
            var argS = arg.split(",");
            for (var i = 0; i < argS.length; i++) {
                arr.push(BUILD.buildArray(argS[i]));
            }
        } else if (arg.match(/\d+x\d+/gi)) {
            var argS = arg.split("x");
            for (var i = 0; i < argS.length; i++) {
                arr.push(BUILD.buildArray(argS[i]));
            }
        } else {
            return (Number(arg)) ? Number(arg) : arg;
        }

        return arr;
    },
    buildBidObjects: function(a) {
        /*-----------------------------------------------------------------------*/
        /*------------ Function called to create each pattern object ------------*/
        /*------------- for each row in array excluding header rows -------------*/
        /*------------------ and store values in pattern object -----------------*/
        /*-----------------------------------------------------------------------*/
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
                        obj.slotPattern = a[i][key];
                    } else if (a[0][key] != "") {
                        //If value exists and top header for cell is not blank, construct new bidder
                        //object with parameter or add paramter to existing bidder object
                        obj = BUILD.getBidders(obj,a,key,i);
                    } else if (a[1][key].match(/Div.ID/gi)) {
                        //Add div id
                        obj.code = "" + a[i][key];
                    } else if (a[1][key].match(/Screen.Widths/gi)) {
                        //Add screen width array
                        var sArr = BUILD.buildArray(a[i][key]);

                        if (a[1][key].match(/1024/gi)) {
                            obj.sizes = sArr;
                        } else if (!obj.hasOwnProperty("sizes")) {
                            obj.sizes = sArr;
                        }

                    } else if (a[1][key].match(/Media/gi)) {
                        //Add media type value
                        obj.mediaType = "" + a[i][key];
                    }
                }
            }

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

            //Convert object to string and push to pattern array
            if (fail == 0) {
                CONTROLLER.patterns.push(STRINGS.objToString(obj));
                pass++;
            }
        }
        return (CONTROLLER.patterns.length > 0 && pass > 0) ? true : false;
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
                if (key == b.parameters[j]) m++;
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
        console.log(obj);

        var b = a[0][key].toLowerCase();
        if (BIDDERS.hasOwnProperty(b)) {
            if (!obj.hasOwnProperty("bids")) obj.bids = [];
            var c = false;
            for (var j = 0; j < obj.bids.length; j++) {
                if (obj.bids[j].hasOwnProperty("bidder") && obj.bids[j].bidder == BIDDERS[b].code) {
                    c = true;
                    obj.bids[j].params[a[1][key]] = BUILD.buildArray(a[i][key]);
                }
            }
            if (!c) {
                var temp = { bidder: BIDDERS[b].code, params: {} };
                obj.bids.push(temp);
                obj.bids[obj.bids.length - 1].params[a[1][key]] = BUILD.buildArray(a[i][key]);
                CONTROLLER.preSelectBidder(BIDDERS[b].code);
            }
        } else {
            MESSAGE.printMessage(8, b);
        }

        return obj;
    },
    getSizes: function() {

    },
    getSlotPattern: function() {

    },
    getMediaType: function() {

    }
}