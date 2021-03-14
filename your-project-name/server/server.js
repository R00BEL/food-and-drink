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

app.use("/foodAndDrinks", function(request, response, next){
    const token = request.headers.authorization
    const payload = jwt.verify(token, SECRET)
    user = accounts.find(currentValue => currentValue.id === payload.id)

    if(user) next()
    else return
})

app.post("/foodAndDrinks", function(request, response){
    response.json(foodAndDrinks)
});

app.post("/addFoodAndDrinks", function(request, response){
    foodAndDrinks.push(request.body);
    console.log("added to drinks: " + request.body.name);
});

app.post("/signIn", function(request, response){
    const userPassword = crypto
        .createHash('sha256')
        .update(request.body.password + SECRET)
        .digest('base64')

    user = accounts.find(
        currentValue => request.body.login === currentValue.login && 
        userPassword === currentValue.password
    )

    if (user) {
        console.log("Welcome " + user.login)
        response.json({
            "token": jwt.sign({"id": user.id}, SECRET),
        })
    }
    else console.log('username or password entered incorrectly')

});

app.post("/signUp", function(request, response){
    const userPassword = crypto
        .createHash("sha256")
        .update(request.body.password + SECRET)
        .digest('base64')

    accounts.push(
        {
            "id": accounts.length,
            "login":request.body.login,
            "password": userPassword
        }
    );

    console.log(accounts);
});

app.listen(PORT, () => {
    console.log(`server start woking on port ${PORT}...`);
})