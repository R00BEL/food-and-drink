const express = require("express");
const cors = require('cors');
const bodyParser = require("body-parser");
const jwt = require('jsonwebtoken')
const crypto = require("crypto");

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
];

const accounts = [];

const SECRET = "SashaCrutou";
const tokenKey = '1a2b-3c4d-5e6f-7g8h'

app.get("/foodAndDrinks", function(request, response){
    response.json(foodAndDrinks)
});

app.post("/addFoodAndDrinks", function(request, response){
    foodAndDrinks.push(request.body);
    console.log("added to drinks: " + request.body.name);
});

app.post("/logIn", function(request, response){
    const userPassword = crypto
        .createHash('sha256')
        .update(request.body.password + SECRET)
        .digest('base64')

    userName = accounts.find(
        currentValue => request.body.login === currentValue.login && 
        userPassword === currentValue.password
    )

    if (userName) console.log("Welcome " + userName.login)
    else console.log('username or password entered incorrectly')
    
    response.json({
        "token": jwt.sign({"id": accounts.login}, SECRET),
    })
});

app.post("/checkIn", function(request, response){
    const userPassword = crypto
        .createHash("sha256")
        .update(request.body.password + SECRET)
        .digest('base64')

    accounts.push(
        {
            "login":request.body.login,
            "password": userPassword
        }
    );

    console.log(accounts);
});

app.listen(PORT, () => {
    console.log(`server start woking on port ${PORT}...`);
})