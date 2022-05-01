import express from "express";
import session from "express-session";
import mongoose from "mongoose";
import cors from "cors";
import recipeController from "./contollers/recipe-controller.js";
import authController from "./contollers/auth-controller.js";
import userController from "./contollers/user-controller.js";
import postController from "./contollers/post-controller.js";
import planController from "./contollers/plans-controller.js";

const CONNECTION_STRING = process.env.DB_CONNECTION_STRING
    || 'mongodb://localhost:27017/webdev';

mongoose.connect(CONNECTION_STRING);

const app = express();
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}));

app.use(session({
    secret: 'SECRETO',
    cookie: {secure: false},
    saveUninitialized: true,
    resave: false
}));

app.use(express.json());

recipeController(app);
authController(app);
userController(app);
postController(app);
planController(app);

app.listen(process.env.PORT || 4000);