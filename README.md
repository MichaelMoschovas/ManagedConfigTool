# ManagedConfigTool

1. Launch index.html in your browser

2. Drag and drop (or select) a .csv, .xls, or .xlsx file containing desired bid mapping

3. Adapters should be preselected based on bidders passed
	* If no bidders detected in sheet and error will be displayed
	* If bid adapter cannot be determined, an error will be display asking to manually choose one 
		#NOTE: Bidders and corresponding adapaters have been pre-mapped out, so please check sheet for correct bidder name
	* If bidder is missing required paramters then an error will be displayed and slot pattern will not be added
	* If no slot patterns can be added, an error will be displayed

4. Select any analytic  adapters and modules necessary

5. Set granularity if not default ("medium") - can choose from "low", "medium", "high", "auto", "dense", or "custom" (requires buckets to be filled out)

6. Fill out any other optional configuration values as needed. NOTE: Prebid adapter and currency module each have their own required input fields that will only be available to be completed if either checkbox is selected

6. If download button is green, then form parameters have been met and file can be downloaded successfully. If not, selecting download will display the required inputs that have not yet been completed and navigate you to the first known issue.
