---
title: "Building a web app to rank my favorite Marvel superhero movies, part one"
layout: post
desc: "How's a superhero fan supposed to overcome recency bias in rating their favorite movies? Uh, how does complicated math sound?"
---

I love superhero movies. Specifically, Marvel superhero movies. Specifically specifically, Marvel Cinematic Universe movies — Iron Man, Captain America, Thor, and so on. Never thought I'd be that guy, but somehow I've seen _every single MCU movie_ — 22 in total. 

Why? Because they're super good! There's a reason they have an average Rotten Tomatoes score of 84%.

But which ones are the _best?_ This is a constant debate among my friends. And with the latest phase of the MCU coming to a close with _Avengers: Endgame_, it's been a good time to take stock and make best-of lists.

A few problems, though:

* **There are too many movies.** Organizing 22 films in order of preference is a... _tall order._ (🥁) You have to keep track of every other movie when you're considering one, or chunk them in ways that could lead to misalignment later.
* **You're probably going to give better scores to movies you just saw.** Because I watched _Avengers: Endgame_ more recently, I'm more likely to rate it higher than the original Avengers, just because I remember more details about it.
* **You probably know your favorite and least-favorite films, but nothing in between.** This is a twist on the well-documented [recency/primacy](https://en.wikipedia.org/wiki/Serial-position_effect) effect, where humans are better at remembering the beginnings and ends of lists than things in the middle. In this case, fans probably never formed opinions on middling movies, focusing on just the best and the worst.

All of these problems mean tools that let you [drag around movie names](http://rankthemcu.com) probably aren't helping you come up with a definitive list. They're just confusing you!

<video autoplay="" playsinline="" muted loop preload="auto" poster="https://thumbs.gfycat.com/SleepyAngelicGiantschnauzer-mobile.jpg" tabindex="-1"><source src="https://thumbs.gfycat.com/SleepyAngelicGiantschnauzer-mobile.mp4" type="video/mp4"><source src="https://giant.gfycat.com/SleepyAngelicGiantschnauzer.webm" type="video/webm"><source src="https://giant.gfycat.com/SleepyAngelicGiantschnauzer.mp4" type="video/mp4"><source src="https://thumbs.gfycat.com/SleepyAngelicGiantschnauzer-mobile.mp4" type="video/mp4"><meta itemprop="contentUrl" content="https://giant.gfycat.com/SleepyAngelicGiantschnauzer.mp4"></video>

My take: **It's easier to pick your favorite movie when you just have two options in front of you.** If you run through enough pairings, eventually you'll get an ordered list. 

That's the idea behind [mcu.ninja,](http://mcu.ninja/) a ranking tool I put out last week. 🎉

In this post, I'm going to explain the logic behind the ordering algorithm powering mcu.ninja and the command-line utility I built to demonstrate it. Next week, I'll discuss the UI and why I thought Tinder-style swiping was the right decision.

<a href="#my-list">If you just want my MCU movie ranking, here you go.</a>

## Sorting is hard

If you need to order a list of 22 items, it's simplest to go one by one and compare every movie to every other. 

Let's say I start with _Captain Marvel._ I'd compare it to _Iron Man_, the first film in the MCU.

![Captain Marvel vs. Iron Man](/assets/mcu-ninja-1-images/marvel-vs-iron-man.png)

OK, that's easy — I like _Iron Man_ better. But that's only the beginning. I still have to compare _Captain Marvel_ to every other MCU movie — 21 comparisons in all.

![Captain Marvel vs. every other Marvel movie — quite a few!](/assets/mcu-ninja-1-images/marvel-vs-everyone.png)

Once we're done with _Captain Marvel_, we move on to the next film: _Avengers: Endgame._ Since we already compared it to _Captain Marvel_, we don't have to match them again. But we still have 20 other movies to compare.

![Let's add in Avengers: Endgame. SO MANY MOVIES](/assets/mcu-ninja-1-images/marvel-and-endgame.png)

So far, we've made 41 comparisons. If we add just two more movies, we're up to 78:

![This is obviously crazy.](/assets/mcu-ninja-1-images/obviously-crazy.png)

Taking this to its mathematical conclusion, we'd have to make comparisons equal to 21 + 20 + 19 + 18... + 1, or *(n^2 + n) / 2*. That's 231 match-ups — only marginally better than watching [14,000,605 alternative futures.](https://screenrant.com/infinity-war-doctor-strange-futures-how-many-why/)

## Quicksort to the rescue

There are plenty of [better ways](https://en.wikipedia.org/wiki/Sorting_algorithm#Comparison_sorts) to sort stuff. In this case, topping the list is the **[Quicksort](https://en.wikipedia.org/wiki/Quicksort)** algorithm.

Let's line up all the movies by date released — the order doesn't matter — and randomly pick _Captain Marvel_ to start:

![All the Marvel movies lined up, with Captain Marvel highlighted.](/assets/mcu-ninja-1-images/quicksort-step-1.png)

_Captain Marvel_ is the **pivot.** Our job is to re-order the list so every movie that's worse goes on the left, and every movie that's better goes on the right.

It doesn't matter what order we put them in — only that they're better or worse than the pivot.

![We've sorted the movies to be better or worse than Captain Marvel.](/assets/mcu-ninja-1-images/quicksort-step-2.png)

Ater sorting (your choices might be different!), we now know Captain Marvel is No. 16 on list. To do this, we had to make 21 comparisons — same as we did before. But the next step is different. We consider the better-than and worse-than movies as _their own sets,_ and run the method again.

So in the "worse-than-Captain Marvel" set, we randomly choose _Thor: The Dark World_ as our pivot. In the "better-than-Captain Marvel" set, we choose _Captain America: Civil War._ For each of these sets, we again sort the movies by whether or not they're worse than the pivot.

![Now we've sorted each subset as well — marking Thor: The Dark World as No. 20 and Captain America: Civil War as No. 8.](/assets/mcu-ninja-1-images/quicksort-step-3.png)

Now we have three movies properly ordered — with only 40 comparisons, instead of 60 with our previous method. That's a huge improvement. 

That kind of efficiency isn't guaranteed. Quicksort works best when the pivots land in the middle of a given set — in this case, the movie that's chosen is average, not terrible or spectacular. But unless you're really unlucky, Quicksort will work far better than brute force.

## Building a proof of concept

Before I built out the full [mcu.ninja](http://www.mcu.ninja) app, I wanted to make sure this method actually made sense. In practice, would it work to present people with pairs of movies and having Quicksort figure out which to show next?

So to test, I built [mcu-rankings-cli,](https://github.com/arm5077/mcu-rankings-cli) a command line interface script written in Node.

<video autoplay loop muted><source src="/assets/mcu-ninja-1-images/cli-example.mp4"/></video> 

Pretty simple — it gives you two options, and you pick one. On the back end, I wrote a `MovieList` class that handled making match-ups and accepting votes from the user. On the front end, the [inquirer](https://www.npmjs.com/package/inquirer) makes the CLI magic happen.

The method seemed to work pretty well. Sometimes the pivot movies weren't great — it's annoying to get a stinker like _The Incredible Hulk_ and have to vote against it 20-something times. Later on, I decided to use Rotten Tomatoes data to choose the most "average" movie in a set as the pivot. 

But otherwise, success. Next week, I'll talk about how the final swipe-y UI came to be!


## For the record, here's my list: <a name="my-list"></a>

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
11. Iron Man 3
12. Captain America: The First Avenger
13. Captain Marvel
14. Ant-Man
15. Avengers: Age of Ultron
16. Doctor Strange
17. Ant-Man and the Wasp
18. Thor
19. Guardians of the Galaxy Vol. 2
20. Thor 2
21. Iron Man 2
22. The Incredible Hulk