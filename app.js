const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

var bodyParser = require('body-parser');
app.use( bodyParser.json({limit: '50mb'}) );
app.use(bodyParser.urlencoded({
  limit: '50mb',
  extended: true,
  parameterLimit:50000
}));

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});

const connection = mongoose.connection;
connection.once('open',()=>{
    console.log("MongoDB database connection established successfully");
})

//Routes
const usersRouter = require('./routes/users');
const patientsRouter = require('./routes/patients');

app.use('/users',usersRouter);
app.use('/patients',patientsRouter);

app.listen(port, ()=> {
    console.log(`Server is running on port: ${port}`);
})