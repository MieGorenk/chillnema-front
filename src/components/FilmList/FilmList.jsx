import React from 'react'
import './FilmList.css'

const FilmList = (props) => {
    return (
        <li className="list-container">
            <a className="list" href="/" onClick={props.onClick}>{props.film}</a>
        </li>
        
    )
}

export default FilmList;