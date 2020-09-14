const express = require('express');
const morgan = require('morgan');

const app = express();

const PORT = process.env.PORT || 5000;

app.listen(PORT);

console.log(`Server is running on port ${PORT}`);

app.get('/', (req, res) => res.send("(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧ Server is working (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧"));
