# Foo Fighters Set list tally

I was curious what Foo Fighter songs were being played live so I used `https://api.setlist.fm/` to pull down all the songs played live.

You can run these locally using Node:

- `node fetchAllSetlists.js` - this will fetch all of the set lists and save them to a file locally
- `node parseSetlists.js` - this tally's the song counts

These scripts could be used for any band, just need to find the MusicBrainz ID ([Foo fighters page](https://musicbrainz.org/artist/67f66c07-6e61-4026-ade5-7e782fad3a5d)) and change that in `fetchAllSetlists.js`.
