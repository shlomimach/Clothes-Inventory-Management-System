const express = require('express');
const cors = require('cors'); // ייבוא חבילת CORS
const app = express();
const port = 3000;
const jFile = require('jsonfile');
const filePath = 'Products.json';

app.use(cors()); // שימוש בחבילת CORS
app.use(express.json());

app.get('/products', async (req, res) => {
    try {
        const data = await jFile.readFile(filePath);
        res.json(data.Products);
    } catch (error) {
        res.status(500).json({ error: 'Failed to read products' });
    }
});

app.get('/products/:ProductId', async (req, res) => {
    const productId = parseInt(req.params.ProductId); 
    try {
        const data = await jFile.readFile(filePath);
        const product = data.Products.find(p => p.ProductId === productId);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to read product' });
    }
});

app.post('/products', async (req, res) => {
    let newProduct = req.body;
    try {
        const data = await jFile.readFile(filePath);
        const lastId = Math.max(...data.Products.map(p => p.ProductId));
        newProduct.ProductId = lastId + 1;
        newProduct = sortObjectKeys(newProduct);
        data.Products.push(newProduct);
        await jFile.writeFile(filePath, data, { spaces: 2 });
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ error: 'Failed to add product' });
    }
});


const sortObjectKeys = (obj) => {
    const keyOrder = ["ProductId", "Description", "Count", "Type", "Gender", "Size", "Price"];
    const ordered = {};
    keyOrder.forEach(key => {
        if (obj.hasOwnProperty(key)) {
            ordered[key] = obj[key];
        }
    });
    return ordered;
};

app.delete('/products/:ProductId', async (req, res) => {
    const productId = parseInt(req.params.ProductId);
    try {
        const data = await jFile.readFile(filePath);
        const originalLength = data.Products.length;
        const newProducts = data.Products.filter(p => p.ProductId !== productId);

        if (newProducts.length === originalLength) {
            return res.status(404).json({ error: "ProductID does not exist" });
        }

        data.Products = newProducts;
        await jFile.writeFile(filePath, data, { spaces: 2 });
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete product' });
    }
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

