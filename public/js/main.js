var since_id = 0,
    isPi = (navigator.userAgent.indexOf("armv6") != -1),
    nearby = [
  {
      name: 'Foodsco'
    , url: 'http://www.yelp.com/biz/foods-co-san-francisco'
    , hours: {
        all: [6,25]
    }
  },
  {
      name: 'Walzwerk'
    , url: 'http://www.yelp.com/biz/walzwerk-san-francisco'
    , hours: {
        1: [0,0]
      , 2: [17.5,22]
      , 3: [17.5,22]
      , 4: [17.5,22]
      , 5: [17.5,22]
      , 6: [17.5,22]
      , 0: [17.5,22]
    }
  },
  {
      name: 'Little Star'
    , url: 'http://www.yelp.com/biz/little-star-pizza-san-francisco-2'
    , hours: {
        1: [11.5,22]
      , 2: [11.5,22]
      , 3: [11.5,22]
      , 4: [11.5,22]
      , 5: [11.5,23]
      , 6: [11.5,23]
      , 0: [11.5,22]
    }
  },
  {
      name: 'The Sycamore'
    , url: 'http://www.yelp.com/biz/the-sycamore-san-francisco'
    , hours: {
        1: [12,22]
      , 2: [12,22]
      , 3: [12,22]
      , 4: [12,22]
      , 5: [12,24]
      , 6: [12,24]
      , 0: [12,22]
    }
  },
  {
      name: 'Nihon Whiskey Lounge'
    , url: 'http://www.yelp.com/biz/nihon-whisky-lounge-san-francisco'
    , hours: {
        1: [0,0]
      , 2: [17.5,25.5]
      , 3: [17.5,25.5]
      , 4: [17.5,25.5]
      , 5: [17.5,25.5]
      , 6: [17.5,25.5]
      , 0: [17.5,25.5]
    }
  },
  {
      name: 'Taqueria Los Coyotes'
    , url: 'http://www.yelp.com/biz/taqueria-los-coyotes-san-francisco'
    , hours: {
        1: [9.5,22.5]
      , 2: [9.5,22.5]
      , 3: [9.5,22.5]
      , 4: [9.5,22.5]
      , 5: [9.5,25.5]
      , 6: [9,25.5]
      , 0: [9,24]
    }
  },
  {
      name: 'The Little Chihuahua'
    , url: 'http://www.yelp.com/biz/the-little-chihuahua-san-francisco-4'
    , hours: {
        all: [11,22]
    }
  },
  {
      name: 'Monk\'s Kettle'
    , url: 'http://www.yelp.com/biz/the-monks-kettle-san-francisco'
    , hours: {
        all: [12,26]
    }
  },
  {
      name: 'Truck'
    , url: 'http://www.yelp.com/biz/truck-san-francisco'
    , hours: {
        1: [16,26]
      , 2: [16,26]
      , 3: [16,26]
      , 4: [16,26]
      , 5: [16,26]
      , 6: [14,26]
      , 0: [14,26]
    }
  },
  {
      name: 'Rainbow Grocery'
    , url: 'http://www.yelp.com/biz/the-monks-kettle-san-francisco'
    , hours: {
        all: [9,21]
    }
  },
  {
      name: 'Pica Pica'
    , url: 'http://www.yelp.com/biz/pica-pica-maize-kitchen-san-francisco'
    , hours: {
        all: [11,22]
    }
  },
  {
      name: 'Dear Mom'
    , url: 'http://www.yelp.com/biz/pica-pica-maize-kitchen-san-francisco'
    , hours: {
        1: [16,24]
      , 2: [16,24]
      , 3: [16,24]
      , 4: [16,24]
      , 5: [15,25.5]
      , 6: [11.5,25.5]
      , 0: [11.5,24]
    }
  },
  {
      name: 'Sparky\'s Diner'
    , url: 'http://www.yelp.com/biz/sparkys-24-hour-diner-san-francisco'
    , hours: {
        all: [0,24]
    }
  },
  {
      name: 'Orphan Andy\'s'
    , url: 'http://www.yelp.com/biz/orphan-andys-san-francisco'
    , hours: {
        all: [0,24]
    }
  },
  {
      name: 'The Armoury Club'
    , url: 'http://www.yelp.com/biz/the-armory-club-san-francisco-2'
    , hours: {
        1: [0,0]
      , 2: [17,26]
      , 3: [17,26]
      , 4: [17,26]
      , 5: [17,26]
      , 6: [17,26]
      , 0: [17,26]
    }
  },
  {
      name: 'Shotwell\'s'
    , url: 'http://www.yelp.com/biz/shotwells-san-francisco'
    , hours: {
        1: [16.5,26]
      , 2: [16.5,26]
      , 3: [16.5,26]
      , 4: [16.5,26]
      , 5: [16.5,26]
      , 6: [16.5,26]
      , 0: [16,25]
    }
  },
];


