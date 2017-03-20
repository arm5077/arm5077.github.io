---
title: "How to code a virtual Internet of Things device to tempt hackers"
layout: post
desc: "The Mirai botnet contained thousands of computers, many embedded within internet-connected gadgets. How long could the average IoT device last before being compromised?"
---
Earlier this month, hackers used a massive botnet to spam Dyn, a domain name service provider, and block access to dozens of popular websites. It turns out [the worm that recruited the botnet](https://github.com/jgamblin/Mirai-Source-Code) targeted IP-connected devices, including an old brand of webcam popular in warehouses and industrial settings. 

Scanning the internet for open ports, the Mirai worm connected to unsecured servers and ran through a common dictionary of passwords, including `xc3511`, which unlocked the webcams. (There's a good writeup on the mechanics of the bot [here.](https://www.incapsula.com/blog/malware-analysis-mirai-ddos-botnet.html))

Let me first say that [this didn't affect many residential users.](https://www.wired.com/2016/10/internet-outage-webcam-dvr-botnet/) Very few people plug their devices directly into their modem; pretty much everyone filters their traffic through a router, which has ample safeguards. Plus, many of the devices targeted by Mirai were super old. 

All the same, I wondered if this was really a big deal. The internet is huge—there are _so many_ IPv4 addresses out there. Even if I had been playing fast and loose with security, weren't the odds astronomically small that a hacker would randomly happen across my server and take notice? 

So I devised an experiment.

My fake web toaster
------
I decided to set up a honeypot—a purposefully unsecured server that would give hackers the illusion of control, but would actually record their keystrokes and IP addresses. I could have used a Raspberry Pi and connected it to my home router (using port forwarding to bypass security), but in the interest of time, I ended up running a virtual server through Amazon's EC2 service. 

I wrote [a Node script](https://github.com/arm5077/mirai-honeypot/blob/master/index.js) that mimicked a Telnet login on port 23, asking for a username and password, and delivering a faux shell prompt. To a hacker's scanning script, it would look like a real Telnet server. In honor of one of the internet's [first connected devices,](http://www.livinginternet.com/i/ia_myths_toast.htm) I had it masquerade as a web-connected toaster. Here's what the hacker would have seen when they tried to log in: 

![The fake command line interface.](/assets/intro-cli.gif)

I set the thing up and stepped away, expecting to wait a while before recording a hacking attempt. Wrong. The first unauthorized login came within an hour, using `root:root` as login credentials.

![The fake command line interface.](/assets/hack-attempt.gif)

Over the course of the next 12 hours, the server registered around 300 attempted hacks. I wrote about this experiment for _The Atlantic_ [here](https://www.theatlantic.com/technology/archive/2016/10/we-built-a-fake-web-toaster-and-it-was-hacked-in-an-hour/505571/) (and talked about it on [_All Things Considered_!](http://www.npr.org/sections/alltechconsidered/2016/11/01/500253637/an-experiment-shows-how-quickly-the-internet-of-things-can-be-hacked))

What does this tell us?
------
I admit that this project is flawed in a few ways:

- **It wasn't a real IoT device.** This doesn't bother me quite as much; the Mirai bot doesn't seem to exploit any device-specific security bugs, so a generic server with an open port fills the role fine. But there's no doubt that _other_ worms take advantage of weaknesses inherent to specific IoT gadgets, so it would be interesting to more closely simulate them.
- **I didn't conduct the test over residential wireless.** I bet hackers closely monitor Amazon's IP range, looking for unsecured server instances spun up by rookies. If I had run my script through my apartment's internet connection, I probably would have seen fewer login attempts. That said, the security folks I spoke with agreed any unsecured server would have eventually been breached, probably within a day to a week.
- **Most consumer IoT devices don't connect to the internet directly.** Like I said above, most routers will kill the most obvious routes hackers use to gain control of computers. So the average person hooking up a webcam to their WiFi is probably OK. It would be interesting to simulate the security defects of older routers, and try to get a sense of how many of those exist in the wild. 
- **IPv6 might solve these problems.** The new protocol allows for _way_ more possible addresses—like, 7.9x10<sup>28</sup>. Assuming addresses were randomly distributed (and I have no idea if they will be, or anything about this protocol beyond what I've read on Wikipedia, to be honest), the sheer amount of territory hackers would have to cover might give me the effective anonymity I thought I already had.

I did get a few tweets that linked to this [xkcd comic](https://xkcd.com/350/), the thought being that my experiment is nothing new: Security folks have been setting out unsecured honeypots for years. 

That said, I think this story illustrates a few things that most people didn't know:

- **The Internet isn't that big (not yet), and it's packed with hacking scripts.** Bots scan the IPv4 space frequently enough that nearly every computer that's not behind a firewall can count on being recorded in less than a day.
- **The Mirai bot is still out in force.** Many of the hack attempts used the same sequence of password (and shell commands) outlined in the Mirai botnet's code. It appears other folks have spun up multiple copies of the bot and are busy recruiting unsuspecting servers.

My toaster experiment isn't a situation most consumers will face. But it's an accurate analog to the plight of the kinds of unsecured devices harnessed by the Mirai botnet, and shows how quickly they can be pulled into a hacker's thrall.
