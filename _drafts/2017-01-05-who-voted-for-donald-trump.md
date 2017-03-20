---
title: "How did Donald Trump win? A bit of modeling"
layout: post
desc: "I'm trying to figure out the coalition that elected Donald Trump president. How? NERD SCIENCE."
---
In a few weeks, Donald Trump will step into the Oval Office, take a seat, and begin giving orders.

It's funny how things turn out. In the summer of 2015, right after the New York billionaire announced his candidacy for president, the parking garage at my office building collapsed. (I wasn't at _The Atlantic_ then.) Fearful the rest of our building could follow suit, we all went out for lunch. Over sushi, a senior editor explained our "Trump" position: We'd cover him, but only when he made news that actually affected the campaign.

Welp! He quickly _became_ the campaign; soon, he will be president. How'd it happen? 

There are plenty of theories — working-class angst, a shift in the electorate toward protectionism, racial politics. Now that the [vote totals are final](http://uselectionatlas.org/), I'm taking a look back and giving a shot at building the definitive statistical model that explains who voted for Trump.

**Here's how this will work:** My core dataset is a county-by-county breakdown of how many votes each candidate got. By crossing those county totals with demographic data — the percent of residents with college degrees, the proportion of the population that isn't white, the total number of Subway restaurants — I can look for correlations, a connection between a demographic trend and the likelihood an area would vote for Trump. 



For each of these posts, I'll test a trend against the vote data, showing how closely (or not closely) it helps explain Trump support. I'll also put a map showing the geographic areas where the model does a good job of predicting voter preferences, versus the ones it doesn't. And finally, if the trend seems helpful, I'll add it to the running omnibus model that combines all helpful factors.

## The obvious stuff: Race and education
I've written _ad nauseum_ about how [white voters with high school degrees](http://www.theatlantic.com/politics/archive/2016/09/dissecting-donald-trumps-support/499739/) liked Trump _way_ more than Clinton.

![lol at me](https://cdn.theatlantic.com/assets/media/img/mt/2016/09/test_banner/lead_960.png?1473872393)

