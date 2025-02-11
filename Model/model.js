const mongoose = require('mongoose');

const mongoURI = process.env.MONGODB_URI;
console.log(mongoURI);
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    maxPoolSize: 10 // Limit max concurrent connections
  }).then(() => console.log('✅ MongoDB Connected')) .catch(err => console.error('❌ MongoDB Connection Error:', err));

const medicalSchema  = new mongoose.Schema({
    input: String,
    output: String
});

const Medical = mongoose.model('medical', medicalSchema);

module.exports = Medical;