const express = require('express');
const app = express();
const init = require('./lib/init');
const store = require('./lib/store');
init();

app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

app.get('/games', function (req, res) {
    res.send(store.get('gameMetadata'));
});

app.get('/games/:id', function (req, res) {
    const games = store.get('games');
    if(Object.keys(games).includes(req.params.id)) {
        res.send(games[req.params.id]);
    } else {
        res.status(404).send();
    }
});

app.get('/init', function (req, res) {
    const lastInitDate = store.get('lastInitDate');
    console.log('last init date was: ', lastInitDate);
    if (lastInitDate) {
        const timeElapsed = (new Date()) - lastInitDate;
        console.log('time elapsed since then: ', timeElapsed);
        if (timeElapsed < 3600000) {
            res.status(429).send();
            return;
        }
    }
    console.log('will initialize again.');
    store.reset();
    store.put('lastInitDate', new Date());
    init();
    console.log(store.get('gameMetadata'));
    res.status(200).send();
});

app.listen(3000, function () {
    console.log('Started listening on 3000.');
});