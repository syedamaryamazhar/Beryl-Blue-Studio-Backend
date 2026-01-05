const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

// ✅ MUST BE BEFORE ROUTES
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const orderRoutes = require("./routes/orderRoutes");
const productRoutes = require("./routes/productRoutes");

app.use("/api", orderRoutes);
app.use("/api/products", productRoutes);

app.get("/", (req, res) => {
  res.send("BBS API is running..");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
