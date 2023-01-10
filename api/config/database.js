// Import the mongoose module
const mongoose = require('mongoose')

// Set up default mongoose connection
const mongoDB = process.env.MONGO_URL || null
mongoose.connect(mongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

mongoose.set('strictQuery', false);

// Get the default connection
var db = mongoose.connection

// eslint-disable-next-line no-console
db.on('error', console.error.bind(console, 'MongoDB connection error:'))