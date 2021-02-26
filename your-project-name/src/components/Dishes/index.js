import React, {useState} from "react";

const initialDishes = [
    { name: "jelly",
      link: function(){
        return "images/" + this.name + ".jpg"
      }
    }
]

function Dishes (props) {
    const [dishes, setDishes] = useState(initialDishes)
    console.log(initialDishes.name)
    return (
        <div>
            <h2>DISHES:</h2>
            <ul>
                {
                dishes.map(currentValue => (
                    <li key={currentValue.name}>
                        <p>{currentValue.name}</p>
                        <img src={currentValue.link()} alt={currentValue.name}/>
                    </li>
                ))
                }
            </ul>
        </div>
    )
}

export default React.memo(Dishes);