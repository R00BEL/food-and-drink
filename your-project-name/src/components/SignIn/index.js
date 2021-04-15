import React, { useState, useCallback } from 'react';
import axios from 'axios';

const URL = 'http://localhost:3001/accounts/signIn';

function SignIn(props) {
    const [valueLogin, setValueLogin] = useState('');
    const [valuePassword, setValuePassword] = useState('');

    const changeLogin = useCallback((e) => {
        setValueLogin(e.target.value);
    }, []);

    const changePassword = useCallback((e) => {
        setValuePassword(e.target.value);
    }, []);

    const click = useCallback(() => {
        axios
            .post(URL, {
                login: valueLogin,
                password: valuePassword,
            })
            .then(function (response) {
                localStorage.setItem('id', response.data.token);
                props.setIndicator(Math.random() * Math.random() * Math.random());
            })
            .catch(function (error) {
                console.log(error);
            });

        setValueLogin('');
        setValuePassword('');
    }, [valueLogin, valuePassword]);

    return (
        <div>
            <h1>Sign in to your account:</h1>
            <p>Login:</p>
            <input type="text" value={valueLogin} onChange={changeLogin} />
            <p>Password:</p>
            <input type="text" value={valuePassword} onChange={changePassword} />
            <button onClick={click}>Sign in</button>
        </div>
    );
}

export default React.memo(SignIn);
