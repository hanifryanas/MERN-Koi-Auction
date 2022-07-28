require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

mongoose.connect(process.env.DB_URL, { 
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('DB is connected'))
.catch((err) => console.log(err));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));
app.use(cors(
    {
        origin: process.env.ORIGIN,
        credentials: true
    }
));
app.options('*', cors()) 
    
app.use('/user', require('./routes/user.routes'));
app.use('/product', require('./routes/product.routes'));
    
const port = process.env.PORT;
app.listen(port, () => {
    console.log('Server started on port ' + port);
});