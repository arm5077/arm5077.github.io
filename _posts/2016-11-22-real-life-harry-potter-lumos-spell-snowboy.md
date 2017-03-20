---
title: "Make Every Week, Part 5: A real-life Harry Potter Lumos spell, using speech recognition"
layout: post
desc: "Harry used the charm to turn his wand into a wizard's flashlight. Voice recognition software can do the same for muggles."
---

I don't think of myself as a _Harry Potter_ fan, but I somehow know a crapload of magic spells from the famous book series. _Alohomora_ was useful for unlocking doors; _Expelliarmus_ would disarm an opponent of her wand. But one of the simplest was _Lumos_, which lit the tip of a wizard's wand, along with its counterpart _Nox_, which extinguished the light. 

![Severus Snape uses the Lumos spell.](/assets/lumos_harry_potter.jpg)

Speech recognition has always seemed a bit like magic to me, too. But as I poked around [the open-source work](https://github.com/alexa/alexa-avs-sample-app) being done using the Amazon Alexa Voice Service platform (which powers the Amazon Echo, Dot, etc.), I found [Snowboy](https://github.com/Kitt-AI/snowboy). It's a pretty neat "wake-word-as-service" library that's free for hackers (real apps have to pay money), and uses machine learning to recognize the desired phrase. It's especially nice because it doesn't need the internet to work — after you train the algorithm online using your own voice, Snowboy gives you a downloadable file that hooks up with its library offline.

_Hmm_, I thought. _Could Snowboy help me achieve my dream of becoming an actual wizard?_

Voila: 

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Last week needed some Raspberry Pi-powered ACTUAL HARRY POTTER MAGIC. Explainer post coming soon <a href="https://t.co/u5AK25e3MG">pic.twitter.com/u5AK25e3MG</a>&mdash; Andrew McGill (@andrewmcgill) <a href="https://twitter.com/andrewmcgill/status/798237324043816965">November 14, 2016</a></p></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

Building the Lumos Lamp
-------
The goal was to turn on a lamp (or several) by saying "Lumos!" out loud. Since I'm not comfortable enough with electrical engineering to hardwire a lamp's power supply directly through my Raspberry Pi, I ended up buying the [Powerswitch Tail 2](https://www.adafruit.com/product/268), essentially an extension cord that can be powered on and off programmatically by a micontroller.

Here are the materials I used:

- Raspberry Pi 2 (Model B in my case) with Raspbian installed
- [A USB microphone](https://www.amazon.com/gp/product/B00IR8R7WQ/ref=oh_aui_detailpage_o01_s00?ie=UTF8&psc=1)
- [Powerswitch Tail 2](https://www.adafruit.com/product/268)
- [A bunch of male-female jumper wires](https://www.adafruit.com/products/826)
- [Generic power strip](https://www.amazon.com/AmazonBasics-6-Outlet-Surge-Protector-2-Pack/dp/B014EKQ5AA/ref=zg_bs_10967801_1?_encoding=UTF8&psc=1&refRID=G27MRDKAWFC2Q66CR6H0)

**First, set up the Raspberry Pi.** (Snowboy has [some good documentation here.](http://docs.kitt.ai/snowboy/#quick-start)) Presuming you've booted up the Pi and connected it to the internet, plug in your USB microphone. You'll need to install some audio dependencies from the command line: 

```
sudo apt-get install python-pyaudio python3-pyaudio sox
```

 You can check to see if that worked by running `rec test.wav`, speaking into the microphone for a few seconds, and then `aplay test.wav`. (You may need to do some more fiddling — [troubleshooting advice here](http://docs.kitt.ai/snowboy/#running-on-pi)).

At this point, it's probably best to set up your project folder. I used Node.js to code this project, so we need to initiate NPM and install a `snowboy`, which will run our Pi's speech recognition, `onoff`, which handles switching the power source, and `node-record-lpcm16`, a Node-specific audio recording library.

```
npm init
npm install snowboy --save
npm install onoff --save
npm install node-record-lpcm16 --save
```

**Now, train Snowboy to understand your voice.** I'd do this one a laptop with a built-in microphone, not your Pi. Visit [Snowboy's site](https://snowboy.kitt.ai/) (Firefox seemed to work better for me), make an account and create a new hotword. After you repeat the word three times, Snowboy will give you a `.pmdl` file — that's the key. Transfer it over to your Pi; I emailed it to myself and just downloaded it from the Pi's web browser. I ended up making two hotwords — "lumos," to turn the light on, and "nox," to turn it off.

Drop the .pmdl file into your project folder, and make `index.js`, which will contain your main code. [Here's what I ended up putting together,](https://gist.github.com/arm5077/ef498a7e31e4d799431d5ce734898907) initializing a detector and adding two hotword models. The `detector.on('hotword')` function fires whenever I say "lumos" or "nox," so that's where I've stuck the pin logic.

Speaking of pins...

**Time to wire this together.** Here's my setup: 

![The wiring setup between the Powerswitch and the Pi.](/assets/lumos wiring diagram.JPG)

I got some basic wiring advice from [this tutorial](https://learn.adafruit.com/adafruits-raspberry-pi-lesson-13-power-control/overview), but essentially, the purple wire connects to one of the Pi's ground pins, and the blue wire connects to pin 15. You'll see that I unscrewed the Powertail's casing — the terminals were a bit hard to reach with the male end of the wire otherwise.

With finished, you're probably ready to give this a shot! I connected the Powertail to an extension cord that plugged into the wall outlet, and then linked the other end of the Powertail with a regular power strip. I ended up plugging three lights into the strip — my floor lamp, a desk lamp and my architect light. 

When you run `node index.js`, you should hear a click as the Powertail switches off. (The red LED indicator stays on, so you know it's working.) Stand back, and authoritatively say "Lumos!" 

With any luck, the light will switch on — and you'll officially be a member of the wizarding world.  

![Ron Weasley failing at being a wizard.](/assets/ron_fail.gif)