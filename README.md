Instrucciones para ejecutar el proyecto

1️ Clonar el repositorio

git clone https://github.com/retoKonecta/banksolutions-back.git

2️ Configurar el Backend

Asegúrate de tener Node.js instalado

Instala las dependencias:

te ubicas en el proyecto clonado
npm install

Configura las variables de entorno. Crea un archivo .env en la carpeta backend con los siguientes datos:

JWT_SECRET=cnsmewopinjvhkoiLJASHGDF65


PGHOST=localhost
PGUSER=postgres
PGPASSWORD=tu_contraseña
PGDATABASE=banco
PGPORT=5432

Importar la base de datos banco.sql en PostgreSQL
el archivo está en el repositorio del backend

Ejecuta el servidor:

npm run dev

3️ Configurar el Frontend

clonar el repositorio
git clone https://github.com/retoKonecta/banksolutions-front.git

ubicarse en el proyecto 

Abre una nueva terminal y ejecuta:

npm install
npm run dev

4️ Credenciales para probar el login

Correo: caro@gmail.com
Contraseña: 123456

Notas:

El backend corre en http://localhost:3000.
El frontend corre en http://localhost:5173 (o el puerto que indique en la consola).

