var OUTPUT = {
	export:'module.exports = { \n {EXPORTS} \n}};',
	version: '"version": "{VERSION}",\n',
	modules:'"modules": [\n {MODULES} ],',
	que:'\n"que": function() {\nrequire("../lib/hpbv2.js")(pbjs);\npbjs.rp.addAdunitPatterns([\n {PATTERNS} ]);\n',
	custom : 'const customConfigObject = { {CUSTOM} };\n',
	config:'pbjs.setConfig({\n {CONFIG} \n});',
	granularity: 'priceGranularity: {GRANULARITY}',
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
		OUTPUT.version = OUTPUT.version.replace(/{VERSION}/gi,v);
	},
	setMods : function(obj){
		var m = OUTPUT.buildModItems();
		OUTPUT.modules = OUTPUT.modules.replace(/{MODULES}/gi,m );
	},
	buildModItems: function(){
		var modV = '';

		if (CONTROLLER.bids.length > 0) modV = STRINGS.customString(modV, CONTROLLER.bids.sort(STRINGS.sortArrAlpha));
	    if (CONTROLLER.analytics.length > 0) modV = STRINGS.customString(modV, CONTROLLER.analytics.sort(STRINGS.sortArrAlpha));
	    if (CONTROLLER.modules.length > 0) modV = STRINGS.customString(modV, CONTROLLER.modules.sort(STRINGS.sortArrAlpha));

	    return modV;
	},
	setQue : function(){
		OUTPUT.que = OUTPUT.que.replace(/{PATTERNS}/gi,CONTROLLER.patterns);
	},
	setConfig : function(obj){
		OUTPUT.config = OUTPUT.config.replace(/{CONFIG}/gi,''+ OUTPUT.getGranularity());
	},
	setGranularity: function(){
		//Construct precision based on value type
    	if(typeof CONTROLLER.precision.value != "object"){
    		OUTPUT.removeCustom();
    		OUTPUT.granularity = OUTPUT.granularity.replace(/{GRANULARITY}/gi,'"'+CONTROLLER.precision.value)+'"';
    	}else{
    		//If value type object, create const object for granularity buckets
    		OUTPUT.setCustom();
    		OUTPUT.granularity = OUTPUT.granularity.replace(/{GRANULARITY}/gi,'customConfigObject');
    	}
	},
	getGranularity: function(){
		return OUTPUT.granularity;
	},
	setCustom: function(){
		OUTPUT.custom = OUTPUT.custom.replace(/{CUSTOM}/gi,CONTROLLER.getBuckets());
	},
	removeCustom: function(){
		OUTPUT.custom = '';
	},
	setExport:function(){
		OUTPUT.export = OUTPUT.export.replace(/{EXPORTS}/gi,OUTPUT.combine());
	},
	combine:function(){
		return (OUTPUT.version+OUTPUT.modules+OUTPUT.que+OUTPUT.custom+OUTPUT.config);
	},
	reset: function(){
		var p = OUTPUT;
		p.exportOpen ='module.exports = { \n {EXPORTS} \n}};';
		p.version = '"version": "{VERSION}",\n';
		p.modules ='"modules": [\n {MODULES} ],';
		p.que ='\n"que": function() {\nrequire("../lib/hpbv2.js")(pbjs);\npbjs.rp.addAdunitPatterns([\n {PATTERNS} ]);\n';
		p.custom = 'const customConfigObject = { {CUSTOM} };\n';
		p.config ='pbjs.setConfig({\n {CONFIG} \n});';
		p.granularity = 'priceGranularity: {GRANULARITY};'
	}
}