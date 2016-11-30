const store = require('./store');
const fs = require('fs');
const crypto = require('crypto');

const init = function () {
    console.log("Initializating..");

    const games = [];
    const gameDates = fs.readdirSync('games');

    gameDates
        .filter(dirName => dirName !== '.DS_Store')
        .forEach(gameDate => {
        fs.readdirSync('games/' + gameDate)
            .filter(filename => filename !== '.DS_Store')
            .forEach(filename => {
                const fileContents = fs.readFileSync('games/' + gameDate + '/' + filename, 'utf-8');
                const game = JSON.parse(fileContents);
                games.push({
                    metadata: {
                        id: getIdFromFileHash(fileContents),
                        filename: filename,
                        date: new Date(gameDate),
                        players: game
                            .playerPortraits
                            .map(p => p.player.name.toLowerCase()),
                        keywords: game
                            .drawings
                            .map(drawing => [drawing.title.text, ...drawing.lies.map(lie => lie.text)])
                            .reduce((prev, curr) => { curr.forEach(item => prev.push(item)); return prev }, [])
                            .map(keyword => keyword.toLowerCase())
                    },
                    game: game
                });
            });
    });

    store.put('games', games.reduce((prev, curr) => { prev[curr.metadata.id] = curr; return prev;}, {}));
    store.put('gameMetadata', games.map( game => game.metadata));
    console.log('Initialization complete.')
};

function getIdFromFileHash(fileContents) {
    const hash = crypto.createHash('sha256');
    hash.update(fileContents);
    return hash.digest('hex');
}

module.exports = init;