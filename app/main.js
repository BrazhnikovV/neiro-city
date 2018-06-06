// подключить главные модули приложения
var express = require( 'express' );
var router = express.Router();
// подключить body_parser
var body_parser = require( 'body-parser' );
// Подключаем конфиг приложения
var config = require( '../config' );
// Подключить зжатие данных
var compression = require('compression');
// Подключить защиту заголовков
var helmet = require('helmet');
// Подключить ejs-locals для лэйаута
var ejsLocals = require( 'ejs-locals' );

// Подключить роутеры
var home = require( '../routes/home' );

// Создание главного объекта приложения
var app = express();
app.use( body_parser() );

// Подключаем папку для статики
app.use( express.static( 'public' ) );
// Включаем сжатие
app.use( compression() );
// Включаем защиту
app.use( helmet() );

// Поключаем механизм для работы с представлениями
app.engine( 'ejs', ejsLocals );
app.set( 'views', __dirname + '/views' );
app.set( 'view engine', 'ejs' );

// Обрабатываем заданные для приложения роуты 
app.use( '/', home );

// Обработать 404-ю ошибку
app.use(function(req, res, next) {
    res.status(404).render( 'error', { title: 'Error 404' });
});

// Обработать все остальные ошибки
app.use(function( err, req, res, next ) {
    res.status( 500 ).render( 'error', { 
        title: 'Error 505',
    });
});

module.exports = app;