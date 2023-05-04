const express = require('express');
const cors = require('cors');
require('dotenv').config();
const rateLimit = require('express-rate-limit');
const PORT = process.env.PORT || 5000;

const app = express();

// Rate Limiting

const limiter = rateLimit({
    windowMs: 1000 * 60 * 60 * 24, // 1 day,
    max:2,
    message:"urinishlar soni juda ko'p",
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})
app.use(limiter);
app.set('trust proxy',1)
// Routes
app.use('/api'  , require('./routes/index'))

// Enable Cors 
app.use(cors({
    
        "origin": "http://localhost:3000",
        "methods": "PUT",
        "optionsSuccessStatus": 200
      
}));

app.listen(PORT , ()=>console.log(`Server running on port ${PORT}`))

