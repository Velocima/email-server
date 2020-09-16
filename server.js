const express = require('express');
const morgan = require('morgan');
const app = express();

app.use(morgan('short'));
app.use(express.json());

app.use('/api/', require('./routes/sendMail'))


const PORT = process.env.PORT || 5000;

app.listen(PORT);

console.log(`Server is running on port ${PORT}`);

app.get('/api', (req, res) => res.send("(ﾉ◕ヮ◕)ﾉ*:･ﾟ"));
