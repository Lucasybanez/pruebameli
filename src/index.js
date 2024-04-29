import express from "express";
import routerPeliculas from "./routes/router";
import bodyParser from 'body-parser';

const app = express();

app.listen(3002, () => {
    console.log("Server listening on port 3002");
  });

// Agrega el middleware de análisis de cuerpos a tu aplicación
app.use(bodyParser.json()); // Para JSON
app.use(bodyParser.urlencoded({ extended: true })); // Para formularios URL-encoded

//app.use("/api",routerPeliculas);
app.use("/api",routerPeliculas);