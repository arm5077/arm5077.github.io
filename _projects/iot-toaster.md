---
title: "Honeypot IoT toaster"
description: "A fake internet-of-things toaster begging to be hacked."
asset: '/assets/iot-toaster.gif'
external_url: "https://www.theatlantic.com/technology/archive/2016/10/we-built-a-fake-web-toaster-and-it-was-hacked-in-an-hour/505571/"
order: 3
---
**Where:** [The Atlantic](https://www.theatlantic.com/technology/archive/2016/10/we-built-a-fake-web-toaster-and-it-was-hacked-in-an-hour/505571/)

**Why:** After it became clear that comprimised internet-connected devices had brought down major websites like Twitter in the [Mirai botnet attack of 2016](https://www.theatlantic.com/technology/archive/2016/10/whos-responsible-when-your-dvr-launches-a-cyberattack/505322/), I wanted to see exactly how quickly an unsecured device could be hacked. What better way than to build an [IoT toaster?](https://www.livinginternet.com/i/ia_myths_toast.htm)

**How:** OK, I didn't build an _actual_ toaster. Instead, I set up a server using Amazon Web Services that outwardly presented a fake login screen. As hackers attempted to break in, it played along and recorded their keystrokes.

**What I learned:** My fake toaster was hacked within an hour, and many times after that. If you connect an unsecured device to the internet and expect the anonymity of your IP address to protect you, you will be comprimised immediately.

**Media mentions:** [_All Things Considered_ interview](https://www.npr.org/sections/alltechconsidered/2016/11/01/500253637/an-experiment-shows-how-quickly-the-internet-of-things-can-be-hacked)