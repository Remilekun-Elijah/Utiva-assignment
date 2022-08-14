const express = require('express');
const app = express();
const route = require('./routes/index');
require('./config/database');


app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));


app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to the API',
    status: "success"
  })
})

app.use('/', route)


app.listen(3000, function () {
  console.log('Server started on port 3000');
})