const express = require("express");
const cors = require('cors');
const bodyParser = require("body-parser");
const jwt = require('jsonwebtoken')
const crypto = require("crypto");
const { request, response } = require("express");

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
        "id": 0,
        "type": TYPES.DRINK,
        "name": "green tea",
        "link": "images/green tea.jpg"
    },
    {
        "id": 2,
        "type": TYPES.DRINK, 
        "name": "latte",
        "link": "images/latte.jpg"
    },
    {
        "id": 2,
        "type": TYPES.DISH,
        "name": "jelly",
        "link": "images/jelly.jpg"
    }
];

const accounts = [
    {
        "id": 0,
        "login": "user1",
        "password": '0Ejzk8sU7HVLUhMmPbx/JkFgpNN6zYX3IxCJA8HblqI=' //123
    },
    {
        "id": 1,
        "login": "user2",
        "password": '0Ejzk8sU7HVLUhMmPbx/JkFgpNN6zYX3IxCJA8HblqI=' //123
    },
    {
        "id": 2,
        "login": "user3",
        "password": '0Ejzk8sU7HVLUhMmPbx/JkFgpNN6zYX3IxCJA8HblqI=' //123
    }
];

const SECRET = "SashaCrutou";

const south = function(request, response, next){
    const authorization = request.headers.authorization.split(' ')
    const token = authorization[1]
    const payload = jwt.verify(token, SECRET)
    user = accounts.find(currentValue => currentValue.id === payload.id)

    request.user = user

    if(user) next()
    else response.status(401).json({error: 'test'})
}

app.post("/foodAndDrinks", south, function(request, response){
    const userFoodAndDrinks = foodAndDrinks.filter(currentValue => currentValue.id === request.user.id)

    response.json(userFoodAndDrinks)
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