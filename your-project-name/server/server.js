const express = require("express");

const app = express();
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
    console.log(request.query)
});

app.get("/dishes", function(request, response){
    response.json(dishes)
});

app.listen(PORT, () => {
    console.log(`server start woking on port ${PORT}...`)
})