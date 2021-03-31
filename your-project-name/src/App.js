import React, { useEffect, useState, useMemo, useCallback } from 'react';
import axios from 'axios';
import { Route } from 'wouter';

import Nav from './components/Nav/index.js';
import SignUp from './components/SignUp/index.js';
import SingIn from './components/SignIn/index.js';
import Setting from './components/Setting/index.js';
import Article from './components/Article/index.js';

const URL = 'http://localhost:3001/lists';
const urlTypes = 'http://localhost:3001/types';

function App() {
    const [lists, setlists] = useState([]);
    const [types, setTypes] = useState([]);
    const [indicator, setIndicator] = useState(0);
    const [status, setStatus] = useState(0);

    useEffect(() => {
        // fetch(urlTypes, {
        //     method: 'GET',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         Authorization: 'Bearer ' + localStorage.getItem('id'),
        //     },
        // })
        //     .then((response) => response.json())
        //     .then((data) => {
        //         setTypes(data);
        //     });

        axios({
            method: 'get',
            url: urlTypes,
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('id')
            }
        })
            .then(function (response) {
                setTypes(response.data);
            })
    }, [indicator]);

    useEffect(() => {
        axios({
            method: 'get',
            url: URL,
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('id')
            }
        })
            .then(function (response) {
                console.log(response)
                setlists(response.data)
                setStatus(response.status)
            })

    }, [indicator]);

    console.log(status)

    return (
        <div>
            <Nav tupes={types} status={status} />
            <Route path="/signUp">
                <SignUp />
            </Route>
            <Route path="/singIn">
                <SingIn setIndicator={setIndicator} />
            </Route>
            <Route path="/setting">{status && <Setting setIndicator={setIndicator} />}</Route>
            {status ? (
                <Article types={types} data={lists} setIndicator={setIndicator} />
            ) : (
                <p>please login or create an account to use our application</p>
            )}
        </div>
    );
}

export default App;
