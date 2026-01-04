const db = require('../config/db');

//getting all products
exports.getAllProducts = (req, res) => {
    db.query('SELECT * FROM products', (err, results) => {
        if(err) return res.status(500).json(err);
        res.json(results);
    });
};

//etting product by ids
exports.getProductById = (req, res) => {
    const {id} = req.params;
    db.query('SELEcT * FROM products WHERE id = ?', [id], (err, results) => {
        if(err) return res.status(500).json(err);
        if(results.length === 0) return res.status(404).json({message: 'Product not found'});
        res.json(results[0]);
    });
};

//creating products
exports.createProduct = (req, res) => {
    const {title, price, category, image, smimage, smimage2, type, size, material, description} = req.body;

    const sql = 'INSERT INTO products (title, price, category, image, smimage, smimage2, type, size, material,description) VALUES (?,?,?,?,?,?,?,?,?,?)';
    
    const values = [title, price, category, image, smimage, smimage2, type, size, material, description];

    db.query(sql, values, (err,result) => {
        if(err) {
            console.error("SQL Error:", err.message);
            return res.status(500).json({error:err.message});
        }
        res.status(201).json({
            message: 'Product added successfully!',
            productId: result.insertId
        });
    });
};
