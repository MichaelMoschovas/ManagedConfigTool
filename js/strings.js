var STRINGS = {
	arrToString : function(arr,f) {
    	/*-----------------------------------------------------------------------*/
    	/*-------- Function called to convert array to string for output --------*/
    	/*-----------------------------------------------------------------------*/
	    var str = '[',tab="";
	    for(var i = 0; i < f; i++){
	    	tab+="\t";
	    }
	    //Loop through array values
	    for (var v in arr) { 
	    	var s1 = "", s2 = "";

	    	if(v != arr.length-1)  s1 = ",";
	    	if(v != 0 && !str.match(/,$/)) s2 = ",";

	        if (Array.isArray(arr[v])) {
	        	//If value is an array, setup output with a return from passing 
	        	//array to array string constructor function
	        	str += s2 + STRINGS.arrToString(arr[v],f);
	        }else{
				var t = Number(arr[v]);
	        	if(typeof arr[v] == "object"){
	        		//If value is an object, setup output with a return from passing 
	        		//object to object string constructor function
	        		str += s2 + STRINGS.objToString(arr[v],f);
	        	}
	        	else{
	        		//Construct value as output string
		            isNaN(t) ? str += '"' + arr[v].toString() + '"' + s1  : str += arr[v].toString() + s1;
		        }
	        }
	    }
	    str+="]";
	    return str;
	},
	objToString : function(obj,f) {
    	/*-----------------------------------------------------------------------*/
    	/*-------- Function called to convert object to string for output -------*/
    	/*-----------------------------------------------------------------------*/
	    var str = '{\n',tab="",c=0;
	    for(var i = 0; i < f; i++){
	    	tab+="\t";
	    }
	    var len = Object.getOwnPropertyNames(obj).length;
	    //Loop through object properties
	    for (var p in obj) {
	    	c++;
	    	var s1 = "";
	        if (obj.hasOwnProperty(p)) {
	        	if(c != len)  s1 = ",";
	        	
	        	var t = Number(obj[p]);

	        	if( Array.isArray(obj[p])){
	        		//If value is an array, setup output with a return from passing 
	        		//array to array string constructor function
	        		str += tab + p + ':' + STRINGS.arrToString(obj[p],f+1) + s1 + '\n';
	        	}else if(typeof obj[p] == "object"){
	        		//If value is an object, setup output with a return from passing 
	        		//object to object string constructor function
	        		str += tab + p + ':' + STRINGS.objToString(obj[p],f+1) + '\n';
	        	}else if(!Number(obj[p])&&typeof obj[p] != "boolean"&&obj[p].match(/^\{.+:.+\}/gi)){
	        		str += tab + p + ':' + STRINGS.objToString(BUILD.buildObject(obj[p]),f+1) + '\n';
	        	}
	        	else{
		            //Construct value as output string
		            isNaN(t) ? str += tab + p + ': "' + obj[p].toString() + '"' + s1 + '\n' : str += tab+ p + ':' + obj[p].toString() + s1 + '\n';
		        }
	        }
	    }
	    str+=tab.replace("\t","")+"}";
	    return str;
	},
	sortArr: function (a,b) {
		/*-----------------------------------------------------------------------*/
    	/*------------ Function called to sort array alphanumerically -----------*/
    	/*-----------------------------------------------------------------------*/
		var reA = /[^a-zA-Z]/g,reN = /[^0-9]/g;
	    var aA = a.replace(reA, "");
	    var bA = b.replace(reA, "");
	    if(aA === bA) {
	        var aN = parseInt(a.replace(reN, ""), 10);
	        var bN = parseInt(b.replace(reN, ""), 10);
	        return aN === bN ? 0 : aN > bN ? 1 : -1;
	    } else {
	        return aA > bA ? 1 : -1;
	    }
	},
	sortArrAlpha: function (a,b) {
		/*-----------------------------------------------------------------------*/
    	/*------------- Function called to sort array alphabetically ------------*/
    	/*-----------------------------------------------------------------------*/
		var reN = /[0-9]/g;
	    var aA = a.replace(reN, "");
	    var bA = b.replace(reN, "");
	    
	    var aN = parseInt(a.replace(reN, ""), 10);
	    var bN = parseInt(b.replace(reN, ""), 10);
	    return aN === bN ? 0 : aN > bN ? 1 : -1;
	},
	sortArrNum: function (a,b) {
		/*-----------------------------------------------------------------------*/
    	/*-------------- Function called to sort array numerically --------------*/
    	/*-----------------------------------------------------------------------*/
		var reA = /[a-zA-Z]/gi;
	    var aA = a.replace(reA, "");
	    var bA = b.replace(reA, "");

	    return Number(aA) > Number(bA) ? 1 : -1;
	},
	customString: function(m,n){
    	/*-----------------------------------------------------------------------*/
    	/*------------- Function called to construct modules string -------------*/
    	/*-----------------------------------------------------------------------*/
    	//Loop through array and build string
    	var v = "";
    	for(var i = 0; i < n.length; i++){
    		if(n[i]!=v){
    			v = n[i];
	    		(m.length == 0) ? m += ('\t\t"'+ n[i]+'"') : m += (',\n\t\t"'+ n[i]+'"');
	    	}
    	}
    	return m;
    },
    addPadding : function(n, c){
	        var val = this.valueOf();
	        if ( Math.abs(n) <= val.length ) {
	                return val;
	        }
	        var m = Math.max((Math.abs(n) - this.length) || 0, 0);
	        var pad = Array(m + 1).join(String(c || ' ').charAt(0));
	//      var pad = String(c || ' ').charAt(0).repeat(Math.abs(n) - this.length);
	        return (n < 0) ? pad + val : val + pad;
	//      return (n < 0) ? val + pad : pad + val;
	}
}