import React, {useState} from "react";

const initiaDrinks = [
    { name: "green tea",
      link: function(){
        return "images/" + this.name + ".jpg"
      }
    },
    { name: "latte",
        link: function(){
        return "images/" + this.name + ".jpg"
      }
    }
]


function Drinks (props) {
    const [drinks, setDrinks] = useState(initiaDrinks)

    return (
        <div>
            <h2>DRINKS:</h2>
            <ul>
                {
                drinks.map(currentValue => (
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

export default React.memo(Drinks);