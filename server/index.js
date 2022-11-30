const express = require('express');
const app = express();
const port = 5000;
const cors = require("cors");
// lier au Pool dans le fichier db.js :
const pool = require("./db");

// middleware :
app.use(cors())
// obtenir les données coté client :
app.use(express.json()) //req.body


// Maintenant, on construit les ROUTES avec les méthodes : POST/GET/DELETE/PUT (update)
// On fera des tests avec POSTMAN pour vérifier si les données se transmettent bien
// toujours async/await
// toujours try/catch pour limiter les erreurs - Test unitaire

// create a todo //POST
// servira pour le bouton ajouter (une tache)
app.post("/todos", async (req, res) => {
    try {
        console.log(req.body);
        const { tache } = req.body;
        // on insert avec INSERT INTO la tache dans la table todolist
        // VALUES($1) correspond à [tache].
        // RETIRNING all pour tout l'object
        const nouvelleTache = await pool.query ("INSERT INTO todolist (tache) VALUES($1) RETURNING *", 
        [tache])
        res.json(nouvelleTache)
        // console.log(nouvelleTache);
    } catch (err) {
        console.error(err.message);
    }
})

// get all todos // GET 
// servira à afficher la liste de tache complète
app.get("/todos", async (req,res) => {
    try {
        // on veut toute la liste donc SELECT * de toute la table
        // on ne precisera que dans la response qu'on ne veut que "rows"
        const touteLaListe = await pool.query("SELECT * FROM todolist")
        // .rows pour n'avoir que le tableau d'objet (comprenant id et tache. 1 objet par donnée)
        res.json(touteLaListe.rows)
        console.log(touteLaListe.rows);

    } catch (err) {
        console.error(err.message);    
    }
    })

// get a todo // GET 
app.get("/todos/:id", async (req,res) => {
    try {
        // ici, on est plus spécifique, on recherche par rapport à l'id.
        //  Si la tache est dans req.body (cf postman), l'_id est dans req.params (valeur unique)
        const { id } = req.params
        const uneTache = await pool.query("SELECT * FROM todolist WHERE _id = $1", 
        [id]
        )
    
        // on spécifie .rows[0] pour n'obtenir que l'objet et non le tableau d'objets
        res.json(uneTache.rows[0]);
        console.log(uneTache.rows[0]);
    } catch (err) {
        console.error(err.message);    
    }
    })

// update a todo // PUT pour UPDATE
// ici, on spécifira l'id pour faire le lien avec l'entrée de la table et mettre à jour la tache
// servira pour le bouton edit (une tache)
app.put("/todos/:id", async (req,res) => {
    try {
        // On envoie toutes les infos (_id et tache)
        const { id } = req.params
        const { tache } = req.body
        // Je met à jour (update) la table (todolist) en modifiant(set) la ligne "tache" où (where) l'id est = à ...
        const envoiTache = await pool.query("UPDATE todolist SET tache = $1 WHERE _id = $2",
        [tache, id]
        );

        // Ici, on enverra un message pour signifier que la requete est bien passée
        res.json("Donnée bien transmise");
        console.log("Donnée bien transmise");
    } catch (err) {
        console.error(err.message);    
    }
    })

// delete a todo // DELETE
// servira pour le bouton delete (une tache)
// Toujours spécifique à un id
app.delete("/todos/:id", async (req,res) => {
    try {
        const { id } = req.params
        // Je supprime de (delete from) la table (todolist) où (where) l'id est = à ...
        const supprimerTache = await pool.query("DELETE FROM todolist WHERE _id = $1", 
        [id]
        )

        // Ici, on enverra un message pour signifier que la donnée à bien été supprimé
        res.json("Donnée bien affacé");
        console.log("Donnée bien affacé");
    } catch (err) {
        console.error(err.message);    
    }
    })


app.listen(port, () =>
    console.log(`App listening on port ${port}!`)
)