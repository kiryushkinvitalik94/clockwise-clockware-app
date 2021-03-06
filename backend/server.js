const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
//bring routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');

//app
const app = express();

//db
mongoose.
  connect(process.env.DATABASE_CLOUD, {useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false, useUnifiedTopology: true })
  .then(() => console.log('DB connected'));

//middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());

//cors
if(process.env === 'development') {
  app.use(cors({origin: `${process.env.CLIENT_URL}`}))
}
app.use(cors());

//routes middleware

app.use('/api', authRoutes);
app.use('/api', userRoutes);


//port
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
});