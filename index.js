// config inicial
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();

// Variáveis
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

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

// rotas da API
const productRoutes = require("./routes/productRoutes");
app.use("/product", productRoutes);

// rota inicial / endpoint
app.get("/", (req, res) => {
    res.json({ message: "Running" });
});

// entregar porta
mongoose
    .connect(URL)
    .then(() => {
        console.log("API Conectada!");
        app.listen(process.env.PORT || 8080);
    })
    .catch((error) => console.log(error));
