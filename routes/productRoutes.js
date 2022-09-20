const router = require("express").Router();
const Product = require("../models/Product");

// Criação de Produtos
router.post("/", async (req, res) => {
    const { name, price, image } = req.body;

    if (!name) {
        res.status(422).json({ error: "Name is required" });
        return;
    }
    if (!price) {
        res.status(422).json({ error: "Price is required" });
        return;
    }
    if (!image) {
        res.status(422).json({ error: "Image is required" });
        return;
    }

    const product = {
        name,
        price,
        image,
    };

    try {
        await Product.create(product);
        res.status(201).json({ message: "Successfully created!" });
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

// Leitura de Produtos
router.get("/", async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

// Leitura de Produtos por ID
router.get("/:id", async (req, res) => {
    const id = req.params.id;

    try {
        const product = await Product.findById({ _id: id });

        if (!product) {
            res.status(422).json({ message: "Id Invalid!" });
            return;
        }

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

// Atualização de Produtos
router.patch("/:id", async (req, res) => {
    const id = req.params.id;
    const { name, price, image } = req.body;

    if (!name) {
        res.status(422).json({ error: "Name is required" });
        return;
    }
    if (!price) {
        res.status(422).json({ error: "Price is required" });
        return;
    }
    if (!image) {
        res.status(422).json({ error: "Image is required" });
        return;
    }

    const product = {
        name,
        price,
        image,
    };

    try {
        const updateProduct = await Product.findByIdAndUpdate(
            { _id: id },
            product
        );

        if (!updateProduct) {
            res.status(422).json({ message: "Id Invalid!" });
            return;
        }

        res.status(200).json(product);
    } catch (error) {}
});

// Deletar Produtos
router.delete("/:id", async (req, res) => {
    const id = req.params.id;
    const product = await Product.findById({ _id: id });

    if (!product) {
        res.status(422).json({ message: "Id Invalid!" });
        return;
    }

    try {
        await Product.deleteOne({ _id: id });
        res.status(200).json({ message: "Successfully deleted!" });
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

module.exports = router;
