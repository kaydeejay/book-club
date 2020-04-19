var mongoose = require('mongoose');
var Schema = mongoose.Schema;
if (mongoose.connection.readyState === 0) {
  mongoose.connect(require('./connection-string'), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  });
}


var newSchema = new Schema({

  'title': { type: String },
  'authors': { type: Array },
  'description': { type: String },
  'image': { type: String },
  'link': { type: String },
  'read': { type: Boolean },
  'createdAt': { type: Date, default: Date.now },
  'updatedAt': { type: Date, default: Date.now }
});

newSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

newSchema.pre('update', function () {
  this.update({}, { $set: { updatedAt: Date.now() } });
});

newSchema.pre('findOneAndUpdate', function () {
  this.update({}, { $set: { updatedAt: Date.now() } });
});



module.exports = mongoose.model('Book', newSchema);
