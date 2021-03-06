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
	            input.id = "analytics_" + ANALYTICS[key].code;
	            input.addEventListener("change", function(e) {
	                CONTROLLER.logAnalytics(e.target,ANALYTICS[key].code);
	            });
	            span.className = "checkmark";
	            label.appendChild(text);
	            label.appendChild(input);
	            label.appendChild(span);
	            document.getElementById("analytics_contain").appendChild(label);
                SETUP.createAnalyticsCustomInput(key, ANALYTICS[key].code, ANALYTICS[key].display);
         	}
     	}
 	},
    createAnalyticsCustomInput: function(k,c,d){
        var a = document.getElementById("other_contain"), div = document.createElement("DIV"), title = document.createElement("DIV");
        div.className = "menu_item_select_other-custom other_options special_input hidden";
        div.id= k;
        title.innerHTML = d.toUpperCase() + " (required for selected analytics adapter)";
        title.className = "menu_item_select_other-custom-section-title";
        div.appendChild(title);
        a.appendChild(div);
    },
 	setupModules: function() {
 		/*-----------------------------------------------------------------------*/
    	/*-------------- Function called to setup modules checkboxes ------------*/
    	/*-----------------------------------------------------------------------*/
     	for (const key in MODULES) {
         	if (!document.getElementById("modules_" + MODULES[key].code)) {
            	var label = document.createElement("LABEL"),input = document.createElement("INPUT"),span = document.createElement("SPAN"),text = document.createTextNode(MODULES[key].name);
	            label.className = "menu_item_select_modules-check";
	            if(MODULES[key].state == "legacy" || MODULES[key].state == "stable") label.className += (" "+MODULES[key].state);
	            input.type = "checkbox";
	            input.id = "modules_" + MODULES[key].code;
	            input.addEventListener("change", function(e) {
	                CONTROLLER.logModules(e.target, MODULES[key].code);
	            });
	            span.className = "checkmark";
	            label.appendChild(text);
	            label.appendChild(input);
	            label.appendChild(span);
	            document.getElementById("modules_contain").appendChild(label);
         	}
     	}
 	},
    toggleDropdown: function(e){
        /*-----------------------------------------------------------------------*/
        /*------------ Function called to toggle custom select element ----------*/
        /*-----------------------------------------------------------------------*/
        var el = e.childNodes[1];
        if(el.className.match(/hidden/i)){
            el.className = el.className.replace(/ hidden/i,"");
            el.parentNode.className += " focus";
        }else{
            el.className += " hidden";
            el.parentNode.className = el.parentNode.className.replace(/ focus/i,"");
        }
    },
    closeAllDropdowns: function(e){
        /*-----------------------------------------------------------------------*/
        /*---------- Function called to close all custom select elements --------*/
        /*-----------------------------------------------------------------------*/
        if(!e.target.className.match(/dropinput/)&&!e.target.nodeName.match(/select/i)){
            Array.from(document.querySelectorAll('.dropdown-menu')).forEach(function(el) {
                if(!el.className.match(/hidden/)){
                    el.className += " hidden";
                    el.parentNode.className = el.parentNode.className.replace(/ focus/i,"");
                }
            });
        }
    },
    createDropdownItem: function(key, code, vals, r){
        /*-----------------------------------------------------------------------*/
        /*------ Function called to create and return custom select element -----*/
        /*-----------------------------------------------------------------------*/
        var s = document.createElement("SELECT"), c = document.createElement("DIV"), d = document.createElement("DIV"), t = document.createElement("DIV"),l = document.createElement("LABEL");
        c.className = "menu_item_select_other-custom-contain-dropinput";
        t.className = "dropinput-value";
        t.innerHTML = "&nbsp;";
        c.addEventListener("click", function(event){
            if(event.target.className.match(/dropinput/)){
                SETUP.toggleDropdown(event.target);
            }
        });
        d.className = "dropdown-menu hidden";
        s.id = key + "-" + code;
        s.className = (r) ? key+"_required" : key+"_optional";
        s.addEventListener("change", function(event){
            CONTROLLER["logCustom"](event,key);
        });
        for(var i = 0; i < vals.length; i++){
            var o = document.createElement("OPTION"), v = document.createElement("DIV");
            v.innerHTML = vals[i].toUpperCase();
            v.setAttribute("data-value", vals[i]);
            v.className = "options";
            o.value =  vals[i];
            o.innerHTML = vals[i].toUpperCase();
            s.appendChild(o);
            d.appendChild(v);
            v.addEventListener("click", function(event){
                var el = event.target;
                el.parentNode.previousSibling.innerHTML = (el.getAttribute('data-value')!="" ? el.getAttribute('data-value').toUpperCase() : "&nbsp;");
                el.parentNode.parentNode.previousSibling.value = el.getAttribute('data-value');
                el.parentNode.parentNode.previousSibling.dispatchEvent(CONTROLLER.event["change"]);
                SETUP.closeAllDropdowns(event);
            });
        }
        c.appendChild(t);
        c.appendChild(d);
        l.className = "menu_item_select_other-select";
        l.appendChild(s);
        l.appendChild(c);

        return l;
    },
    createCheckboxItem: function(key,code,r){
        /*-----------------------------------------------------------------------*/
        /*-------- Function called to create and return checkbox element --------*/
        /*-----------------------------------------------------------------------*/
        var i = document.createElement("INPUT"), v = document.createElement("SPAN"),s = document.createElement("SPAN"),l = document.createElement("LABEL");
        i.id = key + "-" + code;
        i.type = "checkbox";
        i.className = (r) ? key+"_required" : key+"_optional";
        v.className = "switch_value other";
        s.className = "switch_slider other";
        i.addEventListener("change", function(event){
            CONTROLLER["logCustom"](event,key);
        });
        l.className = "menu_item_select_other-switch";
        l.appendChild(i);
        l.appendChild(v);
        l.appendChild(s);

        return l;
    },
    createInputItem: function(key,code,type,r){
        /*-----------------------------------------------------------------------*/
        /*---------- Function called to create and return input element ---------*/
        /*-----------------------------------------------------------------------*/
        var i = document.createElement("INPUT"), v = document.createElement("SPAN"),s = document.createElement("SPAN"),l = document.createElement("LABEL");
        i.id = key + "-" + code;
        i.type = (type==1) ? "number":"text";
        i.className = (r) ? ((type == 3) ? "array " + key+"_required" : ((type == 4) ? "object " + key+"_required" : key+"_required")) : ((type == 3) ? "array " + key+"_optional" : ((type == 4) ? "object " + key+"_optional" : key+"_optional"));
        if(type == 1){
            i.addEventListener("keypress", function(event) {
                if(event.charCode < 48 || event.charCode > 57) event.preventDefault();
            });
        }
        i.addEventListener("keyup", function(event){
            CONTROLLER["logCustom"](event,key);
        });
        l.className = "menu_item_select_other-input";
        l.appendChild(i);

        return l;
    },
    createAnalyticInput: function(key,code,type,r){
        /*-----------------------------------------------------------------------*/
        /*---------- Function called to create and return input element ---------*/
        /*-----------------------------------------------------------------------*/
        var i = (type == 2) ? document.createElement("SPAN") : document.createElement("INPUT"), v = document.createElement("SPAN"), s = document.createElement("SPAN"),l = document.createElement("LABEL");
        i.id = key + "-" + code;

        if(code.match(/provide/i)){ 
            i.setAttribute("readonly",true);
            i.value = ANALYTICINPUTS[key].title;
        }
        
           i.type = (type==1) ? "number":"text";
           i.className = (r) ? ((type == 3) ? "array " + key+"_required" : ((type == 4) ? "object " + key+"_required" : key+"_required")) : ((type == 3) ? "array " + key+"_optional" : ((type == 4) ? "object " + key+"_optional" : key+"_optional"));
            if(type == 1){
                i.addEventListener("keypress", function(event) {
                    if(event.charCode < 48 || event.charCode > 57) event.preventDefault();
                });
            }
            i.addEventListener("keyup", function(event){
                CONTROLLER["logAnalyticElement"](event,key);
            });
        

        l.className = "menu_item_select_other-input";
        l.appendChild(i);

        return l;
    },
    setupCutomInputs: function(){
        /*-----------------------------------------------------------------------*/
        /*------------- Function called to setup custom input fields ------------*/
        /*-----------------------------------------------------------------------*/
        for (const key in INPUTS) {
            var el = document.getElementById(key),c = 0;
            for(const attr in INPUTS[key]){
                var container = document.createElement("DIV"), title = document.createElement("SPAN"), label;
                container.className = "menu_item_select_other-custom-contain-input "+key;
                title.className = "menu_item_select_other-custom-title";
                title.innerHTML = INPUTS[key][attr].name; 
                if(INPUTS[key][attr].type == 5){
                    label = SETUP.createDropdownItem(key,INPUTS[key][attr].code,INPUTS[key][attr].vals,INPUTS[key][attr].required);
                }
                else if(INPUTS[key][attr].type == 2){
                    label = SETUP.createCheckboxItem(key,INPUTS[key][attr].code,INPUTS[key][attr].required);
                }else{
                    label = SETUP.createInputItem(key,INPUTS[key][attr].code,INPUTS[key][attr].type, INPUTS[key][attr].required);
                }

                container.appendChild(title);
                container.appendChild(label);

                if(INPUTS[key][attr].required){
                    el.appendChild(container);
                }else{
                    if(c == 0){
                        var o = document.createElement("DIV"), ot = document.createElement("DIV");
                        o.className = "menu_item_select_other-custom-optional";
                        o.id = key + "-optional";
                        ot.className = "menu_item_select_other-custom-section-title";
                        ot.innerHTML = "OPTIONAL";
                        o.appendChild(ot);
                        el.appendChild(o);
                        c++;
                    }
                    document.getElementById(key + "-optional").appendChild(container);
                }
            }
        }
        document.addEventListener("click",SETUP.closeAllDropdowns);
    },
    setupAnalyticInputs: function(){
        /*-----------------------------------------------------------------------*/
        /*-------- Function called to setup analytic adapter input fields -------*/
        /*-----------------------------------------------------------------------*/
        for (const key in ANALYTICINPUTS) {
            var el = document.getElementById(key),c = 0;
            for(const attr in ANALYTICINPUTS[key]){
                if(attr!="title"){
                    var container = document.createElement("DIV"), title = document.createElement("SPAN"), label;
                    container.className = "menu_item_select_other-custom-contain-input "+key;
                    title.className = "menu_item_select_other-custom-title";
                    title.innerHTML = ANALYTICINPUTS[key][attr].name; 
                    if(ANALYTICINPUTS[key][attr].type == 5){
                        label = SETUP.createDropdownItem(key,ANALYTICINPUTS[key][attr].code,ANALYTICINPUTS[key][attr].vals,ANALYTICINPUTS[key][attr].required);
                    }
                    else if(ANALYTICINPUTS[key][attr].type == 2){
                        label = SETUP.createCheckboxItem(key,ANALYTICINPUTS[key][attr].code,ANALYTICINPUTS[key][attr].required);
                    }else{
                        label = SETUP.createInputItem(key,ANALYTICINPUTS[key][attr].code,ANALYTICINPUTS[key][attr].type, ANALYTICINPUTS[key][attr].required);
                    }

                    label = SETUP.createAnalyticInput(key,ANALYTICINPUTS[key][attr].code,ANALYTICINPUTS[key][attr].type, ANALYTICINPUTS[key][attr].required);

                    container.appendChild(title);
                    container.appendChild(label);

                    if(ANALYTICINPUTS[key][attr].code.match(/provider/i)) container.style="display:none;";

                    if(ANALYTICINPUTS[key][attr].required){
                        el.appendChild(container);
                    }else{
                        if(c == 0){
                            var o = document.createElement("DIV"), ot = document.createElement("DIV");
                            o.className = "menu_item_select_other-custom-optional";
                            o.id = key + "-optional";
                            ot.className = "menu_item_select_other-custom-section-title";
                            ot.innerHTML = "OPTIONAL";
                            o.appendChild(ot);
                            el.appendChild(o);
                            c++;
                        }
                        document.getElementById(key + "-optional").appendChild(container);
                    }
                }
            }
        }
    },
 	resetCachedInputs: function(){
 		/*-----------------------------------------------------------------------*/
    	/*------------ Function called to reset all caches checkboxes -----------*/
    	/*-----------------------------------------------------------------------*/
    	//Loop through all checkbox inputs and set checked to false
        Array.from(document.querySelectorAll('.menu_item_select_bid-check')).forEach(function(el) {
            el.childNodes[1].checked=false;
        });
        Array.from(document.querySelectorAll('.menu_item_select_modules-check')).forEach(function(el) {
            el.childNodes[1].checked=false;
        });
        Array.from(document.querySelectorAll('.menu_item_select_analytics-check')).forEach(function(el) {
            el.childNodes[1].checked=false;
        });
    	//Granularity is set to medium by default
    	document.getElementById("gran-medium").checked = true;
    },
    setCustomScrolls: function(){
    	/*-----------------------------------------------------------------------*/
    	/*-- Function called for form fields to determine whether of not arrow --*/
    	/*----------- should be displayed inidicating to a user that ------------*/ 
    	/*------------------- the containing div is scrollable ------------------*/
    	/*-----------------------------------------------------------------------*/
    	var b = document.getElementById("bid_contain"), a = document.getElementById("analytics_contain"),m = document.getElementById("modules_contain"), g = document.getElementById("granularity_contain"),o = document.getElementById("other_contain"), bS = document.getElementById("bid_scroll"),aS = document.getElementById("analytics_scroll"),mS = document.getElementById("modules_scroll"),gS = document.getElementById("granularity_scroll"),oS = document.getElementById("other_scroll");
    	b.scrollHeight > b.offsetHeight ? bS.style.display = "block" : bS.style.display = "none";
    	a.scrollHeight > a.offsetHeight ? aS.style.display = "block" : aS.style.display = "none";
    	m.scrollHeight > m.offsetHeight ? mS.style.display = "block" : mS.style.display = "none";
    	g.scrollHeight > g.offsetHeight ? gS.style.display = "block" : gS.style.display = "none";
        o.scrollHeight > o.offsetHeight ? oS.style.display = "block" : oS.style.display = "none";
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
        Array.from(document.querySelectorAll('.menu_item_sidebar_option')).forEach(function(el) {
            if(el.className.indexOf("selected")>-1&&el.id!="sidebar_"+e){
                el.className = el.className.replace(/ selected/g, "");
                document.getElementById("select_"+(el.id.split("_")[1])).className = document.getElementById("select_"+(el.id.split("_")[1])).className.replace(/ selected/g, "");
            }else if(el.id=="sidebar_"+e){
                el.className += " selected";
                document.getElementById("select_"+e).className += " selected";
            }
        });
    	
    	SETUP.setCustomScrolls();
    },
    toggleVersion: function(e){
    	/*-----------------------------------------------------------------------*/
    	/*------- Function called to toggle between customization options -------*/
    	/*-----------------------------------------------------------------------*/
        if(e.target.checked){
            c = "stable";
            h = "legacy";
        }else{
            c = "legacy";
            h = "stable";
        }

        Array.from(document.querySelectorAll('.'+h)).forEach(function(el) {
            if(el.childNodes[1].checked){
                el.childNodes[1].checked = false;
                el.childNodes[1].dispatchEvent(CONTROLLER.event["change"]);
            }
            el.style.display = "none";
        });
        Array.from(document.querySelectorAll('.'+c)).forEach(function(el) {
            el.style.display = "inline-block";
        });

    	SETUP.setCustomScrolls();
    },
    toggleOptions: function(e){
        /*-----------------------------------------------------------------------*/
        /*---------- Function called to toggle between optional inputs ----------*/
        /*-----------------------------------------------------------------------*/
        var el = document.getElementById(e.target.id.replace(/toggle-/i,""));
        if(el.className.match(/hidden/)){
            el.className = el.className.replace(/ hidden/gi,"");
            e.target.className += " expanded";
        }else{
            el.className += " hidden";
            e.target.className = e.target.className.replace(/ expanded/gi,"");
        }
    }
}







