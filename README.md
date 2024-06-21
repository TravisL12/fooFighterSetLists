# Foo Fighters Set list tally

I was curious what Foo Fighter songs were being played live so I used `https://api.setlist.fm/` to pull down all the songs played live.

You can run these locally using Node:

- `node fetchAllSetlists.js` - this will fetch all of the set lists and save them to a file locally
- `node parseSetlists.js` - this tally's the song counts
