
const mongoose = require('mongoose');


const journalSchema = new mongoose.Schema({
  username:{
    type:String,
    required:true
  },
  mood: {
    type: String, 
  },
  theme: {
    type: String,
  },
  time: {
    type: String,
  },
  duration: {
    type: Number,
  },
  taskDuring: {
    type: String,
  },
  description: {
    type: String,
  },
  
});


const journal = mongoose.model('journal', journalSchema);
module.exports = journal;
