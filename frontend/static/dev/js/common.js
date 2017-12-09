$(document).ready(function(){

    $('.dd').dropdown();

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


$(function () {

    var framuga = {1: 'one', 2: 'two', 3: 'three'};

    var window_type = {
        'constructor__box-window_11': 'constructor__box-window_12',
        'constructor__box-window_12': 'constructor__box-window_13',
        'constructor__box-window_13': 'constructor__box-window_11'
    };

    $('.constructor__image').click(function () {
        self = $(this);

        var id = 'ctype' + self.attr('id').replace('type', '');
        var framuga_index = self.attr('id')[self.attr('id').length - 1];

        $('.constructor__center').attr('id', id);
        $('.constructor__box .constructor__box-top a:first').attr('class', 'constructor__box-framuga-' + framuga[framuga_index]);
    });

    $('.constructor__window .constructor__box').click(function () {
        self = $(this);
        el = self[0].classList[self[0].classList.length - 1];
        self.attr('class', window_type[el]);
    });
});