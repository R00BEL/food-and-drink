import React, {useState, useEffect} from "react";

function Drinks (props) {
    const [drinks, setDrinks] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3002/drinks", {mode: 'cors'})
            .then(response => response.json())
            .then(data =>{
                setDrinks(data);
            });
      }, [])
    
    return (
        <div>
            <h2>DRINKS:</h2>
            <ul>
                {
                drinks.map(currentValue => (
                    <li key={currentValue.name}>
                        <p>{currentValue.name}</p>
                        <img src={currentValue.link} alt={currentValue.name}/>
                    </li>
                ))
                }
            </ul>
        </div>
    )
}

export default React.memo(Drinks);