var linkify = (function() {
  var replaceSubstr = function(text, i, j, substr) {
    return text.substr(0, i) + substr + text.substr(j);
  }

  var mergeByIndices = function(a, b) {
    var i = 0, j = 0, result = [];
    while (i < a.length || j < b.length) {
      if (i < a.length && (j >= b.length || a[i].indices[0] < b[j].indices[0]))
        result.push(a[i++]);
      else
        result.push(b[j++]);
    }
    return result;
  }

  var linkEntity = function(entity) {
    if (entity.name) // user mention
      return "<a href=\"http://twitter.com/"+entity.screen_name+"\" class=\"user-mention\">@"+entity.screen_name+"</a>";
    else if (entity.url) // url
      return "<a href=\""+entity.url+"\" class=\"url\">"+entity.display_url+"</a>";
    else // hashtag
      return "<a href=\"http://twitter.com/search/%23"+entity.text+"\" class=\"hashtag\">#"+entity.text+"</a>";
  }

  var linkify = function(post) {
    var text = post.text, offset = 0;
    var entities = mergeByIndices(mergeByIndices(post.entities.hashtags, post.entities.urls), post.entities.user_mentions);
    entities.forEach(function(entity) {
      var new_substr = linkEntity(entity);
      text = replaceSubstr(text, entity.indices[0] + offset, entity.indices[1] + offset, new_substr);
      offset += new_substr.length - (entity.indices[1] - entity.indices[0]);
    });
    return text;
  }
  return linkify;
})();

function updateTwitter(){
  $.getJSON('/api/twitter.json', {since_id: since_id}, function(data) {
    data.forEach(function(tweet) {
      //Update 'since_id' if larger
      since_id = (tweet.id > since_id) ? tweet.id : since_id;

      //ignore @replies and blank tweets
      if(tweet.text == undefined || (tweet.in_reply_to_user_id && tweet.in_reply_to_screen_name != 'pwndepot' ) || (tweet.text[0] == '@' && tweet.text.substring(0, 9) != '@pwndepot')) {
        return;
      }
      // Build the html string for the current tweet
      var statusUrl = 'http://www.twitter.com/' + tweet.from_user + '/status/' + tweet.id;
      $('<div>')
        .addClass('tweet')
        .attr('id', tweet.id)
        .append($('<div>')
          .addClass('userInfo')
          .append($('<img>')
            .attr('src', tweet.user.profile_image_url.replace('_normal', '_bigger'))
            .addClass('userImage'))
          .append($('<div>')
            .addClass('userName')
            .text(tweet.user.name))
          .append($('<div>')
            .addClass('caption')
            .html(linkify(tweet)))
          .append($('<cite>')
            .addClass('timeago')
            .attr('title', tweet.created_at)))
        .appendTo('#twitter .scroll-wrap')

      if (tweet.entities.media){
        //grab first image
        var height = $('#twitter').width() / tweet.entities.media[0].sizes.medium.w * tweet.entities.media[0].sizes.medium.h;
        $('#' + tweet.id)
          .css('background-image', 'url('+tweet.entities.media[0].media_url+')')
          .height(height)
          .addClass('background');
      } else if (tweet.entities.urls && tweet.entities.urls.length) {
        //use embed.ly to get image from first URL
        var embedlyOptions = {
            key: 'a264d15f7a9d4241bf7a216c6305c1fc'
          , url: tweet.entities.urls[0].expanded_url
          , maxwidth: 200
        }
        $.getJSON('http://api.embed.ly/1/oembed?callback=?', embedlyOptions, function(data){
          if(data.thumbnail_url){
            var height = $('#twitter').width() / data.thumbnail_width * data.thumbnail_height;
            $('#' + tweet.id)
              .css('background-image', 'url('+data.thumbnail_url+')')
              .height(height)
              .addClass('background');
          }
        });
      }
    });
    $('#twitter .timeago').timeago();
  });
}


