const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos desde la carpeta 'uploads'
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/', (req, res) => {
  res.send('Backend is working!');
});

// Endpoint para listar todas las imágenes en el directorio 'uploads'
app.get('/images', (req, res) => {
  const uploadsDir = path.join(__dirname, 'uploads');
  fs.readdir(uploadsDir, (err, files) => {
    if (err) {
      return res.status(500).send('Error al leer el directorio de imágenes');
    }
    // Filtrar solo archivos que tengan extensión de imagen
    const imageFiles = files.filter(file => /\.(png|jpg|jpeg|gif)$/i.test(file));
    
    // Devolver la lista de rutas relativas de las imágenes
    const imagePaths = imageFiles.map(file => `/uploads/${file}`);
    
    res.json(imagePaths);  // Responder con un JSON que contiene las rutas de las imágenes
  });
});

// Endpoint para manejar la subida de imagen y guardarla en el servidor
app.post('/upload', async (req, res) => {
  const chunks = [];

  // Escuchar los datos de la imagen
  req.on('data', chunk => {
    chunks.push(chunk);
  });

  req.on('end', async () => {
    try {
      const buffer = Buffer.concat(chunks); // Combina los datos recibidos en un solo buffer

      // Definir el nombre del archivo y la ruta donde guardar la imagen
      const filename = `uploaded_image_${Date.now()}.png`;
      const filePath = path.join(__dirname, 'uploads', filename);

      // Crear el directorio 'uploads' si no existe
      if (!fs.existsSync(path.join(__dirname, 'uploads'))) {
        fs.mkdirSync(path.join(__dirname, 'uploads'));
      }

      // Guardar la imagen en el servidor
      fs.writeFileSync(filePath, buffer);

      res.status(200).send(`Imagen subida y guardada con éxito como ${filename}`);
    } catch (error) {
      console.error('Error al guardar la imagen:', error);
      res.status(500).send(`Error al guardar la imagen: ${error.message}`);
    }
  });
});

app.listen(PORT, () => {
  console.log(`Backend is running on port ${PORT}`);
});

