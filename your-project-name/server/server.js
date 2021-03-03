import express from 'express'

const app = express();
const PORT = 3002;

const drinks = [
    { 
        name: "green tea",
        link: "images/green tea.jpg"
    },
    { 
        name: "latte",
        link: "images/latte.jpg"
    }
]

const dishes = [
    { 
        name: "jelly",
        link: "images/jelly.jpg"
    }
]

app.all('/drinks', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
   });

app.get("/drinks", function(request, response){
    response.json(drinks)
});

app.all('/dishes', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
   });

app.get("/dishes", function(request, response){
    response.json(dishes)
});

app.listen(PORT, () => {
    console.log(`server start woking on port ${PORT}...`)
})