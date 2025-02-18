$(document).ready(function(){
	
	

	
$('input[name="phone_ru"]').inputmask({"mask": "9 (999) 999-9999"});

	$('.page-form').each(function() {
		var $form = $(this);

		$form.validate({
			focusInvalid: true,
			errorClass: 'input_error',
			submitHandler: function() {
				$.ajax({
					method: 'POST',
					url: $form.attr('action'),
					data: $form.serialize(),
					success: function(response) {
						$form.find('.page-form-send').hide('slow');
						$form.find('.form-message').show('slow');
						$form.trigger('reset');				
						try {
							ym(45477081,'reachGoal','openform_request_send');
						} catch {}
					}
				});
			}
		});
	});

$(function(){
	
	var bLazy = new Blazy({
		breakpoints: [{
			width: 420, // Max-width
			src: 'data-src-small'
		}],
		success: function(element){
			setTimeout(function(){
				// We want to remove the loader gif now.
				// First we find the parent container
				// then we remove the "loading" class which holds the loader image
				var parent = element.parentNode;
				parent.className = parent.className.replace(/\bloading\b/,'');
			}, 150);
		}
	});



$('.mosaic').mosaicflow({
		itemSelector: '.item',
		minColumns: 1,
		itemHeightCalculation: 'attribute',
		minItemWidth: 200
	});
	
	// Light Gallery
	var $lg = $('.mosaic');
	$lg.lightGallery({
		selector: 'a.item',
		thumbnail:true,
		animateThumb: false,
		download: false,
		loop: false,
		showThumbByDefault: false
	});
	
	var $lg = $('#teamList');
	$lg.lightGallery({
		selector: 'a.lightGallery',
		thumbnail:true,
		animateThumb: false,
		download: false,
		loop: false,
		showThumbByDefault: false
	});
	
	$('.blog-services-slider').each(function(){
																	
			$(this).slick({
				slidesToShow: 3,
				prevArrow: $(this).parent().find('.blog-services-prev'),
				nextArrow: $(this).parent().find('.blog-services-next'),
				arrows: true,
				autoplay: true,
				autoplaySpeed: 2000,
				responsive: [
					{
						breakpoint: 768,
						settings: {
							arrows: false,
							slidesToShow: 2
						}
					},
					{
						breakpoint: 480,
						settings: {
							arrows: false,

							slidesToShow: 1,

						}
					}
				]
		});
																	
	})
	
	
	
});

						
						
						
});