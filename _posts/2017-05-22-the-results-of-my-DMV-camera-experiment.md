---
title: "Using computer vision to figure out the best time to visit the DMV"
layout: post
desc: "The results of an experiment I began last year using camera feeds of a Washington, DC Department of Motor Vehicles office."
---
Last summer &mdash; it _does not_ feel that long ago &mdash; [I launched a script]({% post_url 2016-07-18-make-every-week-dmv-tracker %}) to record data from the District of Columbia Department of Motor Vehicles' [live webcam feeds](https://dmv.dc.gov/page/customer-webcams-georgetown-service-center), which monitor the waiting room of the main service station in Georgetown. 

Every minute, my code "counted" the number of empty seats present, building a database that could tell you, with extremely fine granularity, exactly how busy the DMV was. (Take a look at the link above for an explanation of how that worked.)

I planned to let it run for a month. But then I forgot about it; the script actually ran for three months (at which point my free Heroku MySQL database ran out of memory). Happy accident!

Packing all that data into a visualization that lays out the center's relatively crowdedness over the course of the "average" week actually shows some interesting trends:

<div id="chart"></div>
<script src='https://s3-us-west-2.amazonaws.com/nationaljournal/libraries/pym.js'></script>
<script>
var pymParent = new pym.Parent('chart', 'https://s3.amazonaws.com/the-atlantic/dc-dmv-display/index.html', {});
</script>

First, the service center is closed on Sunday and Monday, so those days registered no data. Lop 'em off.

Second, Saturday is the busiest day. I expected that — most people have to wait for the weekend to get enough free time to slog through renewing their their licenses. The worst time to show up is 12-1 p.m. on Saturday, when crowds are at least 60 percent larger than average.

But then there's Thursday, which for some reason is a relative respite at the DMV. The whole morning is far less busy than average, with the 10 a.m. hour being the least crowded of the week. And the rest of the day is on par.

What is it about _Thursday_? I'm going to have to do more investigation here. Maybe the staff closes off part of the service center for cleaning, fooling the camera algorithm into thinking the whole place is less busy?

Regardless, it's a fun conclusion to a little experiment I started a year ago. I only wish I had sprung for a paid Heroku instance... we could be working with a whole _year_ of data if the database hadn't tapped out! 

But even from this, there's a clear takeaway: **go to the DMV on Thursday.**