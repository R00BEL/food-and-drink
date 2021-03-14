import React, {useEffect, useState, useMemo} from "react";
import {Route} from "wouter";

import Dishes from "./components/Dishes/index.js";
import Drinks from "./components/Drinks/index.js";
import Nav from "./components/Nav/index.js";
import Account from "./components/Account/index.js";
import CheckIn from "./components/CheckIn/index.js";

const URL = "http://localhost:3002/foodAndDrinks" 

function App() {
  const [foodAndDrinks, setFoodAndDrinks] = useState([]);

  useEffect(() => {
    fetch(URL, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem("id")
        }
    })
        .then(response => response.json())
        .then(data =>{
            setFoodAndDrinks(data);
        })
    })

  const drinks = useMemo(() => foodAndDrinks.filter(currentValue => currentValue.type === "drink"), [foodAndDrinks])
  const dishes = useMemo(() => foodAndDrinks.filter(currentValue => currentValue.type === "dishe"), [foodAndDrinks])

  return (
    <div>
      <Nav/>
      <Route path="/dishes">
        <Dishes data={dishes}/>
      </Route>
      <Route path="/drinks">
        <Drinks data={drinks}/>
      </Route>
      <Route path="/logIn">
        <Account/>
      </Route>
      <Route path="/checkIn">
        <CheckIn/>
      </Route>
    </div>
  );
}

export default App;
