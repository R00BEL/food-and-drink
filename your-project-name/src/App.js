import React, {useEffect, useState} from "react";
import Dishes from "./components/Dishes/index.js";
import Drinks from "./components/Drinks/index.js";

function App() {
  const [foodAndDrinks, setFoodAndDrinks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3002/foodAndDrinks", {mode: 'cors'})
        .then(response => response.json())
        .then(data =>{
          setFoodAndDrinks(data);
        });
  })
  
  const drinks = foodAndDrinks.filter(currentValue => currentValue.type === "drink");
  const dishes = foodAndDrinks.filter(currentValue => currentValue.type === "dishe");

  return (
    <div>
      <Dishes data={dishes}/>
      <Drinks data={drinks}/>
    </div>
  );
}

export default App;
