const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const PORT = 8080;

app.use(cors());
app.use(bodyParser.json());

let emails = []; // Almacenamiento en memoria

app.get('/emails', (req, res) => {
  res.json(emails);
});

app.post('/emails', (req, res) => {
  const { email } = req.body;
  if (email) {
    emails.push(email);
    res.status(201).send('Email agregado');
  } else {
    res.status(400).send('Email no válido');
  }
});

app.listen(PORT, () => {
  console.log(`Backend is running on port ${PORT}`);
});
