const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'fridgewizard'
  })
   .then(() => console.log("Connected to Mongo DB"))
   .catch(err => console.log(err));

module.exports = mongoose;