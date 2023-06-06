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

// app.get("/sum", (req, res) =>{
//     const a = req.body.a
//     const b = req.body.b
//     const sum = a + b
//     if(typeof sum === "number"){
//         res.json(sum)
//     } else{ 
//         res.status(400).json("Wrong input")
//     }
    
// })

// app.post("/reverse-case", (req, res) =>{
//     let a = req.body.a
//     let b = a.toUpperCase()
//     let result = ""
//     for (let i = 0; i < b.length;i++){
//         if (b[i] == a[i]){
//             result += b[i].toLowerCase()
//         } else{
//             result += b[i]
//         }
//     }
//     res.json(result)
// })

// app.put("/obj-to-array", (req, res) => { 
//     const a = req.body.a; 
//     const massKeys = Object.keys(a); 
//     const massValues = Object.values(a); 
//     console.log(massKeys, massValues); 
//     let mass = []; 
//     for (let i = 0; i < massKeys.length; i++) { 
//       mass.push({ 
//         key: massKeys[i], 
//         Value: massValues[i], 
//       }); 
//     } 
//     res.json({mass}); 
//   });

// app.patch("/reverse-array", (req, res) =>{
//     let a = req.body.a.reverse( )
//     res.json(a)
// })

// app.delete("/duplicates", (req, res) =>{
//     let a = req.body.a
//     let result = []
//     for(i in a){
//         let temp = 0
//         for( b in result)
//         {
//             if (result[b] == a[i]){
//                 temp += 1
//             }
//         }
//         if (temp === 0){
//             result += a[i]  
//         }
//     }
//     res.json(result)
// })

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
        res.status(500).json("Error")
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
        res.status(500).json("Error");
    }
});

app.delete("/api/todos", async (req, res) => {      
    try {
        await ToDo.destroy({where: {}});
        res.status(200).json("DB was deleted.");
    } catch (error) {
        res.status(500).json("Error");
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
        res.status(500).json("Error");
    }
});