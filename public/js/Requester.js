
/**
 * Requester - Jquery класс для отправки ajax-запросов на указанный адрес 
 */
;(function($){ 
    
    /**
     * @var string - путь к экшену который слушает ajax-запросы
     * @access  {private}
     */
    var _url = 'ajax';  

    /**
     * @var object - набор параметров для определения логики обработки запроса
     * @access  {private}
     */
    var _options = {}; 
    
    /**
     * @var object  - объект содержащий функции плагина
     * @access  {private}
     */
    var _methods = {
        
        /**
         * makeRequest - 
         * 
         * @access  {public}
         * @return  {undefined}
         */
        makeRequest : function(done) 
        {
            console.log('### Requester Call method makeRequest');

            _options = arguments[1];            

            _makeRequest(done);
        }        
    };
    
    /**
     * Requester - Оболочка  для  кода  подключаемого  модуля  
     * @access  {public}
     * @param   {string}    method    
     * @return {undefined}
     */
    $.fn.Requester = function( method )  {
        if ( _methods[method] ) {
            return _methods[method].apply(this, Array.prototype.slice.call(arguments,1));
        } 
        else if (typeof method === 'object' || ! method) {
            return _methods.init.apply(this, arguments);
        }
        else {
            $.error( 'Метод с именем ' +  method + ' не существует.' );
        } 
    };        

    /**
     * _makeRequest - 
     * 
     * @access  {private}
     * @param   {function}    done - обратная функция    
     * @return  {undefined}
     */
    function _makeRequest(done) 
    {
        console.log('### Requester Call method _makeRequest');

        var csrf_param = $('meta[name="csrf-param"]').attr("content");
        var csrf_token = $('meta[name="csrf-token"]').attr('content');
        
        $.ajax({
            type: 'POST',
            url:  _url,
            dataType: 'json',
            data: {'ajax': 'true', '_options': _options, csrf_param : csrf_token},
            success: function(response)
            {
                console.log('success');
                done(response);
            },
            error: function(msg)
            {
                console.log('error');
                done(msg);
            },
            complete: function(msg)
            {
                console.log('complete');
                console.log(msg.status);
            }
        });
    };
    
})(jQuery);