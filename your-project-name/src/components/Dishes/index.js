import React, {useState, useCallback} from "react";

const URL = 'http://localhost:3002/addFoodAndDrinks'

function Dishes (props) {
    const [value, setValue] = useState("")

    const change = useCallback((e)=>{
        setValue(e.target.value)
    }, [])

    const click = useCallback(()=>{
        fetch(URL, {
            method: "POST",
            headers: { 
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "type": "dishe",
                "name" : value,
                "link": "images/crash.jpg"
            }),
        })
        props.setIndicator(value)
        setValue("")
    }, [value])

    return (
        <div>
            {(props.data[0])
            ? 
            <div>
                <h2>DISHES:</h2>
                <ul>
                    {
                    props.data.map(currentValue => (
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
            :
            <p>log in or sign in to your account</p>
            }
        </div>
    )
}

export default React.memo(Dishes);