const axios = require("axios");
const cheerio = require("cheerio");
// const pretty = require("pretty");
const fs = require("fs");

const ISO_URL = "https://en.wikipedia.org/wiki/ISO_3166-1_alpha-3";

const getISOCodes = async () => {
  try {
    const { data } = await axios.get(ISO_URL);

    const cheerioMarkup = cheerio.load(data);

    const countries = [];
    // const markup = cheerio.load("<ul></ul>");
    const listItems = cheerioMarkup(".plainlist ul li");

    listItems.each((idx, el) => {
      const country = {
        name: cheerioMarkup(el).children("a").text(),
        iso: cheerioMarkup(el).children("span").text(),
      };

      countries.push(country);
      // markup("ul").append(el);
    });

    console.dir(countries);
    // console.log(pretty(markup.html()));

    fs.writeFile(
      "countriesISO.json",
      JSON.stringify(countries, null, 2),
      (err) => {
        if (err) {
          console.log(err);
          return;
        } else {
          console.log("Data written to file.");
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};

getISOCodes();
