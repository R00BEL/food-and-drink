const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const { nanoid } = require('nanoid');
const crypto = require('crypto');

const app = express();

app.use(cors());
app.use(bodyParser.json());

const PORT = 3002;

const TYPES = [
    { id: 'all', name: 'drinks' },
    { id: 'all', name: 'dishes' },
    { id: 2, name: 'dessert' },
];

const foodAndDrinks = [
    {
        id: 0,
        type: 'drink',
        name: 'green tea',
        link: 'images/green tea.jpg',
    },
    {
        id: 2,
        type: 'drink',
        name: 'latte',
        link: 'images/latte.jpg',
    },
    {
        id: 2,
        type: 'dishe',
        name: 'jelly',
        link: 'images/jelly.jpg',
    },
];

const accounts = [
    {
        id: 0,
        login: 'user1',
        password: '0Ejzk8sU7HVLUhMmPbx/JkFgpNN6zYX3IxCJA8HblqI=', //123
    },
    {
        id: 1,
        login: 'user2',
        password: '0Ejzk8sU7HVLUhMmPbx/JkFgpNN6zYX3IxCJA8HblqI=', //123
    },
    {
        id: 2,
        login: 'user3',
        password: '0Ejzk8sU7HVLUhMmPbx/JkFgpNN6zYX3IxCJA8HblqI=', //123
    },
];

const SECRET = 'SashaCrutou';

const south = function (request, response, next) {
    const authorization = request.headers.authorization.split(' ');
    const token = authorization[1];
    if (token !== 'null') {
        const payload = jwt.verify(token, SECRET);
        user = accounts.find((currentValue) => currentValue.id === payload.id);

        request.user = user;
    }

    if (token !== 'null') next();
    else response.status(401).json([]);
};

app.post('/foodAndDrinks', south, function (request, response) {
    const userFoodAndDrinks = foodAndDrinks.filter(
        (currentValue) => currentValue.id === request.user.id,
    );

    response.json(userFoodAndDrinks);
});

app.post('/addFoodAndDrinks', south, function (request, response) {
    request.body.id = request.user.id;

    foodAndDrinks.push(request.body);
    console.log('added in foodAndDrinks: ' + request.body.name);
});

app.get('/types', south, function (request, response) {
    const userTypes = TYPES.filter(
        (currentValue) => currentValue.id === request.user.id || currentValue.id === 'all',
    );

    response.json(userTypes);
});

app.post('/addTypes', south, function (request, response) {
    request.body.id = request.user.id;
    TYPES.push(request.body);

    console.log('added in types: ' + request.body.name);
});

app.post('/signIn', function (request, response) {
    const userPassword = crypto
        .createHash('sha256')
        .update(request.body.password + SECRET)
        .digest('base64');

    user = accounts.find(
        (currentValue) =>
            request.body.login === currentValue.login && userPassword === currentValue.password,
    );

    if (user) {
        console.log('Welcome ' + user.login);
        response.json({
            token: jwt.sign({ id: user.id }, SECRET),
        });
    } else console.log('username or password entered incorrectly');
});

app.post('/signUp', function (request, response) {
    const userPassword = crypto
        .createHash('sha256')
        .update(request.body.password + SECRET)
        .digest('base64');

    accounts.push({
        id: nanoid(),
        login: request.body.login,
        password: userPassword,
    });

    console.log(accounts);
});

app.listen(PORT, () => {
    console.log(`server start woking on port ${PORT}...`);
});
