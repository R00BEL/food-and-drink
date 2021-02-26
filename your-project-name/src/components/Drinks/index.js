import React, {useState} from "react";

const initiaDrinks = [
    { name: "green tea"},
    { name: "latte"}
]


function Drinks (props) {
    const [drinks, setDrinks] = useState(initiaDrinks)

    return (
        <div>
            <h2>DRINKS:</h2>
            <ul>
                {
                drinks.map(drinks => (
                    <li>
                        <p>{drinks.name}</p>
                        <img src={"images/" + drinks.name + ".jpg"} alt={drinks.name}/>
                    </li>
                ))
                }
            </ul>
        </div>
    )
}

export default React.memo(Drinks);