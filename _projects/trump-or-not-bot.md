---
title: "@TrumpOrNotBot"
description: "A bot that guesses when it's really Trump tweeting."
asset: '/assets/trump-or-not-bot.jpg'
external_url: "https://www.twitter.com/trumpornotbot"
order: 2
---
**Where:** [Twitter!](https://www.twitter.com/trumpornotbot)

**Why:** [@realDonaldTrump](https://twitter.com/realdonaldtrump) might be the most powerful Twitter account in the world. Some tweets are written by Trump himself; others are written by staffers. I wanted to know which ones were which.

**How:** During the campaign, Trump almost exclusively tweeted from an Android phone. His staffers, on the other hand, used iPhones. Using archived Twitter data, I built a [machine-learning model](https://github.com/arm5077/trump-twitter-classify) that used language patterns to predict whether Trump was the author of a given tweet.

**What I learned:** Keeping a model up to date is really hard to do when you don't have new data. Trump gave up his Android when he became president, so the classifier is based only on his pre-election tweets. It's become increasingly inaccurate.