var async=require('async');
var dbTest=require('./dbTest')
var Scrip=require("./models/bseScripsModel");
var Converter = require("csvtojson").Converter;
var converter = new Converter({});
converter.fromFile("./dataSheets/ListOfScrips.csv",function(err,result){
 		if(err){
 				console.log(err);
 		}else{
 			firstCallback(result);
 		}
 		
});

function firstCallback(obj){
	async.eachSeries(obj,function(o,cb){
		saveToMongo(o,cb)
	},function(err,re){
		if(err){
			console.log(err)
		}else{
			console.log("data parsed")
		}
	})
}


function saveToMongo(data,cb){
	var scrip=new Scrip(data);
	scrip.save(function(err,s){
		if(err){
			console.log(err)
		}else{
			console.log("data saved")
			cb()
		}
	})
}