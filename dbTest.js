var mongoose=require('mongoose');
//console.log(config)
var config=require('./config')
console.log(config);
mongoose.connect(config.mongodb, function(err) {
	if(err) {
		console.log(err);
	}else {
		console.log('Connected to the database');
	}
}); 
module.exports=mongoose;