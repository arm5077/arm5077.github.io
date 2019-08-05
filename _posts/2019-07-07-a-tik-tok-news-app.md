---
title: "Fine, I tried to make a news app as fun as TikTok"
layout: post
desc: "A proof-of-concept."
---

So I've taken a stab at the TikTok-style news app posited in [this previous post.](http://www.andrewmcgill.me/2019/06/15/why-dont-we-have-news-apps-like-tik-tok.html)

My premise: Most news apps look the same and emphasize browsing when you're stting with a cup of coffee in the morning. How would I design a news app for in-between moments — standing in line, waiting for the elevator — when I didn't have a specific thing I was looking for, beyond something interesting to read?

Here's what I came up with — you can take a look at [https://atlantic-tik-tok.herokuapp.com:](https://atlantic-tik-tok.herokuapp.com)

<video src="/assets/atlantic-tiktok-images/swipe-demo.mp4" autoplay muted playsinline loop></video>

It's a progressive web app modeled loosely after TikTok, where every swipe up gives you something new. If you're interested in a story, you can tap it to read it in full.

The app starts by pulling the latest news from The Atlantic. But once you finish swiping through those, it prompts you to "Enter the Wormhole," pulling the best stories from out archive.

A few notes:

* The app saves the stories it's already shown, so you never see the same story twice. 
* Right now, archive stories are sourced exclusively from The Atlantic's Science, Health and Family sections. I'm figuring that once people are caught up with the latest news, they don't want to see old politics stories. So I'm focusing solely on wonder-and-delight stuff.
* The little Poseidon illustrations are from the wonderful [Andika Wahyu.](https://www.behance.net/andikkawah0f09/) He's available for commissions!

Since this is a web app, not a native iOS app, you have to manually "install" it by opening the URL in Safari or Chrome and clicking "Add to Home Screen." You can also just visit it as a website, but I prefer the fullscreen version.

I'm going to sit with it for a bit and see if it fills a hole in my news habits. But there's definitely already a few things I want to improve. 

* **It desperately needs a "Save for later" feature.** Sometimes the app gives me a story that looks interesting, but really is just too long for me to read right away. I'd love to be able to bookmark it to read later.
* **I'm not sure the background-screened image works.** I wanted to feature the article art in way that felt dramatic but not distracting, but I'm not sure I've hit it here. The cropping often looks funny, and I have to choose a better set of screen gradients. Maybe there's a smarter way to include the photo in its original aspect ratio, or to target the right spot to center the crop.
* **Offline reading isn't a thing yet.** While the app caches the stories locally after pulling them from The Atlantic, I need to refactor the app so it knows to pull from local storage when it doesn't sense an internet connection.

Plenty of room to improve, but it's a start. [Give it a shot yourself](https://atlantic-tik-tok.herokuapp.com/) and [let me know what you think.](mailto:arm5077@gmail.com) (And here's the [Github repository](https://github.com/arm5077/atlantic-tik-tok) for the code.)