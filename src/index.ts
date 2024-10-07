import express from "express";
import db from "./client/db";
import newUser from "./client/db";

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Exercicio de CRUD
// Utilizando as 5 funções encontradas em db, crie 5 endpoints para o recurso "usuario".
// (Leia em README para saber mais sobre as funções)
/* 
    O recurso usuario deve ter as seguintes propriedades com seus respectivos tipos:
    { 
        name: String, 
        email: String, 
        password: String 
    }
*/

 app.get("/users", async (req, res) => {
   try{
     const users = await db.findAll();
     res.status(200).json(users);
   }catch(error){
      res.status(500).json({message: 'Usuários não localizados', error})
   }
 });

 app.post("/create", async (req, res) => {
  const {id, name, email, password} = req.body;
  try{
    const usuario = await db.create({id, name, email, password});
    res.status(201).json(usuario);
  }catch(error){
     res.status(500).json({message: 'Erro ao criar usuário', error})
  }
});

app.listen(port, () => {
  console.log(`Esse servidor está rodando em ${port}`);
});
