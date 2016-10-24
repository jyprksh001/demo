require("nodejs-dashboard");
var jsdom=require('jsdom');
url='https://www.nseindia.com/products/dynaContent/equities/indices/historicalindices.jsp?indexType=NIFTY%20NEXT%2050&fromDate=01-09-2016&toDate=30-09-2016'
jsdom.env(url,["http://code.jquery.com/jquery.js"],function(err,window){
	var el=window.$('tbody tr:gt(2):lt(-1)').each(function(){
		//console.log(window.$(this).text())
		var date=window.$(this).find('.date nobr').html();
		console.log(date)
		var numbers=[]
		window.$(this).find('td:gt(0)').each(function(){
			data=window.$(this).text().trim()
			numbers.push(data)
		})
		open=numbers[0]
		high=numbers[1]
		low=numbers[2]
		close=numbers[3]
		shares_traded=numbers[4]
		turnover=numbers[5]		
	})

})

// 'https://www.nseindia.com/products/dynaContent/equities/indices/historicalindices.jsp?indexType=NIFTY%20NEXT%2050&fromDate=01-09-2016&toDate=31-09-2016'
// 'https://www.nseindia.com/products/dynaContent/equities/indices/historicalindices.jsp?indexType=NIFTY%20NEXT%2050&fromDate=01-09-1992&toDate=31-09-1992'
// 'https://www.nseindia.com/products/dynaContent/equities/indices/historicalindices.jsp?indexType=NIFTY%20NEXT%2050&fromDate=01-09-2016&toDate=30-09-2016'