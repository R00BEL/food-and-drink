import React, {useState} from "react";

const initialDishes = [
    { name: "jelly"},
]

function Dishes (props) {
    const [dishes, setDishes] = useState(initialDishes)

    return (
        <div>
            <h2>DISHES:</h2>
            <ul>
                {
                dishes.map(dishes => (
                    <li>
                        <p>{dishes.name}</p>
                        <img src={"images/" + dishes.name + ".jpg"} alt={dishes.name}/>
                    </li>
                ))
                }
            </ul>
        </div>
    )
}

export default React.memo(Dishes);