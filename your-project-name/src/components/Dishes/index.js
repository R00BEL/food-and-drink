import React, {useState} from "react";

const initialDishes = [
    { name: "jelly"}
]

function Dishes (props) {
    const [dishes, setDishes] = useState(initialDishes)

    return (
        <div>
            <h2>DISHES:</h2>
            <ul>
                {
                dishes.map(currentValue => (
                    <li key={currentValue.name}>
                        <p>{currentValue.name}</p>
                        <img src={"images/" + currentValue.name + ".jpg"} alt={currentValue.name}/>
                    </li>
                ))
                }
            </ul>
        </div>
    )
}

export default React.memo(Dishes);