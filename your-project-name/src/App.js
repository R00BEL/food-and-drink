import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { Route } from 'wouter';

import Dishes from './components/Dishes/index.js';
import Drinks from './components/Drinks/index.js';
import Nav from './components/Nav/index.js';
import SignUp from './components/SignUp/index.js';
import SingIn from './components/SignIn/index.js';
import Setting from './components/Setting/index.js';

const URL = 'http://localhost:3002/foodAndDrinks';
const urlTypes = 'http://localhost:3002/types';

function App() {
    const [foodAndDrinks, setFoodAndDrinks] = useState([]);
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
                setFoodAndDrinks(data);
            });
    }, [indicator]);

    const drinks = useMemo(
        () => foodAndDrinks.filter((currentValue) => currentValue.type === 'drink'),
        [foodAndDrinks],
    );
    const dishes = useMemo(
        () => foodAndDrinks.filter((currentValue) => currentValue.type === 'dishe'),
        [foodAndDrinks],
    );

    return (
        <div>
            <Nav tupes={types} status={status} />
            <Route path="/dishes">
                {status ? (
                    <Dishes data={dishes} setIndicator={setIndicator} />
                ) : (
                    <p>log in or sign in to your account</p>
                )}
            </Route>
            <Route path="/drinks">
                {status ? (
                    <Drinks data={drinks} setIndicator={setIndicator} />
                ) : (
                    <p>log in or sign in to your account</p>
                )}
            </Route>
            <Route path="/signUp">
                <SignUp />
            </Route>
            <Route path="/singIn">
                <SingIn setIndicator={setIndicator} />
            </Route>
            <Route path="/setting">
                {status ? (
                    <Setting setIndicator={setIndicator} />
                ) : (
                    <p>log in or sign in to your account</p>
                )}
            </Route>
        </div>
    );
}

export default App;
