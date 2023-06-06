const express = require("express");
const app = express();
const { initDB } = require("./DB")                                                                             // npm run serve              to start
const port = 3100;
const ToDo = require("./DB/models/ToDo.models")
const cors = require("cors")

app.use(express.json())
app.use(cors())

initDB();


app.listen(port, () => {
    console.log("Application listening on port", + port)
})

app.get("/api/todos", async (req, res) => {
    try{
        console.log("get", req.header);
        let list = await ToDo.findAll();
        res.json(list)
    } catch (error) {
        res.status(500).json({ message: "Ошибка : " + error})
    }
    //
})

app.get("/api/todos/:id", async (req, res) => {
    try {
        let todo = await ToDo.findByPk(req.params.id);
        if(todo) {
            res.json(todo);
        }
        else {
            res.status(404).json({ message: "ID не найден"});
        }   
    } catch (error) {
        res.status(500).json("Error");
    }
});

app.post("/api/todos", async (req, res) =>{
    try{
        let todo = await ToDo.create({
            title: req.body.title,
            description: req.body.description
        });
        res.json(todo)
    } catch (error) {
        res.status(500).json({ message: "Ошибка : " + error})
    }
})

app.patch("/api/todos/:id", async (req, res) => {
    try {
        let todo = await ToDo.findByPk(req.params.id);
        if(todo) {
            await todo.update({
                title: req.body.title, 
                description: req.body.description
            });
            res.json("Changed");
        }
        else {
            res.status(404).json("Id not found");
        }
    } catch (error) {
        res.status(500).json({ message: "Ошибка : " + error});
    }
});

app.delete("/api/todos", async (req, res) => {      
    try {
        await ToDo.destroy({where: {}});
        res.status(200).json("DB was deleted.");
    } catch (error) {
        res.status(500).json({ message: "Ошибка : " + error});
    }
});


app.delete("/api/todos/:id", async (req, res) => {  
    try {
        const todo = await ToDo.findByPk(req.params.id);
        if(todo) {
            await todo.destroy();
            res.json(req.params.id + "Was deleted");
        }
        else {
            res.status(404).json("Id not found");
        }
    } catch (error) {
        res.status(500).json({ message: "Ошибка : " + error});
    }
});