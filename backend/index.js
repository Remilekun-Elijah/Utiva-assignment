const express = require('express');
const app = express();
const route = require('./routes/index');
const cors = require('cors');
require('./config/database');


app.use(cors());
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

const port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log(`Server started on port ${port}`);
})