var mongoose = require('mongoose');

// Animals Schema
var wildlifeSchema = mongoose.Schema({
  animal_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Animals'
  },
  view_date: {
    type: Date,
    default: Date.now
  },
  animal_count: {
    type: Number,
    required: true
  }
});

var Wildlife = module.exports = mongoose.model('Wildlife', wildlifeSchema);

// Get Wildlife log
module.exports.getWildlife = function(callback, limit){
  Wildlife.find(callback).limit(limit);
};