function scrollTwitter() {
  var first = $('#twitter .tweet:first-child');
  if(isPi) {
    $('#twitter .scroll-wrap').append(first);
  } else {
    $('#twitter .scroll-wrap').animate({top: -$(first).height()}, 800, function(){
      $('#twitter .scroll-wrap')
        .append(first)
        .css('top', 0);
    });
  }
}

var bartAPIKey = 'MW9S-E7SL-26DU-VV8V';

jQuery.fn.orderBy = function(keySelector) {
  return this.sort(function(a,b) {
    a = keySelector.apply(a);
    b = keySelector.apply(b);
    if (a > b)
      return 1;
    if (a < b)
      return -1;
    return 0;
  });
};


function updateWeather() {
  $.getJSON('/api/weather.json', function(data){
    //Current conditions
    var temp = Math.round(data[0].current_observation.temp_f);
    $('#weather .temp')
      .css('color', colorTemp(temp))
      .html(temp + '&deg;');

    //Forecast
    var forecast = data[1].forecast.simpleforecast.forecastday[0];
    $('#weather .forecast').html(
      '<img src="http://icons-ak.wxug.com/i/c/a/' + forecast.icon + '.gif" class="weathericon">' +
      forecast.conditions + 
      '<br>High: <span style="color:' + colorTemp(forecast.high.fahrenheit) + ';">' + forecast.high.fahrenheit + '&deg;F</span>' + 
      '<br>Low: <span style="color:' + colorTemp(forecast.low.fahrenheit) + ';">' + forecast.low.fahrenheit + '&deg;F' + '</span>' +
      '<br>Precip: ' + forecast.pop + '%'
    );
  });

  function colorTemp(temp) {
    var color = Math.min(Math.round( 255 - Math.abs(temp - 65) * (255 / 30) ), 255);
    if(temp > 65) {
      //its hot
      return 'rgb(255,' + color + ',' + color + ')';
    } else {
      //its cold
      return 'rgb(' + color + ',' + color + ',255)';
    }
  }
}


