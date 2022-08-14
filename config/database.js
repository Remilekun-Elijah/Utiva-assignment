const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://remi:09023007389@test.1niix.mongodb.net/utiva?retryWrites=true&w=majority", (err)=>{
 if(err){
   console.log(err);
 }else {
   console.log("Connected to MongoDB");
 }
});