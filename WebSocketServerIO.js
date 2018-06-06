// иницилизировать веб сокет сервер
var app = require('http').createServer();
var io  = require('socket.io').listen(app);
// функционал генератора посетителей
var CustomerGenerator = require("./CustomerGenerator");
// функционал генератора танцовщиц
var DancersGenerator = require("./DancersGenerator");
// функционал для проверки пустых объектов
var empty = require('is-empty');
// список подключенных пользователей
var users = {};
// дополнительные данные передаваемые и получаемые ль клиента
var client_data = {};
// количество подключенных игроков
var cnt_users = 0;
// объект данных для синхронизации
var synced_characters = {
    player_one:{},
    player_two:{},
    general: {}
};

app.listen(8080);

io.sockets.on('connection', function (socket) {
    
    socket.on('show-options', function() {
        
        users[socket.id]      = {};
        users[socket.id].id   = socket.id;
        users[socket.id].name = 'player-one';
        users[socket.id].game_mode  = 0;
        users[socket.id].is_waiting = false;
        users[socket.id].is_playing = false;
        
        socket.json.emit('show-options',{
            player: users[socket.id]
        });
    });
    
    socket.on('select-options',function(data) {        
        
        // !!! Необходимо проверять данные, передаваемые от клиента
        
        users[socket.id].name = 'player-one';
        users[socket.id].game_mode  = data.game_mode;
        users[socket.id].is_waiting = false;
        users[socket.id].is_playing = false;
        
        socket.json.emit('select-options',{
            player: users[socket.id]
        });
    });
    
    socket.on('start-game', function() {                                
        
        if(!users[socket.id].game_mode) {
            users[socket.id].name = 'player-one';
            users[socket.id].is_playing = true;

            var gen_customers = new CustomerGenerator();
            var gen_dancers = new DancersGenerator();
            users[socket.id].customers = gen_customers.createCustomers(4);
            users[socket.id].dancers = gen_dancers.createDancers();
            
            socket.json.emit('start-game',{
                player: users[socket.id]
            });
        }
        else {
            var enemy = enemySearch(users,socket);
            
            if(!enemy) {
                users[socket.id].name = 'player-one';
                users[socket.id].is_waiting = true;                
                                
                socket.json.emit('start-game',{
                    player: users[socket.id]
                });
            }
            else {                           
                
                users[socket.id].is_waiting = false;
                users[socket.id].is_playing = true;
                users[socket.id].name = 'player-two';
                users[socket.id].pair_id = users[socket.id].id+'__|||__'+enemy.id;
                io.sockets.sockets[users[socket.id].id].json.emit('start-game',{
                    player: users[socket.id]
                });
                
                users[enemy.id].is_waiting = false;
                users[enemy.id].is_playing = true;
                users[enemy.id].name = 'player-one';
                users[enemy.id].pair_id = users[socket.id].id+'__|||__'+enemy.id;
                io.sockets.sockets[enemy.id].json.emit('start-game',{
                    player: users[enemy.id]
                });  
            }
        }
    });    

    socket.on('command', function(data) {
        console.log(data);
        
        if(!users[socket.id].game_mode) {     
            users[socket.id].command = data.name;
            users[socket.id].barman  = 'first';

            if(data.name === 'getReward') {
                users[socket.id].pos_x = data.pos_x;
                users[socket.id].pos_y = data.pos_y;
                users[socket.id].bar_counter = data.bar_counter;
            }
            socket.json.emit('command', {
                player: users[socket.id]
            });
        }
        else {
            var players = users[socket.id].pair_id.split('__|||__');
            
            if(data.name === 'getReward') {
                users[players[0]].pos_x = data.pos_x;
                users[players[0]].pos_y = data.pos_y;
                users[players[0]].bar_counter = data.bar_counter;
                
                users[players[1]].pos_x = data.pos_x;
                users[players[1]].pos_y = data.pos_y;
                users[players[1]].bar_counter = data.bar_counter;
            }            
            
            if(users[socket.id].name === 'player-one') {
                users[players[0]].command = data.name;
                users[players[0]].barman  = 'first';
                users[players[1]].command = data.name;
                users[players[1]].barman  = 'first';

                io.sockets.sockets[users[players[0]].id].json.emit('command',{
                    player: users[users[players[0]].id]
                });

                io.sockets.sockets[users[players[1]].id].json.emit('command',{
                    player: users[users[players[1]].id]
                });
            }
            else {
                users[players[0]].command = data.name;
                users[players[0]].barman  = 'second';
                users[players[1]].command = data.name;
                users[players[1]].barman  = 'second';

                io.sockets.sockets[users[players[0]].id].json.emit('command',{
                    player: users[users[players[0]].id]
                });

                io.sockets.sockets[users[players[1]].id].json.emit('command',{
                    player: users[users[players[1]].id]
                });
            }
        }
    });
    
    socket.on('screams', function() {
                
        socket.volatile.emit('screams');
        
        //var players = users[socket.id].pair_id.split('__|||__');             
        //        
        //if(users[socket.id].name === 'player-one') {
        //    io.sockets.sockets[users[players[0]].id].json.volatile.emit('synchronization',{
        //        customers_positions: data.customers_positions
        //    });
        //}
    });    
    
    socket.on('disconnect', function() {        
        io.sockets.emit('chat', 'SERVER', users[socket.id] + ' отключился');
        delete users[socket.id];
    });
});

    /**
     *  enemySearch - Поиск соперника
     *  
     *  @param {object} users  - пользователи
     *  @param {object} socket - объект подписанного сокета
     */
    function enemySearch(users,socket) 
    {   
        for(var key in users ) {
            if(users[key].is_waiting && !users[key].is_playing) {
                if(socket.id !== key) {
                    return users[key];
                }
            }
        }
        
        return false;
    };
