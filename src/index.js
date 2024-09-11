import 'dotenv/config'
import mongoose from "mongoose";
import ConnectDB from "./db/index.js";
import express from 'express';
import {app} from './app.js'

 await ConnectDB().then(() => {
    app.listen(process.env.PORT || 9000, () => {console.log(`app is listening at ${process.env.PORT}`)})
}).catch((err) => {console.log(err)});

