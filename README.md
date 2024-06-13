
# Project Back-End


Proyecto Back-End


## Installation

1- Iniciaremos el archivo installando las dependencias con npm install.

```bash
  npm install 
```
2- Crearemos un archivo .env donde colocaremos nuestra MONGO_URI y nuestra JwtPrivateKey. Esto es diferente para cada uno por eso hay que crearlo al iniciarlo.

3- Podemos registrar un usuario con el endopoint /Register y Loguearnos con el endopoint /Login. Esto habrá que hacerlo desde Thunder Client. Podemos loguearnos como administrador,
si creamos la clave isAdmin y le damos el valor "true", pero también hay que acordarse de modificar en el Compass, dandole a editar documento y creand una field debajo del password,
dandole el valor true y seleccionando a la derecha la opcion "Boolean".

4- Iniciaremos el servidor con 
```bash
  npm start 
```

5- Recuerda si quieres subir una imagen hay que cambiar el archivo y añadir .png en la carpeta "public/images"

5- Hemos utilizado estas dependencias:

    "bcrypt": "^5.1.1", Para encriptar las contraseñas
    "bootstrap": "^5.3.3", Libreria para darle estilo 
    "compression": "^1.7.4", Para tardar menos en subir a Render
    "config": "^3.3.11", 
    "dotenv": "^16.4.5", Para seleccionar las variables del entorno
    "express": "^4.19.2", Para utilizar las rutas y iniciar el servidor
    "express-async-errors": "^3.1.1", Para manejar los errores automaticos
    "express-session": "^1.18.0", Para controlar la sesion iniciada
    "firebase": "^10.12.2",
    "helmet": "^7.1.0", Para proteger nuestro codigo de amenazas
    "jsonwebtoken": "^9.0.2", Crear tokens de acceso
    "method-override": "^3.0.0",
    "mongoose": "^8.4.1", Para crear la base de datos
    "multer: Para selecionar las imagenes y guardarlas en una carpeta a través del        formulario