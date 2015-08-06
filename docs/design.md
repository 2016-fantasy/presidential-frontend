# Presidential Erection 2016
Making America Awesome Again!!

This incredibly cynical fantasy league sport centered around the abject comedy of the three-ring shit circus that is the 2016 election is intended to point directly at this all and say, "Seriously? This is what we're working with in 2016?"

## Game Logic
Presidential Erection will present a series of mini games such as trivia, basic skill puzzles, basic arcade-style games and other lowest-common-denominator simple and fun game play that can either pit the user against their own knowledge of the candidates ("In what year was Hillary Clinton fired from the Nixon administration for unethical behavior?"), or pit two candidates against each other in basic mini-games such as boxing or skeet shooting/duck hunt style games.

I'd like to see darts (throw darts at a candidate's face), the "dunk" game (sits on board, throw a ball, hit a target, DUNK! into water), Whack-a-Puppet where the Presidential candidate heads pop up out of nine holes in a board, and you have to “whack” them back down with a mallet. Stuff like that. Carnival games, puzzles - easier is obviously better.

## Game Assets
Will need music, sound effects, images and text. Not going to even try to iterate them all, but we're going to need some basics:

1. Each candidate in a variety of emotional poses. We can crib photos from online to get started, but may need to replace these. Will have to check legality.
2. The mini-game environments. Even something as basic as whack-a-mole wants a graphical overlay. Each of these will. Again, can probably crib from Google images to get going, but (want) originals before it's shipped.
3. Game content - trivia games need questions, puzzle games need puzzles.

I think these should be as humorously informative as possible, but am willing to just shut up, sit in the corner and code. My flavor of humor, speech and interpersonal interaction is not something that should see the light of day in a commercial application built on this topic. I am, however, more than happy to offend everyone on the planet twice.

Music, sound effects, etc., can all be handled here. My son Zack would get involved and create one-off jingles, sound effects (button presses, buzzers, etc.) and the rest of what we'll need along with me, if needed.

## Social and Sharing
I'm not voting for whether we should irritatingly ask users to share accomplishments, etc. We can take any approach on that. I would like it to be "less" obtrusive if we're going to have it.

Large, heavily-animated pop-ups asking me to share, share, share, share, share do not excite me and most other people. A simple, "Share This Result" button on a progress dialog or "You Won!" dialog that's going to happen anyway is not out-of-bounds to me at all. Popping them up every single time the user gets a question correct or whacks a mole is out-of-bounds for me.

## Leagues
Each user will need an account against which we can store score. Would like to allow signup with Facebook and/or Twitter to get them a basic identity against which we can file their scores and rank them against their friends.

First, we need to decide: Are they adopting a single candidate (pet model) or a political party (team model). I would like to have the pet model as the data models are MUCH simpler in the league engine. Considering one object's actions, results and scores against each other is frankly simpler than doing it for each team member, aggregating to a team result and ranking/scoring along that whole matrix of objects and events. If this goes nutty online, we can work from now until 2020 on a true Presidential Erection: Team America type of game :)

We need to define the play grain - what amounts to a "day" of play. Will a user get to play a certain number of mini-games per day? Take one turn in each offered game? How do we "level" the playing field such that each person gets to do the same things each day...but with different/personal results?

## Possible Play Flow
These are merely ideas. Feel free to edit and commit :)

1. User logs in, gets whatever daily info has been generated (you leveled up/ranked up vs. your competition, etc.)
2. User uses system to read through events, updates, scores, leaderboards, etc., as desired at any time during the day to see progress of self and others.
3. Once per day, user can Enter the Arena and do battle. They will be on a play progression that *can* be saved for later if they get interrupted. Their score in the daily gauntlet will be tallied and filed for the day marking their candidate's progress for the day.
4. The cycle continues daily until the virtual "election" is over and a winner is declared President.
5. Repeat.

## Add-On Ideas
Once we get the core game online and playable (launched) we should go back through and find nice ways to integrate relevant news into the game. Either a video player that exists on the side to play news while the user is on the site, an updating panel with current poll results from the real world, etc. Basically, turn this into a one-stop shop for Presidential Election 2016 news...and humor :)



## Alternate Fantasy Games

I think we should aim for the most flexible and dynamic system as possible. Parameterize everything we can think of and provide tools for the users to input their own parameters (the UI should be completely intuitive to the user). This will maximize our opportunity to find the most compelling games, as well as to support a large diversity of games and experiences for users (not everyone is in to the same stuff). The user is really just interacting with a database and we should provide the tools to allow them to slice that data in any way they wish.


### Themes

Data. Numbers. People love data and numbers. We need to show users the ones that are most relevant to them. We need to make it easy for the user to compare and manipulate the numbers that mean the most for them.

There should be many, clear, actionable visualizations. If it's a number and it changes over time, there should be a chart.


### Leagues

A league is a group of players that are all competing in the same competition.

#### Events

There should be an easy way to publish events that can be consumed by any manner of subsystems. Events are essentially propositions that will eventually resolve to a binary value (either the event occurred or did not occur). Events will likely be the lifeblood of the system. Third parties / users should be able to publish event streams.

#### Drafts

A league may hold a draft, where players may choose candidates that they wish to play.

There may be many types of drafts. Each league could choose the type of draft they would like to have.

#### Trading

Sorry, but your candidate(s) may start to perform poorly in your league, so you should have a way to trade them or somehow dump them.