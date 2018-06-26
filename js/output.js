var OUTPUT = {
	export:'module.exports = {  {EXPORTS} }};',
	version: '"version": "{VERSION}",',
	modules:'"modules": [ {MODULES} ],',
	que:'"que": function() {require("../lib/hpbv2.js")(pbjs);pbjs.rp.addAdunitPatterns([ {PATTERNS} ]);',
	//que:'\n"que": function() {\nvar adUnits = [\n {PATTERNS} ];\n',
	custom : 'const customConfigObject = { {CUSTOM} };',
	config:'pbjs.setConfig({ {CONFIG} });',
	granularity: 'priceGranularity: {GRANULARITY}',
	buckets : '"buckets": [ {BUCKETS} ]',
	init: function(){
	    /*-----------------------------------------------------------------------*/
	    /*------- Function called to construct an exportable string format ------*/
	    /*------- using any and module values, patterns, granularity, etc. ------*/
	    /*-----------------------------------------------------------------------*/
 		OUTPUT.reset();
	    OUTPUT.setVersion();
	    OUTPUT.setMods();
	    OUTPUT.setQue();
	    OUTPUT.setGranularity();
	    OUTPUT.setConfig();
	    OUTPUT.setExport();

	    return (OUTPUT.export);
	},
	setVersion : function(){
		var v = document.getElementById("version-value").checked ? "stable-1-x" : "0-34-x";
		OUTPUT.version = OUTPUT.version.replace(/\{VERSION\}/gi,v);
	},
	setMods : function(obj){
		var m = OUTPUT.buildModItems();
		console.log(m);
		OUTPUT.modules = OUTPUT.modules.replace(/\{MODULES\}/gi,m );
		console.log(OUTPUT.modules);
	},
	buildModItems: function(){
		var modV = '';
		if (CONTROLLER.bids.length > 0) modV += STRINGS.customString(modV, CONTROLLER.bids.sort(STRINGS.sortArrAlpha));
	    if (CONTROLLER.analytics.length > 0) modV += STRINGS.customString(modV, CONTROLLER.analytics.sort(STRINGS.sortArrAlpha));
	    if (CONTROLLER.modules.length > 0) modV += STRINGS.customString(modV, CONTROLLER.modules.sort(STRINGS.sortArrAlpha));

	    return modV;
	},
	setQue : function(){
		OUTPUT.que = OUTPUT.que.replace(/\{PATTERNS\}/gi,CONTROLLER.patterns);
	},
	setConfig : function(obj){
		var c = OUTPUT.getGranularity()+OUTPUT.getOther();
		OUTPUT.config = OUTPUT.config.replace(/\{CONFIG\}/gi,''+ c);
		console.log(OUTPUT.config);
	},
	setGranularity: function(){
		//Construct precision based on value type
    	if(typeof CONTROLLER.precision.value != "object"){
    		OUTPUT.removeCustom();
    		OUTPUT.granularity = OUTPUT.granularity.replace(/\{GRANULARITY\}/gi,'"'+CONTROLLER.precision.value)+'"';
    	}else{
    		//If value type object, create const object for granularity buckets
    		OUTPUT.setCustom();
    		OUTPUT.granularity = OUTPUT.granularity.replace(/\{GRANULARITY\}/gi,'customConfigObject');
    	}
	},
	getGranularity: function(){
		return OUTPUT.granularity;
	},
	getOther: function(){
		var str = "";
		if(CONTROLLER.other.length > 0){
			for(var i =0; i < CONTROLLER.other.length; i++){
				str += ",\n"+CONTROLLER.other[i][0] + ": " + CONTROLLER.other[i][1];
			}
		}
		return str;
	},
	getBuckets: function(){
    	/*-----------------------------------------------------------------------*/
    	/*-- Function called to construct granularity buckets object as string --*/
    	/*-----------------------------------------------------------------------*/
    	var str = "";

    	//Loop through buckets and add each bucket to granularity string
    	//Each bucket includes precision, min, max, and increment
    	for(var i =0; i < CONTROLLER.precision.value.buckets.length; i++){
    		str+="\n{\n";
    		for(var key in CONTROLLER.precision.value.buckets[i]){
	    		for(var j =0; j < CONTROLLER.precision.value.buckets[i][key][0].length; j++){
		    		switch(j){
		    			case 0:
		    				str += '"precision" : '+CONTROLLER.precision.value.buckets[i][key][0][j]+',\n';
		    				break;
		    			case 1:
		    				str += '"min" : '+CONTROLLER.precision.value.buckets[i][key][0][j]+',\n';
		    				break;
		    			case 2:
		    				str += '"max" : '+CONTROLLER.precision.value.buckets[i][key][0][j]+',\n';
		    				break;
		    			case 3:
		    				str += '"increment" : '+CONTROLLER.precision.value.buckets[i][key][0][j];
		    				break;
		    			default:
		    				break;
		    		}
		    	}
		    	
		    }
	    	str+="\n}\n";
    	}
    	
    	OUTPUT.buckets = OUTPUT.buckets.replace(/\{BUCKETS\}/gi,str);
    	return OUTPUT.buckets;
    },
	setCustom: function(){
		OUTPUT.custom = OUTPUT.custom.replace(/\{CUSTOM\}/gi,OUTPUT.getBuckets());
	},
	removeCustom: function(){
		OUTPUT.custom = '';
	},
	setExport:function(){
		OUTPUT.export = OUTPUT.export.replace(/\{EXPORTS\}/gi,OUTPUT.combine());
	},
	combine:function(){
		return (OUTPUT.version+OUTPUT.modules+OUTPUT.que+OUTPUT.custom+OUTPUT.config);
	},
	reset: function(){
		var p = OUTPUT;
		p.export ='module.exports = {\n {EXPORTS} \n\t}\n};';
		p.version = '\n\t"version": "{VERSION}",\n';
		p.modules ='\t"modules": [\n {MODULES} \t],';
		p.que ='\n\t"que": function() {\n\t\trequire("../lib/hpbv2.js")(pbjs);\n\t\tpbjs.rp.addAdunitPatterns([ {PATTERNS} \t\t]);\n';
		//p.que ='\n"que": function() {\nvar adUnits = [\n {PATTERNS} ];\n';
		p.custom = '\t\tconst customConfigObject = { {CUSTOM} \t\t};\n';
		p.config ='\t\tpbjs.setConfig({\n {CONFIG} \n\t\t});';
		p.granularity = '\t\t\tpriceGranularity: {GRANULARITY}'
	}
}