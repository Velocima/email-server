const express = require('express');
const morgan = require('morgan');
const config = require('config');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require("express-rate-limit");

const app = express();
app.use(express.static('public/index.html'));

// Init middleware


const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limiter);
app.use(morgan('short'));
app.use(cors({origin: "*"}));
app.use(helmet());
app.use(express.json());

app.use('/api/', require('./routes/sendMail'))


const PORT = process.env.PORT || 3000;
