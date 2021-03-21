import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { Route } from 'wouter';

import Dishes from './components/Dishes/index.js';
import Drinks from './components/Drinks/index.js';
import Nav from './components/Nav/index.js';
import SignUp from './components/SignUp/index.js';
import SingIn from './components/SignIn/index.js';
import Setting from './components/Setting/index.js';
import Article from './components/Article/index.js';

const URL = 'http://localhost:3002/foodAndDrinks';
const urlTypes = 'http://localhost:3002/types';

function App() {
    const [lists, setlists] = useState([]);
    const [types, setTypes] = useState([]);
    const [indicator, setIndicator] = useState(0);
    const [status, setStatus] = useState(true);

    useEffect(() => {
        fetch(urlTypes, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('id'),
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setTypes(data);
            });
    }, [indicator]);

    useEffect(() => {
        fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('id'),
            },
        })
            .then((response) => {
                setStatus(response.ok);
                return response.json();
            })
            .then((data) => {
                setlists(data);
            });
    }, [indicator]);

    const drinks = useMemo(() => lists.filter((currentValue) => currentValue.type === 'drink'), [
        lists,
    ]);
    const dishes = useMemo(() => lists.filter((currentValue) => currentValue.type === 'dishe'), [
        lists,
    ]);

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