function updateBART(){
  var url = 'http://api.bart.gov/api/etd.aspx';
  
  var bart = [];

  //Request Northbound Departures
  $.ajax({
    url: url,
    data: {
      cmd: 'etd',
      orig: '16TH',
      key: bartAPIKey
    },
    dataType: 'xml',
    success:function(result){
      $('#bart-north, #bart-south').empty();
      
      $(result).find('etd').each(function(i, data){
        //Process directions
        departure = addDirection(data);
        if(departure){
          bart.push(departure);
        }
      });
      
      //Sort departures
      bart.sort(bartSortHandler);
      
      bart.forEach(function(departure){
        $(departure.div).appendTo( (departure.direction == 'North') ? $('#bart-north') : $('#bart-south'));
      });
    }
  });
  
  function addDirection(data){
    var departure = {
      destination: $(data).find('destination').text(),
      times: []
    };
    
    if(departure.destination == 'Dublin/Pleasanton') {
      departure.destination = 'Dublin/ Pleasanton';
    }
    
    $(data).find('estimate').each(function(j, data){
      //Only add times where minutes are less than 100
      if($(data).find('minutes').text() < 100){
        //Convert "Arrived" to "Arr"
        var minutes = ($(data).find('minutes').text() == 'Arrived') ? 0 : $(data).find('minutes').text();
        departure.hexcolor = $(data).find('hexcolor').text();
        departure.color = $(data).find('color').text();
        departure.times.push(minutes);
        departure.direction = $(data).find('direction').text();
      }
    });
    
    departure.div = $('<div>')
      .addClass('bart')
      .append($('<div>')
        .addClass('destination')
        .css('background', departure.hexcolor)
        .css('color', (departure.color == 'YELLOW') ? '#333' : '#FFF')
        .html(departure.destination))
      .append($('<div>')
        .addClass('nextbus'))
      .append($('<div>')
        .addClass('laterbuses')
        .append($('<div>')
          .addClass('time'))
        .append($('<div>')
          .addClass('time')));

    departure.times.forEach(function(time, idx){
      if(idx == 0) {
        $('.nextbus', departure.div).html(time);
        $('.laterbuses .time', departure.div).empty();
      } else {
        $($('.laterbuses .time', departure.div).get((idx - 1))).html(time);
      }
    })
    
    //Check if first time is less than 40 minutes away. If not, discard entire destination
    return (departure.times[0] < 40) ? departure : false;
  }
    
  function bartSortHandler(a, b){
    return (a.times[0] - b.times[0]);
  }
}

function getAdvisories(){
  var url = 'http://api.bart.gov/api/etd.aspx';

  var bart = [];

  //Request Northbound Departures
  $.ajax({
    url: url,
    data: {
      cmd: 'bsa',
      orig: '16TH',
      key: bartAPIKey
    },
    dataType: 'xml',
    success:function(result){
      $('#advisories').empty();
      $(result).find('bsa').each(function(i, data){
        //Process alert
        $('#advisories').append('<div>Alert: ' + data.description + '<br>' + data.posted + '</div>');
      });
    }
  });
}


