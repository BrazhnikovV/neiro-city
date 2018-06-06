// подключить главные модули приложения
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function( req, res, next ) {

    res.render( './pages/home', { 
        title: 'NodeJs', 
        errors: [],
    });
});

/* GET canvas page. */
router.get('/canvas', function( req, res, next ) {

    res.render( './pages/canvas', { 
        title: 'NodeJs', 
        errors: [],
    });
});

/* GET ajax page. */
router.get('/ajax', function( req, res, next ) {

    res.render( './pages/ajax', { 
        title: 'NodeJs', 
        errors: [],
    });
});

/* GET socket page. */
router.get('/socket', function( req, res, next ) {

    res.render( './pages/sockets', { 
        title: 'NodeJs', 
        errors: [],
    });
});

/* POST ajax page. */
router.post('/ajax', function( req, res, next ) {

    res.send(req.body._options);
});

module.exports = router;
