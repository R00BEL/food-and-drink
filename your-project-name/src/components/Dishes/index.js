import React from "react";

const dishes = ["Jelly"]

function Dishes (props) {
    return (
        <div>
            <h2>DISHES:</h2>
            <ul>
                {
                dishes.map(dishes => (
                    <li>
                        <p>{dishes}</p>
                        <img src={"images/" + dishes + ".jpg"}/>
                    </li>
                ))
                }
            </ul>
        </div>
    )
}

export default React.memo(Dishes);