const express = require("express");
const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "host",
    user: "user",
    database: "database",
    password: "password"
}).promise();

const app = express();

function connect(){
  connection.connect(function(err){
      if (err) {
          return console.error("Ошибка: " + err.message);
      }
      else{
          console.log("Подключение к серверу MySQL успешно установлено");
      }
  });
}

function closeConnect() {
  connection.end(function(err) {
      if (err) {
          return console.log("Ошибка: " + err.message);
      }
      console.log("Подключение закрыто");
  });
}

app.get("/getRequest", function(request, response){

  connect();
  let sqlRequest = "SELECT * FROM table"
  connection.query(sqlRequest)
        .then(result =>{
            console.log(result);
            response.send(result)
        })
        .catch(err =>{
            console.log(err);
        });
  closeConnect();
});

app.post("/postRequest", function(request, response){

    connect();
    let sqlRequest = "INSERT INTO table OUTPUT INSERTED.id VALUES ('request.body.value')"
    connection.query(sqlRequest)
        .then(result =>{
            console.log(result);
            response.send(result)
        })
        .catch(err =>{
            console.log(err);
        });
    closeConnect();
});

app.put("/putRequest", function(request, response){

    connect();
    let sqlRequest = "UPDATE table SET item1 = ${request.body.value} WHERE item2 = 0"
    connection.query(sqlRequest)
        .then(result =>{
            console.log(result);
            response.send(result)
        })
        .catch(err =>{
            console.log(err);
        });
    closeConnect();
});

app.delete("/deleteRequest", function(request, response){

    connect();
    let sqlRequest = "DELETE * FROM table"
    connection.query(sqlRequest)
        .then(result =>{
            console.log(result);
            response.send(result)
        })
        .catch(err =>{
            console.log(err);
        });
    closeConnect();
});

app.listen(3030);
