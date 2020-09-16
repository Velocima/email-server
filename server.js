const express = require('express');
const morgan = require('morgan');
const config = require('config');
const rateLimit = require("express-rate-limit");
const ipfilter = require('express-ipfilter').IpFilter

const app = express();

// Init middleware
const ips = config.get("ipWhitelist");
app.use(ipfilter(ips, { mode: 'allow' }))

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limiter);
app.use(morgan('short'));
app.use(express.json());

app.use('/api/', require('./routes/sendMail'))


const PORT = process.env.PORT || 5000;

app.listen(PORT);

console.log(`Server is running on port ${PORT}`);

app.get('/api', (req, res) => res.send("(ﾉ◕ヮ◕)ﾉ*:･ﾟ"));
