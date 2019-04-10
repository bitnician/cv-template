// Global $, ProgressBar, State

$(document).ready(function() {
  'use strict';
  var $window = $(window);

  //Navigation
  var sideNav = 0;
  $('.navigation__open, .close--nav').click(function() {
    $('.navigation__sidebar').toggleClass('open')
  })
  //Smooth Scroll  For Navigation Items
  var scroll = new SmoothScroll('a[href*="#"]');


  //Progress Bar
  var lineBar = $('.skills .bar'),
    barCheck = false;

  function createPro($id, $val) {
    var bar = new ProgressBar.Line($id, {
      strokeWidth: 2,
      easing: 'easeInOut',
      duration: 1400,
      color: '#113c4a',
      trailColor: '#eee',
      trailWidth: 2,
      svgStyle: {
        width: '100%',
        height: '100%'
      },
      text: {
        style: {
          color: '#113c4a',
          position: 'absolute',
          right: '0',
          top: '0',
          fontSize: '14px',
          fontWeight: 500,
        }
      },
      from: {
        color: '#29ffc6'
      },
      to: {
        color: '#0cebeb'
      },
      step: (state, bar) => {
        bar.path.setAttribute('stroke', state.color);
        bar.setText(Math.round(bar.value() * 100) + '%');
      }
    });
    bar.animate($val);

  }

  function startProg() {
    if (!barCheck && $window.scrollTop() >= ($('.skills').offset().top - ($window.height() * 0.7))) {
      lineBar.each(function() {
        var val = $(this).data('value'),
          id = '#' + $(this).attr('id');
        createPro(id, val)
      });
      barCheck = true;

    }
  }

  startProg();
  $window.on('scroll', function() {
    startProg();
  })

  //Carousel Bar --> section-partners


  $(".section-partners .owl-carousel").owlCarousel({
    loop: true,
    responsiveClass: true,
    center: true,
    responsive: {
      0: {
        items: 3
      },
      768: {
        items: 3
      },
      991: {
        items: 4
      }
    },
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: false,
    autoWidth: true,
    nav: false,
    dots: false,
  });

  //Carousel Bar --> section-story


  $(".section-story .owl-carousel").owlCarousel({
    loop: true,
    responsiveClass: true,
    center: true,
    items: 1,
    autoplay: true,
    autoplayTimeout: 5000,
    autoplayHoverPause: false,
    nav: false,
    dots: false,
    autoplayHoverPause: true
  });


  //Portfolio
  $('#masonry-grid').masonry({
    itemSelector: '.grid-item',
    columnWidth: 5,
    gutter: 20
  });


  // This does the filter by binding an event on the change of a select box
  $("#grid-filter li").click(function() {
    var group = $(this).data('category');
    var group_class = "." + group;

    $(this).addClass('active').siblings().removeClass('active');

    if (group == "*") {
      $(".grid-item").show();
      $('#masonry-grid').masonry('layout');
    } else if (group != "") {
      $(".grid-item").hide();
      $(group_class).show();
      $('#masonry-grid').masonry('layout');
    } else {
      $(".grid-item").show();
      $('#masonry-grid').masonry('layout');
    }
  });

  // Loading event
  $window.on('load', function() {
    $('.loader').slideUp(500, function() {
      $(this).remove();
    })
  })

  // popup
  var $body = $('body'),
    viewPop = $('.grid-item'),
    popup = $('.popup'),
    popClose = $('.close.close--popup'),
    popImg = $('.popup__view img'),
    portfolioItem = $('.section-portfolio .grid .grid-item');


  viewPop.on('click', function() {
    popup.fadeIn();
    var imgShow = $(this).find('.grid-inner .grid-inner__image img').attr('src');

    popImg.attr('src', imgShow);
    $body.css('overflow', 'hidden');
  });
  popClose.on('click', function() {
    popup.fadeOut();
    $body.css('overflow', 'auto');
  });
  $('.popup__close-overlay').on('click', function() {
    popup.fadeOut();
    $body.css('overflow', 'auto');
  });


  $('.popup .popup__arrow .popup__arrow-next, .popup .popup__arrow .popup__arrow-prev').on('click', function() {
    var getImg = $(this).parents('.popup').find('img').attr('src'),
      event = $(this).data('way');
    portfolioItem.each(function() {
      var galleryImg = $(this).find('.grid-inner .grid-inner__image img').attr('src');

      if (getImg === galleryImg) {
        popImg.attr('src', $(this)[event]('.grid-item').find('.grid-inner__image img').attr('src'));
      }
    })
  })


})
