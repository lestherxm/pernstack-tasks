const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const tastkRoutes = require('./routes/tasks.routes');
const app = express();
const port = 3000;

app.use(cors()); //comunicar ambos servers de manera simple (front y back)
app.use(morgan('dev')); //ver por consola las peticiones a la API
app.use(express.json()); //express server no entiende JSON nativamente, es necesario importar un metodo para que si lo haga.

app.use(tastkRoutes);

//Next() function para manejar errores en los controladores a través de una sola funcion
app.use((err, req, res, next) =>{
    return res.json({
        error: err.message
    });
});

app.listen(port)
console.log(`-- Server listening on port ${port} --`);