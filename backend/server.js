const dotenv = require('dotenv');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const cors = require('cors');
dotenv.config();


const app =express();
app.use(cors());
app.use(express.json());

app.use('/api/auth',require('./route/auth'));
app.use('/api/services',require('./route/services'));
app.use('/api/jobs',require('./route/jobs'));
app.use('/api/contacts',require('./route/contacts'));

mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log('mongodb is connect'))
.catch(err =>console.log('err'));

const PORT =process.env.PORT||5000;
app.listen(PORT,()=>console.log(`server is runnig on port ${PORT}`));