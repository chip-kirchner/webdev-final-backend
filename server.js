import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import recipeController from "./contollers/recipe-controller.js";

const CONNECTION_STRING = process.env.DB_CONNECTION_STRING
    || 'mongodb://localhost:27017/webdev';

mongoose.connect(CONNECTION_STRING);

const app = express();
app.use(cors());
app.use(express.json());
recipeController(app);
app.listen(process.env.PORT || 4000);