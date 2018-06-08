// подключить главные модули приложения
var express = require('express');
var router = express.Router();
// подключить фабрику пользователей
var user = require('../app/components/User');
// подключить Console commonjs
// import {sayHello} from '../app/components/sayHello';

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

/* GET canvas page. */
router.get('/user-factory', function( req, res, next ) {    

    const user_obg = {
        firstname: 'Jastin',
        secondname: 'Biber'
    };

    const new_user  = user( user_obg ); 
    const user_info = new_user.getUserInfo();

    res.render( './pages/user-factory', { 
        title: 'NodeJs', 
        errors: [],
        user: user_info
    });
});

/* GET common page. */
router.get('/common', function( req, res, next ) {    

    //const log = console_common( 'Hello Word!' );

    res.render( './pages/common', { 
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

/* GET verstka-css page. */
router.get('/verstka-css', function( req, res, next ) {

    res.render( './pages/verstka_css', { 
        title: 'NodeJs', 
        errors: [],
    });
});

/* GET verstka-js page. */
router.get('/verstka-js', function( req, res, next ) {

    res.render( './pages/verstka_js', { 
        title: 'NodeJs', 
        errors: [],
    });
});

/* GET animation page. */
router.get('/animation', function( req, res, next ) {

    res.render( './pages/animation', { 
        title: 'NodeJs', 
        errors: [],
    });
});

/* GET random page. */
router.get('/random', function( req, res, next ) {

    res.render( './pages/random', { 
        title: 'NodeJs', 
        errors: [],
    });
});

/* POST ajax page. */
router.post('/ajax', function( req, res, next ) {

    res.send(req.body._options);
});

module.exports = router;