function updateMUNI(){
  //Define Muni Roures
 var MUNIroutes = [
    {
      route: 12,
      stop:4668,
      direction: 'north',
      destination: 'Folsom to Downtown and North Beach'
    },
    {
      route: 12,
      stop:4669,
      direction: 'south',
      destination: 'Folsom to 24th St'
    },
    {
      route: 49,
      stop:5551,
      direction: 'north',
      destination: 'Van Ness to Ft Mason'

    },
    {
      route: 49,
      stop:5552,
      direction: 'south',
      destination: 'Mission to Excelsior'
    },
    {
      route: 14,
      stop:5551,
      direction: 'north',
      destination: 'Mission to Transbay & Ferry Building'
    },
    {
      route: 14,
      stop:5552,
      direction: 'south',
      destination: 'Mission to Excelsior'
    },
    {
      route: '14L',
      stop:5551,
      direction: 'north',
      destination: 'Mission to Transbay Terminal'
    },
    {
      route: '14L',
      stop:5552,
      direction: 'south',
      destination: 'Mission to Excelsior'
    },
    {
      route: 22,
      stop:7289,
      direction: 'north',
      destination: 'Fillmore to Marina'
    },
    {
      route: 22,
      stop:3299,
      direction: 'east',
      destination: '16th St to Potrero Hill & Dogpatch'
    },
    {
      route: 33,
      stop:7289,
      direction: 'west',
      destination: '18th to the Haight & the Richmond'
    },
    {
      route: 33,
      stop:3299,
      direction: 'south',
      destination: 'Potrero to 25th St'
    }
  ];
  
  var url = 'http://webservices.nextbus.com/service/publicXMLFeed',
      callbackCount = 0;

  //Loop through all routes
  MUNIroutes.forEach(function(route) {
    $.ajax({
      url: url,
      data: {
        command: 'predictions',
        a: 'sf-muni',
        r: route.route,
        s: route.stop
      },
      dataType: 'xml',
      success:function(result){
        var divName = 'muni' + route.route.toString().replace(/\s/g, '') + '_' + route.stop,
            div = $('#'+ divName),
            routeName = route.route.toString().replace(/\s\D+/g, "<span>$&</span>").replace(/(\d)(L)/g, "$1<span>$2</span>"),
            predictions = $(result).find('prediction');

        callbackCount++;

        if(!div.length) {
          div = $('<div>')
            .addClass('muni')
            .attr('id', divName)
            .appendTo('#muni-' + route.direction);
        }
        div
          .empty()
          .append($('<div>')
            .addClass('busnumber')
            .html(routeName))
          .append($('<div>').addClass('destinationContainer')
            .append($('<div>')
              .addClass('rotate')
              .html(route.destination)))
          .append($('<div>')
            .addClass('nextbus time'))
          .append($('<div>')
            .addClass('laterbuses')
            .append($('<div>')
              .addClass('time'))
            .append($('<div>')
              .addClass('time')));
        
        var idx = 0;
        predictions.each(function(i, data){
          //Limit to 3 results, only show times less than 100, don't show results that are 0
          if(idx < 3 && $(data).attr('minutes') < 100 && $(data).attr('minutes') > 0){
            $('.time', div).eq(idx).html($(data).attr('minutes'));
            idx++;
          }
        });

        //hide if no predictions
        div.toggle((predictions.length > 0));

        if(callbackCount == MUNIroutes.length) {
          $('.muniContainer').each(function(idx, muniContainer){
            $('.muni', muniContainer).orderBy(function() {return +$('.nextbus', this).text();}).appendTo(muniContainer);
          });
        }
      }
    });
  });
}

