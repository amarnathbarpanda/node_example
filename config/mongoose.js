const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/cn', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const  db = mongoose.connection;

db.on('error', err => {
    console.log('Error connection to DB', err);
});

db.once('open', ()=>{
    console.log('Successfully connected to DB');
})
