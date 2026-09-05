const express = require('express');
const app = express();
require('dotenv').config();
const db = require('./db');
// const {jwtAuthMiddleware} = require('./jwt');

const userRoutes = require('./routes/userRoutes');
const candidateRoutes = require('./routes/candidateRoutes');

const path = require('path');
app.use(cors());
app.use(bodyParser.json()); // req.body
app.use('/candidates', express.static(path.join(__dirname, 'frontend', 'public', 'candidates')));
const PORT = process.env.PORT || 3000;


app.use('/user', userRoutes); 
app.use('/candidate', candidateRoutes); 

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
