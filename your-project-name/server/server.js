import express from 'express'

const app = express();
const PORT = 3000;

app.get("/greeting", function(request, response){
    let userName = request.query.name;
    response.send("Hello, " + userName)
});

app.get("/helloyWord", function(request, response){
    response.json("helloy Word")
});

app.listen(PORT, () => {
    console.log(`server start woking on port ${PORT}...`)
})