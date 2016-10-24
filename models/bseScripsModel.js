var mongoose = require('mongoose');
var paginator=require('mongoose-paginator');
mongoose.Promise = require('bluebird');
var Schema = mongoose.Schema;

var scripSchema=new Schema({
  'Security Code':{type:Number},
  'Security Id':{type:String},
  'Security Name':{type:String},
  'Status': {type:String},
  'Group': {type:String},
  'Face Value':{type:Number} ,
  'ISIN No':{type:String},
  'Industry': {type:String},
  'Instrument':{type:String}  
})

scripSchema.plugin(paginator,{
	limit: 50,
    defaultKey: '_id',
    direction: 1
})

module.exports = mongoose.model('Scrip', scripSchema);