const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Almacenamiento temporal en memoria
let names = [];

// Ruta para recibir nombres
app.post('/submit', (req, res) => {
    const { firstName, lastName } = req.body;
    if (firstName && lastName) {
        names.push({ firstName, lastName });
        return res.status(200).send({ message: 'Nombre recibido', names });
    }
    return res.status(400).send({ message: 'Datos incompletos' });
});

// Ruta para obtener la lista de nombres
app.get('/names', (req, res) => {
    res.status(200).send(names);
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor backend escuchando en http://localhost:${PORT}`);
});
