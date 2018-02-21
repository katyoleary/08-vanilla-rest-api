'use strict';

const http = require('http');
const Goblin = require('./model/goblin.js');
const Router = require('./lib/router.js');
const storage = require('./lib/storage.js');
const PORT = process.env.PORT || 3000;
const goblinRouter = new Router();

goblinRouter.get('/api/goblin', function(req, res) {
  if(req.url.query.id) {
    storage.fetchItem('goblin', req.url.query.id)
      .then( goblin => {
        res.writeHead(200, {
          'Content-Type': 'text/plain'
        });

        res.write(JSON.stringify(goblin));
        res.end();
      })
      .catch( err => {
        console.error(err);
        res.writeHead(404, {
          'Content-Type': 'text/plain'
        });
        res.write('route not found');
        res.end();
      });
    return;
  }
  response.writeHead(400, {
    'Content-Type': 'text/plain'
  });

  res.write('bad request');
  res.end();
});

const server = http.createServer(Router.route());

server.listen(PORT, () => {
  console.log(`server up: '${PORT}`);
});

