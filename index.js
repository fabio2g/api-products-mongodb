// config inicial
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();

// criar .env
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const URL = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.vbcw7.mongodb.net/databaseapi?retryWrites=true&w=majority`;

//forma de ler json
app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(express.json());

// rotas da API
const productRoutes = require("./routes/productRoutes");
app.use("/product", productRoutes);

// rota inicial / endpoint
app.get("/", (req, res) => {
    res.json({ message: "OK" });
});

// entregar porta
mongoose
    .connect(URL)
    .then(() => {
        console.log("API Conectada!");
        app.listen(8080);
    })
    .catch((error) => console.log(error));
