import express from 'express';
import cors from 'cors';
import helmet from "helmet";
import morgan from 'morgan';
import dotenv from 'dotenv';
import mongoose from "mongoose";
import cookieParser from 'cookie-parser';

import userRoute from './routes/users.js'
import authRoute from './routes/auth.js'
import postRoute from './routes/posts.js'

const app = express();
const PORT = process.env.PORT || 8080;
dotenv.config();

//connect to mongodb
mongoose.connect(process.env.mongodb, {dbName: 'ethan-book'}, () => {
    console.log('mongodb connected');
})

//use middlewares
app.use(helmet());
app.use(cookieParser());
app.use(morgan('common'));
// app.use(cors());
app.use(cors({
    origin: ["http://localhost:3000","https://ethan-book-client.onrender.com"],
    credentials: true,
    optionSuccessStatus: 200
}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));


//set routers
app.use('/api/user', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/post', postRoute);

//test
app.get('/', (req, res) => {
    res.status(200).json('welcome(test)')
})

//route catch all
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// app.use(express.static("../client/public"));
app.use(express.static(__dirname + '../client/public'));
// app.use(express.static(__dirname, "../client/public"));
// app.use(express.static(__dirname, "/"));
// app.use(express.static(__dirname));
// app.use(express.static("public"));
app.get("/*", (req, res) => {
    // res.sendFile(path.join(__dirname, "../client/public/index.html"), err => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"), err => {
        if (err) res.status(500).send(err);
    });
});
// app.use(express.static("../client/public"));
// app.use(express.static(__dirname, "../client/public"));
// app.use(express.static(__dirname, "/"));
// app.use(express.static(__dirname));
// app.use(express.static("public"));


// app.use(express.static(__dirname + '../client/public'));
// app.get('*', function (request, response) {
//     response.sendFile(path.resolve(__dirname, '../client/public/index.html'));
// });


app.listen(PORT, () => {
    console.log('backend starts');
})