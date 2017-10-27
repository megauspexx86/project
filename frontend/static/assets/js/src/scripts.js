'use strict';
(function(){
	var slider = document.getElementById('slider');

	noUiSlider.create(slider, {
		start: [ 40000 ],
		step: 10000,
		connect: [false, true],
		range: {
			'min': [  0 ],
			'max': [ 70000 ]
		}
	});

	var leads = document.getElementById('money-leads');
	var orders = document.getElementById('money-orders');
	var payment = document.getElementById('money-payment');
	var sum = document.getElementById('money-sum');
	var revenue = document.getElementById('money-revenue');

	slider.noUiSlider.on('update', function( values, handle ) {
		switch (values[handle]) {
			case '0.00':
				leads.innerHTML = '0';
				orders.innerHTML = '0';
				payment.innerHTML = '0';
				sum.innerHTML = '0';
				revenue.innerHTML = '0';
				break;
			case '10000.00':
				leads.innerHTML = '10';
				orders.innerHTML = '12';
				payment.innerHTML = '8';
				sum.innerHTML = '16 000';
				revenue.innerHTML = '4 000';
				break;
			case '20000.00':
				leads.innerHTML = '20';
				orders.innerHTML = '23';
				payment.innerHTML = '15';
				sum.innerHTML = '30 000';
				revenue.innerHTML = '7 500';
				break;
			case '30000.00':
				leads.innerHTML = '30';
				orders.innerHTML = '34';
				payment.innerHTML = '22';
				sum.innerHTML = '45 000';
				revenue.innerHTML = '11 250';
				break;
			case '40000.00':
				leads.innerHTML = '40';
				orders.innerHTML = '46';
				payment.innerHTML = '26';
				sum.innerHTML = '57 000';
				revenue.innerHTML = '14 000';
				break;
			case '50000.00':
				leads.innerHTML = '50';
				orders.innerHTML = '56';
				payment.innerHTML = '36';
				sum.innerHTML = '72 000';
				revenue.innerHTML = '18 000';
				break;
			case '60000.00':
				leads.innerHTML = '100';
				orders.innerHTML = '114';
				payment.innerHTML = '72';
				sum.innerHTML = '144 000';
				revenue.innerHTML = '36 000';
				break;
			case '70000.00':
				leads.innerHTML = '200';
				orders.innerHTML = '226';
				payment.innerHTML = '143';
				sum.innerHTML = '286 000';
				revenue.innerHTML = '71 500';
				break;
			default:

		}
	});

	//подключаем плагин модальных окон
	// $('.header__login>span').click(function () {
	// 		var c = $('.popup_b--login');
	//     $.arcticmodal({
	//         content: c
	//     });
	// });

	$(document).ready(function(){
	$(".popup-input--tel").intlTelInput({
							utilsScript: '../js/utils.js',
	            defaultCountry: "ru",
	            onlyCountries: ["ru", "by", "ua", "md", "kz", "az", "am", "kg", "tj", "tm", "uz"],
							nationalMode: false,
	        		preferredCountries: ["ru", "by", "ua"]
	        });
				});

		(function() {
					document.getElementById("tel").onkeypress= function(event){
						event= event || window.event;
						if (event.charCode && (event.charCode < 48 || event.charCode > 57))// проверка на event.charCode - чтобы пользователь мог нажать backspace, enter, стрелочку назад...
						return false;
				};
				})();

	if (window.innerWidth <= '768') {
		smoothScroll.init({
		    selector: '[data-scroll]', // Selector for links (must be a class, ID, data attribute, or element tag)
		    selectorHeader: null, // Selector for fixed headers (must be a valid CSS selector) [optional]
		    speed: 500, // Integer. How fast to complete the scroll in milliseconds
		    easing: 'easeInOutCubic', // Easing pattern to use
		    offset: 90 // Integer. How far to offset the scrolling anchor location in pixels
		});
	} else {
		smoothScroll.init({
		    selector: '[data-scroll]', // Selector for links (must be a class, ID, data attribute, or element tag)
		    selectorHeader: null, // Selector for fixed headers (must be a valid CSS selector) [optional]
		    speed: 500, // Integer. How fast to complete the scroll in milliseconds
		    easing: 'easeInOutCubic', // Easing pattern to use
		    offset: 95 // Integer. How far to offset the scrolling anchor location in pixels
		});
	};
	// smoothScroll.init({
	//     selector: '[data-scroll]', // Selector for links (must be a class, ID, data attribute, or element tag)
	//     selectorHeader: null, // Selector for fixed headers (must be a valid CSS selector) [optional]
	//     speed: 500, // Integer. How fast to complete the scroll in milliseconds
	//     easing: 'easeInOutCubic', // Easing pattern to use
	//     offset: 50 // Integer. How far to offset the scrolling anchor location in pixels
	// });



		if (window.innerWidth <= '768') {
			var elem5 = document.querySelector('.top');
			var flkty = new Flickity( elem5, {
				wrapAround: true,
				cellAlign: 'left',
				contain: true
			});
		};

	var elem = document.querySelector('.reviews');
	var flkty = new Flickity( elem, {
	  wrapAround: true,
	  cellAlign: 'left',
	  contain: true
	});


	if (window.innerWidth <= '768') {
		var elem2 = document.querySelector('.conditions');
		var flkty = new Flickity( elem2, {
		  wrapAround: true,
		  cellAlign: 'left',
		  contain: true
		});
	};

	if (window.innerWidth <= '768') {
		var elem3 = document.querySelector('.benefits');
		var flkty = new Flickity( elem3, {
			wrapAround: true,
			groupCells: true
		});
	};

	if (window.innerWidth <= '768') {
		var elem4 = document.querySelector('.promo-mat__list');
		var flkty = new Flickity( elem4, {
			wrapAround: true,
			cellAlign: 'left',
			contain: true
		});
	};


})();
