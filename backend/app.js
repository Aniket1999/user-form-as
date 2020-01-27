const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

const user = require('./controllers/register');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose.connect("mongodb+srv://admin:Aniket123!@cluster0-cqw6w.mongodb.net/test?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true }, () => console.log("db connected"));

app.use(user);
app.use((req, res, next) => {
    res.status(404).send('<h1>page not found</h1>');
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`server at ${port}`));