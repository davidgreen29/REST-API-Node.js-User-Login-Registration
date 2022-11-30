const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const weightSchema = new Schema({
   weight:{
    type: Number, 
    required: true
    },

   dateAdded:{ 
    type: Date, 
    "default": Date.now
    },
    userId:{
       type: Schema.Types.ObjectId
    }
})

module.exports = mongoose.model('Weight', weightSchema);