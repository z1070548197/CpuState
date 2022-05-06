const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
// 实例化数据模板
const UserSchema = new Schema({
  fanNum: {
    type: Number,
    default:50
  },
  info:{
    type:Object,
    default:{}
  },
  FanAutoState:{
    type:Boolean,
    default:true
  }
});
 
module.exports = cpu = mongoose.model('cpu', UserSchema);