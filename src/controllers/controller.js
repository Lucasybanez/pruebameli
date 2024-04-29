import fs from "fs";

// OBTIENE LOS DATOS DEL DB.JSON
const leerDatos = () => {
    try{
        const data = fs.readFileSync("./db.json");
        return JSON.parse(data);
    } catch (error) {
        console.log(error);
    }
}
// ESCRIBE LOS DATOS DEL DB.JSON
const escribirDatos = (data) => {
    try{
        fs.writeFileSync("./db.json", JSON.stringify(data));
    } catch (error) {
        console.log(error);
    }
};

/*
    CRUD:

    CREATE - POST
    READ - GET
    UPDATE - PUT
    DELETE
*/

// CODIFICAMOS EL GET

const obtenerPeliculas = (req, res) => {
    const data = leerDatos();
    res.json(data);
}

// CODIFICAMOS EL POST/create

const registrarPelicula = (req, res) => {
    const data = leerDatos(); // obtengo la listas de pelis
    const body = req.body; // obtengo del req la nueva peli

    const nuevaPelicula = {  // creo la nueva peli en una constante
        id: data.peliculas.length + 1,
        nombre: body.nombre,
        anio: body.anio,
    };
    data.peliculas.push(nuevaPelicula); // añado al array la nueva peli
    escribirDatos(data); // sobreescribo el DB.JSON con la nueva peli añadida
    res.json(nuevaPelicula); 
}

// CODIFICAMOS EL DELETE
const borrarPelicula = (req, res) => {
    const id = req.params.id; // OBTENGO EL ID
    
    const data = leerDatos();
    const peliculaSeleccionada = data.peliculas.findIndex((pelicula)=> pelicula.id === id); // BUSCA EL ID DE LA PELÍCULA SEGÚN SU ID DENTRO DEL DB.JSON
    data.peliculas.splice(peliculaSeleccionada,1); //Corta la película que queremos borrar
    escribirDatos(data);
    res.json({message: "La pelicula ha sido borrada"});
}

// CODIFICAMOS EL PUT/UPDATE
const editarPelicula = (req, res)=> {
    const data = leerDatos();
    const body = req.body;
    const id = parseInt(req.params.id);
    const peliculaSeleccionada = data.peliculas.findIndex((pelicula)=> pelicula.id === id); // BUSCA EL ID DE LA PELÍCULA SEGÚN SU ID DENTRO DEL DB.JSON
    data.peliculas[peliculaSeleccionada]= Object.assign({},data.peliculas[peliculaSeleccionada],body); // Reemplaza la pelicula por los datos que mandamos por body
    escribirDatos(data);
    res.json({message: "la pelicula ha sido actualizada"});
}

export default {
    obtenerPeliculas,
    registrarPelicula,
    editarPelicula,
    borrarPelicula
}