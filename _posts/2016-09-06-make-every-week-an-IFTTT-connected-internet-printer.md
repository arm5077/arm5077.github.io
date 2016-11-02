---
title: "Make Every Week, Part 5: An receipt printer that connects to IFTTT"
layout: post
desc: "How to build a printer that responds to triggers sent over the internet via the If This, Than That (IFTTT) service."
---
Labor Day is behind us, but astrological summer continues, and so does #MakeEveryWeek! Last week, I finally built a project with piece of hardware sitting on my shelf for far too long: an [Adafruit thermal receipt printer](https://www.adafruit.com/product/597).

![The printer in action](/assets/printer1.gif)

This thing had me stumped for a while. What the heck could I do with it — make grocery lists, print out tweets? Pretty much everything I imagined would work better as a text notification, or even just a quick memo in my iPhone's notepad app. At the same time, there's just _something_ about printing stuff out. It feels more permanent, but also timely, like an old-school news ticker.

Since I couldn't make my mind up, I decided to make the printer a utility player. It wouldn't do just one thing forever. It would do _anything_, and I could switch its job at any moment — print my tweets one day, collect lunch orders via Slack the next. I can do this by connecting the printer to IFTTT, a popular scripting and automation website that allows people to run predefined tasks (i.e., emailing a notification) when certain triggers are activated (i.e., when [@HamiltonMusic](https://twitter.com/hamiltonmusical?lang=en) tweets about tickets).

Gathering and preparing materials
------

Here's what I started with:

- A [Raspberry Pi](https://www.adafruit.com/raspberrypi) single-board computer. I used a Model 2, which I had lying around, but I'd get a Model 3, which has integrated WiFi;
- [The thermal printer starter pack,](https://www.adafruit.com/product/597) which includes the printer, the necessary cables, a 5V power supply and a DC power adapter;
- A ton of [extra paper](https://www.adafruit.com/products/2754);
- Some incidental cords (an HDMI cord to connect the Pi to my monitor, a micro USB cord to power the Pi, etc.)

If you're starting from scratch with the Pi, you'll need to buy a [micro SD card (and reader)](https://www.amazon.com/SanDisk-microSDXC-Standard-Packaging-SDSQUNC-064G-GN6MA/dp/B010Q588D4/ref=zg_bs_516866_2) to serve as the microcontroller's hard drive. Follow [these instructions](https://www.raspberrypi.org/documentation/installation/noobs.md) to install NOOBS and pick which operating system you prefer. I went with [Raspbian.](https://www.raspbian.org/) (Some Raspberry Pi kits come with an SD card pre-loaded with an OS, so you can skip these steps.)

So let's turn to the printer. First step is getting this puppy powered and connected to the Pi. I found [this page](https://learn.adafruit.com/networked-thermal-printer-using-cups-and-raspberry-pi/connect-and-configure-printer) particularly helpful. For power (the red-and-black wire), I clipped off one of the plugs, stripped the ends of the wires and wound them into the proper terminals of the power adapter. The power adapter connects in turn to the power supply, which you can plug into any wall outlet or power strip.

![The cables fit snugly into the adapter outlets](/assets/printer2.jpg)

The other end plugs into the bottom of the printer. You can also plug in the green, yellow and black wire (the shape of the wire plugs should ensure you connect it in the right direction).

![Both cables are plugged into their respective sockets](/assets/printer3.jpg)

The other end of the serial cable plugs into the third, fourth and fifth pins on the Pi, with the ground (black wire) plugging into Pin 2. Here's a [tiny illustration,](https://cdn-learn.adafruit.com/assets/assets/000/031/834/thumb160/raspberry_pi_ttl-wires.jpg?1461025080) as well as my own shot at the thing:

![The serial cable connects to pins 3, 4 and 5](/assets/printer4.jpg)

To test if the printer works, hold down the button to the left of the paper tray while plugging in the power.
