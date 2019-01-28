---
title: "A data interactive that challenges people to draw a trend, and then shows them reality"
layout: post
desc: "Convincing people their misconceptions are wrong is maybe journalism's toughest job. Could a participatory exercise make that easier?"
---

In the thick of the 2016 campaign, then-candidate Donald Trump frequently claimed that life in America was becoming [more dangerous.](https://twitter.com/realDonaldTrump/status/752834632907943936) He didn't have to work hard to convince folks. Gallup pollsters found [more than half](http://www.gallup.com/poll/190475/americans-concern-crime-climbs-year-high.aspx) of Americans worried "a great deal" about crime and violence, and the same proportion expected gun violence to go up. 

The problem? Those opinions weren't based on facts. Violence in the United States has declined almost every year for the past 25 years. Trump's comments were well-timed — the national murder rate did briefly jot up in 2015 and 2016, largely driven by violence in a few cities — but the overwhelming trend is negative. New York City, which ranks near the [bottom](https://today.yougov.com/topics/lifestyle/articles-reports/2014/09/15/what-is-americas-most-dangerous-city) in polls on public perception of crime and violence, is actually one of the [safest places](https://www.brennancenter.org/sites/default/files/publications/2018_09_CrimeAnalysisV6.pdf) to live in the country.

But simply stating facts [doesn't always correct a misconception](https://www.tandfonline.com/doi/full/10.1080/01296612.2017.1384145) — people's opinions are remarkably sticky. When I sat down to write [a story](https://www.theatlantic.com/politics/archive/2016/07/is-violence-in-america-going-up-or-down/491384/) on Trump's doomsaying, I wondered if there was a sneakier way to show folks the true trends. 

My experiment: What if I had them draw their guess first, and then showed them the actual data?

Here's what I added near the top of the story:

<div style = "max-width: 800px; margin: auto">
<guess-graph
  intro-title = "Click the starting point and drag to draw the changing <strong>murder rate</strong> between 1985-2014."
  data = "https://s3.amazonaws.com/the-atlantic/homicide-rate/data/homicides-small.json"
  y-axis-label = "Homicides per 100,000 people"
  x-axis-ticks = "1986,1988,1990,1992,1994,1996,1998,2000,2002,2004,2006,2008,2010,2012,2014"
  x-axis-ticks-mobile = "1985,1990,1995,2000,2005,2010,2014"
  x-axis-min = "1985"
  x-axis-max = "2014"
  y-axis-min = "0"
  y-axis-max = "16"
  result-message='false'
  height-mobile = "300"
  height = "400"
></guess-graph>
</div>

It was a cool addition to the article, but I never had a chance to deploy this kind of interactive graphic again. What's more, I never really got a sense if it was _effective_ — did this actually help people change their minds?

## Two years later

The government is shut down. The Democrats refuse to fund a wall. And nearly every day, Trump claims there is a flood of people pouring across the southern border.

By historical standards, this is not true. In fiscal year 2017, the U.S. Border Patrol apprehended 310,531 people, [the lowest number since 1971.](https://www.cbp.gov/sites/default/files/assets/documents/2017-Dec/BP%20Total%20Apps%20FY1925-FY2017.pdf) That's despite a [historically high number](https://www.cbp.gov/sites/default/files/assets/documents/2017-Dec/BP%20Staffing%20FY1992-FY2017.pdf) of Border Patrol agents, though the force strength has slightly dropped from its peak in 2011.

Could it be time to bring back the line-drawing trick?

This week, my [**Make Every (Two) Week(s) project**](http://www.andrewmcgill.me/2019/01/01/new-year-new-make-every-week-resolutions.html) is to turn my 2016 graphic into a reusuable web component I could launch with almost any dataset. I call it `<guess-graph>`.

Here's the new graphic:

<div style = "max-width: 800px; margin: auto">
<guess-graph
  intro-title = "Click the starting point and draw your best guess for <strong>total illegal border crossings</strong> between 1997 and 2017."
  data = "/assets/guess-graph/border-arrests.json"
  y-axis-label = "Illegal border crossings (in millions)"
  y-axis-min = "0"
  y-axis-max = "3"
  height-mobile = "300"
  height = "500"
></guess-graph>
</div>
<script src="/assets/guess-graph/bundle.js"></script>

And here's the code I used to make it:

```
<guess-graph
  intro-title = "Click the starting point and 
    draw your best guess for total <strong>illegal 
    border crossings</strong> between 1997 and 2017."
  data = "/assets/guess-graph/border-arrests.json"
  y-axis-label = "Illegal border crossings (in millions)"
  y-axis-min = "0"
  y-axis-max = "3"
  height-mobile = "300"
  height = "400"
></guess-graph>
```

While defaulting to sensible styles, it has a bunch of parameters that customize how it should look ([full list here](https://github.com/arm5077/guess-graph#customization)). For data, tt references an external JSON file, which looks like this:

```
[
  {
    "year": 1997,
    "rate": 1.369
  },
  {
    "year": 1998,
    "rate": 1.517
  },
  {
    "year": 1999,
    "rate": 1.537
  },
  ...
]
``` 

This component is built using the [Custom Elements V1](https://html.spec.whatwg.org/multipage/custom-elements.html#custom-elements) spec, which brings some of the modularity seen in frameworks like React or Vue into vanilla HTML and JavaScript. Custom elements are now [supported across all major browsers](https://caniuse.com/#feat=custom-elementsv1) except Edge; for them and older browsers, use this [polyfill.](https://github.com/webcomponents/custom-elements/)

Why make it as a custom element? This frees the user from having to use any particular JS framework, and makes dropping the code into a content management system or blogging platform like Wordpress easy for beginners.

The full code for the component is [here.](https://github.com/arm5077/guess-graph)

## What's next
Now that I've built the component, next step is to put it through some user testing to see if it makes sense to readers and contributes to their understanding of counterintuitive trends. See you in two weeks!