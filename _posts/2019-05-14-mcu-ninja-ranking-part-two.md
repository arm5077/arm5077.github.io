---
title: "Building a web app to rank my favorite Marvel superhero movies, part II"
layout: post
desc: "I needed a way to help people blaze through a bunch of yes-or-no decisions very quickly. Turns out there‘s an app that's already figured this out: Tinder."
---

_Catch up: [In this post](http://www.andrewmcgill.me/2019/05/07/mcu-ninja-ranking-part-one.html), I describe how my Marvel fandom compelled me to make an app that allows me to objectively rank my favorite superhero movies. I've settled on using the Quicksort algorithm, and have built a command-line proof-of-concept. Now, I just need to build the real thing._

In order for [mcu.ninja](http://mcu.ninja) to work, the app had to do a few things at once:

* **It needed to present dozens of pairs of movies to the user in sequence.** Quicksort relies on comparing a _test item_ to a _pivot._ As the algorithm rolled through the Marvel Cinematic Universe, it would show a bunch of 1-1 matchups, like _Captain Marvel_ vs. _The Incredible Hulk._
* **Picking one movie over the other had to be super simple.** People needed to quickly vote, and they're not going to do it if it's hard.
* **What's more, it has to be super simple even after you do it dozens of times.** When you're trying to order a list of 20+ movies, you're going to run through a _lot_ of comparisons.
* **It has to make the choice easy to understand.** A lot of superhero movie titles sound the same, and there are many, many sequels. This app had to make _Iron Man 3_ and _Guardians of the Galaxy Vol 2_ look distinct.

Not easy!

But I drew inspiration from another app on the market that's really good at presenting a bunch of choices quickly: **Tinder.**

## The swipe-y solution
In a way, Tinder has a similar goal. You're shown someone's profile and asked to make a decision — are you interested in them or not? And since they're essentially turning dating into a volume play, they want you to be able to rip through a bunch of options _fast._

To make this happen, Tinder refined swiping. If you like someone, you swipe right. If you're not interested, you swipe left. You can blaze through dozens of profiles in a few minutes.

Turns out this mechanic works pretty well for my app, too. First, I show them the pivot movie. I then run a series of other movies past them. Just like Tinder, if they like the test movie better, they swipe right. Otherwise, they swipe left. 

Once the pivot movie has run out of comparisons, we choose another pivot, and the swiping continues. 

Granted, Tinder isn't asking user to compare _two_ people and pick their ideal date — that's where the comparison to mcu.ninja breaks down. But swiping just made sense. It collapses a long list of comparisons into a single series of a few dozen swipes, resulting in a perfectly sorted list.

Here's how it looked in practice:

<video class="video" style="max-width: 400px" src="/assets/mcu-ninja-2/swipe-demonstration.mp4" muted loop autoplay plays-inline></video>


## Some findings from user testing
I learned a few important things from putting the app in front of people.

* **Swiping is harder than I thought.** People sometimes forgot which direction to swipe halfway through a series. To cue them, I added labels to the swipe animation making the comparison clear: "The Incredible Hulk is Worse 👎" and "The Incredible Hulk is better 👍".
* **You need an undo button.** Making a fast-paced app means people will make mistakes. I ended up storing the entire decision chain in memory — the yes-or-no vote on every movie pair. That way, people could jump back if they realized they swiped the wrong way.
* **Showing people how many questions they have left is hard.** The tough thing about Quicksort is that it doesn't guarantee finding a solution within a set number of sets, making a progress bar tricky. I ended up having _two_ -- one at the bottom of the screen, to show how far along you were in the given comparison set, and another at the top, for how close you were to getting your final list. I'm still not sure it works great.

## How it turned out, and next steps
I really enjoyed seeing my friends use the app and post their lists.

But it became clear that it's still not super easy to share your results, even though the app offers a Twitter and SMS share feature. Most people ended up taking screenshots and sharing those. Long-term, I'd love to have the app produce a card image that you could export and send to other MCU fans, or post on social media.

Also, this is just a demo website/web app. While I don't think there's a _huge_ demand for ranking favorite superheo movies, it might be interesting to convert it to an iOS app at some point. 

But most importantly, I'm interested to see how this list sorting mechanic could be put to other uses. Why stop at MCU movies? I could see a version of this becoming a new quiz format.

Regardless, it was a lot of fun to make. If you're reading this post first, here's my personal list (_7/2019: I've updated this list to include_ Spider-Man: Far From Home.)

1. The Avengers
2. Iron Man
3. Guardians of the Galaxy
4. Thor: Ragnarok
5. Avengers: Infinity War
6. Captain America: The Winter Soldier
7. Captain America: Civil War
8. Avengers: Endgame
9. Black Panther
10. Spider-Man: Homecoming
11. Spider-Man: Far From Home
12. Iron Man 3
13. Captain America: The First Avenger
14. Captain Marvel
15. Ant-Man
16. Avengers: Age of Ultron
17. Doctor Strange
18. Ant-Man and the Wasp
19. Thor
20. Guardians of the Galaxy Vol. 2
21. Thor 2
22. Iron Man 2
23. The Incredible Hulk
