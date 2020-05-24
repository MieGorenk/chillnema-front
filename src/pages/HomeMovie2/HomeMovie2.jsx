import React, { useState, useEffect } from "react"
import { Link } from 'react-router-dom'
import Header from '../../components/Header'
import Alphabet from "../../components/Alphabet"
import { FaStar, FaPlay } from "react-icons/fa"

import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';

import Modal from "react-modal"
import ReactPlayer from 'react-player'
import Loader from 'react-loader-spinner'
import "./HomeMovie2.css"


const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'black'
    }
};

const HomeMovie2 = () => {

    const [showModal, setShowModal] = useState(false)
    const [trailer, setTrailer] = useState('')
    const [loading, setLoading] = useState(true)
    const [movies, setMovies] = useState(null)

    const openModal = (e, trailer) => {
        setShowModal(true)
        setTrailer(trailer)
    }

    const closeModal = () => {
        setShowModal(false)
    }

    const categorizeMovie = (movies) => {
        const sorted = movies.sort((a, b) => a.Name.localeCompare(b.Name));
        const sorted_movies = sorted.reduce((r, e) => {
            let group = e.Name[0]
            // check if first letter is not a number
            if (isNaN(group) === true) {
                if (!r[group]) r[group] = { group, children: [e] }
                // if there is push current element to children array for that letter
                else r[group].children.push(e);
            }
            else {
                if (!r["#"]) r['#'] = { group: "#", children: [e] }
                // if there is push current element to children array for that letter
                else r["#"].children.push(e);
            }
            return r
        }, {})
        const result = Object.values(sorted_movies)
        return result
    }

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("https://www.chillnema.net/api/movies")
            const movies = await response.json()
            const sorted_movies = categorizeMovie(movies)
            setMovies(sorted_movies)
            setLoading(false)
        }
        fetchData()
    }, [])


    return (
        <div>
            <Modal
                isOpen={showModal}
                onRequestClose={closeModal}
                style={customStyles}
            >
                <ReactPlayer
                    url={trailer}
                />
            </Modal>
            <Header />
            {/* Check if movies already fetched */}
            <div className="page">
                {loading === true ?
                    <div className="loading">
                        <Loader type="Rings" color="#00ADB5" height={80} width={80} />
                        <p className="loadinginfo">Getting Our Film Catalogue</p>
                    </div> : <Accordion>
                        {movies.map((alphabet, index) => {
                            return (
                                <React.Fragment key={index}>
                                    <Alphabet letter={alphabet.group} />
                                    <React.Fragment>
                                        {alphabet.children.map((info, index) => {
                                            return (
                                                <AccordionItem key={index}>
                                                    <AccordionItemHeading>
                                                        <AccordionItemButton className="movie-title">
                                                            {info.Name}
                                                        </AccordionItemButton>
                                                    </AccordionItemHeading>
                                                    <AccordionItemPanel className="movie-details-base">
                                                        <div className="movie-details">
                                                            <div className="poster-play">
                                                                <img className="poster" src={info.Poster} alt="poster" />
                                                                <Link to={`movies/${info.ID}`}>
                                                                    <button className="button-play">Watch Now</button>
                                                                </Link>
                                                            </div>
                                                            <div className="info-details">
                                                                <p className="movie-title-details">{info.Name}</p>
                                                                <p className="movie-data-container">
                                                                    <span className="nowrap movie-data cert">{info.Rated}</span>
                                                                    <span className="nowrap movie-data">  &bull;</span>
                                                                    <span className="nowrap movie-data">  {info.Runtime}</span>
                                                                    <span className="nowrap movie-data">  &bull;</span>
                                                                    <span className="nowrap movie-data">  {info.Genre}</span>
                                                                    <span className="nowrap movie-data">  &bull;</span>
                                                                    <span className="nowrap movie-data">  {info.Released}</span>
                                                                </p>
                                                                <div className="score-trailer">
                                                                    <FaStar color="#00ADB5" className="score-trailer-element rating-icon" />
                                                                    <p className="score-trailer-element rating-text">{info.Rating}</p>
                                                                    <FaPlay color="#00ADB5" className="score-trailer-element rating-play" />
                                                                    {/* TODO Change to button */}
                                                                    {/* eslint-disable-next-line  */}
                                                                    <a className="score-trailer trailer-play" onClick={(e) => openModal(e, info.Trailer)}>Play Trailer</a>
                                                                </div>
                                                                <div className="plot-container">
                                                                    <p className="plot-title">Plot</p>
                                                                    <p className="plot-details">{info.Plot}</p>
                                                                </div>
                                                                <div className="director-container">
                                                                    <p className="director-title">Director</p>
                                                                    <p className="director-details">{info.Director}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </AccordionItemPanel>
                                                </AccordionItem>
                                            )
                                        })}
                                    </React.Fragment>
                                </React.Fragment>
                            )
                        })}
                    </Accordion>}
            </div>


        </div>
    )
}

export default HomeMovie2