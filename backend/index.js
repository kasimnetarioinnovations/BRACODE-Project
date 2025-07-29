// const express = require('express');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const connectDB = require('./config/db');
// const userRoutes = require('./route/User');

// dotenv.config();
// const app = express();
// app.use(cors());
// app.use(express.json());

// connectDB();

// app.get("/", (req, res) => {
//   res.send("API is running...");
// });

// app.use('/api/users', userRoutes);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./route/User');
const productRoutes = require('./route/AddProduct');
const scannedProductRoutes = require('./route/scannedProducts');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use('/api/users', userRoutes);
app.use('/api', productRoutes); // ✅ Mount this route
app.use('/api', scannedProductRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
