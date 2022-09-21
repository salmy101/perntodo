const express = require("express"); 
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const pool = require("./db");
// const axios = require("axios");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//middleware (need app.use )
app.use(cors());
//fullstack app need data from clinet side so we need the request.body object
app.use(express.json()); //allows acces to req.body

//Routes//

//create a todo
app.post("/todos", async (req, res) => {
  //await will wait for the function to finish b4 continuing
  try {
    // console.log(req, body);
    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo (description) VALUES($1) RETURNING *",
      [description]
    );
    res.json(newTodo.rows[0]); 
  } catch (err) {//run the code and catches and errors
    console.error(err.message);
  }
});

//get all todos

app.get("/todos", async (req, res) => {
  try {
    const allTodos = await pool.query(
      "SELECT * FROM todo"
      );
    res.json(allTodos.rows); 
  } catch (err) {
    console.error(err.message);
  }
});

//get a todo
app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updateTodo = await pool.query(
      "UPDATE todo SET description = $1 WHERE id = $2", 
      [description,id]
      );
    res.json(updateTodo.rows[0]); //get one
  } catch (err) {
    console.error(err.message);
  }
});

//edit a todo
app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query("SET description * FROM todo WHERE id = $1", [id]);
    res.json("todo was updated"); 
  } catch (err) {
    console.error(err.message);
  }
});

//delete a todo
app.delete("/todos/:id", async(req,res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query("DELETE FROM todo WHERE id = $1",[
        id
      ]);
      res.json("todo was deleted")
  } catch (error) {
    console.error(err.message);

    
  }
})

app.listen(5000, () => {
  console.log("server has started on PORT 5000!");
});
