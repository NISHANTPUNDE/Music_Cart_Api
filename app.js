const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const productRouter = require('./routes/product')
const filterRouter = require('./routes/filter')
const userRouter = require('./routes/user')
const stripeRouter = require('./routes/stripe')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();
app.use(bodyParser.json());
require("dotenv").config();
app.use(cookieParser());
app.use(cors(
    {
        origin: process.env.REACT_APP_URL,
        credentials: true,
    }
));
const port = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Connected to db:', mongoose.connection.db.databaseName);
    })
    .catch((error) => {
        console.log('Error connecting to db:', error);
    });

app.use('/music',productRouter)

app.use('/filter',filterRouter)

app.use('/user',userRouter)

app.use('/stripe',stripeRouter)

app.listen(port, () => {
    console.log('Server started on port', port);
});
