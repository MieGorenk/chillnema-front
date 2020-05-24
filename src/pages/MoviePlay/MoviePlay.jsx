import React from "react"
import ReactPlayer from "react-player"
import Header from "../../components/Header"
import "./MoviePlay.css"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const MoviePlay = () => {
    const [name, setName] = useState("")
    const [source, setSource] = useState("")
    const [subtitle, setSubtitle] = useState("")
    const [rated, setRated] = useState("")
    const [genre, setGenre] = useState("")
    const [runtime, setRuntime] = useState("")
    const [plot, setPlot] = useState("")
    const [loading, setLoading] = useState(true)
    const { id } = useParams()

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`https://api.chillnema.net/movies/${id}`)
            const data = await response.json()
            setName(data.Name)
            setSource(data.Source)
            setSubtitle(data.Subtitle)
            setRated(data.Rated)
            setGenre(data.Genre)
            setRuntime(data.Runtime)
            setPlot(data.Plot)
            setLoading(false)
            console.log(data)
        }
        fetchData()
    }, [id])



    return (
        <div className="play-base">
            <Header />
            {loading ? <div></div> :
                <div className="player">
                    <ReactPlayer
                        className="video"
                        url={[
                            {src:source,
                            type:"video/mp4"}
                        ]}
                        controls={true}
                        config={
                            {
                                file: {
                                    attributes: {
                                        crossOrigin: 'anonymous'
                                    },
                                    tracks: [
                                        { kind: "subtitles", src: subtitle, srcLang: 'en', default: true, label: "English" },
                                    ]
                                }
                            }
                        }
                    />
                </div>

            }

            {/* <Plyr
                    type="video"
                    //url={source}
                    sources={[{
                        src:"",
                        type:"video/mp4"
                    }]}
                    // tracks={
                    //     [
                    //         {
                    //             src: subtitle,
                    //             kind:"subtitles",
                    //             label:"English",
                    //             srclang:"en",
                    //             default:true
                    //     }
                    //     ]
                    // }
                /> */}
            {/* <video controls>
                    <source src={source} type="video/mp4">

                </video> */}


            <div className="movie-play-detail">
                <p className="movie-play-title">{name}</p>
                <p className="movie-data-container">
                    <span className="nowrap movie-data cert">{rated}</span>
                    <span className="nowrap movie-data">  &bull;</span>
                    <span className="nowrap movie-data">  {runtime}</span>
                    <span className="nowrap movie-data">  &bull;</span>
                    <span className="nowrap movie-data">  {genre}</span>

                </p>
                <hr />
                <p className="movie-play-info">{plot}</p>

            </div>
        </div>
    )
}

export default MoviePlay