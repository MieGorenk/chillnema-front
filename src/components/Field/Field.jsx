import React from "react";

const Field = (props) => {
    return (
        <label>
            {props.label}
            <input 
                name={props.name}
                type={props.type}
                value={props.value}
                onChange={props.onChange}
            />
        </label>
    )
}

export default Field;