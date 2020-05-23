import React, { useState } from 'react'
import Field from '../../components/Field'

function AdminMovie() {
    const [movieName, setMovieName] = useState("")
    const [rated, setRated] = useState("")
    const [runtime, setRuntime] = useState("")
    const [released, setReleased] = useState("")
    const [plot, setPlot] = useState("")
    const [source, setSource] = useState("")
    const [file, setFile] = useState(null)

    const handleMovieInfo = async () => {
         const response = await fetch(`http://www.omdbapi.com/?t=${movieName}&apikey=7be3e5c2`)
         const movieInfo = await response.json()
         // TODO kalo ga ada datanya kasi tau
         console.log(movieInfo)
         setRated(movieInfo.Rated)
         setRuntime(movieInfo.Runtime)
         setReleased(movieInfo.Released)
         setPlot(movieInfo.Plot)

    }

    const handleFileSearch = (e) => {
        setFile(e.target.files[0])
    }

    const handleUpload = async () => {
        const formData = new FormData()
        formData.append("file", file)
        const response = await fetch("http://localhost:8000/resource", {
            // still without cors
            method: 'POST',
            body: formData,
                // headers: {
                //     'Content-Type': 'multipart/form-data',
                // }
        })
        const data = await response.json()
        console.log(data)
        setSource(data.URL)
    }

    return (
        <div>
            <h1>Upload Movie</h1>
            <Field label="Movie Name" name="movie" type="text" value={movieName} onChange={e => setMovieName(e.target.value)} />
            <button
             onClick={handleMovieInfo}>Get Movie Info</button>
            <Field label="Rating" name="rating" type="text" value={rated || ""} onChange={e => setRated(e.target.value)} />
            <Field label="Runtime" name="runtime" type="text" value={runtime || ""} onChange={e => setRuntime(e.target.value)} />
            <Field label="Released" name="released" type="text" value={released || ""} onChange={e => setReleased(e.target.value)} />
            <Field label="Plot" name="plot" type="text" value={plot || ""} onChange={e => setPlot(e.target.value)} />
            <Field label="Video Source" name="source" type="text" value={source} onChange={e => setSource(e.target.value)} />

                <label>
                    Movie File: 
                    <input type="file" onChange={handleFileSearch}/>
                    <button onClick={handleUpload}>Upload File</button>
                </label>

            <button>Upload Movie</button>
        </div>

    )

}

export default AdminMovie
