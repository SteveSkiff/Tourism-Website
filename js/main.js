  
function isMobileDevice() {
    return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
}


    // SLIDEOUT

// Create a new Slideout instance.
  var slideout = new Slideout({
    'panel': document.getElementById('panel'),
    'menu': document.getElementById('menu'),
    'touch': false,
    'padding': isMobileDevice() ? 700 : 300,
    'tolerance': 90
  });

  // Toggle button
  document.querySelector('.hamburger').addEventListener('click', function() {
    slideout.toggle();
    $('.hamburger').toggleClass('is-active');
  });

function close(eve) {
  eve.preventDefault();
  slideout.close();
  $('.hamburger').toggleClass('is-active');
}

slideout
  .on('beforeopen', function() {
    this.panel.classList.add('panel-open');
  })
  .on('open', function() {
    this.panel.addEventListener('click', close);
  })
  .on('beforeclose', function() {
    this.panel.classList.remove('panel-open');
    this.panel.removeEventListener('click', close);
  });



    // ACCORDION

var $toggler = $(".faq-accordionbtn");
var $content = $(".faq-answertext");

$toggler.click(function() {
    var $this = $(this)
    var $text = $this.next(".faq-answertext"); 
    var isVisible  = $text.is(":visible");
  
    $content.slideUp();
    $toggler.find("span").text("▿");
    $this.find("span").text( isVisible ? "▿" : "-");
    // $content.slideUp();
    $text[ isVisible ? "slideUp" : "slideDown"]();
    $toggler.removeClass('js__opened');
    $this[ isVisible ? null : $this.addClass('js__opened')];
  
}).append("<span>&#9663;</span>").next(".faq-answertext").hide();




    // COMMUNITY FILTER

var $grid = $('.grid');
if($grid.length > 0) {

  setupCommunityGrid()

}

function setupCommunityGrid() {

$grid.isotope({
  // options
  itemSelector: '.grid-item',
  layoutMode: 'masonry',
  masonry: {
    columnWidth: 0,
    fitWidth: true
  }
});

var $filterItem = $('.checkbox')
var selectedItemClass = 'filter-container-item__selected'

$filterItem.on('change', function(){
  var $this = $(this);
  var parent = $this.closest('label')
  var isCheckedItems = $('.checkbox:checked')
  var filtersToEnable = []

  isCheckedItems.each(function(index,theElement){
    console.log('push')
    filtersToEnable.push(`.${$(theElement).attr('name')}`)
  })

  var filterString = filtersToEnable.join(', ')
  console.log(filterString)

  $grid.isotope({ filter: filterString });

  if ($this.is(':checked')) {
    parent.addClass(selectedItemClass)
  } else {
    parent.removeClass(selectedItemClass)
  }
})

}




    // CONTACT FORM

var contactform = $("#contactform")

if( contactform.length ) {
  contactform.on('submit', function(event) {
    event.preventDefault()
    var values = contactform.serializeArray()
    console.log(values)
    var queryString = '?' + contactform.serialize();

    $.ajax({

      url: contactform.attr('action') + queryString,
      success: function(returnData, textStatus, jqXHR) {
        $('#contactform').addClass('hidden');
        $('#thankyouform').fadeIn(300); 
        console.log('succeeded', returnData);
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log('failed', errorThrown);
      }

    })
  
  })

}



    // LEAFLET MAP

if($('#map').length > 0) {

  console.log('leaflet working')
  setupExploreMap()

}

