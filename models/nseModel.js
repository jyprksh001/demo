var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var nseSchema=new Schema({
	index:{type:String},
	//date:{type:String, index: { unique: true }},
	date:{type:String},
	open:{type:Number},
	high:{type:Number},
	low:{type:Number},
	close:{type:Number},
	shares_traded:{type:String},
	turnover:{type:String}	
})

module.exports = mongoose.model('Nse', nseSchema);