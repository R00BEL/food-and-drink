import React from "react";

const drinks = ["green tea", "latte"]

function Drinks (props) {
    return (
        <div>
            <h2>DRINKS:</h2>
            <ul>
                {
                drinks.map(drinks => (
                    <li>
                        <p>{drinks}</p>
                        <img src={"images/" + drinks + ".jpg"}/>
                    </li>
                ))
                }
            </ul>
        </div>
    )
}

export default React.memo(Drinks);