function updatePlaces(){
  var currentTime = new Date(),
      currentMinutes = currentTime.getMinutes(),
      currentHours = currentTime.getHours(),
      currentDay = currentTime.getDay();

  if(currentHours < 4){
    currentHours += 24;
    currentDay -= 1;
  }
  nearby.forEach(function(place){
    var divName = place.name.replace(/[!\"#$%&'\(\)\*\+,\.\/:;<=>\?\@\[\\\]\^`\{\|\}~\s]/g, ''),
        div = $('#' + divName),
        hours = place.hours.all || place.hours[currentDay],
        status;

    if(!div.length) {
      var div = $('<div>')
        .addClass('place')
        .attr('id', divName)
        .append($('<div>')
          .addClass('status'))
        .append($('<a>')
          .addClass('storeName')
          .attr('href', place.url)
          .html(place.name))
        .append($('<span>')
          .addClass('countdown'))
        .appendTo('#nearby');
    }
    if(hours[1] - hours[0] == 24) {
      status = 'open';
    } else if(currentHours < hours[0] || currentHours >= hours[1]) {
      status = 'closed';
    } else if(currentHours == (hours[1] - 1) ) {
      status = 'closing';
    } else {
      status = 'open';
    }
    $(div).attr('data-status', status);
    $('.countdown', div).html(((currentMinutes - 60) * -1) + " min");
  });

  $('#nearby [data-status="open"]').each(function(idx, item){
    $('#nearby').append(item);
  });
  $('#nearby [data-status="closing"]').each(function(idx, item){
    $('#nearby').append(item);
  });
  $('#nearby [data-status="closed"]').each(function(idx, item){
    $('#nearby').append(item);
  });
}

function updateFoursquare() {
  $.getJSON('/api/foursquare.json', function(data) {
    var users=[4103624, 2045886, 2562440, 76208, 1244684, 476418, 103618, 34602, 21774118, 39723051, 507909, 96339, 19462501, 4077951, 45948];
    var width = $(window).width() / 3;
    if(data && data.response) {
      data.response.recent.forEach(function(checkin) {
        if(users.indexOf(parseInt(checkin.user.id, 10)) != -1) {
          var createdAt = new Date(checkin.createdAt * 1000);
          //only show checkins newer than one day
          if(new Date().getTime() - createdAt.getTime() < 24*60*60*1000 ) {
            var div = $('#foursquare_' + checkin.user.id);
            if(!div.length) {
              div = $('<a>')
                .attr('id', 'foursquare_' + checkin.user.id)
                .addClass('foursquare')
                .width(width)
                .appendTo('#foursquare .scroll-wrap');
            }

            div
              .empty()
              .attr('href', checkin.venue.canonicalUrl)
              .append($('<img>')
                .attr('src', checkin.user.photo.prefix + '100x100' + checkin.user.photo.suffix))
              .append($('<div>')
                .addClass('userName')
                .text(checkin.user.firstName))
              .append($('<h2>')
                .html(checkin.venue.name))
              .append($('<div>')
                .addClass('shout')
                .html(checkin.shout))
              .append($('<cite>')
                .attr('title', createdAt.toISOString()));

            //size title
            var ratio =  26 / $('h2', div).text().length;
            if(ratio <= 1) {
              $('h2', div).css('font-size', Math.round(ratio*10000)/100 + '%');
            }
          }
        }
        
      });
      $('#foursquare cite').timeago();
    }
  });
}


function scrollFoursquare() {
  var first = $('#foursquare .scroll-wrap a:first-child');
  if(isPi) {
    $('#foursquare .scroll-wrap').append(first);
  } else {
    $('#foursquare .scroll-wrap').animate({left: -$(first).width()}, 800, function(){
      $('#foursquare .scroll-wrap')
        .append(first)
        .css('left', 0)
    });
  }
}
function updateInstagram() {
  $.getJSON('/api/instagram.json', function(data) {
    if(data.length) {
      $('#instagram .instagram').remove();
      data.forEach(function(picture) {
        var createdAt = new Date(picture.created_time*1000);
        if(new Date().getTime() - createdAt.getTime() < 30*24*60*60*1000 ) {
          $('<div>')
            .addClass('instagram')
            .append($('<img>')
              .addClass('instagramImage')
              .attr('src', picture.images.standard_resolution.url))
            .append($('<div>')
              .addClass('userInfo')
              .append($('<img>')
                .attr('src', picture.user.profile_picture)
                .addClass('userImage'))
              .append($('<div>')
                .text(picture.user.full_name)
                .addClass('userName'))
              .append($('<div>')
                .addClass('caption')
                .html((picture.caption) ? picture.caption.text : ''))
              .append($('<cite>')
                .addClass('timeago')
                .attr('title', createdAt.toISOString())))
            .appendTo('#instagram .scroll-wrap');
        }
      });
      $('#instagram .timeago').timeago()
    }
  });
}

function scrollInstagram() {
  var first = $('#instagram .scroll-wrap .instagram:first-child');
  if(isPi) {
    $('#instagram .scroll-wrap').append(first);
  } else {
    $('#instagram .scroll-wrap').animate({top: -$(first).height()}, 800, function(){
      $('#instagram .scroll-wrap')
        .append(first)
        .css('top', 0);
    });
  }
}


$(function(){

  //check open times every minute
 // updatePlaces();
 // setInterval(updatePlaces, 60000);

  //update Twitterevery 5 minutes
  updateTwitter();
  setInterval(updateTwitter, 300000);

  //update Foursquare every 5 minutes
 // updateFoursquare();
 // setInterval(updateFoursquare, 300000);

  //update Instagram every 30 minutes 
 // updateInstagram();
 // setInterval(updateInstagram, 1800000);

  //scroll every 5 seconds
  setInterval(function(){ /*scrollInstagram(); scrollFoursquare();*/ scrollTwitter() }, 5000);

  //reload browser every 6 hours
  setInterval(function(){ window.location.reload(true); }, 21600000);
  
});