function setupExploreMap() {

  var mymap = L.map('map').setView([38.855786,16.540565], 8);

  L.tileLayer('https://api.mapbox.com/styles/v1/sskiff/cjjqahfra089x2rpcsvp3kwgf/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic3NraWZmIiwiYSI6ImNqanAyNnR0eDFyd2wzdm8xMjI3MnpycjUifQ._qeUS6bN0eHOVavD6zmWgw', {
    attribution: '&copy; Arcellini 2018',
    maxZoom: 9,
    minZoom: 9,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1Ijoic3NraWZmIiwiYSI6ImNqanAyNnR0eDFyd2wzdm8xMjI3MnpycjUifQ._qeUS6bN0eHOVavD6zmWgw'
}).addTo(mymap);
mymap.setMaxBounds(mymap.getBounds());



var marketMarker = L.marker([38.783, 16.299]).on('click', marketMarkCheck).addTo(mymap);
marketMarker.bindPopup("<b>Seaside Market</b><br/>Jun. 1 - Jul. 30", {closeButton: false})

function marketMarkCheck() {
  marketMarker.on('popupopen', function() {
    $('.list-eventitem__market').addClass('js__active')
  })
  marketMarker.on('popupclose', function() {
    $('.list-eventitem__market').removeClass('js__active')
  })
}


var balloonMarker = L.marker([38.953, 16.359]).on('click', balloonMarkCheck).addTo(mymap);
balloonMarker.bindPopup("<b>Air Balloon Rides</b><br/>Jan. 1 - Mar. 1", {closeButton: false})

function balloonMarkCheck() {
  balloonMarker.on('popupopen', function() {
    $('.list-eventitem__balloon').addClass('js__active')
  })
  balloonMarker.on('popupclose', function() {
    $('.list-eventitem__balloon').removeClass('js__active')
  })
}


var horseMarker = L.marker([38.053, 16.059]).on('click', horseMarkCheck).addTo(mymap);
horseMarker.bindPopup("<b>Horseback Riding</b><br/>Mar. 1 - Oct. 15", {closeButton: false})

function horseMarkCheck() {
  horseMarker.on('popupopen', function() {
    $('.list-eventitem__horse').addClass('js__active')
  })
  horseMarker.on('popupclose', function() {
    $('.list-eventitem__horse').removeClass('js__active')
  })
}


var ghostMarker = L.marker([38.153, 15.729]).on('click', ghostMarkCheck).addTo(mymap);
ghostMarker.bindPopup("<b>Ghost Town Tour</b><br/>Aug. 1 - Nov. 30", {closeButton: false})


function ghostMarkCheck() {
  ghostMarker.on('popupopen', function() {
    $('.list-eventitem__ghost').addClass('js__active')
  })
  ghostMarker.on('popupclose', function() {
    $('.list-eventitem__ghost').removeClass('js__active')
  })
}



var carnivaliMarker = L.marker([39.553, 16.729]).on('click', carnivaliMarkCheck).addTo(mymap);
carnivaliMarker.bindPopup("<b>Carnivali</b><br/>Oct. 1 - Nov. 1", {closeButton: false})


function carnivaliMarkCheck() {
  carnivaliMarker.on('popupopen', function() {
    $('.list-eventitem__carnivali').addClass('js__active')
  })
  carnivaliMarker.on('popupclose', function() {
    $('.list-eventitem__carnivali').removeClass('js__active')
  })
}



var prideMarker = L.marker([39.623, 16.439]).on('click', prideMarkCheck).addTo(mymap);
prideMarker.bindPopup("<b>Pizano Pride</b><br/>End of June", {closeButton: false})


function prideMarkCheck() {
  prideMarker.on('popupopen', function() {
    $('.list-eventitem__pride').addClass('js__active')
  })
  prideMarker.on('popupclose', function() {
    $('.list-eventitem__pride').removeClass('js__active')
  })
}
}


// Place down arrow within visible area.
// get height of window.
// Get heignt of nav bar
// get height of arrow + bottom margin.
// arrow top = window height - nav height - arrow height.


$(document).ready(function(){

  $(window).on("resize", function(){
    var windowHeight = $(window).height()
    var navHeight = $(".nav-menu--sitelogo").height()
    // var arrowHeight = $(".fa-angle-double-down").height()
    var arrowHeight = 96; // Font Awesome doesn't load fast enough to measure this

    var arrowTopCoordinate = windowHeight - navHeight - arrowHeight - 0;
    $(".arrow-indicating-scroll").css("top", arrowTopCoordinate)
    console.log("arrow top ", arrowTopCoordinate)
    //debugger;
  }).trigger("resize");


})




// var onLoadWindowHeight = $(window).height();
// var $scrollArrow = $('.fa-angle-double-down');
// var height = $(window).scrollTop();

$(document).on('scroll', function() {
  // console.log('Scroll funct. working.')
  var height = $(window).scrollTop();
  if( height > 0) {
    // console.log('condition met')
    $('.fa-angle-double-down').fadeTo(300,0);
    // debugger;
  } else {
    // console.log('not met')
    $('.fa-angle-double-down').fadeIn(100);
  }
});












