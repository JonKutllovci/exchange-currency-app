import mysql from "mysql";
const express = require("express");
const cors = require("cors");
const app = express();
/**
 * Using the resources which help on connecting to the database 
 * Such as express.js for connection Cross origin resource sharing(cors) for accesing the data
 * 
 */
const port = 2222;
const connection: mysql.Connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "currency",
});

app.use(cors());

/**
 * API Request for getting all the currencies
 */
app.get("/all", (req: any, res: any) => {
  connection.query(
    "SELECT * FROM currencies",
    (err: mysql.MysqlError | null, result: any) => {
      if (err) {
        console.error(err);

        res.status(500).end();

        return;
      }

      res.status(200).json(result).end();
    }
  );
});

/**
 * API Request for getting all the currencies names
 */
app.get("/names", (req: any, res: any) => {
  connection.query(
    "SELECT currency_name FROM currencies;",
    (err: mysql.MysqlError | null, result: any) => {
      if (err) {
        console.error(err);

        res.status(500).end();

        return;
      }

      res.status(200).json(result).end();
    }
  );
});

/**
 * API Request for getting all the currencies value
 */
app.get("/currencies/value", (req: any, res: any) => {
  let pars = req;

  connection.query(
    "SELECT id, purchase, sale FROM currencies;",
    (err: mysql.MysqlError | null, result: any) => {
      if (err) {
        console.error(err);

        res.status(500).end();

        return;
      }

      return res.status(200).json(result).end();
    }
  );
});

/**
 * API Request for getting all the currencies id
 */
app.get("/single/:id", (req: any, res: any) => {
  let id = req.params.id;
  console.log("ID: " + id);

  connection.query(
    "SELECT * FROM currencies WHERE currency_name = '" + id + "';",
    (err: mysql.MysqlError | null, result: any) => {
      if (err) {
        console.error(err);

        res.status(500).end();

        return;
      }

      res.status(200).json(result).end();
    }
  );
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
