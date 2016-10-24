var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var scripSchema=new Schema({
  scrip_code:{}
  date:
  open:
  high:
  low:
  close:
  wap:
  no_of_shares:
  no_of_trades:
  total_turn_over:
  deliverable_quantity:
  percent_qty_to_tra_qty:
  spread_high:
  spread_low:
})


module.exports = mongoose.model('Scrip', scripSchema);