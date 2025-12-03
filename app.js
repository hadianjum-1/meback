const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const DbConnect = require('./DbConnect/dnconnection');
const Routers = require('./Routes/routes');

const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

DbConnect();

app.use("/", Routers);

app.listen(port, () => {
    console.log(`https://localhost${port}`);
});
