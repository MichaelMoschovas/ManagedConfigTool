var SETUP = {
	init: function(data,t) {
    	/*-----------------------------------------------------------------------*/
    	/*----- Function called to initialize events and run setup functions ----*/
    	/*-----------------------------------------------------------------------*/ 
    	//Setup inital click event trigger - this is reset for each download
    	CONTROLLER.event["click"] = document.createEvent('MouseEvents');
		CONTROLLER.event["click"].initMouseEvent('click',true,true,window, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
		//Setup inital on change event trigger
		CONTROLLER.event["change"] = document.createEvent('HTMLEvents');
		CONTROLLER.event["change"].initEvent("change", true, true);
		//Check browser compatibility
    	SETUP.checkBrowserCompatibility();
    	//Reset checkbox fields to false to override cache - specifically for Firefox
    	SETUP.resetCachedInputs();
    },
    checkBrowserCompatibility: function(){
    	/*-----------------------------------------------------------------------*/
    	/*------------ Function called to check browser compatibility -----------*/
    	/*-----------------------------------------------------------------------*/
    	var div = document.createElement('div');
		if( !('draggable' in div) && !('ondragstart' in div && 'ondrop' in div)){
			document.getElementById("#menu_item_drop-textdropable").style.display="none";
		}
		if(!'FormData' in window){

		}
		if(!'FileReader' in window){

		}
    },
    setupBidders: function(){
    	/*-----------------------------------------------------------------------*/
    	/*----------- Function called to setup bid adapter checkboxes -----------*/
    	/*-----------------------------------------------------------------------*/
		for(const key in BIDDERS){
			if(!document.getElementById("bid_"+BIDDERS[key].code+"BidAdapter")){
				var label = document.createElement("LABEL"), input = document.createElement("INPUT"),span = document.createElement("SPAN"), text = document.createTextNode(BIDDERS[key].name);
				label.className = "menu_item_select_bid-check";
				if(BIDDERS[key].state == "legacy" || BIDDERS[key].state == "stable") label.className += (" "+BIDDERS[key].state);
				input.type = "checkbox";
				input.id = "bid_"+BIDDERS[key].code+"BidAdapter";
				input.addEventListener("change", function(e) {
					CONTROLLER.logBids(e.target, BIDDERS[key].adapter+'BidAdapter',BIDDERS[key].code+"BidAdapter");
				});
				span.className = "checkmark";
				label.appendChild(text);
				label.appendChild(input);
				label.appendChild(span);
				document.getElementById("bid_contain").appendChild(label);
			}
		}
    },
    setupAnalytics: function() {
    	/*-----------------------------------------------------------------------*/
    	/*--------- Function called to setup analytic adapter checkboxes --------*/
    	/*-----------------------------------------------------------------------*/
     	for (const key in ANALYTICS) {
         	if (!document.getElementById("analytics_" + ANALYTICS[key].code)) {
            	var label = document.createElement("LABEL"),input = document.createElement("INPUT"),span = document.createElement("SPAN"),text = document.createTextNode(ANALYTICS[key].name);
	            label.className = "menu_item_select_analytics-check";
	            if(ANALYTICS[key].state == "legacy" || ANALYTICS[key].state == "stable") label.className += (" "+ANALYTICS[key].state);
	            input.type = "checkbox";
	            input.id = "analytics_" + ANALYTICS[key].display;
	            input.addEventListener("change", function(e) {
	                CONTROLLER.logAnalytics(e.target, ANALYTICS[key].code);
	            });
	            span.className = "checkmark";
	            label.appendChild(text);
	            label.appendChild(input);
	            label.appendChild(span);
	            document.getElementById("analytics_contain").appendChild(label);
         	}
     	}
 	},
 	setupModules: function() {
 		/*-----------------------------------------------------------------------*/
    	/*-------------- Function called to setup modules checkboxes ------------*/
    	/*-----------------------------------------------------------------------*/
     	for (const key in MODULES) {
         	if (!document.getElementById("modules_" + MODULES[key].code)) {
            	var label = document.createElement("LABEL"),input = document.createElement("INPUT"),span = document.createElement("SPAN"),text = document.createTextNode(MODULES[key].name);
	            label.className = "menu_item_select_analytics-check";
	            if(MODULES[key].state == "legacy" || MODULES[key].state == "stable") label.className += (" "+MODULES[key].state);
	            input.type = "checkbox";
	            input.id = "analytics_" + MODULES[key].code;
	            input.addEventListener("change", function(e) {
	                CONTROLLER.logAnalytics(e.target, MODULES[key].code);
	            });
	            span.className = "checkmark";
	            label.appendChild(text);
	            label.appendChild(input);
	            label.appendChild(span);
	            document.getElementById("modules_contain").appendChild(label);
         	}
     	}
 	},
 	resetCachedInputs: function(){
 		/*-----------------------------------------------------------------------*/
    	/*------------ Function called to reset all caches checkboxes -----------*/
    	/*-----------------------------------------------------------------------*/
    	var bidEls = document.getElementsByClassName("menu_item_select_bid-check"), modEls = document.getElementsByClassName("menu_item_select_modules-check"), analyticEls = document.getElementsByClassName("menu_item_select_analytics-check");
    	//Loop through all checkbox inputs and set checked to false
    	for(var i = 0; i < bidEls.length; i++){
    		bidEls[i].childNodes[1].checked=false;
    	}
    	for(var i = 0; i < modEls.length; i++){
    		modEls[i].childNodes[1].checked=false;
    	}
    	for(var i = 0; i < analyticEls.length; i++){
    		analyticEls[i].childNodes[1].checked=false;
    	}
    	//Granularity is set to medium by default
    	document.getElementById("gran-med").checked = true;
    },
    setCustomScrolls: function(){
    	/*-----------------------------------------------------------------------*/
    	/*-- Function called for form fields to determine whether of not arrow --*/
    	/*----------- should be displayed inidicating to a user that ------------*/ 
    	/*------------------- the containing div is scrollable ------------------*/
    	/*-----------------------------------------------------------------------*/
    	var b = document.getElementById("bid_contain"), a = document.getElementById("analytics_contain"),m = document.getElementById("modules_contain"), g = document.getElementById("granularity_contain"), bS = document.getElementById("bid_scroll"),aS = document.getElementById("analytics_scroll"),mS = document.getElementById("modules_scroll"),gS = document.getElementById("granularity_scroll");
    	b.scrollHeight > b.offsetHeight ? bS.style.display = "block" : bS.style.display = "none";
    	a.scrollHeight > a.offsetHeight ? aS.style.display = "block" : aS.style.display = "none";
    	m.scrollHeight > m.offsetHeight ? mS.style.display = "block" : mS.style.display = "none";
    	g.scrollHeight > g.offsetHeight ? gS.style.display = "block" : gS.style.display = "none";
    },
    setFormToggle: function(e){
    	/*-----------------------------------------------------------------------*/
    	/*------------------ Function called to toggle between ------------------*/
    	/*--------------- file upload view and customization view ---------------*/
    	/*-----------------------------------------------------------------------*/
    	var elFile = document.getElementById("mi_file"), elCustom = document.getElementById("mi_custom"),togFile = document.getElementById("toogle_file"),togCustom = document.getElementById("toogle_custom");
    	//Switch form view based on passed value
    	switch(e){
    		case "file":
    			CONTROLLER.view = 0;
    			//Run only if container classname does not exist
    			if(elFile.className.indexOf("selected")==-1){
    				elFile.className += " selected";
    				togFile.className += " tab";
    				elCustom.className = elCustom.className.replace(/ selected/g, "");
    				togCustom.className = togCustom.className.replace(/ tab/g, "");
    			}
    			break;
    		case "custom":
    			CONTROLLER.view = 1;
    			//Run only if container classname does not exist
    			if(elCustom.className.indexOf("selected")==-1){
    				elCustom.className += " selected";
    				togCustom.className += " tab";
    				elFile.className = elFile.className.replace(/ selected/g, "");
    				togFile.className = togFile.className.replace(/ tab/g, "");
    			}
    			SETUP.setCustomScrolls();
    			break;
    		default:
    			break;
    	}
    },
    setCustomToggle: function(e){
    	/*-----------------------------------------------------------------------*/
    	/*------- Function called to toggle between customization options -------*/
    	/*-----------------------------------------------------------------------*/
    	var elsSide = document.getElementsByClassName("menu_item_sidebar_option");
    	for(var i = 0; i < elsSide.length; i++){
    		if(elsSide[i].className.indexOf("selected")>-1&&elsSide[i].id!="sidebar_"+e){
    			elsSide[i].className = elsSide[i].className.replace(/ selected/g, "");
    			document.getElementById("select_"+(elsSide[i].id.split("_")[1])).className = document.getElementById("select_"+(elsSide[i].id.split("_")[1])).className.replace(/ selected/g, "");
    		}else if(elsSide[i].id=="sidebar_"+e){
    			elsSide[i].className += " selected";
    			document.getElementById("select_"+e).className += " selected";
    		}
    	}
    	SETUP.setCustomScrolls();
    },
    toggleVersion: function(e){
    	/*-----------------------------------------------------------------------*/
    	/*------- Function called to toggle between customization options -------*/
    	/*-----------------------------------------------------------------------*/
    	var elsL = document.getElementsByClassName("legacy"),elsS = document.getElementsByClassName("stable"), h, c;
    	
    	if(e.target.checked){
    		c = elsS;
    		h = elsL;
    	}else{
    		c = elsL;
    		h = elsS;
    	}
    	for(var i = 0; i < h.length; i++){
    		if(h[i].childNodes[1].checked){
    			h[i].childNodes[1].checked = false;
    			h[i].childNodes[1].dispatchEvent(CONTROLLER.event["change"]);
	    	}
    		h[i].style.display = "none";
    	}

    	for(var j = 0; j < c.length; j++){
    		c[j].style.display = "inline-block";
    	}

    	SETUP.setCustomScrolls();
    }
}