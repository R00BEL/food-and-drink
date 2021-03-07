import React, {useState, useEffect, useCallback} from "react";

const URL = 'http://localhost:3002/drinks'
const data = { username: 'example' };

function Drinks (props) {
    const [drinks, setDrinks] = useState([]);
    const [value, setValue] = useState("")

    useEffect(() => {
        fetch(URL, {mode: 'cors'})
            .then(response => response.json())
            .then(data =>{
                setDrinks(data);
            });
      }, [value])
    
    const change = useCallback((e)=>{
        setValue(e.target.value)
    }, [value])

    const click = useCallback(()=>{
        fetch('http://localhost:3002/addDrinks', {
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
            <p>add drink:</p>
            <input type="text" value={value} onChange={change}/>
            <button onClick={click}>add</button>
        </div>
    )
}

export default React.memo(Drinks);