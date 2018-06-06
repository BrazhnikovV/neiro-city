
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
        $().Requester( 'makeRequest', function( response ) {
            $( 'input' ).val( 'message - ' + response.message );
        }, {'message':'test'});        
        return false;
    });
});