# Utilizar una imagen base de Node.js
FROM node:14

# Crear un directorio de trabajo
WORKDIR /usr/src/app

# Instalar dependencias
# Aprovecha la caché de las capas de Docker copiando solo el package.json primero
COPY package*.json ./

RUN npm install
# Añade aquí la reconstrucción de bcrypt
RUN npm rebuild bcrypt --build-from-source

# Copiar el resto del código fuente de la aplicación en el contenedor
COPY . .

# Exponer el puerto que utiliza tu aplicación
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD [ "npm", "start" ]
