//node_modules
var jsdom=require('jsdom');
var request=require('request');
var async=require("async");
var dbTest=require('./dbTest');
var Scrip=require("./models/bseScripsModel");

var base_url="http://www.bseindia.com/markets/equity/EQReports/StockPrcHistori.aspx?expandable=7&flag=0"
//global_varaiables
var myDestination='#';


jsdom.env(base_url,["http://code.jquery.com/jquery.js"],function(err,window){
			var $=window.$
			var __VIEWSTATE=$('#__VIEWSTATE').attr('value');
			var __VIEWSTATEGENERATOR=$('#__VIEWSTATEGENERATOR').attr('value');
			var __EVENTVALIDATION=$('#__EVENTVALIDATION').attr('value');
			var WINDOW_NAMER=$('input[name="WINDOW_NAMER"]').attr('value')
			var ctl00$ContentPlaceHolder1$hidDMY=$('input[name="ctl00$ContentPlaceHolder1$hidDMY"]').attr('value');
			var ctl00$ContentPlaceHolder1$hdflag=$('input[name="ctl00$ContentPlaceHolder1$hdflag"]').attr('value');
			var ctl00$ContentPlaceHolder1$hidCurrentDate=$('input[name="ctl00$ContentPlaceHolder1$hidCurrentDate"]').attr('value');
			var ctl00$ContentPlaceHolder1$search=$('input[name="ctl00$ContentPlaceHolder1$search"]:checked').attr('value');
			var ctl00$ContentPlaceHolder1$DMY=$('input[name="ctl00$ContentPlaceHolder1$DMY"]:checked').attr('value');
			
			var data={
				__VIEWSTATE:__VIEWSTATE,
				__VIEWSTATEGENERATOR:__VIEWSTATEGENERATOR,
				__EVENTVALIDATION:__EVENTVALIDATION,
				myDestination:myDestination,
				WINDOW_NAMER:WINDOW_NAMER,
				ctl00$ContentPlaceHolder1$hdnCode:
				ctl00$ContentPlaceHolder1$hidDMY:ctl00$ContentPlaceHolder1$hidDMY,
				ctl00$ContentPlaceHolder1$hdflag:ctl00$ContentPlaceHolder1$hdflag,
				ctl00$ContentPlaceHolder1$hidCurrentDate:ctl00$ContentPlaceHolder1$hidCurrentDate,
				ctl00$ContentPlaceHolder1$search:ctl00$ContentPlaceHolder1$search,
				ctl00$ContentPlaceHolder1$GetQuote1_smartSearch://scrip name
				ctl00$ContentPlaceHolder1$DMY:ctl00$ContentPlaceHolder1$DMY,
				ctl00$ContentPlaceHolder1$txtFromDate://startDate
				ddlCalMonthctl00_ContentPlaceHolder1_divMFdate://
				ddlCalYearctl00_ContentPlaceHolder1_divMFdate:
				ctl00$ContentPlaceHolder1$txtToDate://end date
				ddlCalMonthctl00_ContentPlaceHolder1_DivDate1:
				ddlCalYearctl00_ContentPlaceHolder1_DivDate1:
				ctl00$ContentPlaceHolder1$btnSubmit.x:40,
				ctl00$ContentPlaceHolder1$btnSubmit.y:11
			}
			
			headers= {
   				'User-Agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.143 Safari/537.36',
   				'Content-Type':'application/x-www-form-urlencoded'
 			}

			
			request.post({url:base_url,headers:headers,data:data},function(err,httpResponse,body){
				
			})
})



//next_page data

function nextScrip(id){
		var params={
				after:"57f22c4255a0cc04655daae2"
		  	   }

		if(id){
			params.after=id;
		}

		Scrip.paginate(params, '_id')
		.limit(1) // overrides default limit 
		.exec(function(err, obj) {
			console.log(obj)
		});
}
//ctl00$ContentPlaceHolder1$hdnCode
