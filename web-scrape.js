const request = require('request');
const fetch = require('isomorphic-fetch');
const cheerio = require('cheerio');
const fs = require('fs');
const writeStream = fs.createWriteStream('post.csv');

request('https://example.com/', (error, response, html) => {
  if (!error && response.statusCode == 200) {
    const $ = cheerio.load(html);

    // const siteHeading = $('p');

    // console.log(siteHeading.html());

    $('p').each((i, el) => {
      writeStream.write($(el).text());
    });
  }
});

request('https://codeforces.com/blog/entry/73558', (error, response, html) => {
  if (!error && response.statusCode == 200) {
    const $ = cheerio.load(html);

    $('.second-level-menu-list a').each((i, el) => {
      console.log($(el).attr('href'));
    });
  }
});

async function getDescription() {
  const response = await fetch('https://codeforces.com/blog/entry/73558');
  const text = await response.text();
  const $ = cheerio.load(text);
  $('.second-level-menu-list a').each((i, el) => {
    console.log($(el).attr('href'));
  });
}
getDescription();
