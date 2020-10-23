const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser")
const path = require('path');

const userRoutes = require("./routes/user");
const sauceRoutes = require('./routes/sauces');

const app = express();

mongoose.connect('mongodb+srv://user1:admin620@cluster0.vnt4d.mongodb.net/Cluster0?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));



app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use("/api/auth", userRoutes);
app.use('/api/sauces', sauceRoutes);
 
module.exports = app;