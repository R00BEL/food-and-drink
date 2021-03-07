import React, {useState, useEffect, useCallback} from "react";

function Dishes (props) {
    const [dishes, setDishes] = useState([]);
    const [value, setValue] = useState("")

    useEffect(() => {
        fetch("http://localhost:3002/dishes", {mode: 'cors'})
            .then(response => response.json())
            .then(data =>{
                setDishes(data);
            });
      }, [value])

    const change = useCallback((e)=>{
        setValue(e.target.value)
    }, [value])

    const click = useCallback(()=>{
        fetch('http://localhost:3002/addDishes', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "name" : value,
                "link": "images/crash.jpg"
            }),
        })
        setValue("")
    }, [value])

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
            <p>add dishes:</p>
            <input type="text" value={value} onChange={change}/>
            <button onClick={click}>add</button>
        </div>
    )
}

export default React.memo(Dishes);