import React from "react"
import "./Header.css"

const Header = () => {
    return (
        <div className="header">
            <img className="logo" src={require('../../images/chillnema-full.png')} alt="logo" />
        </div>
    )
}

export default Header