import React, { useEffect, useState } from 'react'
import "./Home.scss"
import axios from 'axios';
import { Link } from 'react-router-dom';
import { BiPlay } from 'react-icons/bi';
import{AiOutlinePlus} from 'react-icons/ai'

const apiKey= "88c15f3e9fe422a3c2cf17b997e44173"
const url="https://api.themoviedb.org/3"
const upcoming= "upcoming"
const nowPlaying="now_playing"
const popular="popular"
const topRated="top_rated"
const imgUrl="https://image.tmdb.org/t/p/original"

const Card =({img}) =>(
    <img className='card' src={img} alt="cover" />
)
const Row = ({title,arr=[{
img:"https://cdn.marvel.com/u/prod/marvel/i/mg/5/a0/645111e2c5b2d/clean.jpg"
}]}) =>(
    <div className='row'>
        <h2>{title}</h2>
        <div>
      {
        arr.map((item,index) =>(
            <Card key ={index}img={`${imgUrl}/${item.poster_path}`}/>
        ))
      }
       
        </div>
    </div>
)
const Home = () => {
  const [upcomingMovies,SetUpcomingMovies]= useState([])
  const [nowPlayingMovies,SetNowPlayingMovies]= useState([])
  const [popularMovies,SetPopularMovies]= useState([])
  const [topRatedMovies,SetTopRatedMovies]= useState([])
  const [Genre,SetGenre]= useState([])

useEffect(() => {
const fetchUpcoming = async() =>{
  const { data : {results} }= await  axios.get(`${url}/movie/${upcoming}?api_key=${apiKey}`)
    SetUpcomingMovies(results)
};
const fetchNowPlaying = async() =>{
  const { data : {results} }= await  axios.get(`${url}/movie/${nowPlaying}?api_key=${apiKey}`)
  SetNowPlayingMovies(results)
};
const fetchPopular = async() =>{
  const { data : {results} }= await  axios.get(`${url}/movie/${popular}?api_key=${apiKey}`)
  SetPopularMovies(results)
};
const fetchTopRated = async() =>{
  const { data : {results} }= await  axios.get(`${url}/movie/${topRated}?api_key=${apiKey}`)
    SetTopRatedMovies(results)
};
const fetchGenre= async() =>{
  const { data : {genres} }= await  axios.get(`${url}/genre/movie/list?api_key=${apiKey}`)
    SetGenre(genres)
};
fetchUpcoming()
fetchNowPlaying()
fetchPopular()
fetchTopRated()
fetchGenre()


},[])




  return (
    <section className='Home'>
      <div className="banner" style={{
        backgroundImage: popularMovies[0]?`url(${imgUrl}/${popularMovies[0].poster_path})`:"none"
      }}>
         {
          popularMovies[0] &&(
            <h1>{popularMovies[0].original_title}</h1>
          )
         }
         {
          popularMovies[0] &&(
            <p>{popularMovies[0].overview}</p>
          )
         }
        <div> <button>Play <BiPlay/></button>
        <button>My List<AiOutlinePlus/></button></div>
       
      </div>
      <Row title={"Upcoming Movies"} arr={upcomingMovies}/>
      <Row title={"now playing"} arr={nowPlayingMovies}/>
   
      <Row title={"Popular on Netflix"}arr={popularMovies}/>
      <Row title={"Top Rated"}arr={topRatedMovies}/>

      <div className="genrebox">
        {Genre.map((item)=>(
          <Link key={item.id}to={`/genre/${item.id}`}>{item.name}</Link>
        ))}
      </div>
      
    </section>
  )
}

export default Home
