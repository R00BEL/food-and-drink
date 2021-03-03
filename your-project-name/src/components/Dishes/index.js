import React, {useState, useEffect} from "react";

function Dishes (props) {
    const [dishes, setDishes] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3002/dishes", {mode: 'cors'})
            .then(response => response.json())
            .then(data =>{
                setDishes(data);
            });
      }, [])

    return (
        <div>
            <h2>DISHES:</h2>
            <ul>
                {
                dishes.map(currentValue => (
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

export default React.memo(Dishes);