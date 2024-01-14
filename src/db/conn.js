const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

mongoose.connect("mongodb://127.0.0.1:27017/Vaibhavi", {
    useNewUrlParser : true,
    useUnifiedTopology : true,
    // useCreateIndex : true
}).then( () => {
    console.log("successful!");
}).catch( (error) => {
    console.log(error);
});

