const BASE_URL = "https://api.setlist.fm/rest";
const FOO_FIGHTERS_MBID = "67f66c07-6e61-4026-ade5-7e782fad3a5d";
const API_KEY = "";

const fetchSetListData = async ({ mbid, page }) => {
  const url = new URL(`${BASE_URL}/1.0/artist/${mbid}/setlists`);
  url.searchParams.append("p", page);

  const resp = await fetch(url.toString(), {
    method: "GET",
    headers: {
      Accept: "application/json",
      "x-api-key": API_KEY,
    },
  });
  const data = await resp.json();
  console.log(data);
  return data;
};

fetchSetListData({ mbid: FOO_FIGHTERS_MBID, page: 1 });
