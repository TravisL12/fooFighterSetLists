const fs = require("fs").promises;

const filters = {
  endDate: Date.now(),
  startDate: new Date("1-1-2024").getTime(),
  skipCovers: true,
};

const tallySongs = (set) => {
  return set.reduce((acc, s) => {
    s.songs.forEach((song) => {
      if (!acc[song]) {
        acc[song] = 0;
      }
      acc[song]++;
    });
    return acc;
  }, {});
};

const filterSongs = (songs) => {
  const filtered = songs.filter((set) => {
    return set.date >= filters.startDate && set.date <= filters.endDate;
  });
  return filtered;
};

const getShowDate = (date) => {
  const [day, month, year] = date.split("-").map((o) => +o);
  return new Date(year, month - 1, day);
};

const countSongs = (data) => {
  const allSongs = data.reduce((acc, show) => {
    const set = show?.sets?.set;
    if (!set) {
      return acc;
    }

    const songs = set
      .map((s) => s.song)
      .flat()
      .filter(
        (song) => !filters.skipCovers || (!song.cover && filters.skipCovers)
      )
      .map(({ name }) => name);
    const showDate = getShowDate(show.eventDate);

    acc.push({
      eventDate: show.eventDate,
      date: showDate.getTime(),
      songs,
      show,
    });
    return acc;
  }, []);

  return allSongs;
};

const getSetlists = async (filePath) => {
  try {
    const parsed = await fs.readFile(filePath);
    return JSON.parse(parsed);
  } catch (err) {
    console.log(err);
  }
};

const sortCount = (songs) => {
  const sorted = Object.entries(songs).sort((a, b) => (a[1] < b[1] ? 1 : -1));
  console.log(sorted);
};

const start = async () => {
  const parsed = await getSetlists(
    "./completeSetLists_current_june_22_2024.json"
  );
  const songs = countSongs(parsed);
  const filtered = filterSongs(songs);
  const tally = tallySongs(filtered);
  sortCount(tally);
};

start();
