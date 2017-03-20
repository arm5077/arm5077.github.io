---
title: Measuring how often Steelers coach Mike Tomlin says "obviously," his weird verbal tic
layout: post
desc: An analysis of whether the football coach's famous verbal tic has any connection to how well the Steelers played the week before.
---
I’m not a sportswriter, and it shows. When I interviewed a veteran NFL broadcaster last week, he mentioned how some newsroom bosses couldn’t tell you “if a football was blown up or stuffed.”

Uh oh. I thought. It’s blown up, right? ([Yep.](http://en.wikipedia.org/wiki/Football_(ball)))

Despite that, I had a great time writing a [lexical analysis of Steelers head coach Mike Tomlin’s press conferences,](http://www.post-gazette.com/sports/steelers/2014/01/12/Tomlin-used-the-adverb-obviously-seven-times-in-2010-322-times-in-2013/stories/201401120075) which proved something many sports reporters already knew: The guy reflexively says “obviously” more than any human should. He uttered it 322 times over the course of the 2013 season,  more often than “football.”

Who cares? For one, I work in Pittsburgh. In this city, a story about the Steelers outweighs pretty much everything else on the table (with the possible exception of news about the Pirates or the Penguins).

Secondly, this gave me a chance to learn a bit more about how humans tick, putting a famous face to a bit of everyday psychology that I thought folks might enjoy reading about.

Thirdly, turn on talk radio. [Everyone’s been talking about “obviously” the whole season.](http://www.dve.com/media/podcast-morning-show-bits-MorningShowBits/mike-tomlin-obviously-23763665/)

And lastly — well, I just thought it would be fun.

## How I did it

**First, I needed transcripts of Tomlin’s press conferences.** Fortunately, the Steelers franchise provides write-ups of all the head coach’s speaking engagements (though you need media credentials).

These transcripts weren’t perfect — whoever writes them tends to clean up the coach’s language — but they kept in enough “obviouslys” to make them a good option.

[Steelers Coach Mike Tomlin Press 12/30/13 Press Conference Transcript](http://www.scribd.com/doc/199133619/Steelers-Coach-Mike-Tomlin-Press-12-30-13-Press-Conference-Transcript)

<p  style=" margin: 12px auto 6px auto; font-family: Helvetica,Arial,Sans-serif; font-style: normal; font-variant: normal; font-weight: normal; font-size: 14px; line-height: normal; font-size-adjust: none; font-stretch: normal; -x-system-font: none; display: block;">   <a title="View Steelers Coach Mike Tomlin Press 12&#x2F;30&#x2F;13 Press Conference Transcript on Scribd" href="https://www.scribd.com/doc/199133619/Steelers-Coach-Mike-Tomlin-Press-12-30-13-Press-Conference-Transcript"  style="text-decoration: underline;" >Steelers Coach Mike Tomlin Press 12&#x2F;30&#x2F;13 Press Conference Transcript</a> by <a title="View Andrew McGill's profile on Scribd" href="https://www.scribd.com/user/64208719/Andrew-McGill"  style="text-decoration: underline;" >Andrew McGill</a></p><iframe class="scribd_iframe_embed" src="https://www.scribd.com/embeds/199133619/content?start_page=1&view_mode=scroll&access_key=key-1t7z6r3zl1d43xcn9xsd&show_recommendations=true" data-auto-height="false" data-aspect-ratio="0.7729220222793488" scrolling="no" id="doc_1921" width="100%" height="600" frameborder="0"></iframe>

I copied the transcripts to Notepad++ and did some formatting, taking out smart quotes and enclosing reporter’s questions in parenthesis.

Then I dumped them all back into a spreadsheet, [which I’ve posted online.](https://docs.google.com/spreadsheet/ccc?key=0AkboXcg2bVe7dE16RExMdk5haHF4dk5TSm1VQ1ctYkE&usp=drive_web#gid=0) (I got the win/loss records from the [Steelers schedule page.](http://www.steelers.com/schedule-and-events/season-schedule.html)) I also converted that spreadsheet to a JSON file using convertcsv.com.

Next, I needed to calculate the Tomlin’s word frequencies across multiple years. Now, you could do this manually in Notepad++ or another text editor, opening each transcript individually and running the “Count” function. But I wanted to build a system I could re-run quickly if I had to alter or add new transcripts.

So I wrote a short PHP script that takes the JSON file, strips out the reporter’s questions from the text of each press conference, splits Tomlin’s part into an array and increments through the result, tallying counts for each word. It’s written so it can do a larger n-gram analysis, which counts the incidence of phrases instead of words.

Here’s the most important part:

``` php
<?PHP
// For this example, $ngram = 1, meaning we're only looking at one word at a time and not phrases
$textArray = explode( " ", $formatted ); // $formatted is the text sample with most punctuation removed
	
for ( $i = 0; $i < count( $textArray ) - $ngram; $i++ ) {
  $chunk = "";  
  
  for ( $j = 0; $j < $ngram; $j++ ) {
    $chunk .= $textArray[ $i + $j ] . " "; // keep adding words to chunk until ngram length is reached
  }

  $chunk = trim( $chunk ); //get rid of extra space at the end of chunk
  if ( $ngramArray[ $chunk ] == "" )
    $ngramArray[ $chunk ] = 1; 
  else
    $ngramArray[ $chunk ]++;
}
?>
```

I’ve posted that script to [a Github repo.](https://github.com/arm5077/ngram-analyzer)

I then stuck the resulting CSV into [this Google Spreadsheet](https://docs.google.com/spreadsheet/ccc?key=0AkboXcg2bVe7dFpLM1QyMDZ0Mk9SNENIa2RiZUtYWlE&usp=drive_web#gid=0) and made it filterable.

That’s it! For fun, I increased the n-gram count a bit and looked to see if there were whole phrases Tomlin uses often. It wasn’t too conclusive, but here’s a short list:

* “the early portions of the week”: **53**
* “They do a nice job”: **28**
* “[We have] [I have] [I’ve got] a great deal of respect for …" **24**
* “Such is life”: **22**
* “to be quite honest with you”: **18**
* “We will have to see where the week takes us”: **14**
* “[So-and-so is] playing really good football”: **12**
* “We have a lot of work to do”/”We have our work cut out for us”: **4**