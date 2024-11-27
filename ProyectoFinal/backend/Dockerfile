FROM node:14

# Instalar dependencias del sistema necesarias para Jimp
RUN apt-get update && apt-get install -y \
  libjpeg-dev \
  libpng-dev \
  libtiff-dev \
  libgif-dev

# Establecer el directorio de trabajo
WORKDIR /usr/src/app

# Copiar los archivos de configuración de npm
COPY package.json package-lock.json ./

# Instalar las dependencias de Node.js
RUN npm install

RUN npm update

RUN mkdir -p uploads && chmod -R 755 uploads

# Copiar el resto de la aplicación
COPY . .

# Exponer el puerto que utiliza la aplicación
EXPOSE 8080

# Ejecutar el servidor
CMD ["node", "server.js"]

