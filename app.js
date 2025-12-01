const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const DbConnect = require('./DbConnect/dnconnection');
const Routers = require('./Routes/routes');
const port = 3000;

app.use(cors()); // ADD THIS
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

DbConnect();

app.use("/", Routers);

app.listen(port, () => {
    console.log(`Server running: http://localhost:${port}`);
});