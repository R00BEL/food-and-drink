const express = require("express");
const cors = require('cors');
const bodyParser = require("body-parser");
const app = express();

app.use(cors());
app.use(bodyParser.json());

const PORT = 3002;

const drinks = [
    { 
        "name": "green tea",
        "link": "images/green tea.jpg"
    },
    { 
        "name": "latte",
        "link": "images/latte.jpg"
    }
]

const dishes = [
    { 
        "name": "jelly",
        "link": "images/jelly.jpg"
    }
]

app.get("/drinks", function(request, response){
    response.json(drinks)
});

app.get("/dishes", function(request, response){
    response.json(dishes)
});

app.post("/addDrinks", function(request, response){
    drinks.push(request.body);
    console.log("added to drinks: " + request.body.name);
});

app.post("/addDishes", function(request, response){
    dishes.push(request.body);
    console.log("added to dishes: " + request.body.name);
});


app.listen(PORT, () => {
    console.log(`server start woking on port ${PORT}...`);
})