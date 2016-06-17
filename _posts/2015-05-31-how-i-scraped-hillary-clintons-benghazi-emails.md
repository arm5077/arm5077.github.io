---
title: How I scraped Hillary Clinton's Benghazi emails
layout: post
---
This May, the U.S. State Department released 296 of the 30,000 government emails previously stored on Hillary Clinton’s private server.

Or rather, they tried to.

State directed reporters to download the emails from the department’s [“virtual reading room”](http://foia.state.gov/Search/Results.aspx?collection=Clinton_Email) (one of many government silos of FOIA data that really should be cataloged on [data.gov](http://www.data.gov/)). But given the world’s intense interest in former Secretary Clinton’s communications, the site slowed to a crawl.

<blockquote class="twitter-tweet" lang="en">
<p dir="ltr" lang="en">So far, State Dept.&#8217;s FOIA response time is faster than the load time for the Clinton email website</p>
<p>— Timothy Cama (@Timothy_Cama) <a href="https://twitter.com/Timothy_Cama/status/601789439879294977">May 22, 2015</a></p></blockquote>
<p><script src="//platform.twitter.com/widgets.js" async="" charset="utf-8"></script>

After hitting refresh about a million times and finally getting the first 20 results, it became clear the conventional route wasn’t going to work.

So I _popped_ open Chrome’s developer console and there it was — a beautiful XHR request with plenty of dangling parameters.

## Cutting out the middleman

When you’re dealing with a big ol’ set of data you want to display on your site, hardcoding it into HTML is a bad idea. It’s easier to store the information as a file or a database on your server and have the website grab bits and pieces when it needs them.

That’s what’s happening here. State’s site is querying some master database when it loads Clinton’s emails, and it’s using that XHR request to do it.

Since it’s publicly exposed (the request wasn’t made using server-side code), I can query the database directly by taking the URL and tweaking it a bit. And if I can make the wheezing server give me more than 20 results at once, I could save a lot of time.

Here’s the original:

`http://foia.state.gov/searchapp/Search/SubmitSimpleQuery?_dc=1433123130101&searchText=*&beginDate=false&endDate=false&collectionMatch=Clinton_Email&postedBeginDate=false&postedEndDate=false&caseNumber=false&page=1&start=0&limit=20`

Aha! There’s a “limit” parameter at the end that’s set to 20. Let’s just bump that up to, say, 1,000.

`http://foia.state.gov/searchapp/Search/SubmitSimpleQuery?_dc=1433123130101&searchText=*&beginDate=false&endDate=false&collectionMatch=Clinton_Email&postedBeginDate=false&postedEndDate=false&caseNumber=false&page=1&start=0&limit=1000`

Yes! The State Department’s server just returned me a JSON file with 296 results — every email I’m looking for. What’s more, it looks like each object includes a property containing the direct URL to a PDF of the individual email.

##Scrape scrape scrape

With this JSON file saved safely to my computer, I wrote a [quick Node.js] script that loops through and downloads each PDF, saving it to my hard drive.

(If I was a complete coding boss, I would’ve used a PDF library to combine these files programmatically. Instead, running close to deadline, I used Adobe Acrobat.__

And boom — we had a 850-page PDF of every email the State Department was currently failing to load.

