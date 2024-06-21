const fs = require("fs");

const BASE_URL = "https://api.setlist.fm/rest";
const FOO_FIGHTERS_MBID = "67f66c07-6e61-4026-ade5-7e782fad3a5d";
const API_KEY = "d1p-LL91mqaJeLghELV9T6SslladbIa-CkJh";

function saveJsonToFile(data, filePath) {
  const jsonString = JSON.stringify(data, null, 2);

  fs.writeFile(filePath, jsonString, "utf8", (err) => {
    if (err) {
      console.error("Error writing to file", err);
    } else {
      console.log("JSON data saved to", filePath);
    }
  });
}

function appendJsonToFile(newData, filePath) {
  fs.readFile(filePath, "utf8", (err, data) => {
    let json = [];

    if (err && err.code === "ENOENT") {
      console.log("File does not exist, creating a new file.");
    } else if (err) {
      console.error("Error reading file", err);
      return;
    } else {
      try {
        json = JSON.parse(data);
      } catch (parseErr) {
        console.error("Error parsing JSON", parseErr);
        return;
      }
    }

    if (!Array.isArray(json)) {
      console.error("Existing data is not an array");
      return;
    }

    json = json.concat(newData);
    saveJsonToFile(json, filePath);
  });
}

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
  if (data.code === 404) {
    console.log("NOT FOUND");
    return;
  }
  appendJsonToFile(data.setlist, "./myData.json");
  return data;
};

const start = async (pageCount) => {
  for (let i = 1; i <= pageCount; i++) {
    console.log(`fetching: Page ${i}`);
    const data = await fetchSetListData({ mbid: FOO_FIGHTERS_MBID, page: i });
    if (!data) break;
  }
};

const totalPages = Math.ceil(1546 / 20);
start(totalPages);
