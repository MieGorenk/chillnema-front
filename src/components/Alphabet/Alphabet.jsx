import React from 'react';
import "./Alphabet.css"
const Alphabet = (props) => {
    return (
        <div className="letter-container">
            <p className="title">
                {props.letter}
            </p>
            <hr />
        </div>

    )
}

export default Alphabet