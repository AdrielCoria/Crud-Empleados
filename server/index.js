const express = require("express");
const app = express();
const puerto = 3001;

const mysql = require("mysql2");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "Argentina2024",
    database: "empleados_crud",    
});

// request(Solicitud): Lo que pide el cliente que se haga
// response(Respuesta): Es la respuesta que manda el servidor

app.get("/empleados", (req, res) =>{    

    db.query('SELECT * FROM empleados', 
    (error, result) =>{
        if(error)
        {            
            res.status(500).send("Error interno del servidor");
        }
        else
        {            
            res.send(result);
        }
    }
    );
});

app.post("/create", (req, res) =>{
    const nombre = req.body.nombre;
    const edad = req.body.edad;
    const pais = req.body.pais;
    const cargo = req.body.cargo;
    const anios = req.body.anios;

    db.query('INSERT INTO empleados(nombre, edad, pais, cargo, anios) values(?,?,?,?,?)', [nombre, edad, pais, cargo, anios], 
    (error, result) =>{
        if(error)
        {            
            res.status(500).send("Error interno del servidor");
        }
        else
        {
            res.send(result);
        }
    }
    );
});


app.put("/update", (req, res) =>{
    const id = req.body.id;
    const nombre = req.body.nombre;
    const edad = req.body.edad;
    const pais = req.body.pais;
    const cargo = req.body.cargo;
    const anios = req.body.anios;

    db.query('UPDATE empleados SET nombre=?, edad=?, pais=?, cargo=?, anios=? WHERE id=?', [nombre, edad, pais, cargo, anios, id], 
    (error, result) =>{
        if(error)
        {
            res.status(500).send("Error interno del servidor");
        }
        else
        {
            res.send(result);
        }
    }
    );
});

app.delete("/delete/:id", (req, res) =>{    
    const id = req.params.id;

    db.query('DELETE FROM empleados WHERE id=?',[id], 
    (error, result) =>{
        if(error)
        {
            res.status(500).send("Error interno del servidor");
        }
        else
        {
            res.send(result);
        }
    }
    );
});

app.listen(puerto, () =>{
    console.log(`Se esta ejecutando el servidor backend en el puerto ${puerto}`);
})