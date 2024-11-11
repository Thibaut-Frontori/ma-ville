import express, { Router } from "express";
import 'dotenv/config';
import routes from "./app/routes/router.js";
const app = express();
const port = process.env.PORT;

app.set('view engine', 'ejs');
app.set('views', './app/views');


app.use("/", routes);

app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})