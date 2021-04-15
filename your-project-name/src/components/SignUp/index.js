import React, { useState, useCallback } from 'react';
import axios from 'axios';

const URL = 'http://localhost:3001/accounts/signUp';

function SignUp(props) {
    const [valueLogin, setValueLogin] = useState('');
    const [valuePassword, setValuePassword] = useState('');

    const changeLogin = useCallback((e) => {
        setValueLogin(e.target.value);
    }, []);

    const changePassword = useCallback((e) => {
        setValuePassword(e.target.value);
    }, []);

    const click = useCallback(() => {
        axios({
            method: 'post',
            url: URL,
            data: {
                id: '',
                login: valueLogin,
                password: valuePassword,
            },
        });

        setValueLogin('');
        setValuePassword('');
    }, [valueLogin, valuePassword]);

    return (
        <div>
            <h1>Create a new account:</h1>
            <p>Login:</p>
            <input type="text" value={valueLogin} onChange={changeLogin} />
            <p>Password:</p>
            <input type="text" value={valuePassword} onChange={changePassword} />
            <button onClick={click}>Check In</button>
        </div>
    );
}

export default React.memo(SignUp);
