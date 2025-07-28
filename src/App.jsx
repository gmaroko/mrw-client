import { useState, useEffect, createContext } from 'react';
import api from "./api/apiConfig";
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/home/Home';
import { MoviesContext } from './MoviesContext';
import Header from './components/header/Header';
import Trailer from './components/trailer/Trailer';
import Reviews from './components/reviews/Reviews';
import NotFound from './components/404';
import Register from "./components/register/Register.jsx";
import Login from "./components/login/Login.jsx";

const App = () => {
  const [movies, setMovies] = useState([]);

  const getMovies = async () => {
    try{
      const response = await api.get("/movies/?type=now_playing");
      setMovies(response.data.data);
    }
    catch(err){
      console.log(err);
    }
  }

  useEffect(() => {
    getMovies();

  }, []);
  
  return (
    <MoviesContext.Provider value={movies}>

      <div className='App'>
        <Header />

        <Routes>

          <Route path='/' element={ <Layout /> }>
            <Route path='/' element={ <Home /> } />
            <Route path='/trailer/:ytLinkId' element={ <Trailer /> } />
            <Route path='/reviews/:movieId' element={ <Reviews /> } />
            <Route path='/login' element={ <Login /> } />
            <Route path='/register' element={ <Register /> } />
            <Route path='*' element={ <NotFound /> } />
          </Route>

        </Routes>

      </div>

    </MoviesContext.Provider>
  )
}

export default App;
