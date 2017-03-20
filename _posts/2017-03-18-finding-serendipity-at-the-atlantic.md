---
title: "Can a Slack bot inspire serendipity at work?"
layout: post
desc: "I found myself wondering what cool things my coworkers were writing and coding. But I didn't know how to ask."
---
At any given moment, people are doing some pretty neat stuff at _The Atlantic._ Just last week, my coworkers: 

* Wrote a story about [snakes that are good at killing other snakes;](https://www.theatlantic.com/science/archive/2017/03/snake-vs-snake/519696/)

* Experimented with how to hype a magazine story [in a really cool way on Instagram;](https://www.instagram.com/p/BReEOpLD8zm/)

* Compiled a [crazy photo essay on Mount Etna,](https://www.theatlantic.com/photo/2017/03/mount-etna-europes-most-active-volcano/519681/) Europe's most active volcano.

But here's the sad truth: I  only see a tiny percentage of the things my officemates make. I just don't have enough time in the day to read through every story on [theatlantic.com.](https://theatlantic.com) And even if I could, I'd still miss all the things our events staffers are planning, or what the product team is coding, or what the graphic artists are cooking up...

We all work in the same building, but I know very little about what people outside my own team (politics) do on a daily basis. And although I don't really _need_ to, I wondered if there was a way to introduce some serendipity into our working lives.

> **Why is serendipity even important?** <br />
>This probably deserves a longer answer, and at some point, I'll write a standalone post.
><p>For now, here's my best shot: Encouraging serendipity at an organization makes room for happy accidents, where something unexpected results from the collision of two separate things. Some of my favorite projects have come from chance conversations — and they're usually something neither me nor my conversation partner would have developed alone.</p>

Enter SerendipityBot
-----
They say that if [all you have is a hammer, everything looks like a nail.](https://en.wiktionary.org/wiki/if_all_you_have_is_a_hammer,_everything_looks_like_a_nail) I'm trying to be more careful about jumping to a technical solution when something might just need a simple conversation — or might not be a problem at all.

But in this case, I felt pretty confident about my idea: **What if we had a Slack bot that unobtrusively asked random staffers about what's energizing them this week, and then shared that with the office at large?**

Here was my idea:

* I'd make a Slack #serendipity channel where people who are interested in learning about what their coworkers do — and telling their own stories — could join and engage in conversation;

* I'd code a Slack bot that would randomly ping people from that channel to share what they're passionate about at that moment, at an interval of no more than once every two weeks or so.

* Every day, the bot would ping coworkers during working hours until it had three responses. And at a set time, it would post all three to the #serendipity channel as a small blog post.

Would anyone even want to participate? I floated a trial balloon:

![i’m considering an experiment: i enjoy learning via serendipity what my non-political coworkers are working on and wondered if there was a way to find out more intentionally. i’m rigging up a slackbot that would a) ping random dot-com folks at non-annoying intervals (every few weeks?) to ask what they’re writing/coding/videoing about and b) distill that into a occasional digest on a special slack channel. could be a neat place to get some ideas or offer suggestions. if you’re interested in being a part of the beta, throw me a robot emoji here!](/assets/serendipity-pitch.png)

OK, so I wasn't crazy! Those 25 people became my beta testers.

First job was figuring out what the bot would say to people. I wanted it to be chill and non-threatening, and give people the option of ducking out — but also be fairly direct.

Here's what I ended up with: 

![Hi! I'm SerendipityBot, created by @andrewmcgill. I ask random Atlantic people what they're working on this week that excites them, and share a brief digest every day in #serendipity. It's a fun way to get an idea of the cool things your coworkers are doing. Want to partipate? If so, tell me something you're working on this week that you'd like to share, in the form of "I am *building a rocket,*" or "I'm *writing about Capt. Jean-Luc Picard*." If you don't want me to bug you right now, reply *"snooze."* If you never want to hear from me again (:sob:), type *"I hate you."*](/assets/serendipity-intro.png)

The bot waits a while for an answer. If it doesn't get one, it nudges politely: "I'll ask one more time before leaving you alone: Any chance you want to share a cool thing you're working on this week?"

It's key, by the way, to give people a way to let the bot know they don't really have anything they want to share. Sometimes, you're just not working on anything exciting at the moment. Or maybe you're too busy. In that case, the bot happily accepts `snooze` and leaves the person alone for two weeks.

Right now, I have the bot pinging a random employee every 10 minutes, from 11 a.m. to 2 p.m., Monday through Friday. Once it gets three responses, it stops for the day. (Of course, sometimes people respond a few hours late, after the quota has already been filled, so we'll occasionally have four or even five responses in a single day.)

At the stroke of 2:30 p.m. — I originally set it for the next morning, but people didn't like waiting a whole day to see their responses go up — the bot posts in #serendipity.

Here's an example:

![A slack conversation initated by the bot that culminates in a picture of a panther with a breathing mask.](/assets/serendipity-example.png)

How has this experiment turned out?
------
Pretty well. More than 70 people have joined the #serendipity channel — somewhere around a quarter of the entire _Atlantic_ Slack community. SerendipityBot had some hiccups: It spammed a bunch of people on Martin Luther King Jr. Day, which is on a Monday, when the bot thought everyone would be working. But overall, I think it has made each day a teensy bit more delightful.

What's the long term impact? I don't know. So far, I haven't seen The Next Big Atlantic Idea bubble up from a conversation in #serendipity. But that's not really the point. Getting to know your coworkers better is a worthy goal on its own — and I think SerendipityBot has helped with that.

_If you'd like to look at the code powering SerendipityBot, [it's available here.](https://github.com/arm5077/sup-slackbot) Tldr: It's a Node app that lives on Heroku and stores user information in a MongoDB database._