# ManagedConfigTool

1. Launch index.html in your browser

2. Drag and drop or select a .csv, .xls, or .xlsx file containing desired bid mapping

3. Adapters should be preselected based on bidders passed
	* If no bidders detected in sheet and error will be displayed
	* If bid adapter cannot be determined, an error will be display asking to manually choose one 
		#NOTE: Bidders and corresponding adapaters have been pre-mapped out, so please check sheet for correct bidder name
	* If bidder is missing required paramters then an error will be displayed and slot pattern will not be added

4. Select any analytic  adapters and modules necessary

5. Set granularity if not default ("med") - can choose from "low", "med", "high", "auto", "dense", or "custom" (requires buckets to be filled out)

6. If download button is green, then form parameters have been met and file can be downloaded successfully
