---
title: "Make Every Week, Part 2: A Slack-powered doorbell"
layout: post
desc: "Using Amazon's IoT Dash button, I made a doorbell that pings a Slack channel."
---
These days, most office buildings require employees to swipe a keycard or wave an RFID chip to get into their workplace. At _The Atlantic_, we use a fob to get into our actual office from the elevators or the bathrooms. It's great for security. It's not always great for the forgetful. 

At least once a week, I find myself awkwardly lurking in the hallway after a trip to the restroom, waiting for someone to leave the office, all because I left my fob at my desk. *_Hm,_* I think, pretending to look at my phone. _Would my health insurance cover the surgery to implant a chip into my body?_  

After a while, things get _really_ desperate: I knock on the glass door, and someone bemusedly comes over and opens it for me.

![Bill Murray, as me](https://media.giphy.com/media/3KBdUGGkVgRxu/giphy.gif)

## The Doorbell

What we needed was a doorbell. Not the "Westminister Chimes" type — that would get annoying fast — but something more subtle.

Amazon just released a [programmable version](https://aws.amazon.com/iot/button/) of its "Dash" buttons, the little $5 doohickeys that order new paper towels with one tap. It connects to a local WiFi network and executes code through Amazon's Lambda service, so it's pretty easy to set up.

An idea formed. What if the Dash was connected to a channel in Slack, our work chat client? Folks could opt into the group and receive notifications whenever someone needed help with the door. That way, it wouldn't bother the whole office.

**The first step was setting up the Slack integration.** This was pretty simple, just a matter of telling Slack the name of the "bot" and specifying the channel where it would post messages. Slack then gave an API endpoint to use to send data.

**Next, Lambda.** I wrote this code in Node.js, though you can use another language if you'd like. Lambda lets you write the code in-browser if it's a single script, but since I needed to send HTTP POST requests as per [Slack's incoming webhooks standard](https://api.slack.com/incoming-webhooks), I chose to use the popular [request](https://github.com/request/request) library and upload a zipped folder instead.

Lambda expects everything to be contained in a module export, so laying that out came first:

```javascript
exports.handler = function(event, context){
  var request = require('request');
}
```

Then came the actual call to the Slack endpoint, which was a pretty simple POST request: Just the bot's username, an emoji to use for the bot's userpic and the message to post.

```javascript
request.post(slack_endpoint, 
  {
    form: {
      payload: '{"username": "doorbellbot", "icon_emoji": ":bellhop_bell:", "text": "<!group> Someone is at the door! Let \'em in"}'
    }
  },
  function (error, response, body) {
    if(error) throw error;
    console.log(response);
  }
);
```

You'll notice that I'm using `<!group>` to simulate a "@group" string in the message, which pings everyone in the channel. Just typing "@group" doesn't work—you'll need to use that code.

It worked!

![Slack's doorbell reply](/assets/doorbell1.png)

That wrapped up quicker than I thought, so I added a bit of fun. Every time the doorbell rang, I wanted the bot to print a random quote about opening doors. I found a few online and encoded them as JSON, writing a command to pick a random one:

```javascript
var quotes = [
  { 
    quote: "Good manners will open doors that the best education cannot.",
    author: "Clarence Thomas"
  },
  { 
    quote: "I think there are influences that you open the door to, and influences that come under the door.",
    author: "Harrison Birtwistle"
  },
  { 
    quote: "We must open the doors of opportunity. But we must also equip our people to walk through those doors.",
    author: "Lyndon B. Johnson"
  },
  { 
    quote: "I find that when you open the door toward openness and transparency, a lot of people will follow you through.",
    author: "Kirsten Gillibrand"
  },
  { 
    quote: "Not knowing when the dawn will come\nI open every door.",
    author: "Emily Dickinson"
  },
  { 
    quote: "In life sometimes, in the universe, you have to close some doors to have others open.",
    author: "Gene Ween"
  },
  { 
    quote: "Knowledge of what is does not open the door directly to what should be.",
    author: "Albert Einstein"
  },
  { 
    quote: "When one door closes, another opens; but we often look so long and so regretfully upon the closed door that we do not see the one which has opened for us.",
    author: "Alexander Graham Bell"
  },
];

var this_quote = quotes[Math.floor(Math.random() * quotes.length)];

```

I then rewrote my POST payload to this: 

```javascript
payload: '{"username": "doorbellbot", "icon_emoji": ":bellhop_bell:", "text": "<!group> Someone is at the door! Let \'em in.\n>\\"' + this_quote.quote + '\\" \n>- ' + this_quote.author + '"}'
```

... and tada!

![Slack's doorbell reply](/assets/doorbell2.png)

All that remained was to post the IoT button by our office door. I attached near the fob reader and left it mysterious for now... maybe I'll add a fun sign later.

![The posted doorbell](/assets/doorbell3.jpg)

That's it for week 2! Here's the [whole code.](https://gist.github.com/arm5077/1b9b32b0cca815dfce4d8bcef1d78472)