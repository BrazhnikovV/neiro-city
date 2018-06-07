// иницилизировать веб сокет сервер
var app = require('http').createServer();
var io  = require('socket.io').listen(app);

app.listen(8080);

io.sockets.on('connection', function (socket) {
    
    socket.json.emit('hello', {
        'message' : 'test'
    });         
});
