$(document).ready(function(){

    $("a[href='#personal-order']").magnificPopup({
        mainClass: 'my-mfp-zoom-in',
        removalDelay: 300,
        type: 'inline',
    });

    $('#types .types__link').on('click', function () {
        $('#types .subtype').not($(this).next()).slideUp(400);
        $(this).next().slideToggle(800);
    });

    $( function() {
        $('#slider-range').slider({
            step: 5,
            range: true,
            min: 0,
            max: 500,
            values: [75, 300],
            slide: function( event, ui ) {
                $('#amount-min').val(ui.values[0]);
                $('#amount-max').val(ui.values[1]);
            }
        });
        $('#amount-min').val($('#slider-range').slider('values', 0));
        $('#amount-max').val($('#slider-range').slider('values', 1));
    });

    // Изменение местоположения ползунка при вводиде данных в первый элемент input
    $('#amount-min').change(function(){
        var value1=$('#amount-min').val();
        var value2=$('#amount-max').val();
        if(parseInt(value1) > parseInt(value2)){
            value1 = value2;
            $('#amount-min').val(value1);
        }
        $('#slider-range').slider('values',0,value1);
    });

    // Изменение местоположения ползунка при вводиде данных в второй элемент input
    $('#amount-max').change(function(){
        var value1=$('#amount-min').val();
        var value2=$('#amount-max').val();

        if(parseInt(value1) > parseInt(value2)){
            value2 = value1;
            $('#amount-max').val(value2);
        }
        $('#slider-range').slider('values',1,value2);
    });

    // фильтрация ввода в поля
    jQuery('#amount-min, #amount-max').keypress(function(event){
        var key, keyChar;
        if(!event) var event = window.event;

        if (event.keyCode) key = event.keyCode;
        else if(event.which) key = event.which;

        if(key==null || key==0 || key==8 || key==13 || key==9 || key==46 || key==37 || key==39 ) return true;
        keyChar=String.fromCharCode(key);

        if(!/\d/.test(keyChar))	return false;

    });

});