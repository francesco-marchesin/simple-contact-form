const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 4321;
const host = 'localhost';

http.createServer( (req, res) => {
    var fileExt = path.extname(req.url);
    if(fileExt === '.js'){
        res.writeHead(200, {'Content-Type': 'text/javascript'});
        res.end(fs.readFileSync(__dirname + '/dist' + req.url));
    }
    if(fileExt === '.css'){
        res.writeHead(200, {'Content-Type': 'text/css'});
        res.end(fs.readFileSync(__dirname + '/dist' + req.url));
    }
    if(req.method === 'POST' && req.url === '/contact'){
        var data = null;
        req.on('data', function(chunk) {
          data = chunk.toString();
        });
        req.on('end', function() {
          res.writeHead(200, "OK", {'Content-Type': 'text/html'});
          res.end(data);
        });
    }
    if(req.method === 'GET'){
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(fs.readFileSync(__dirname + '/dist/index.html'));
    }
}).listen(port);

console.log(`NodeJs is up and running at http://${host}:${port}/`);
