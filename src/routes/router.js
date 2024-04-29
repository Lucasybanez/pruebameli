import express from "express";
import controller from "../controllers/controller";

const routerPeliculas = express.Router();

routerPeliculas.get("/pelicula",controller.obtenerPeliculas);
routerPeliculas.post("/pelicula",controller.registrarPelicula);
routerPeliculas.delete("/pelicula/:id",controller.borrarPelicula);
routerPeliculas.put("/pelicula/:id",controller.editarPelicula);

export default routerPeliculas;