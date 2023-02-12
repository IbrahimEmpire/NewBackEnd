// const express = require('express')
// const { MongoClient } = require('mongodb');
import * as dotenv from 'dotenv'
import express from 'express'
import bcrypt from "bcrypt";
import cors from 'cors'
import { MongoClient } from 'mongodb'
import { movieRouter } from './Product/movie.js'
import { userRouter } from './Product/user.js';
// import { GetMovieById, DeleteMovie, GetMovieByLanguage, PostMovie, PutMovie } from './helper.js'

dotenv.config()
export const app = express()
app.use(cors())
export const PORT = process.env.PORT
const The_url = process.env.MONGO_URL;
console.log(process.env.PORT)
async function createConnection() {
  
  const client = new MongoClient(The_url);
  await client.connect();
  console.log("mongo is connected");
  return client;
}
export const client = await createConnection();
app.use(express.json())


// Need portal open
app.get('/',(req, res)=> {
  res.send('Hello World')
})


app.use("/movie", movieRouter)
app.use("/user", userRouter)

app.listen(PORT, () => console.log("port is started: ", PORT));




















