![Logo](https://i.imgur.com/3de6se7.png)

# TRAX - Teleton

Trax es un sistema de monitoreo de donaciones en tiempo real y visualización de datos. 

🏆 Proyecto ganador del [Hackathon Teleton 2018]( https://hackatonteleton.org/)

## Configuración Inicial 

Las siguientes instrucciones te ayudaran a instalar una copia del proyecto en tu computadora local con fines de desarrollo y pruebas. Si necesitas lanzar Trax en un sistema de producción es necesario revisar la sección de Despliegue.

### Requisitos

Antes de insalar Trax, es necesario contar con un navegador web (Chrome, Safari, Internet Explorer) y Node.js 8+.
Si no tienes Node.js aún puedes descargar la última versión gratis [aquí](https://nodejs.org/es/)

Para descargar una copía del proyecto corre la siguiente instrucción en tu linea de comando o descarga [la versión ZIP](https://github.com/VR3/trax-front/archive/master.zip)

```
git clone https://github.com/VR3/trax-front.git
```

### Instalación

Para iniciar el entorno de desarrollo es necesario correr las siguientes instrucciónes en tu linea de comando desde el folder en el que se encuentra el proyecto.

Instala todas las dependencias

```
npm install
```

Genera la versión optimizada del proyecto

```
npm run build
```

Inicia la aplicación en localhost:3000 desde tu navegador

```
npm start
```

Demo:


![Demo](https://media.giphy.com/media/YWaBzBswCQhs8X7DxN/giphy.gif)

## Despliegue

Para instalar la versión en un entorno de producción debes de instalar el siguiente repositorio en tu servidor.

* [Trax - API](https://github.com/VR3/trax-api) -  Conexiones directas a la base de datos del Teletón.

## Librerías de Desarrollo

Trax esta construido con librerías Open Source. 

* [React.js](https://github.com/facebook/react) - Framework en Javascript para construir la interfaz gráfica
* [Socket.io](https://github.com/socketio/socket.io) - Para abrir canales de tiempo real con la base de datos.
* [React Toastify](https://github.com/fkhadra/react-toastify) - Despliegue de notificaciónes en tiempo real
* [React Charts](https://github.com/jerairrest/react-chartjs-2) - Herramienta para crear gráficas
* [Microsoft Power BI](https://powerbi.microsoft.com/es-es/) - Visualización de datos.


## Versión

* 7/10/2018 (0.1) - Versión inicial, entregable final del Hackathon Teleton 2018.

## Autores

* **Oscar Chavez** - *Desarrollo Backend y FrontEnt* 
* **Irving Cabello** - *Desarrollo FrontEnt* 
* **Patrick Moss** - *Análisis de Datos, Integración con PowerBI*
* **Manuel Torres** - *Diseño y prototipado*

## Licencia

Este proyecto tiene licenica MIT- ver más en [LICENSE.md](LICENSE.md) para detalles

## Agradecimiento

* Teletón - Por abrir sus datos para desarrolladores y promover la transparencia.
