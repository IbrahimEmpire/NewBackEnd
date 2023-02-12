import { app, PORT, client } from './new.js';
import bcrypt from "bcrypt";

export async function PutMovie(id, updateMovie) {
  return await client.db("mickey").collection("movie").updateOne({ id: id }, { $set: updateMovie });
}
export async function PostMovie(newMovie) {
  return await client.db("mickey").collection("movie").insertMany(newMovie);
}
export async function GetMovieByLanguage(req) {
  return await client.db("mickey").collection("movie").find(req.query).toArray();
}
export async function DeleteMovie(id) {
  return await client.db("mickey").collection("movie").deleteOne({ id: id });
}
export async function GetMovieById(id) {
  return await client.db("mickey").collection("movie").findOne({ id: id });
}
export async function genPasword(password){
  const salt = await bcrypt.genSalt(10);
  console.log(salt)
const hash = await bcrypt.hash(password, salt);
console.log(hash)
return  hash
}

export async function createUser(userName, hashPassword){
  return await client.db("mickey").collection("users").insertOne({userName: userName, password: hashPassword })
}

export async function CheckUser(userName){
  return await client.db("mickey").collection("users").findOne({userName: userName})
}

