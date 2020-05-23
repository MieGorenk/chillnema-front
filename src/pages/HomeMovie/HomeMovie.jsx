import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './HomeMovie.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner'
import Alphabet from "../../components/Alphabet"
import FilmList from "../../components/FilmList"
import Header from "../../components/Header"
import data from "../../data-mock/films.json"


function HomeMovie() {
    const [show, setShow] = useState(false)
    const [movie, setMovie] = useState(null)

    const showInfo = async (e, movie) => {
        e.preventDefault()
        setShow(true)
        setMovie(null)
        const response = await fetch(`https://www.omdbapi.com/?t=${movie}&apikey=7be3e5c2`)
        const movieInfo = await response.json()
        const response2 = await fetch("https://chillnema.net/movies")
        const check = await response2.json()
        console.log(check)
        console.log(movieInfo)
        setMovie(movieInfo)
    }

    const MovieDetail = () => (
        <React.Fragment>
            <img className="poster" src={movie.Poster} alt="movie-poster" />
            <br />
            <Link to="movies/1">
                <button className="play">PLAY</button>
            </Link>
            <div className="detail">
                <p className="movie-title">{movie.Title}</p>
                <p className="info">Rated: {movie.Rated}</p>
                <p className="info">Runtime: {movie.Runtime}</p>
                <p className="info">Genre: {movie.Genre}</p>
                <p className="info">Plot: {movie.Plot}</p>
            </div>

        </React.Fragment>
    )

    const Loading = () => (
        <div className="loading">
            <Loader type="Rings" color="#00ADB5" height={80} width={80} />
            <p className="loadinginfo">Fetching Movie Info</p>
        </div>
    )



    return (
        <div>
            <Header />
            <div id="wrapper">
                <div id="left" className="base">
                    {/* No use as of yet */}
                </div>
                <div id="middle" className="base">
                    <div className="middle-container">
                        <input type="text" placeholder="Search" className="search" />
                        {data.map((films, index) => {
                            return (
                                <div key={index}>
                                    <Alphabet letter={films.group} />
                                    <ul>
                                        {
                                            films.children.map((info, index) => {
                                                return (

                                                    <FilmList key={index} film={info.name} onClick={(e) => showInfo(e, info.name)} />
                                                )
                                            })
                                        }
                                    </ul>
                                </div>

                            )
                        })}
                    </div>

                </div>
                <div id="right" className="base">
                    {show ? <div className="movie-info">
                        {movie === null ? <Loading /> : <MovieDetail />}
                    </div> : null}


                </div>
            </div>
        </div>
    )
}

export default HomeMovie