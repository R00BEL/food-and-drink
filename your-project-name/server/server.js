const express = require("express");
const cors = require('cors');
const bodyParser = require("body-parser");
const app = express();

app.use(cors());
app.use(bodyParser.json());

const PORT = 3002;

const TYPES = {
    DRINK: "drink",
    DISH: "dishe"
}

const  foodAndDrinks = [
    {
        "type": TYPES.DRINK,
        "name": "green tea",
        "link": "images/green tea.jpg"
    },
    {
        "type": TYPES.DRINK, 
        "name": "latte",
        "link": "images/latte.jpg"
    },
    {
        "type": TYPES.DISH,
        "name": "jelly",
        "link": "images/jelly.jpg"
    }
]

app.get("/foodAndDrinks", function(request, response){
    response.json(foodAndDrinks)
});

app.post("/addFoodAndDrinks", function(request, response){
    foodAndDrinks.push(request.body);
    console.log("added to drinks: " + request.body.name);
});

app.post("/logIn", function(request, response){
    if(request.body.login === "user" && request.body.password === "123"){
        console.log("you entered");
    } else {
        console.log("Incorrect login or password");
    }
});

app.listen(PORT, () => {
    console.log(`server start woking on port ${PORT}...`);
})