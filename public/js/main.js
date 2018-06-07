
/*!
 *   Main Web Application mobile - js
 *   Author: brazhnikov vasya
 *   Website: Almsaeed Studio <http://.io>
 *   License: Open source - MIT
 *   Please visit http://opensource.org/licenses/MIT for more information
 */
$('document').ready( function(){
    //$( "input" ).slider();

    $(document).on( 'click', '#ajax button', function(){
        console.log( '### Click => #ajax button' );
        $().Requester( 'makeRequest', function( response ) {
            $( 'input' ).val( 'message - ' + response.message );
        }, {'message':'test'});        
        return false;
    });

    $(document).on( 'click', '#socket button', function(){
        console.log( '### Click => #socket button' );
        var socket = io.connect( 'http://localhost:8080' );
        socket.on( 'hello', function( response ){
            $( 'input' ).val( 'message - ' + response.message );
        });
        return false;
    });

    $(document).on( 'click', '#animation button', function(){
        console.log( '### Click => #animation button' );

        $(this).addClass('disabled').attr('disabled',true);

        $('#animation .row > div.anm-block').slideToggle( 1000, function(){
            $('#animation button').removeClass('disabled').removeAttr('disabled',true);
        });

        return false;
    });

    if ( $('#verstka-js').length > 0 ) {

        var height_parent = $('#verstka-js .parent').height();
        var width_parent  = $('#verstka-js .parent').width();

        var height_child = $('#verstka-js .child').height();
        var width_child  = $('#verstka-js .child').width();

        var top  = ( height_parent / 2 ) - ( height_child / 2 );
        var left = ( width_parent / 2 ) - ( width_child / 2 );

        $('#verstka-js .child').css({
            'position' : 'absolute',
            'top' : top,
            'left' : left
        });
    }    

    if ( $('#random').length > 0 ) {
        generateSqures();
    }

    function generateSqures() {

        var count_squares = getRandom( 10, 100 );

        for ( var i = 0; i < count_squares; i++ ) {
            var div = $('<div>').css({
                'position' : 'absolute',
                'top' : getRandom( 50, 400 ) + 'px',
                'left' : getRandom( 50, 400 ) + 'px',
                'background' : '#' + getColor()
            });

            $('#random .wrap').append( div );
        }
    };

    function getRandom( min, max )
    {
        return Math.floor( Math.random() * ( max - min + 1 ) ) + min;
    }

    function getColor()
    {
        var a = getRandom( 0, 255 );
        var b = getRandom( 0, 255 );
        var c = getRandom( 0, 255 );

        return a + b + c;
    }
});