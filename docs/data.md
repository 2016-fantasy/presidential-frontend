There should be an over-arching data model that tracks every piece of data.

We should provide a central repository (although we may allow for it to be modified by users in some way) of good data (candidate names, default images, poll results, etc.) that can be used by leagues. Leagues may also augment the central repository with their own data (new candidate avatars, custom "event" data). If we take a layered approach, a league can just implement a given central repository asset to have it overlayed on their view of the data at run time [view only requests the current "Donald image", something else will map to the appropriate image file].

A league should have it's own data structure that tracks the entire activities of the league. Storing an event log will allow a league's entire history to easily be saved, replayed, and by extension: backed up. This model can allow for much additional functionality that users may enjoy (being able to scrub through history; creating visualizations; etc.). Up to a point, this should also help us scale on the backend. The structure should probably be versioned to allow for easy upgrading in the future.

## Data Sources/Types

We should be able to pull in, model, and effectively use many different types of data from many sources.

- Images
- Polls
- Debates
- Tweets & Other Communications
- Fundraising numbers


### Images

Should define standard for asset classes here. For example, all candidate headshot images should be a certain size.