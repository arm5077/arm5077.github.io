---
title: Building “Omniturebot,” a Slack bot for keeping tabs on traffic
layout: post
---
One of my everyday frustrations as a journalist is the veritable symphony of mouse clicks required to get web traffic stats for your stories.

Yes, [Chartbeat](//chartbeat.com) is super easy to use. But it only tracks concurrent users, not unique visitors or pageviews, which your bosses actually care about. And pulling those stats from Google Analytics or Omniture quickly devolves into a multi-step nightmare that makes setting the clock on your microwave after a power outage look downright enjoyable.

At The Atlantic, we use [Omniture](http://www.adobe.com/marketing-cloud/web-analytics.html), or whatever Adobe is calling it these days. We also use [Slack,](http://www.adobe.com/marketing-cloud/web-analytics.html) the popular work chat client, which offers extensive scripting and automation capabilities.

After a day of one too many segment-selections and filter-applications, I asked myself, couldn’t a robot do this better?

Enter Omniturebot. It’s a Slack bot that uses your Omniture credentials to pull traffic stats at a moment’s notice, accepting a keyword and a timespan and returning the relevant stats.

Using it, getting my most recent stats is as easy as chatting @omniturebot and asking `"andrew mcgill" (1 month)`. It’ll happily return:

![Slackbot's output]({{site.url}}/assets/omniturebot-output.jpg)

Omniturebot is written in Node.js and can easily be deployed via Heroku or any SaaS provider. (You can also easily run it in your local environment, if you’d prefer.) It’s written to handle multiple users, though admittedly I haven’t tested against a ton of concurrent requests.

```
for( i=0; i<=12; i++ ){
  console.log("yoyoyoyo");
}
````

I hope it makes pulling traffic numbers as easy and enjoyable as it has for me!