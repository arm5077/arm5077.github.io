---
title: "How code can mail me a magazine of my favorite articles"
layout: post
desc: "I love to read long-form stuff. But screens don't really work for me anymore."
---

Most mornings, it's the same routine: I wake up, put on the coffee, and scroll through the New York Times app. By the time the coffee's finished brewing, I've caught up on the news and analysis of the day, and probably read a few good opinion pieces, too.

But I always skip over the longform stories. Which is terrible, because I _love_ The New York Times Magazine and The New Yorker. But if I tap one open, I know I'll only read a few minutes before getting distracted and tapping out. 

These are the same pieces that languish in my Pocket queue, or die a lonely death in my bookmarks. In the last few years, it's become harder for me to absorb longform, narrative content through a screen. If I do, I have to make a conscience effort to not get distracted by everything else on the internet, which leeches away some of the joy.

![What my brain sees when I look at my Pocket queue.](/assets/my-pocket-queue.png)

I've subscribed to The New Yorker print magazine to solve this problem, and I love the time I spend with it every week. But I'm still missing all the other great writing happening out there. What about _New York_, or _The Atlantic_, or _WIRED_, among so many others? Or places that don't even publish a print edition?

Right now, they're out of luck. But instead of subscribing to every publication, or manually printing out their articles from the office copier, what if I could publish a personal magazine of _all_ the articles I wanted to read?

Spoiler alert: It worked. 

PUT video in here

## The automagical magazine

This magazine machine would have to do a couple of things:

* Maintain a list of the stuff I want to read;
* Seamlessly pull content from the publications' websites, stripping out all the ads, promos and other cruft;
* Lay out the words in a visually pleasing magazine format;
* Put all those article pages together into a single issue;
* Print the magazine and send it to me. 

That's a tall order. Pocket does a good job of keeping my reading list orderly, and its built-in parser condenses the articles into a text-only format. But what server would turn this text into a magazine layout? And after that, how would I print it?

I seriously thought about renting one of these:

<iframe src="https://www.youtube.com/embed/qJUla8xJ5BM" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen style="width: 100%; max-width: 700px; display: block; margin: auto; height: 400px;"></iframe>

But it turns out you can do it better and cheaper by combining two technologies: **print CSS stylesheets** with [Prince](https://www.princexml.com/) and **on-demand printing** with [Peecho.](https://www.peecho.com/)

* Print stylesheets have been a thing for a while — they tell the web browser how your site should look when a person prints it out. Prince is a command-line utility that takes the existing [W3C spec](https://www.w3.org/TR/CSS22/page.html) and adds a bunch of really useful stuff, like page numbers and enhanced margins. 
* Peecho is a typical print-on-demand publisher, offering photobooks, paperbacks, and, yes, matte/glossy magazines. Their big advantage? They have an API that allows you to send an order programmatically.

## Putting Prince and Peecho together, along with some parsing

For version 1.0 of my automagical magazine, I decided to delay figuring out how to store someone's article selections, or scraping them from Pocket. This code would take a set of news site URLs, parse them for content, turn that text into a magazine, and send PDF to Peecho for printing. 

Little did I realize that pulling useful content from websites would be one of the hardest parts!

### Parsing
Every news website is different. What I wanted from them, however, was the same — some combination of `<section>` and `<p>` tags.

```
  <section>
    <p>
```


FOURTH ACT — what it produced

EPILOGUE — what's next
