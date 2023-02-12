import express from 'express'
import { GetMovieById, DeleteMovie, GetMovieByLanguage, PostMovie, PutMovie } from '../helper.js'
import {auth} from './auth.js'


const router = express.Router()
router.get('/:id',async (req,res)=>{
    const {id} = req.params
    // const movie = movies.find((mk)=> mk.id === id)
    const movies = await GetMovieById(id)
    movies ? res.send(movies) : res.status(404).send({message: "Movie is not found"})
 
})


// delete movie

router.delete('/:id',async (req,res)=>{
  const {id} = req.params
  // const movie = movies.find((mk)=> mk.id === id)
  const movies = await DeleteMovie(id)
  movies ? res.send(movies) : res.status(404).send({message: "Movie is not found"})
})


// need language=tamil, rating=8


router.get("/",async(req, res)=>{
    const {language, rating} = req.query
    console.log(req.query, language)

    if(req.query.rating){
      req.query.rating = +req.query.rating
      console.log(req.query)
    }
    const movies = await GetMovieByLanguage(req)
    res.send(movies)
  })

// post method

router.post('/', async(req, res)=> {
const newMovie = req.body
const result = await PostMovie(newMovie)

  res.send(result)
})

//  put method .. updata

router.put('/:id', async(req,res)=>{
  const { id } = req.params
  const updateMovie = req.body
  const result = await PutMovie(id, updateMovie)
 res.send(result)
})

export const movieRouter = router
