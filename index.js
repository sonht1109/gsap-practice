const http = require("https");
const fs = require("fs");

async function download(url, dest) {
  const file = fs.createWriteStream(dest);

  /* Using Promises so that we can use the ASYNC AWAIT syntax */
  await new Promise((resolve, reject) => {
    http.get(url, (res) => {
      res
        .pipe(file)
        .on("finish", async () => {
          console.log(`The file ${dest} is finished downloading.`);
          resolve();
        })
        .on("error", (error) => {
          reject(error);
        });
    });
  }).catch((error) => {
    console.log(`Something happened: ${error}`);
  });
}

(async () => {
  const promises = Array.from({ length: 65 }).map((_, i) => {
    const filename = `${i.toString().padStart(4, "0")}.png`;
    return download(
      `https://www.apple.com/105/media/us/airpods-pro/2022/d2deeb8e-83eb-48ea-9721-f567cf0fffa8/anim/hero/large/${filename}`,
      `./beginner/airpod/images/${filename}`
    );
  });
  await Promise.all(promises);
})();
