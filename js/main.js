  
    // SLIDEOUT

// Create a new Slideout instance.
  var slideout = new Slideout({
    'panel': document.getElementById('panel'),
    'menu': document.getElementById('menu'),
    'padding': 256,
    'tolerance': 70
  });

  // Toggle button
  document.querySelector('.toggle-button').addEventListener('click', function() {
    slideout.toggle();
  });

function close(eve) {
  eve.preventDefault();
  slideout.close();
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
    $toggler.find("i").text("+");
    $this.find("i").text( isVisible ? "+" : "-");
    // $content.slideUp();
    $text[ isVisible ? "slideUp" : "slideDown"]();
    $toggler.removeClass('js__opened');
    $this[ isVisible ? null : $this.addClass('js__opened')];
  
}).append("<i>+</i>").next(".faq-answertext").hide();




    // COMMUNITY FILTER

var $grid = $('.grid');

$grid.isotope({
  // options
  itemSelector: '.grid-item',
  layoutMode: 'masonry',
  masonry: {
    columnWidth: 52,
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



    // CONTACT FORM

var contactform = $("#contactform")

if( contactform.length ) {
  contactform.on('submit', function(event) {
    event.preventDefault()
    var values = contactform.serializeArray()
    console.log(values)

    $.ajax({
      url: contactform.attr('action'),
      success: function(returnData, textStatus, jqXHR) {
        console.log('succeeded', returnData)
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log('failed', errorThrown)
      }

    })

  })

}



    // LEAFLET MAP

var mymap = L.map('map').setView([38.855786,16.540565], 8.3);


L.tileLayer('https://api.mapbox.com/styles/v1/sskiff/cjjqahfra089x2rpcsvp3kwgf/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic3NraWZmIiwiYSI6ImNqanAyNnR0eDFyd2wzdm8xMjI3MnpycjUifQ._qeUS6bN0eHOVavD6zmWgw', {
    attribution: '&copy; Arcellini 2018',
    maxZoom: 10,
    minZoom: 8.5,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1Ijoic3NraWZmIiwiYSI6ImNqanAyNnR0eDFyd2wzdm8xMjI3MnpycjUifQ._qeUS6bN0eHOVavD6zmWgw'
}).addTo(mymap);
mymap.setMaxBounds(mymap.getBounds());


var marketMarker = L.marker([38.783, 16.299]).on('click', marketMarkCheck).addTo(mymap);
marketMarker.bindPopup("<b>Seaside Market</b><br/>Jun. 1 - Jul. 30")

function marketMarkCheck() {
  marketMarker.on('popupopen', function() {
    $('.list-eventitem__market').addClass('js__active')
  })
  marketMarker.on('popupclose', function() {
    $('.list-eventitem__market').removeClass('js__active')
  })
}


var balloonMarker = L.marker([38.953, 16.359]).on('click', balloonMarkCheck).addTo(mymap);
balloonMarker.bindPopup("<b>Air Balloon Rides</b><br/>Jan. 1 - Mar. 1")

function balloonMarkCheck() {
  balloonMarker.on('popupopen', function() {
    $('.list-eventitem__balloon').addClass('js__active')
  })
  balloonMarker.on('popupclose', function() {
    $('.list-eventitem__balloon').removeClass('js__active')
  })
}


var horseMarker = L.marker([38.053, 16.059]).on('click', horseMarkCheck).addTo(mymap);
horseMarker.bindPopup("<b>Horseback Riding</b><br/>Mar. 1 - Oct. 15")

function horseMarkCheck() {
  horseMarker.on('popupopen', function() {
    $('.list-eventitem__horse').addClass('js__active')
  })
  horseMarker.on('popupclose', function() {
    $('.list-eventitem__horse').removeClass('js__active')
  })
}


var ghostMarker = L.marker([38.153, 15.729]).on('click', ghostMarkCheck).addTo(mymap);
ghostMarker.bindPopup("<b>Ghost Town Tour</b><br/>Aug. 1 - Nov. 30")


function ghostMarkCheck() {
  ghostMarker.on('popupopen', function() {
    $('.list-eventitem__ghost').addClass('js__active')
  })
  ghostMarker.on('popupclose', function() {
    $('.list-eventitem__ghost').removeClass('js__active')
  })
}



var carnivaliMarker = L.marker([39.553, 16.729]).on('click', carnivaliMarkCheck).addTo(mymap);
carnivaliMarker.bindPopup("<b>Carnivali</b><br/>Oct. 1 - Nov. 1")


function carnivaliMarkCheck() {
  carnivaliMarker.on('popupopen', function() {
    $('.list-eventitem__carnivali').addClass('js__active')
  })
  carnivaliMarker.on('popupclose', function() {
    $('.list-eventitem__carnivali').removeClass('js__active')
  })
}



var prideMarker = L.marker([39.623, 16.439]).on('click', prideMarkCheck).addTo(mymap);
prideMarker.bindPopup("<b>Pizano Pride</b><br/>End of June")


function prideMarkCheck() {
  prideMarker.on('popupopen', function() {
    $('.list-eventitem__pride').addClass('js__active')
  })
  prideMarker.on('popupclose', function() {
    $('.list-eventitem__pride').removeClass('js__active')
  })
}



// var $eventitems = $('.list-eventitem');

// $eventitems.on('mouseover', () => {
//   $(this).addClass('js__active');
// })

// $eventitems.on('mouseleave', () => {
//   $(this).removeClass('js__active');
// })















