var INPUTS = {
	"s2sConfig" : {
		account : {
			name : "Account Id",
			required : true,
			code : "accountId",
			type : 0
		},
		bidder : {
			name : "Bidders",
			required : true,
			code : "bidders",
			type : 3
		},
		timeout : {
			name : "Timeout (ms)",
			required : true,
			code : "timeout",
			type : 1
		},
		adapter : {
			name : "Adapter",
			required : true,
			code : "adapter",
			type : 0
		},
		endpoint : {
			name : "Endpoint",
			required : true,
			code : "endpoint",
			type : 0
		},
		sync : {
			name : "Sync Enpoint",
			required : true,
			code : "syncEndpoint",
			type : 0
		},
		endpoint : {
			name : "Endpoint",
			required : true,
			code : "endpoint",
			type : 0
		},
		enabled : {
			name : "Enable S2S",
			required : false,
			code : "enabled",
			type : 2
		},
		vendor : {
			name : "Default Vendor",
			required : false,
			code : "defaultVendor",
			type : 0
		},
		cookie : {
			name : "Cookie Set",
			required : false,
			code : "cookieSet",
			type : 2
		},
		cookieurl : {
			name : "Cookie Set URL",
			required : false,
			code : "cookieSetUrl",
			type : 0
		}
	},
	"currency" : {
		adserver: {
			name : "Ad Server Currency",
			required : false,
			code : "adServerCurrency",
			type : 0
		},
		granularity: {
			name : "Multiplier",
			required : false,
			code : "granularityMultiplier",
			type : 1
		},
		conversionfile: {
			name : "Conversion Rate File",
			required : false,
			code : "conversionRateFile",
			type : 0
		},
		rate: {
			name : "Rates",
			required : false,
			code : "rates",
			type : 4
		},
		adserver: {
			name : "Ad Server Currency",
			required : false,
			code : "bidderCurrencyDefault",
			type : 4
		}
	},
	"userSync" : {
		syncenable : {
			name : "Enable Sync",
			required : false,
			code : "synceEnabled",
			type : 2
		},
		delay : {
			name : "Set Delay",
			required : false,
			code : "syncDelay",
			type : 1
		},
		override : {
			name : "Enable Override",
			required : false,
			code : "enableOverride",
			type : 2
		},
		syncperbid : {
			name : "Syncs Per Bidder",
			required : false,
			code : "syncsPerBidder",
			type : 1
		},
		filter : {
			name : "Filter Settings",
			required : false,
			code : "filterSettings",
			type : 4
		}
	},
	"bidderSequence" : {
		sequence : {
			name : "Bidder Order",
			required : false,
			code : "bidderSequence",
			type : 5,
			vals : ["","random","fixed"]
		}
	},
	"publisherDomain" : {
		pubdomain : {
			name : "Publisher Domain",
			required : false,
			code : "publisherDomain",
			type : 0
		}
	},
	"cookieSyncDelay" : {
		delay : {
			name : "Cookie Sync Delay",
			required : false,
			code : "cookieSyncDelay",
			type : 1
		}
	},
	"enableSendAllBids" : {
		sendall : {
			name : "Enable Send All Bids",
			required : false,
			code : "enableSendAllBids",
			type : 2
		}
	},
	"bidderTimeout" : {
		timeout : {
			name : "Bidder Timeout",
			required : false,
			code : "bidderTimeout",
			type : 1
		}
	}
}




