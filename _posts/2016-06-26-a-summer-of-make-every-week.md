---
title: "Make Every Week, Part 1: A bikeshare smartwatch app"
layout: post
desc: "A resolution to stretch my mind and build a new tool (and preferably a physical thing!) every week this summer. First up: a smartwatch app the monitors bikeshare availability in DC."
---
In 2015, WNYC journalist and developer John Keefe [made up his mind to build a new thing every week.](http://johnkeefe.net/make-every-week-a-bendy-mangnifier) By the end of the year, he had designed [a wind-sensing candle,](http://johnkeefe.net/make-every-week-wind-sensor-candle), [a homemade fitness wristband](http://johnkeefe.net/make-every-week-fitness-wristband), [a lunch-suggesting Slack bot](http://johnkeefe.net/make-every-week-lunch-bot), and [much more.](http://johnkeefe.net/make-every-week-begets-a-book) I loved following along throughout the year and seeing what he thought of next.

So here's my own resolution: **Every week this summer, I'll build something new myself.** It'll ideally have some presence in the physical world, though I'll probably have a few lazy weeks and build web-only tools. And it can't be something I'm already doing for work, because that's cheating. 

Beyond that, I'll avoid being too picky. I want to keep the pump of creativity primed; it's a lot easier to think of new ideas when you're already working on something!

On that note, let's look at the first project: **a smartwatch app that tells Capital Bikeshare users how many bicycles are available at nearby docks.**

## Capital Bikeshare smartwatch app

This project connects two of my favorite things, both built by teams of passionate people:

+ **Washington, D.C.'s Capital Bikeshare.** This [citywide program](https://www.capitalbikeshare.com/) puts low-cost commuter bikers within easy reach of residents. If you're a member, you can use a key fob to check out one of the thousands of bikes docked throughout the District, Maryland and Virginia. Once you reach your destination, you lock it at the nearest dock. It's a great one-way transportation system that I used quite frequently before I upgraded my own bicycle.
+ **The Pebble smartwatch.** A [Kickstarter-funded project](https://www.pebble.com/), Pebble is an awesome alternative to mainstream smartwatches like the Apple Watch, offering an e-ink display, great battery life and most of the features you'd expect. Best of all, it's super easy to develop for Pebble, both in C and in Javascript.

As much as I love Capital Bikeshare, I dread rolling up to my office after a long commute and discovering other commuters have already claimed all the bike docks. It always looks clear when I check the [Spotcycle app](https://www.spotcycle.net/) at the beginning of my ride — but the racks often fill up while I'm huffing and puffing along. And fiddling with my phone mid-ride, trying to get an update, sounds like a good way to end up in the hospital.

But what if my Pebble could tell me whether the upcoming bike rack was full?

![Tada! The Capital Bikeshare Pebble app.](/assets/smartwatch_banner.jpg)

## Building the app

Most Pebble apps are written in C. But to prototype my bikeshare app, I used [Pebble.js](https://pebble.github.io/pebblejs/), a framework that allows you to program your Pebble using Javascript. It's limited and a bit laggy, since most of the computing takes place on your phone, but it's very quick to get running.

For my data source, I pulled two JSON feeds from Capital Bikeshare's [station map](https://secure.capitalbikeshare.com/map/): [station_information.json](https://api-core.capitalbikeshare.com/gbfs/en/station_information.json) and [station_status.json](https://api-core.capitalbikeshare.com/gbfs/en/station_status.json). Capital Bikeshare would rather developers use its [official XML feed](https://www.capitalbikeshare.com/system-data), but since Pebble.js is notoriously bad at parsing non-JSON models, I opted for a hackier solution.

**First**, I needed to throw up a loading screen while the app pulled data and found the user's location. Pebble.js mostly works by displaying **Cards**, which are standalone screen with a title, subtitle and body text, and **Menus**, which are scrollable lists. Here's the code for a loading card: 

```javascript
var card = new UI.Card({
  title: 'Capital Bikeshare',
  subtitle: "Getting bikeshare data..."
});

card.show();
```

Pebble.js uses a version of jQuery's `ajax` function to make HTTP requests. Here, I pull in both feeds using nested AJAX calls:

```javascript
ajax(
 {
   url: "https://api-core.capitalbikeshare.com/gbfs/en/station_information.json",
   type: "json"
 },
 function(info){
   // Got station info 
   ajax(
     {
       url: "https://api-core.capitalbikeshare.com/gbfs/en/station_status.json",
       type: "json"
     },
     function(status){       
      // Got status of stations
      
      // Rest of code goes here
      
     },
     function(err){ throw err; }
   );
 },
 function(err){ throw err; }
);
```

The bike availability data I need is in `station_status.json`, but that file only contains very little information about the stations themselves — only a numerical ID. So you have to cut in the station metadata from `station_information.json`.

```javascript
// Make array of station ids 
var station_ids = info.data.stations.map(function(d){ return d.station_id; });

// For each station status, add in metadata about the station
status.data.stations.forEach(function(station){
  var station_info = info.data.stations[station_ids.indexOf(station.station_id)];
  station.name = station_info.name;
  station.latitude = station_info.lat;
  station.longitude = station_info.lon;
  station.capacity = station_info.capacity;
});
```

Next up: The user's current position. This is actually a snap, since Pebble.js allows you to use Javascript's native `navigator.geolocation` function. I use a [Haversine distance function](https://www.google.com/webhp?sourceid=chrome-instant&ion=1&espv=2&ie=UTF-8#q=haversine) (borrowed with thanks from [this library!](https://github.com/jaxgeller/node-geo-distance/blob/master/index.js)) to sort the array of stations by their distance from the user, from nearest to farthest.

```javascript
navigator.geolocation.getCurrentPosition(function(position){
  var user = {
    latitude: position.coords.latitude,
    longitude: position.coords.longitude
  }
  
  // Sort by station distance
  status.data.stations.sort(function(a,b){
    return haversine(user, a) - haversine(user, b);
  });
  
});
```

Lastly, I build a Menu object using the closest 10 stations. Menu objects accept a `title` and and a list of of `items`, each of which have a title of their own and an optional subtitle. You'll notice I also attach a `select` event to the Menu, which creates a new card showing expanded details about the station.

```javascript
// Loop through the top 10 stations closest to the user
var menu_items = [];
for( i=0; i<=9; i++){
  menu_items.push({
    title: status.data.stations[i].name,
    subtitle: status.data.stations[i].num_bikes_available + " bikes/" + status.data.stations[i].capacity
  })
}

var resultsMenu = new UI.Menu({
  sections: [{
    title: "Nearest stations:",
    items: menu_items
  }],
  highlightBackgroundColor: "#EC008C",
  highlightColor: "black"
});

resultsMenu.on('select', function(e){
  var station = status.data.stations[e.itemIndex]
  var stationCard = new UI.Card({
    title: station.name,
    body: "Bikes available: " + station.num_bikes_available
      + "\nDocks available: " + station.num_docks_available,
    scrollable: true
  })
  stationCard.show();
})

resultsMenu.show();
card.hide();
```

And that's it! Here's the app in action (and [full code here](https://github.com/arm5077/capital-bikeshare-pebble)):

![The app at work.](/assets/watch-app-gif.gif)