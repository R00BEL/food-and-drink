import React, {useState, useCallback} from "react";

const URL = 'http://localhost:3002/signIn'

function Account (props){
    const [valueLogin, setValueLogin] = useState("")
    const [valuePassword, setValuePassword] = useState("")

    const changeLogin =  useCallback((e) =>{
        setValueLogin(e.target.value);
    }, []);

    const changePassword =  useCallback((e) =>{
        setValuePassword(e.target.value);
    }, []);

    const click = useCallback(()=>{
        fetch(URL, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "login": valueLogin,
                "password" : valuePassword
            }),
        })
            .then(response => response.json())
            .then(data =>{
                localStorage.setItem("id", data.token);
            });
        setValueLogin("")
        setValuePassword("")
    }, [valueLogin, valuePassword])

    return(
        <div>
            <h1>Sign in to your account:</h1>
            <p>Login:</p>
            <input type="text" value={valueLogin} onChange={changeLogin}/>
            <p>Password:</p>
            <input type="text" value={valuePassword} onChange={changePassword}/>
            <button onClick={click}>Sign in</button>
        </div>
    )
}

export default React.memo(Account);