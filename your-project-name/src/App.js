import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { Route } from 'wouter';

import Dishes from './components/Dishes/index.js';
import Drinks from './components/Drinks/index.js';
import Nav from './components/Nav/index.js';
import SignUp from './components/SignUp/index.js';
import SingIn from './components/SignIn/index.js';

const URL = 'http://localhost:3002/foodAndDrinks';

function App() {
    const [foodAndDrinks, setFoodAndDrinks] = useState([]);
    const [indicator, setIndicator] = useState(0);
    const [status, setStatus] = useState(true);

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
            <Nav />
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
        </div>
    );
}

export default App;
