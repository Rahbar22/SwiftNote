const express = require('express')
const app = express()
const dotenv = require('dotenv')
const notes = require('./data/notes')
const connectDB = require('./config/db')
const userRoutes = require('./routes/userRoutes')
const noteRoutes = require('./routes/noteRoutes')
const { notFound, errorHandler } = require('./middleware/errorMiddleware')
const noteController = require('./controllers/noteController')
const cors = require('cors');
const path = require('path');
dotenv.config();
connectDB();

app.use(cors());
app.use(express.json());
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/notes', noteRoutes);

if(process.env.NODE_ENV==='PRODUCTION'){
    app.use(express.static(path.join(__dirname, "/frontend/build")));

    app.get("*", function (req, res) {
        res.sendFile(path.join(__dirname, "/frontend", "build", "index.html"));
    });
}

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));