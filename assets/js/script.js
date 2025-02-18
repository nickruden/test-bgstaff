$( document ).ready(function() {
    $('.where-we__right_slider').slick({
    	dots: true,
    	autoplay: true,
            autoplaySpeed: 2000,
            infinite: true,
    	responsive: [
	    {
	      breakpoint: 480,
	      settings: {
	          
	        arrows: false,
	        centerMode: true,
	        centerPadding: '0px',
	        slidesToShow: 1
	      }
	    }
	  ]
    });
    $('.share-experience-card__slider').slick({
    	dots: true,
    	responsive: [
	    {
	      breakpoint: 575,
	      settings: {
	        arrows: false,
	        centerMode: true,
	        centerPadding: '0px',
	        slidesToShow: 1
	      }
	    }
	  ]
    });


    // mobile menu-btn
    $('.header-menu-nav__parent').on('click', function() {
    	$(this).toggleClass('active');
    });
    $('.header-menu_btn').on('click', function() {
    	$(this).parent('.header-menu').toggleClass('active');
    });

    $(document).mouseup(function (e){ // событие клика по веб-документу
		var div = $(".header-menu"); // тут указываем ID элемента
		if (!div.is(e.target) // если клик был не по нашему блоку
		    && div.has(e.target).length === 0) { // и не по его дочерним элементам
			div.removeClass('active'); // скрываем его
		}
	});

	// fixed header-menu
	if($(window).width() >= 768) {
	  // change functionality for smaller screens
	  $(window).scroll(function(){
		  var docscroll=$(document).scrollTop();
		  if(docscroll>$(window).height()){
		    $('.header').addClass('header-fixed');
		  }else{
		    $('.header').removeClass('header-fixed');
		  }
		});
	} 



    function addClassToMenu(nameClass, targetPos, extraNameClass=null) {
    	if($(window).width() >= 768) {
	    	var targetPos = targetPos; //target.offset().top;
		    var winHeight = $(window).height();
		    var scrollToElem = targetPos - winHeight;
		    $(window).scroll(function(){
		      var winScrollTop = $(this).scrollTop();
		      if(winScrollTop > scrollToElem){
		        $('.header').addClass(nameClass);
		        $('.podbor-banner').addClass(extraNameClass);
		        $('.banner').addClass(extraNameClass);
		      } else {
		        $('.header').removeClass(nameClass);
		        $('.podbor-banner').removeClass(extraNameClass); 
		        $('.banner').removeClass(extraNameClass); 
		      }
		    });
		}
    }
    // fixed menu
    addClassToMenu('header-fixed', 1200, 'mt-banner-when-fixed-menu');
    // active fixed menu
    addClassToMenu('active', 1200);
	
	
	
	
	
	
	// init Isotope
var $grid = $('.vacancy-cont-list').isotope({
  itemSelector: 'li',
  layoutMode: 'fitRows'
});


$('.vacancy-search-bottom').on( 'click', 'button', function() {
  var filterValue = $( this ).attr('data-filter');
  $grid.isotope({ filter: filterValue });
});
// change is-checked class on buttons
$('.vacancy-search-bottom').each( function( i, buttonGroup ) {
  var $buttonGroup = $( buttonGroup );
  $buttonGroup.on( 'click', 'button', function() {
    $buttonGroup.find('.is-checked').removeClass('is-checked');
    $( this ).addClass('is-checked');
  });
});


});